import {
  COMMAND_NOT_FOUND,
  ERROR_TYPE,
  EXECUTE_NOT_FOUND,
  KEYWORD_MISSING,
  KEYWORD_REDUNDANT,
  KEYWORD_WRITTEN_INCORRECTLY,
  UserCommandMessages,
  VALUE_MISSING,
  VALUE_NOT_ACCEPTED,
} from "./CommandMessages";

import {
  CommandType,
  UserCommandDefinition,
  UserCommandType,
} from "./CommandType";

export interface ValidationResult {
  isValid: boolean;
  commandType: UserCommandType | undefined;
}

interface SuccededRule {
  isValid: true;
  data?: UserCommandType;
}
interface FailedRule {
  isValid: false;
  error: ERROR_TYPE;
}
type RuleResult = FailedRule | SuccededRule;

/**
 * Validation Rules for User Commands:
 * 1. Every user command must start with the keyword "execute".
 * 2. Every user command must be identified with one command type definition.
 * 3. The number of truthy keywords in the command type definition has to equal the number of command parts.
 * 4. In every user command, the value of any command keyword must be an accepted value for that keyword type.
 */
export class ValidationRule {
  private constructor() {}

  /**
   * Validation Rule: Every user command must start with the keyword "execute".
   * @param userInput the string input that the user typed in CLI.
   * @returns true if the user command is valid, an error otherwise.
   */
  private static validateExecuteRule(userInput: string) {
    if (!userInput.includes("execute")) {
      return {
        isValid: false,
        error: { name: "EXECUTE_NOT_FOUND" } as EXECUTE_NOT_FOUND,
      } as FailedRule;
    }
    return { isValid: true } as SuccededRule;
  }

  /**
   * Validation Rule: Every user command must be identified with one command type definition.
   * @param userInput the string input that the user typed in CLI.
   * @returns the command type if the user command is valid, an error otherwise.
   */
  private static validateCommandTypeRule(userInput: string) {
    const commandType = CommandType.getCommandType(userInput);
    if (!commandType) {
      return {
        isValid: false,
        error: { name: "COMMAND_NOT_FOUND" } as COMMAND_NOT_FOUND,
      } as FailedRule;
    }
    return { isValid: true, data: commandType } as SuccededRule;
  }

  /**
   * Validation Rule: The number of truthy keywords in the command type definition has to equal the number of command parts.
   * @param userInput the string input that the user typed in CLI.
   * @param commandType the command type definition identified with the user command.
   * @returns true if the user command is valid, an error otherwise.
   */
  private static validateCommandPartsRule(
    userInput: string,
    commandType: UserCommandType
  ) {
    const commandParts = userInput.split(" ");
    const validCommandPartsLen = commandParts.filter(
      (part) => part !== "" && part !== " "
    ).length;

    const numberOfTruthyKeywords =
      CommandType.getNumberOfTruthyKeywords(commandType);

    if (validCommandPartsLen === numberOfTruthyKeywords)
      return { isValid: true } as SuccededRule;
    else {
      // const commandKeywords = Object.keys(commandType.CommandDefinition);
      const specificCommandKeywords =
        CommandType.getSpecificUserCommandKeywordList<
          (keyof UserCommandDefinition)[]
        >(commandType);

      const redundantKey = CommandType.getRedundantKeyword(
        commandParts,
        specificCommandKeywords
      );

      if (redundantKey) {
        return {
          isValid: false,
          error: {
            name: "KEYWORD_REDUNDANT",
            keywordName: redundantKey,
            commandName: commandType.CommandName,
            commandKeywords: specificCommandKeywords,
          } as KEYWORD_REDUNDANT,
        } as FailedRule;
      } else {
        return {
          isValid: false,
          error: {
            name: "KEYWORD_MISSING",
            keyValuePair: "",
            commandName: commandType.CommandName,
            commandKeywords: specificCommandKeywords,
          } as KEYWORD_MISSING,
        } as FailedRule;
      }
    }
  }

