import readline from "node:readline";
import { ManagerObject } from "../abstractions/ManagerObject";
import { ValidationRule } from "./commands/ValidationRule";

export class UserManager extends ManagerObject {
  private static instance: UserManager;
  private static reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  private constructor() {
    super();
  }

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
        const validationResult = ValidationRule.validateUserCommand(userInput);
        console.log("\n", "Result: ", validationResult, "\n");
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
