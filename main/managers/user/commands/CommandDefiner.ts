import { ArrayUtility } from "../../../utilities/arrayUtility";

/*
 * A user command is a string with specific keywords.
 * Therefore, a user command can be defined, identified, and classified in terms of those keywords.
 * This enum defines what keywords are allowed in a user command, keywords which then define the specific command type.
 * Add more keywords to define more command types with their features.
 *
 * Example of a command: execute create:video for:youtube-ytchannel
 * Keywords to identify the type of the command: execute, create, for.
 */
export enum CommandKeys {
  execute,
  create,
  for,
  newK,
}

// A union of valid command keys from the above enum.
export type CommandKeyUnion = keyof typeof CommandKeys;

// The definition of the general user command type:
export type CommandType = (typeof CommandDefiner.Types)[number];
export type UndefinedCommandType = (typeof CommandDefiner.Types)[0];

export type AcceptedValues<Key extends CommandKeyUnion> =
  (typeof CommandDefiner.AcceptedValues)[Key][number];

/**
 *  A utility class to define and group types of user commands,
 *  methods to determine the type of a given user command,
 *  and methods to determine if the user input represents a specific user command.
 */
export class CommandDefiner {
  /**
   * An array containing all the command keywords from the enum in a string format.
   */
  private static readonly CommandKeywordList = Object.keys(CommandKeys).filter(
    (key) => isNaN(Number(key))
  ) as CommandKeyUnion[];

  /**
   * An array defining all available user command types.
   */
  public static readonly Types = [
    {
      CommandName: "UndefinedCommand",
      CommandKeys: [],
    },
    {
      CommandName: "SimpleUserCommand",
      CommandKeys: [CommandKeys.execute, CommandKeys.create, CommandKeys.for],
    },
    {
      CommandName: "New command",
      CommandKeys: [CommandKeys.execute, CommandKeys.newK],
    },
  ] as const;

  // Set here the accepted values for command keywords:
  public static readonly AcceptedValues = {
    execute: [],
    create: ["video"],
    for: ["youtube-channel1", "youtube-channel2"],
    newK: ["v1"],
  } as const;

  private constructor() {}

  /**
   * Scans the input string for valid keywords and constructs a command key list based on those keywords.
   * @param userInput the string input that the user typed in CLI.
   * @returns the command key list constructed.
   */
  private static getCommandKeyList(userInput: string) {
    const userCommandKeyList: CommandKeys[] = [];

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
  public static getCommandType(userInput: string): CommandType | undefined {
    const userCommandKeyList = CommandDefiner.getCommandKeyList(userInput);

    for (const commandType of CommandDefiner.Types) {
      if (
        ArrayUtility.haveSameValues(userCommandKeyList, commandType.CommandKeys)
      ) {
        return commandType;
      }
    }
  }

  /**
   * A type predicate that checks if a string is a command key.
   * @param commandKeyword the input string that will be check.
   * @returns true if the string is a command key (is of type CommandKeyUnion), false otherwise.
   */
  public static isCommandKey(
    commandKeyword: string
  ): commandKeyword is CommandKeyUnion {
    return CommandDefiner.CommandKeywordList.includes(
      commandKeyword as CommandKeyUnion
    );
  }

  /**
   * Determines the accepted values for a specific command keyword or input string.
   * @param commandKeyword a string representing the command keyword.
   * @returns an array containing the accepted values for the keyword, or empty string if the keyword is not a command keyword.
   */
  public static getAcceptedValues(commandKeyword: string): readonly string[] {
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
  public static getRedundantCommandPart(
    commandPartList: string[],
    commandKeyList: readonly CommandKeys[]
  ) {
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
  public static getKeyFromString(
    userInput: string,
    commandKeyList: readonly CommandKeys[]
  ) {
    for (const key of commandKeyList) {
      if (userInput.includes(CommandKeys[key])) {
        return key;
      }
    }
  }
}
