type CreateTypeValuesAccepted = "video";
type PlatformTypeValuesAccepted = "youtube";
type ChannelTypeValuesAccepted = "therelaxedromantic";
type ForTypeValuesAccepted =
  `${PlatformTypeValuesAccepted}-${ChannelTypeValuesAccepted}`;

export class UserCommand {
  public readonly commandType: string;
  public readonly createType: CreateTypeValuesAccepted;
  public readonly forType: ForTypeValuesAccepted;

  private constructor(userInput: string) {
    this.commandType = "";
    this.createType = "video";
    this.forType = "youtube-therelaxedromantic";
  }

  private validateUserInput(userInput: string) {
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

    const condition3 =
      keyValuePairs[0][0] === "create" &&
      (keyValuePairs[0][1] as ForTypeValuesAccepted) === keyValuePairs[0][1];
    const errMsg3 = "";

    const condition4 =
      keyValuePairs[1][0] === "for" &&
      (keyValuePairs[1][1] as ForTypeValuesAccepted) === keyValuePairs[1][1];
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

  public static getCommand(userInput: string): UserCommand {
    return new UserCommand(userInput);
  }
}

class UserCommandValidationRule {
  private condition: boolean;
  private errMsg: string;
  constructor(condition: boolean, errMsg: string) {
    this.condition = condition;
    this.errMsg = errMsg;
  }

  evaluate() {
    if (!this.condition) throw new Error(this.errMsg);
  }
}

const userInput = "execute create:video for:youtube-RelaxingMusic";
const userCommand = UserCommand.getCommand(userInput);
