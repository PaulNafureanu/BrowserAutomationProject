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
    // Set here more accepted values for command keywords:
    static AcceptedValuesForCommandKeywords = {
        execute: [],
        create: ["video"],
        for: ["youtube-channel1", "youtube-channel2"],
    };
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
    static getAcceptedValuesForCommandKeywords(commandKeyword) {
        if (Object.hasOwnProperty.call(CommandType.AcceptedValuesForCommandKeywords, commandKeyword)) {
            const key = commandKeyword;
            return CommandType.AcceptedValuesForCommandKeywords[key];
        }
        else
            return [];
    }
    static getSpecificUserCommandKeywordList(commandType) {
        // Define a list of truthy keywords used for this user command from the command type definition
        let userCommandKeywordList = [];
        let keyCommandType;
        for (keyCommandType in commandType.CommandDefinition) {
            if (commandType.CommandDefinition[keyCommandType]) {
                userCommandKeywordList.push(keyCommandType);
            }
        }
        return userCommandKeywordList;
    }
    static getRedundantKeyword(commandPartsByUser, commandKeywordsByDef = CommandType.UserCommandKeywordList) {
        for (let part of commandPartsByUser) {
            let foundKeyForPart = false; // Let's assume that the part has no key
            for (let key of commandKeywordsByDef) {
                if (part.includes(key)) {
                    foundKeyForPart = true; // The part has a key, therefore we found the key for this part
                    break;
                }
            }
            if (!foundKeyForPart) {
                return part; // We didn't find any key for this part, therefore this is the redundant keyword
            }
        }
    }
    static getKeywordFromString(userInput, commandKeywordsByDef = CommandType.UserCommandKeywordList) {
        for (const key of commandKeywordsByDef) {
            if (userInput.includes(key)) {
                return key;
            }
        }
    }
}
exports.CommandType = CommandType;
//# sourceMappingURL=CommandType.js.map