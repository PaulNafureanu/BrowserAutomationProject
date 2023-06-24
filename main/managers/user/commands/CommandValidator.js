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
     * @returns a validation result object.
     */
    static validateExecuteRule(userInput) {
        if (!userInput.includes("execute")) {
            return {
                isValid: false,
                commandType: undefined,
                commandInput: undefined,
                error: { code: CommandMessager_1.ERROR_NAME.EXECUTE_NOT_FOUND },
            };
        }
        return {
            isValid: true,
            commandType: undefined,
            commandInput: undefined,
            error: undefined,
        };
    }
    /**
     * Validation Rule: Every user command must be identified with one command type definition.
     * @param userInput the string input that the user typed in CLI.
     * @returns a validation result object.
     */
    static validateCommandTypeRule(userInput) {
        const commandType = CommandDefiner_1.CommandDefiner.getCommandType(userInput);
        if (!commandType) {
            return {
                isValid: false,
                commandType: undefined,
                commandInput: undefined,
                error: { code: CommandMessager_1.ERROR_NAME.COMMAND_NOT_FOUND },
            };
        }
        return {
            isValid: true,
            commandType: commandType,
            commandInput: undefined,
            error: undefined,
        };
    }
    /**
     * Validation Rule: The number of truthy keywords in the command type definition has to equal the number of command parts.
     * @param userInput the string input that the user typed in CLI.
     * @param commandType the command type definition identified with the user command.
     * @returns a validation result object.
     */
    static validateCommandPartsRule(userInput, commandType) {
        const validCommandParts = userInput
            .split(" ")
            .filter((part) => part !== "" && part !== " ");
        if (validCommandParts.length === commandType.CommandKeys.length)
            return {
                isValid: true,
                commandType: commandType,
                commandInput: undefined,
                error: undefined,
            };
        else {
            const redundantCommandPart = CommandDefiner_1.CommandDefiner.getRedundantCommandPart(validCommandParts, commandType.CommandKeys);
            if (redundantCommandPart) {
                return {
                    isValid: false,
                    commandType: commandType,
                    commandInput: undefined,
                    error: {
                        code: CommandMessager_1.ERROR_NAME.KEYWORD_REDUNDANT,
                        keywordName: redundantCommandPart,
                        commandName: commandType.CommandName,
                        commandKeywords: commandType.CommandKeys.map((key) => CommandDefiner_1.CommandKeys[key]),
                    },
                };
            }
            else {
                return {
                    isValid: false,
                    commandType: commandType,
                    commandInput: undefined,
                    error: {
                        code: CommandMessager_1.ERROR_NAME.KEYWORD_MISSING,
                        commandName: commandType.CommandName,
                        commandKeywords: commandType.CommandKeys.map((key) => CommandDefiner_1.CommandKeys[key]),
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
        const validCommandParts = userInput
            .split(" ")
            .filter((part) => part !== "" && part !== " " && part !== "execute");
        let commandInput = {};
        const commandKeyList = commandType.CommandKeys.map((key) => CommandDefiner_1.CommandKeys[key]);
        for (const keyValuePair of validCommandParts) {
            const [commandKey, commandValue] = keyValuePair.split(":");
            const key = CommandDefiner_1.CommandDefiner.getKeyFromString(keyValuePair, commandType.CommandKeys);
            //Check if the keyword command is an accepted keyword by the command type
            if (!commandKeyList.includes(commandKey)) {
                if (key !== undefined && commandKey[key]) {
                    return {
                        isValid: false,
                        commandType: commandType,
                        commandInput: undefined,
                        error: {
                            code: CommandMessager_1.ERROR_NAME.KEYWORD_WRITTEN_INCORRECTLY,
                            keyValuePair: keyValuePair,
                            keywordName: CommandDefiner_1.CommandKeys[key],
                            acceptedValues: CommandDefiner_1.CommandDefiner.getAcceptedValues(CommandDefiner_1.CommandKeys[key]),
                        },
                    };
                }
                else {
                    return {
                        isValid: false,
                        commandType: commandType,
                        commandInput: undefined,
                        error: {
                            code: CommandMessager_1.ERROR_NAME.KEYWORD_MISSING,
                            commandName: commandType.CommandName,
                            commandKeywords: commandKeyList,
                        },
                    };
                }
            }
            //Check if the value of the keyword is an accepted value for that keyword type
            const acceptedValues = CommandDefiner_1.CommandDefiner.getAcceptedValues(commandKey);
            if (!(acceptedValues && acceptedValues.includes(commandValue))) {
                if (commandValue) {
                    return {
                        isValid: false,
                        commandType: commandType,
                        commandInput: undefined,
                        error: {
                            code: CommandMessager_1.ERROR_NAME.VALUE_NOT_ACCEPTED,
                            keywordName: commandKey,
                            valueName: commandValue,
                            acceptedValues: acceptedValues,
                        },
                    };
                }
                else {
                    return {
                        isValid: false,
                        commandType: commandType,
                        commandInput: undefined,
                        error: {
                            code: CommandMessager_1.ERROR_NAME.VALUE_MISSING,
                            keywordName: commandKey,
                            acceptedValues: acceptedValues,
                        },
                    };
                }
            }
            // Set the command input keys and values
            if (key !== undefined && acceptedValues.includes(commandValue)) {
                const keyword = CommandDefiner_1.CommandKeys[key];
                commandInput[key] = commandValue;
            }
        }
        return {
            isValid: true,
            commandType: commandType,
            commandInput: commandInput,
            error: undefined,
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
            if (ruleResult.isValid && ruleResult.commandType) {
                //Check third rule
                commandType = ruleResult.commandType;
                ruleResult = CommandValidator.validateCommandPartsRule(prepUserInput, commandType);
                if (ruleResult.isValid) {
                    // Check third rule
                    ruleResult = CommandValidator.validateAcceptedValuesRule(prepUserInput, commandType);
                    if (ruleResult.isValid) {
                        return {
                            isValid: true,
                            commandType: commandType,
                            commandInput: ruleResult.commandInput,
                            error: undefined,
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
            // Add string representation of the error name
            if (error)
                error.name = CommandMessager_1.ERROR_NAME[error.code];
        }
        return {
            isValid: false,
            commandType: ruleResult.commandType,
            commandInput: undefined,
            error: error,
        };
    }
}
exports.CommandValidator = CommandValidator;
//# sourceMappingURL=CommandValidator.js.map