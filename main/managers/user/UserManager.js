"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const node_readline_1 = __importDefault(require("node:readline"));
const ManagerObject_1 = require("../abstractions/ManagerObject");
class UserManager extends ManagerObject_1.ManagerObject {
    static instance;
    static reader = node_readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    constructor() {
        super();
    }
    // Function to handle user input
    static handleUserInput(input) {
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
//# sourceMappingURL=UserManager.js.map