"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCommand = void 0;
class UserCommand {
    commandType;
    createType;
    forType;
    constructor(userInput) {
        this.commandType = "";
        this.createType = "video";
        this.forType = "youtube-therelaxedromantic";
    }
    validateUserInput(userInput) {
        const commandParts = userInput.split(" ");
        const condition1 = commandParts.length === 3;
        const errMsg1 = `The command is not written properly.
    A correct user command has the form:
    "execute create:<insert what to create> for:<insert for what to create>".
    For example: "execute create:video for:Youtube-TheRelaxedRomantic"`;
        const condition2 = commandParts[0] === "execute";
        const errMsg2 = `A command has to start with the keyword "execute".
    For example: "execute create:video for:Youtube-TheRelaxedRomantic"`;
        const keyValuePairs = commandParts.map((part) => part.split(":"));
        const condition3 = keyValuePairs[0][0] === "create" &&
            keyValuePairs[0][1] === keyValuePairs[0][1];
        const errMsg3 = "";
        const condition4 = keyValuePairs[1][0] === "for" &&
            keyValuePairs[1][1] === keyValuePairs[1][1];
        const errMsg4 = "";
        new UserCommandValidationRule(condition1, errMsg1).evaluate();
        new UserCommandValidationRule(condition2, errMsg2).evaluate();
        new UserCommandValidationRule(condition3, errMsg3).evaluate();
        new UserCommandValidationRule(condition4, errMsg4).evaluate();
        /**
         * Validation Rules:
         * 1. The command has to start with the keyword "execute"
         * 2. The command has a non-empty value for both "create" and "for" types
         * 3. The value for "create" type has to an accepted value.
         * 4. The value for "for" type has to be an accepted value.
         * 5. The command has to have nothing else
         */
    }
    static getCommand(userInput) {
        return new UserCommand(userInput);
    }
}
exports.UserCommand = UserCommand;
class UserCommandValidationRule {
    condition;
    errMsg;
    constructor(condition, errMsg) {
        this.condition = condition;
        this.errMsg = errMsg;
    }
    evaluate() {
        if (!this.condition)
            throw new Error(this.errMsg);
    }
}
const userInput = "execute create:video for:youtube-RelaxingMusic";
const userCommand = UserCommand.getCommand(userInput);
//# sourceMappingURL=UserCommand.js.map