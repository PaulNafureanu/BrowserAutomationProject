import readline from "node:readline";
import { ManagerObject } from "../abstractions/ManagerObject";
import { CommandValidator } from "./commands/CommandValidator";
import { GeneralManager } from "../general/GeneralManager";
import { CommandDefiner } from "./commands/CommandDefiner";

// type UserInput = { //TODO:
//   [K in keyof typeof CommandDefiner.Types]: {
//     CommandName: (typeof CommandDefiner.Types)[number]["CommandName"];
//     CommandInput: (typeof CommandDefiner.Types)[number]["CommandDefinition"];
//   };
// }[keyof typeof CommandDefiner.Types];

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
        const { isValid, commandType, commandInput } =
          CommandValidator.validateUserCommand(userInput);
        console.log(
          "\n",
          "Result: ",
          { isValid, commandType, commandInput },
          "\n"
        );
        if (isValid && commandInput) GeneralManager.run(commandInput);
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
