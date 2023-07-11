import readline from "node:readline";
import { GeneralManager } from "../general/GeneralManager";
import { CommandInput, CommandValidator } from "./commands/CommandValidator";
import { CommandType } from "./commands/CommandDefiner";

export type UserCommandInput<CT extends CommandType> = {
  commandType: CT;
  commandInput: CommandInput<CT>;
};

export class UserManager {
  private static instance: UserManager;
  private static reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  private constructor() {}

  // Function to handle user input
  public static handleUserInput(input: string) {
    // Process user input and execute corresponding functions
    const userInput = input.trim().toLocaleLowerCase();

    switch (userInput) {
      case "exit": {
        console.log("Exiting...");
        UserManager.reader.close();
        return;
      }
      case "": {
        break;
      }
      default: {
        // Validate the user command entered in CLI
        const validationResult =
          CommandValidator.validateUserCommand(userInput);

        // Print the validation result into the CLI
        console.log("\n", "Result: ", validationResult, "\n");

        // Run the command if valid
        const { isValid, commandType, commandInput } = validationResult;
        if (isValid && commandType && commandInput) {
          GeneralManager.run({
            commandType: commandType,
            commandInput: commandInput,
          } as UserCommandInput<typeof commandType>);
        }
        break;
      }
    }

    // Prompt for the next command
    UserManager.promptForCommand();
  }

  // Function to prompt for user command
  public static promptForCommand() {
    UserManager.reader.question("Enter a command: ", (input) => {
      UserManager.handleUserInput(input);
    });
  }

  public static getInstance() {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }
}
