import { ERROR_TYPE, ERROR_NAME, CommandMessager } from "./CommandMessager";
import {
  AcceptedValues,
  CommandDefiner,
  CommandKeyUnion,
  CommandKeys,
  CommandType,
  UndefinedCommandType,
} from "./CommandDefiner";

// Defining the final validation result shape
export type CommandInput<CT extends CommandType> = {
  [key in CT["CommandKeys"][number]]: AcceptedValues<CommandKeyUnion>;
};

export interface ValidationResult<
  CT extends CommandType = UndefinedCommandType
> {
  isValid: boolean;
  commandType: CT | undefined;
  commandInput: CommandInput<CT> | undefined;
  error: ERROR_TYPE | undefined;
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
   * @returns a validation result object.
   */
  private static validateExecuteRule(userInput: string) {
    if (!userInput.includes("execute")) {
      return {
        isValid: false,
        commandType: undefined,
        commandInput: undefined,
        error: { code: ERROR_NAME.EXECUTE_NOT_FOUND },
      } as ValidationResult;
    }

    return {
      isValid: true,
      commandType: undefined,
      commandInput: undefined,
      error: undefined,
    } as ValidationResult;
  }

  /**
   * Validation Rule: Every user command must be identified with one command type definition.
   * @param userInput the string input that the user typed in CLI.
   * @returns a validation result object.
   */
  private static validateCommandTypeRule(userInput: string) {
    const commandType = CommandDefiner.getCommandType(userInput);
    if (!commandType) {
      return {
        isValid: false,
        commandType: undefined,
        commandInput: undefined,
        error: { code: ERROR_NAME.COMMAND_NOT_FOUND },
      } as ValidationResult;
    }

    return {
      isValid: true,
      commandType: commandType,
      commandInput: undefined,
      error: undefined,
    } as ValidationResult<typeof commandType>;
  }

  /**
   * Validation Rule: The number of truthy keywords in the command type definition has to equal the number of command parts.
   * @param userInput the string input that the user typed in CLI.
   * @param commandType the command type definition identified with the user command.
   * @returns a validation result object.
   */
  private static validateCommandPartsRule(
    userInput: string,
    commandType: CommandType
  ) {
    const validCommandParts = userInput
      .split(" ")
      .filter((part) => part !== "" && part !== " ");

    if (validCommandParts.length === commandType.CommandKeys.length)
      return {
        isValid: true,
        commandType: commandType,
        commandInput: undefined,
        error: undefined,
      } as ValidationResult<typeof commandType>;
    else {
      const redundantCommandPart = CommandDefiner.getRedundantCommandPart(
        validCommandParts,
        commandType.CommandKeys
      );

      if (redundantCommandPart) {
        return {
          isValid: false,
          commandType: commandType,
          commandInput: undefined,
          error: {
            code: ERROR_NAME.KEYWORD_REDUNDANT,
            keywordName: redundantCommandPart,
            commandName: commandType.CommandName,
            commandKeywords: commandType.CommandKeys.map(
              (key) => CommandKeys[key]
            ),
          },
        } as ValidationResult<typeof commandType>;
      } else {
        return {
          isValid: false,
          commandType: commandType,
          commandInput: undefined,
          error: {
            code: ERROR_NAME.KEYWORD_MISSING,
            commandName: commandType.CommandName,
            commandKeywords: commandType.CommandKeys.map(
              (key) => CommandKeys[key]
            ),
          },
        } as ValidationResult<typeof commandType>;
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
    const validCommandParts = userInput
      .split(" ")
      .filter((part) => part !== "" && part !== " " && part !== "execute");

    let commandInput = {} as CommandInput<typeof commandType>;
    const commandKeyList = commandType.CommandKeys.map(
      (key) => CommandKeys[key]
    );

    for (const keyValuePair of validCommandParts) {
      const [commandKey, commandValue] = keyValuePair.split(":");
      const key = CommandDefiner.getKeyFromString(
        keyValuePair,
        commandType.CommandKeys
      );
      //Check if the keyword command is an accepted keyword by the command type
      if (!commandKeyList.includes(commandKey)) {
        if (key !== undefined && commandKey[key]) {
          return {
            isValid: false,
            commandType: commandType,
            commandInput: undefined,
            error: {
              code: ERROR_NAME.KEYWORD_WRITTEN_INCORRECTLY,
              keyValuePair: keyValuePair,
              keywordName: CommandKeys[key],
              acceptedValues: CommandDefiner.getAcceptedValues(
                CommandKeys[key]
              ),
            },
          } as ValidationResult<typeof commandType>;
        } else {
          return {
            isValid: false,
            commandType: commandType,
            commandInput: undefined,
            error: {
              code: ERROR_NAME.KEYWORD_MISSING,
              commandName: commandType.CommandName,
              commandKeywords: commandKeyList,
            },
          } as ValidationResult<typeof commandType>;
        }
      }

      //Check if the value of the keyword is an accepted value for that keyword type
      const acceptedValues = CommandDefiner.getAcceptedValues(commandKey);
      if (!(acceptedValues && acceptedValues.includes(commandValue))) {
        if (commandValue) {
          return {
            isValid: false,
            commandType: commandType,
            commandInput: undefined,
            error: {
              code: ERROR_NAME.VALUE_NOT_ACCEPTED,
              keywordName: commandKey,
              valueName: commandValue,
              acceptedValues: acceptedValues,
            },
          } as ValidationResult<typeof commandType>;
        } else {
          return {
            isValid: false,
            commandType: commandType,
            commandInput: undefined,
            error: {
              code: ERROR_NAME.VALUE_MISSING,
              keywordName: commandKey,
              acceptedValues: acceptedValues,
            },
          } as ValidationResult<typeof commandType>;
        }
      }

      // Set the command input keys and values
      if (key !== undefined && acceptedValues.includes(commandValue)) {
        const keyword = CommandKeys[key] as CommandKeyUnion;
        commandInput[key] = commandValue as AcceptedValues<typeof keyword>;
      }
    }

    return {
      isValid: true,
      commandType: commandType,
      commandInput: commandInput,
      error: undefined,
    } as ValidationResult<typeof commandType>;
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
    let ruleResult: ValidationResult | ValidationResult<CommandType>;

    //Check first rule
    ruleResult = CommandValidator.validateExecuteRule(prepUserInput);

    if (ruleResult.isValid) {
      //Check second rule
      ruleResult = CommandValidator.validateCommandTypeRule(prepUserInput);
      if (ruleResult.isValid && ruleResult.commandType) {
        //Check third rule
        commandType = ruleResult.commandType;
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
              commandInput: ruleResult.commandInput,
              error: undefined,
            } as ValidationResult<typeof commandType>;
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
      // Add string representation of the error name
      if (error) error.name = ERROR_NAME[error.code];
    }

    return {
      isValid: false,
      commandType: ruleResult.commandType,
      commandInput: undefined,
      error: error,
    } as ValidationResult<CommandType>;
  }
}
