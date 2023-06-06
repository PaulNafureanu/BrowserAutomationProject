"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandDefiner = void 0;
/**
 *  A utility class to define and group types of UserCommands,
 *  methods to determine the type of a given UserCommand,
 *  and methods to determine if the user input represents a specific UserCommand.
 *  A command type is basically a command name associated with a user command definition.
 */
class CommandDefiner {
    constructor() { }
    /**
     * Scans the input string for valid keywords and constructs a command definition based on those keywords
     * that are found in the input string.
     * @param userInput the string input that the user typed in CLI.
     * @returns the command definition constructed useful for determining the command type.
     */
    static getCommandDefinition(userInput) {
        const userCommandDefiniton = {
            ...CommandDefiner.UndefinedCommandDefinition,
        };
        for (const keyword of CommandDefiner.UserCommandKeywordList) {
            if (userInput.includes(keyword)) {
                userCommandDefiniton[keyword] = true;
            }
        }
        return userCommandDefiniton;
    }
    /**
     * Checks if the command definition constructed from the user input corresponds to an available command type.
     * @param userInput the string input that the user typed in CLI.
     * @returns a command type from the array of Command Types if their command definitions correspond.
     */
    static getCommandType(userInput) {
        const userCommandDefiniton = CommandDefiner.getCommandDefinition(userInput);
        for (const commandType of CommandDefiner.Types) {
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
    /**
     * Calculates the number of keywords of a command definition set to true.
     * @param commandType A command type from the Command Types array.
     * @returns the number of truthy keywords.
     */
    static getNumberOfTruthyKeywords(commandType) {
        let number = 0;
        let keyword;
        for (keyword in commandType.CommandDefinition) {
            if (commandType.CommandDefinition[keyword])
                number++;
        }
        return number;
    }
    /**
     * Determines the accepted values for a specific command keyword.
     * @param commandKeyword a string representing the command keyword.
     * @returns an array containing the accepted values for the keyword
     */
    static getAcceptedValuesForKeyword(commandKeyword) {
        if (Object.hasOwnProperty.call(CommandDefiner.AcceptedValuesForCommandKeywords, commandKeyword)) {
            const key = commandKeyword;
            return CommandDefiner.AcceptedValuesForCommandKeywords[key];
        }
        else
            return [];
    }
    /**
     * Constructs a truthy keyword list from a command type object.
     * @param commandType A command type from the Command Types array.
     * @returns an array of keywords set to true in the command definition of a command type.
     */
    static getTruthyKeywordList(commandType) {
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
    /**
     * Check to verify if an input string contains a redundant part or keyword.
     * @param commandPartList an array constructed from valid parts of the user input string.
     * @param truthyKeywordList an array constructed from the truthy keywords of a command definition.
     * @returns a redundant part or keyword found in the input string.
     */
    static getRedundantKeyword(commandPartList, truthyKeywordList = CommandDefiner.UserCommandKeywordList) {
        for (let part of commandPartList) {
            let foundKeyForPart = false; // Let's assume that the part has no key
            for (let key of truthyKeywordList) {
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
    /**
     * Check to verify if an input string contains a keyword from the command definition.
     * @param userInput the string input that the user typed in CLI.
     * @param truthyKeywordList an array constructed from the truthy keywords of a command definition.
     * @returns a keyword contained in the user input string, undefined otherwise.
     */
    static getKeywordFromString(userInput, truthyKeywordList = CommandDefiner.UserCommandKeywordList) {
        for (const key of truthyKeywordList) {
            if (userInput.includes(key)) {
                return key;
            }
        }
    }
}
exports.CommandDefiner = CommandDefiner;
/**
 * The default command definition.
 */
CommandDefiner.UndefinedCommandDefinition = {
    execute: false,
    create: false,
    for: false,
};
/**
 * An array defining all available user commands.
 */
CommandDefiner.Types = [
    {
        CommandName: "SimpleUserCommand",
        CommandDefinition: { execute: true, create: true, for: true },
    },
];
/**
 * An array containing all the keywords from all the user commands available.
 */
CommandDefiner.UserCommandKeywordList = Object.keys(CommandDefiner.UndefinedCommandDefinition);
// Set here more accepted values for command keywords:
CommandDefiner.AcceptedValuesForCommandKeywords = {
    execute: [],
    create: ["video"],
    for: ["youtube-channel1", "youtube-channel2"],
};
//# sourceMappingURL=CommandDefiner.js.map