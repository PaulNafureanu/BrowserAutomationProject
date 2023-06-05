import {
  COMMAND_NOT_FOUND,
  ERROR_TYPE,
  EXECUTE_NOT_FOUND,
  KEYWORD_MISSING,
  KEYWORD_REDUNDANT,
  KEYWORD_WRITTEN_INCORRECTLY,
  CommandMessager,
  VALUE_MISSING,
  VALUE_NOT_ACCEPTED,
} from "./CommandMessager";

import {
  CommandDefiner,
  CommandDefinition,
  CommandType,
} from "./CommandDefiner";

export type CommandInput = {
  [key in keyof Partial<CommandDefinition>]: string;
};

interface SuccededRule<T extends CommandType | CommandInput | undefined> {
  isValid: true;
  data: T;
}
interface FailedRule {
  isValid: false;
  error: ERROR_TYPE;
}

export interface ValidationResult {
  isValid: boolean;
  commandType: CommandType | undefined;
  commandInput: CommandInput | undefined;
}
/**
 * Validation Rules for User Commands:
 * 1. Every user command must start with the keyword "execute".
 * 2. Every user command must be identified with one command type definition.
 * 3. The number of truthy keywords in the command type definition has to equal the number of command parts.
 * 4. In every user command, the value of any command keyword must be an accepted value for that keyword type.
 */
export class CommandValidator {
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
    return { isValid: true, data: undefined } as SuccededRule<undefined>;
  }

  /**
   * Validation Rule: Every user command must be identified with one command type definition.
   * @param userInput the string input that the user typed in CLI.
   * @returns the command type if the user command is valid, an error otherwise.
   */
  private static validateCommandTypeRule(userInput: string) {
    const commandType = CommandDefiner.getCommandType(userInput);
    if (!commandType) {
      return {
        isValid: false,
        error: { name: "COMMAND_NOT_FOUND" } as COMMAND_NOT_FOUND,
      } as FailedRule;
    }
    return { isValid: true, data: commandType } as SuccededRule<CommandType>;
  }

  /**
   * Validation Rule: The number of truthy keywords in the command type definition has to equal the number of command parts.
   * @param userInput the string input that the user typed in CLI.
   * @param commandType the command type definition identified with the user command.
   * @returns true if the user command is valid, an error otherwise.
   */
  private static validateCommandPartsRule(
    userInput: string,
    commandType: CommandType
  ) {
    const commandParts = userInput.split(" ");
    const validCommandPartsLen = commandParts.filter(
      (part) => part !== "" && part !== " "
    ).length;

    const numberOfTruthyKeywords =
      CommandDefiner.getNumberOfTruthyKeywords(commandType);

    if (validCommandPartsLen === numberOfTruthyKeywords)
      return { isValid: true, data: undefined } as SuccededRule<undefined>;
    else {
      // const commandKeywords = Object.keys(commandType.CommandDefinition);
      const specificCommandKeywords =
        CommandDefiner.getTruthyKeywordList<(keyof CommandDefinition)[]>(
          commandType
        );

      const redundantKey = CommandDefiner.getRedundantKeyword(
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
    commandType: CommandType
  ) {
    // Define the command parts (key-value pairs)
    const commandParts = userInput.split(" ");
    const validCommandParts = commandParts.filter(
      (part) => part !== "" && part !== " " && part !== "execute"
    );

    // Define the list of truthy keywords used for this user command from the command type definition
    let userCommandKeywordList =
      CommandDefiner.getTruthyKeywordList<string[]>(commandType);

    let commandInput: { [key: string]: string } = {};
    for (const keyValue of validCommandParts) {
      const [keywordCommand, keywordValue] = keyValue.split(":");

      //Check if the keyword command is an accepted keyword by the command type
      if (!userCommandKeywordList.includes(keywordCommand)) {
        const keyword = CommandDefiner.getKeywordFromString(
          keyValue,
          userCommandKeywordList as (keyof CommandDefinition)[]
        );

        if (keyword) {
          return {
            isValid: false,
            error: {
              name: "KEYWORD_WRITTEN_INCORRECTLY",
              keyValuePair: keyValue,
              keywordName: keyword,
              acceptedValues:
                CommandDefiner.getAcceptedValuesForKeyword(keyword),
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
        CommandDefiner.getAcceptedValuesForKeyword(keywordCommand);
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
      commandInput[keywordCommand] = keywordValue;
    }

    return {
      isValid: true,
      data: commandInput as CommandInput,
    } as SuccededRule<CommandInput>;
  }

  /**
   * Validates a user input in CLI using Validation Rules for User Commands.
   * @param userInput the string input that the user typed in CLI.
   * @returns a validation result containing the prop 'isValue' set to true if the user command is valid, false otherwise.
   */
  public static validateUserCommand(userInput: string) {
    const prepUserInput = userInput.trim().toLowerCase();

    let error: ERROR_TYPE | undefined = undefined;
    let commandType: CommandType | undefined = undefined;

    let ruleResult:
      | FailedRule
      | SuccededRule<undefined>
      | SuccededRule<CommandType>
      | SuccededRule<CommandInput>;

    //Check first rule
    ruleResult = CommandValidator.validateExecuteRule(prepUserInput);
    if (ruleResult.isValid) {
      //Check second rule
      ruleResult = CommandValidator.validateCommandTypeRule(prepUserInput);
      if (ruleResult.isValid) {
        //Check third rule
        commandType = ruleResult.data;
        ruleResult = CommandValidator.validateCommandPartsRule(
          prepUserInput,
          commandType
        );

        if (ruleResult.isValid) {
          // Check third rule
          ruleResult = CommandValidator.validateAcceptedValuesRule(
            prepUserInput,
            commandType
          );

          if (ruleResult.isValid) {
            return {
              isValid: true,
              commandType: commandType,
              commandInput: ruleResult.data,
            } as ValidationResult;
          } else {
            error = ruleResult.error;
          }
        } else {
          error = ruleResult.error;
        }
      } else {
        error = ruleResult.error;
      }
    } else {
      error = ruleResult.error;
    }

    // Write the error if there is one.
    if (error) {
      CommandMessager.ConsoleErrorWriter(
        CommandMessager.getErrorMessages(error)
      );
    }

    return {
      isValid: false,
      commandType: commandType,
      commandInput: undefined,
    } as ValidationResult;
  }
}
