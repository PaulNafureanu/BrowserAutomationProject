import readline from "node:readline";
import { ManagerObject } from "../abstractions/ManagerObject";

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
    switch (input) {
      case "execute": {
        console.log("execute something");
        break;
      }
      case "open": {
        console.log("open something");
        break;
      }
      case "exit": {
        console.log("Exiting...");
        UserManager.reader.close();
        return;
      }
      default: {
        console.log("Invalid command!");
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
