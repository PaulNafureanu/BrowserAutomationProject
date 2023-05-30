"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandType = void 0;
/**
 *  A utility class to define and group types of UserCommands,
 *  methods to determine the type of a given UserCommand,
 *  and methods to determine if the user input represents a specific UserCommand.
 *  A command type is basically a command name associated with a user command definition.
 */
class CommandType {
    static UndefinedCommandDefinition = {
        execute: false,
        create: false,
        for: false,
    };
    static Types = [
        {
            CommandName: "SimpleUserCommand",
            CommandDefinition: { execute: true, create: true, for: true },
        },
    ];
    static UserCommandKeywordList = Object.keys(CommandType.UndefinedCommandDefinition);
    constructor() { }
    static getUserCommandDefinition(userInput) {
        const userCommandDefiniton = {
            ...CommandType.UndefinedCommandDefinition,
        };
        for (const keyword of CommandType.UserCommandKeywordList) {
            if (userInput.includes(keyword)) {
                userCommandDefiniton[keyword] = true;
            }
        }
        return userCommandDefiniton;
    }
    static getCommandType(userInput) {
        const userCommandDefiniton = CommandType.getUserCommandDefinition(userInput);
        for (const commandType of CommandType.Types) {
            let isMatch = true;
            let keyword;
            for (keyword in userCommandDefiniton) {
                if (userCommandDefiniton[keyword] !==
                    commandType.CommandDefinition[keyword]) {
                    isMatch = false;
                    break;
                }
            }
            if (isMatch) {
                return commandType;
            }
        }
        return undefined;
    }
    static getNumberOfTruthyKeywords(commandType) {
        let number = 0;
        let keyword;
        for (keyword in commandType.CommandDefinition) {
            if (commandType.CommandDefinition[keyword])
                number++;
        }
        return number;
    }
}
exports.CommandType = CommandType;
//# sourceMappingURL=CommandType.js.map