  /**
   * Validation Rule: In every user command, the value of any command keyword must be an accepted value for that keyword type.
   * @param userInput the string input that the user typed in CLI.
   * @param commandType the command type definition identified with the user command.
   * @returns true if the user command is valid, an error otherwise.
   */
  private static validateAcceptedValuesRule(
    userInput: string,
    commandType: UserCommandType
  ) {
    // Define the command parts (key-value pairs)
    const commandParts = userInput.split(" ");
    const validCommandParts = commandParts.filter(
      (part) => part !== "" && part !== " " && part !== "execute"
    );

    // Define the list of truthy keywords used for this user command from the command type definition
    let userCommandKeywordList =
      CommandType.getSpecificUserCommandKeywordList<string[]>(commandType);

    for (const keyValue of validCommandParts) {
      const [keywordCommand, keywordValue] = keyValue.split(":");

      //Check if the keyword command is an accepted keyword by the command type
      if (!userCommandKeywordList.includes(keywordCommand)) {
        const keyword = CommandType.getKeywordFromString(
          keyValue,
          userCommandKeywordList as (keyof UserCommandDefinition)[]
        );

        if (keyword) {
          return {
            isValid: false,
            error: {
              name: "KEYWORD_WRITTEN_INCORRECTLY",
              keyValuePair: keyValue,
              keywordName: keyword,
              acceptedValues:
                CommandType.getAcceptedValuesForCommandKeywords(keyword),
            } as KEYWORD_WRITTEN_INCORRECTLY,
          } as FailedRule;
        } else {
          return {
            isValid: false,
            error: {
              name: "KEYWORD_MISSING",
              commandName: commandType.CommandName,
              commandKeywords: userCommandKeywordList,
              keyValuePair: keyValue,
            } as KEYWORD_MISSING,
          } as FailedRule;
        }
      }

      //Check if the value of the keyword is an accepted value for that keyword type
      const acceptedValues =
        CommandType.getAcceptedValuesForCommandKeywords(keywordCommand);
      if (!(acceptedValues && acceptedValues.includes(keywordValue))) {
        if (keywordValue) {
          return {
            isValid: false,
            error: {
              name: "VALUE_NOT_ACCEPTED",
              keywordName: keywordCommand,
              valueName: keywordValue,
              acceptedValues: acceptedValues,
            } as VALUE_NOT_ACCEPTED,
          } as FailedRule;
        } else {
          return {
            isValid: false,
            error: {
              name: "VALUE_MISSING",
              keywordName: keywordCommand,
              acceptedValues: acceptedValues,
            } as VALUE_MISSING,
          } as FailedRule;
        }
      }
    }

    return { isValid: true } as SuccededRule;
  }

  /**
   * Validates a user input in CLI using Validation Rules for User Commands.
   * @param userInput the string input that the user typed in CLI.
   * @returns a validation result containing the prop 'isValue' set to true if the user command is valid, false otherwise.
   */
  public static validateUserCommand(userInput: string) {
    const prepUserInput = userInput.trim().toLowerCase();

    let error: ERROR_TYPE | undefined = undefined;
    let commandType: UserCommandType | undefined = undefined;

    //Check first rule
    let ruleResult = ValidationRule.validateExecuteRule(prepUserInput);
    if (ruleResult.isValid) {
      //Check second rule
      ruleResult = ValidationRule.validateCommandTypeRule(prepUserInput);
      if (ruleResult.isValid) {
        if (ruleResult.data) {
          //Check third rule
          commandType = ruleResult.data;
          ruleResult = ValidationRule.validateCommandPartsRule(
            prepUserInput,
            commandType
          );

          if (ruleResult.isValid) {
            // Check third rule
            ruleResult = ValidationRule.validateAcceptedValuesRule(
              prepUserInput,
              commandType
            );

            if (ruleResult.isValid) {
              return {
                isValid: true,
                commandType: commandType,
              } as ValidationResult;
            } else {
              error = ruleResult.error;
            }
          } else {
            error = ruleResult.error;
          }
        }
      } else {
        error = ruleResult.error;
      }
    } else {
      error = ruleResult.error;
    }

    // Write the error if there is one.
    if (error) {
      UserCommandMessages.WriteErrorConsole(
        UserCommandMessages.getErrorMessages(error)
      );
    }

    return { isValid: false, commandType: commandType } as ValidationResult;
  }
}
