"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const node_readline_1 = __importDefault(require("node:readline"));
const GeneralManager_1 = require("../general/GeneralManager");
const CommandValidator_1 = require("./commands/CommandValidator");
class UserManager {
    constructor() { }
    // Function to handle user input
    static handleUserInput(input) {
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
                const validationResult = CommandValidator_1.CommandValidator.validateUserCommand(userInput);
                // Print the validation result into the CLI
                console.log("\n", "Result: ", validationResult, "\n");
                // Run the command if valid
                const { isValid, commandType, commandInput } = validationResult;
                if (isValid && commandType && commandInput) {
                    GeneralManager_1.GeneralManager.run({
                        commandType: commandType,
                        commandInput: commandInput,
                    });
                }
                break;
            }
        }
        // Prompt for the next command
        UserManager.promptForCommand();
    }
    // Function to prompt for user command
    static promptForCommand() {
        UserManager.reader.question("Enter a command: ", (input) => {
            UserManager.handleUserInput(input);
        });
    }
    static getInstance() {
        if (!UserManager.instance) {
            UserManager.instance = new UserManager();
        }
        return UserManager.instance;
    }
}
exports.UserManager = UserManager;
UserManager.reader = node_readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//# sourceMappingURL=UserManager.js.map