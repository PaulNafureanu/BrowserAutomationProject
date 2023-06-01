"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationRule = void 0;
const CommandMessages_1 = require("./CommandMessages");
const CommandType_1 = require("./CommandType");
/**
 * Validation Rules for User Commands:
 * 1. Every user command must start with the keyword "execute".
 * 2. Every user command must be identified with one command type definition.
 * 3. The number of truthy keywords in the command type definition has to equal the number of command parts.
 * 4. In every user command, the value of any command keyword must be an accepted value for that keyword type.
 */
class ValidationRule {
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
        return { isValid: true };
    }
    /**
     * Validation Rule: Every user command must be identified with one command type definition.
     * @param userInput the string input that the user typed in CLI.
     * @returns the command type if the user command is valid, an error otherwise.
     */
    static validateCommandTypeRule(userInput) {
        const commandType = CommandType_1.CommandType.getCommandType(userInput);
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
        const numberOfTruthyKeywords = CommandType_1.CommandType.getNumberOfTruthyKeywords(commandType);
        if (validCommandPartsLen === numberOfTruthyKeywords)
            return { isValid: true };
        else {
            // const commandKeywords = Object.keys(commandType.CommandDefinition);
            const specificCommandKeywords = CommandType_1.CommandType.getSpecificUserCommandKeywordList(commandType);
            const redundantKey = CommandType_1.CommandType.getRedundantKeyword(commandParts, specificCommandKeywords);
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
        let userCommandKeywordList = CommandType_1.CommandType.getSpecificUserCommandKeywordList(commandType);
        for (const keyValue of validCommandParts) {
            const [keywordCommand, keywordValue] = keyValue.split(":");
            //Check if the keyword command is an accepted keyword by the command type
            if (!userCommandKeywordList.includes(keywordCommand)) {
                const keyword = CommandType_1.CommandType.getKeywordFromString(keyValue, userCommandKeywordList);
                if (keyword) {
                    return {
                        isValid: false,
                        error: {
                            name: "KEYWORD_WRITTEN_INCORRECTLY",
                            keyValuePair: keyValue,
                            keywordName: keyword,
                            acceptedValues: CommandType_1.CommandType.getAcceptedValuesForCommandKeywords(keyword),
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
            const acceptedValues = CommandType_1.CommandType.getAcceptedValuesForCommandKeywords(keywordCommand);
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
        }
        return { isValid: true };
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
        //Check first rule
        let ruleResult = ValidationRule.validateExecuteRule(prepUserInput);
        if (ruleResult.isValid) {
            //Check second rule
            ruleResult = ValidationRule.validateCommandTypeRule(prepUserInput);
            if (ruleResult.isValid) {
                if (ruleResult.data) {
                    //Check third rule
                    commandType = ruleResult.data;
                    ruleResult = ValidationRule.validateCommandPartsRule(prepUserInput, commandType);
                    if (ruleResult.isValid) {
                        // Check third rule
                        ruleResult = ValidationRule.validateAcceptedValuesRule(prepUserInput, commandType);
                        if (ruleResult.isValid) {
                            return {
                                isValid: true,
                                commandType: commandType,
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
            CommandMessages_1.UserCommandMessages.WriteErrorConsole(CommandMessages_1.UserCommandMessages.getErrorMessages(error));
        }
        return { isValid: false, commandType: commandType };
    }
}
exports.ValidationRule = ValidationRule;
//# sourceMappingURL=ValidationRule.js.map