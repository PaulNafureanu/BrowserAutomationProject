"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandDefiner = exports.CommandKeys = void 0;
const arrayUtility_1 = require("../../../utilities/arrayUtility");
/*
 * A user command is a string with specific keywords.
 * Therefore, a user command can be defined, identified, and classified in terms of those keywords.
 * This enum defines what keywords are allowed in a user command, keywords which then define the specific command type.
 * Add more keywords to define more command types with their features.
 *
 * Example of a command: execute create:video for:youtube-ytchannel
 * Keywords to identify the type of the command: execute, create, for.
 */
var CommandKeys;
(function (CommandKeys) {
    CommandKeys[CommandKeys["execute"] = 0] = "execute";
    CommandKeys[CommandKeys["create"] = 1] = "create";
    CommandKeys[CommandKeys["for"] = 2] = "for";
})(CommandKeys || (exports.CommandKeys = CommandKeys = {}));
/**
 *  A utility class to define and group types of user commands,
 *  methods to determine the type of a given user command,
 *  and methods to determine if the user input represents a specific user command.
 */
class CommandDefiner {
    constructor() { }
    /**
     * Scans the input string for valid keywords and constructs a command key list based on those keywords.
     * @param userInput the string input that the user typed in CLI.
     * @returns the command key list constructed.
     */
    static getCommandKeyList(userInput) {
        const userCommandKeyList = [];
        for (const keyword of CommandDefiner.CommandKeywordList) {
            if (userInput.includes(keyword)) {
                userCommandKeyList.push(CommandKeys[keyword]);
            }
        }
        return userCommandKeyList;
    }
    /**
     * Checks if the command key list constructed from the user input corresponds to an available command type.
     * @param userInput the string input that the user typed in CLI.
     * @returns a command type from the array of Types if their command key list correspond.
     */
    static getCommandType(userInput) {
        const userCommandKeyList = CommandDefiner.getCommandKeyList(userInput);
        for (const commandType of CommandDefiner.Types) {
            if (arrayUtility_1.ArrayUtility.haveSameValues(userCommandKeyList, commandType.CommandKeys)) {
                return commandType;
            }
        }
    }
    /**
     * A type predicate that checks if a string is a command key.
     * @param commandKeyword the input string that will be check.
     * @returns true if the string is a command key (is of type CommandKeyUnion), false otherwise.
     */
    static isCommandKey(commandKeyword) {
        return CommandDefiner.CommandKeywordList.includes(commandKeyword);
    }
    /**
     * Determines the accepted values for a specific command keyword or input string.
     * @param commandKeyword a string representing the command keyword.
     * @returns an array containing the accepted values for the keyword, or empty string if the keyword is not a command keyword.
     */
    static getAcceptedValues(commandKeyword) {
        if (CommandDefiner.isCommandKey(commandKeyword))
            return CommandDefiner.AcceptedValues[commandKeyword];
        return [];
    }
    /**
     * Check to verify if an input string contains a redundant part or keyword.
     * @param commandPartList an array constructed from valid parts of the user input string.
     * @param commandKeyList the command key list of the command to be check against.
     * @returns a redundant part or keyword found in the input string.
     */
    static getRedundantCommandPart(commandPartList, commandKeyList) {
        for (let part of commandPartList) {
            let foundKeyForPart = false; // Let's assume that the part has no key
            for (let key of commandKeyList) {
                if (part.includes(CommandKeys[key])) {
                    foundKeyForPart = true; // The part has a key, therefore we found the key for this part
                    break;
                }
            }
            if (!foundKeyForPart) {
                return part; // We didn't find any key for this part, therefore this is the redundant part of the command
            }
        }
    }
    /**
     * Check to verify if an input string contains a keyword from the command key list.
     * @param userInput the string input that the user typed in CLI.
     * @param commandKeyList the command key list of the command to be check against.
     * @returns a keyword contained in the user input string, undefined otherwise.
     */
    static getKeyFromString(userInput, commandKeyList) {
        for (const key of commandKeyList) {
            if (userInput.includes(CommandKeys[key])) {
                return key;
            }
        }
    }
}
exports.CommandDefiner = CommandDefiner;
/**
 * An array containing all the command keywords from the enum in a string format.
 */
CommandDefiner.CommandKeywordList = Object.keys(CommandKeys).filter((key) => isNaN(Number(key)));
/**
 * An array defining all available user command types.
 */
CommandDefiner.Types = [
    {
        CommandName: "UndefinedCommand",
        CommandKeys: [],
    },
    {
        CommandName: "SimpleUserCommand",
        CommandKeys: [CommandKeys.execute, CommandKeys.create, CommandKeys.for],
    },
];
// Set here the accepted values for command keywords:
CommandDefiner.AcceptedValues = {
    execute: [],
    create: ["video"],
    for: ["youtube-channel1", "youtube-channel2"],
};
//# sourceMappingURL=CommandDefiner.js.map