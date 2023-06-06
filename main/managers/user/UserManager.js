"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const node_readline_1 = __importDefault(require("node:readline"));
const ManagerObject_1 = require("../abstractions/ManagerObject");
const CommandValidator_1 = require("./commands/CommandValidator");
const GeneralManager_1 = require("../general/GeneralManager");
// type UserInput = { //TODO:
//   [K in keyof typeof CommandDefiner.Types]: {
//     CommandName: (typeof CommandDefiner.Types)[number]["CommandName"];
//     CommandInput: (typeof CommandDefiner.Types)[number]["CommandDefinition"];
//   };
// }[keyof typeof CommandDefiner.Types];
class UserManager extends ManagerObject_1.ManagerObject {
    constructor() {
        super();
    }
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
                const { isValid, commandType, commandInput } = CommandValidator_1.CommandValidator.validateUserCommand(userInput);
                console.log("\n", "Result: ", { isValid, commandType, commandInput }, "\n");
                if (isValid && commandInput)
                    GeneralManager_1.GeneralManager.run(commandInput);
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