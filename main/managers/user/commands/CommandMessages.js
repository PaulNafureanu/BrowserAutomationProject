"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCommandMessages = void 0;
/**
 * Validation Rules for User Commands:
 * 1(ExecuteRule). Every user command must start with the keyword "execute".
 * 2(CommandTypeRule). Every user command must be identified with one command type definition.
 * 3(CommandPartsRule). The number of truthy keywords in the command type definition has to equal the number of command parts.
 * 4(AcceptedValuesRule). In every user command, the value of any command keyword must be an accepted value for that keyword type.
 */
class UserCommandMessages {
    static ConsoleColors = {
        fonts: {
            FgBlack: "\x1b[30m",
            FgRed: "\x1b[31m",
            FgGreen: "\x1b[32m",
            FgYellow: "\x1b[33m",
            FgBlue: "\x1b[34m",
            FgMagenta: "\x1b[35m",
            FgCyan: "\x1b[36m",
            FgWhite: "\x1b[37m",
            FgGray: "\x1b[90m",
        },
        backgrounds: {
            BgBlack: "\x1b[40m",
            BgRed: "\x1b[41m",
            BgGreen: "\x1b[42m",
            BgYellow: "\x1b[43m",
            BgBlue: "\x1b[44m",
            BgMagenta: "\x1b[45m",
            BgCyan: "\x1b[46m",
            BgWhite: "\x1b[47m",
            BgGray: "\x1b[100m",
        },
    };
    static WriteErrorConsole(input) {
        const { FgRed, FgWhite } = UserCommandMessages.ConsoleColors.fonts;
        console.log(FgRed, input, FgWhite);
    }
    constructor() { }
    static getErrorMessages(err) {
        switch (err.name) {
            case "EXECUTE_NOT_FOUND":
                return `
The command does not start with the keyword 'execute'.
Exemple of a valid user command: execute create:video for:youtube-channelname.
Write 'help commands' to list all the available user commands.
`;
            case "COMMAND_NOT_FOUND":
                return `
The command is not recognized in the system.
Exemple of a valid user command: execute create:video for:youtube-channelname.
Write 'help commands' to list all the available user commands.
`;
            case "KEYWORD_MISSING":
                return `
Keyword missing in key-value pair '${err.keyValuePair}'. Please ensure that all the specific command keywords are written.
The keywords for the command '${err.commandName}' are: [${err.commandKeywords}].
Exemple of a valid user command: execute create:video for:youtube-channelname.
Write 'help commands' to list all the available user commands.
`;
            case "KEYWORD_WRITTEN_INCORRECTLY":
                return `
Key-value pair '${err.keyValuePair}' written incorrectly.
Please ensure that all the specific command keywords are written correctly in the form of 'key:value' pairs.
For the above keyword '${err.keywordName}', follow the syntax and choose one accepted value for the keyword: [${err.acceptedValues}]
Exemple of a valid user command: execute create:video for:youtube-channelname.
Write 'help commands' to list all the available user commands.
`;
            case "KEYWORD_REDUNDANT":
                return `
Keyword '${err.keywordName}' is redundant.
Please ensure that only the specific command keywords are written.
The keywords for the command '${err.commandName}' are: [${err.commandKeywords}].
Exemple of a valid user command: execute create:video for:youtube-channelname.
Write 'help commands' to list all the available user commands.
`;
            case "VALUE_MISSING":
                return `
Value for the keyword '${err.keywordName}' is missing. Expected 'key:value' pair.
The accepted values for the keyword '${err.keywordName}' are: [${err.acceptedValues}].
Exemple of a valid user command: execute create:video for:youtube-channelname.
Write 'help commands' to list all the available user commands.
`;
            case "VALUE_NOT_ACCEPTED":
                return `
Value '${err.valueName}' for the keyword '${err.keywordName}' is not accepted.
The accepted values for the keyword '${err.keywordName}' are: [${err.acceptedValues}]
Exemple of a valid user command: execute create:video for:youtube-channelname.
Write 'help commands' to list all the available user commands.
`;
            default:
                return "";
        }
    }
}
exports.UserCommandMessages = UserCommandMessages;
//# sourceMappingURL=CommandMessages.js.map