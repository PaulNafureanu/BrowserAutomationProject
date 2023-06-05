"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandValidator = void 0;
const CommandMessager_1 = require("./CommandMessager");
const CommandDefiner_1 = require("./CommandDefiner");
/**
 * Validation Rules for User Commands:
 * 1. Every user command must start with the keyword "execute".
 * 2. Every user command must be identified with one command type definition.
 * 3. The number of truthy keywords in the command type definition has to equal the number of command parts.
 * 4. In every user command, the value of any command keyword must be an accepted value for that keyword type.
 */
class CommandValidator {
    constructor() { }
    /**
     * Validation Rule: Every user command must start with the keyword "execute".
     * @param userInput the string input that the user typed in CLI.
     * @returns true if the user command is valid, an error otherwise.
     */
    static validateExecuteRule(userInput) {
        if (!userInput.includes("execute")) {
            return {
                isValid: false,
                error: { name: "EXECUTE_NOT_FOUND" },
            };
        }
        return { isValid: true, data: undefined };
    }
    /**
     * Validation Rule: Every user command must be identified with one command type definition.
     * @param userInput the string input that the user typed in CLI.
     * @returns the command type if the user command is valid, an error otherwise.
     */
    static validateCommandTypeRule(userInput) {
        const commandType = CommandDefiner_1.CommandDefiner.getCommandType(userInput);
        if (!commandType) {
            return {
                isValid: false,
                error: { name: "COMMAND_NOT_FOUND" },
            };
        }
        return { isValid: true, data: commandType };
    }
    /**
     * Validation Rule: The number of truthy keywords in the command type definition has to equal the number of command parts.
     * @param userInput the string input that the user typed in CLI.
     * @param commandType the command type definition identified with the user command.
     * @returns true if the user command is valid, an error otherwise.
     */
    static validateCommandPartsRule(userInput, commandType) {
        const commandParts = userInput.split(" ");
        const validCommandPartsLen = commandParts.filter((part) => part !== "" && part !== " ").length;
        const numberOfTruthyKeywords = CommandDefiner_1.CommandDefiner.getNumberOfTruthyKeywords(commandType);
        if (validCommandPartsLen === numberOfTruthyKeywords)
            return { isValid: true, data: undefined };
        else {
            // const commandKeywords = Object.keys(commandType.CommandDefinition);
            const specificCommandKeywords = CommandDefiner_1.CommandDefiner.getTruthyKeywordList(commandType);
            const redundantKey = CommandDefiner_1.CommandDefiner.getRedundantKeyword(commandParts, specificCommandKeywords);
            if (redundantKey) {
                return {
                    isValid: false,
                    error: {
                        name: "KEYWORD_REDUNDANT",
                        keywordName: redundantKey,
                        commandName: commandType.CommandName,
                        commandKeywords: specificCommandKeywords,
                    },
                };
            }
            else {
                return {
                    isValid: false,
                    error: {
                        name: "KEYWORD_MISSING",
                        keyValuePair: "",
                        commandName: commandType.CommandName,
                        commandKeywords: specificCommandKeywords,
                    },
                };
            }
        }
    }
    /**
     * Validation Rule: In every user command, the value of any command keyword must be an accepted value for that keyword type.
     * @param userInput the string input that the user typed in CLI.
     * @param commandType the command type definition identified with the user command.
     * @returns true if the user command is valid, an error otherwise.
     */
    static validateAcceptedValuesRule(userInput, commandType) {
        // Define the command parts (key-value pairs)
        const commandParts = userInput.split(" ");
        const validCommandParts = commandParts.filter((part) => part !== "" && part !== " " && part !== "execute");
        // Define the list of truthy keywords used for this user command from the command type definition
        let userCommandKeywordList = CommandDefiner_1.CommandDefiner.getTruthyKeywordList(commandType);
        let commandInput = {};
        for (const keyValue of validCommandParts) {
            const [keywordCommand, keywordValue] = keyValue.split(":");
            //Check if the keyword command is an accepted keyword by the command type
            if (!userCommandKeywordList.includes(keywordCommand)) {
                const keyword = CommandDefiner_1.CommandDefiner.getKeywordFromString(keyValue, userCommandKeywordList);
                if (keyword) {
                    return {
                        isValid: false,
                        error: {
                            name: "KEYWORD_WRITTEN_INCORRECTLY",
                            keyValuePair: keyValue,
                            keywordName: keyword,
                            acceptedValues: CommandDefiner_1.CommandDefiner.getAcceptedValuesForKeyword(keyword),
                        },
                    };
                }
                else {
                    return {
                        isValid: false,
                        error: {
                            name: "KEYWORD_MISSING",
                            commandName: commandType.CommandName,
                            commandKeywords: userCommandKeywordList,
                            keyValuePair: keyValue,
                        },
                    };
                }
            }
            //Check if the value of the keyword is an accepted value for that keyword type
            const acceptedValues = CommandDefiner_1.CommandDefiner.getAcceptedValuesForKeyword(keywordCommand);
            if (!(acceptedValues && acceptedValues.includes(keywordValue))) {
                if (keywordValue) {
                    return {
                        isValid: false,
                        error: {
                            name: "VALUE_NOT_ACCEPTED",
                            keywordName: keywordCommand,
                            valueName: keywordValue,
                            acceptedValues: acceptedValues,
                        },
                    };
                }
                else {
                    return {
                        isValid: false,
                        error: {
                            name: "VALUE_MISSING",
                            keywordName: keywordCommand,
                            acceptedValues: acceptedValues,
                        },
                    };
                }
            }
            commandInput[keywordCommand] = keywordValue;
        }
        return {
            isValid: true,
            data: commandInput,
        };
    }
    /**
     * Validates a user input in CLI using Validation Rules for User Commands.
     * @param userInput the string input that the user typed in CLI.
     * @returns a validation result containing the prop 'isValue' set to true if the user command is valid, false otherwise.
     */
    static validateUserCommand(userInput) {
        const prepUserInput = userInput.trim().toLowerCase();
        let error = undefined;
        let commandType = undefined;
        let ruleResult;
        //Check first rule
        ruleResult = CommandValidator.validateExecuteRule(prepUserInput);
        if (ruleResult.isValid) {
            //Check second rule
            ruleResult = CommandValidator.validateCommandTypeRule(prepUserInput);
            if (ruleResult.isValid) {
                //Check third rule
                commandType = ruleResult.data;
                ruleResult = CommandValidator.validateCommandPartsRule(prepUserInput, commandType);
                if (ruleResult.isValid) {
                    // Check third rule
                    ruleResult = CommandValidator.validateAcceptedValuesRule(prepUserInput, commandType);
                    if (ruleResult.isValid) {
                        return {
                            isValid: true,
                            commandType: commandType,
                            commandInput: ruleResult.data,
                        };
                    }
                    else {
                        error = ruleResult.error;
                    }
                }
                else {
                    error = ruleResult.error;
                }
            }
            else {
                error = ruleResult.error;
            }
        }
        else {
            error = ruleResult.error;
        }
        // Write the error if there is one.
        if (error) {
            CommandMessager_1.CommandMessager.ConsoleErrorWriter(CommandMessager_1.CommandMessager.getErrorMessages(error));
        }
        return {
            isValid: false,
            commandType: commandType,
            commandInput: undefined,
        };
    }
}
exports.CommandValidator = CommandValidator;
//# sourceMappingURL=CommandValidator.js.map