import { CommandType, UserCommandType } from "./CommandType";

// type CreateTypeValuesAccepted = "video";
// type PlatformTypeValuesAccepted = "youtube";
// type ChannelTypeValuesAccepted = "therelaxedromantic";
// type ForTypeValuesAccepted =
//   `${PlatformTypeValuesAccepted}-${ChannelTypeValuesAccepted}`;

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
   * @returns true if the user command is valid, false otherwise.
   */
  public static validateExecuteRule(userInput: string) {
    const validResult = userInput.includes("execute");
    if (!validResult) console.error("Some error");
    return validResult;
  }

  /**
   * Validation Rule: Every user command must be identified with one command type definition.
   * @param userInput the string input that the user typed in CLI.
   * @returns the command type if the user command is valid, undefined otherwise.
   */
  public static validateCommandTypeRule(userInput: string) {
    const commandType = CommandType.getCommandType(userInput);
    if (!commandType) console.error("Some error");
    return commandType;
  }

  /**
   * Validation Rule: The number of truthy keywords in the command type definition has to equal the number of command parts.
   * @param userInput the string input that the user typed in CLI.
   * @param commandType the command type definition identified with the user command.
   * @returns true if the user command is valid, false otherwise.
   */
  public static validateCommandPartsRule(
    userInput: string,
    commandType: UserCommandType
  ) {
    const commandParts = userInput.split(" ");
    const validCommandPartsLen = commandParts.filter(
      (part) => part !== "" && part !== " "
    ).length;

    const numberOfTruthyKeywords =
      CommandType.getNumberOfTruthyKeywords(commandType);

    if (validCommandPartsLen === numberOfTruthyKeywords) return true;
    else {
      console.error("Some error");
      return false;
    }
  }

  /**
   * Validation Rule: In every user command, the value of any command keyword must be an accepted value for that keyword type.
   * @param userInput the string input that the user typed in CLI.
   * @param commandType the command type definition identified with the user command.
   * @returns true if the user command is valid, false otherwise.
   */
  public static validateCommandKeywordsRule(
    userInput: string,
    commandType: UserCommandType
  ) {
    const commandParts = userInput.split(" ");
    const validCommandParts = commandParts.filter(
      (part) => part !== "" && part !== " "
    );
    //TODO:
    return true;
  }

  /**
   * Validates a user input in CLI using Validation Rules for User Commands.
   * @param userInput the string input that the user typed in CLI.
   * @returns true if the user command is valid, false otherwise.
   */
  public static validateUserCommand(userInput: string) {
    const prepUserInput = userInput.trim().toLowerCase();

    // Asume all rules are invalid
    let isRule1Valid = false,
      isRule2Valid = false,
      isRule3Valid = false,
      isRule4Valid = false;

    //Check first rule
    isRule1Valid = ValidationRule.validateExecuteRule(prepUserInput);

    //Check second rule
    const commandType = ValidationRule.validateCommandTypeRule(prepUserInput);
    if (commandType) {
      isRule2Valid = true;

      // Check third rule
      isRule3Valid = ValidationRule.validateCommandPartsRule(
        prepUserInput,
        commandType
      );

      //Check fourth rule
      isRule4Valid = ValidationRule.validateCommandKeywordsRule(
        prepUserInput,
        commandType
      );
    }

    // return the overall validation of the user input command
    return isRule1Valid && isRule2Valid && isRule3Valid && isRule4Valid;
  }
}
