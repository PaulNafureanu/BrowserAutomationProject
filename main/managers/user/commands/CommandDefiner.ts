/*
 * A user command is a string with specific keywords.
 * Therefore, a user command can be defined, identified, and classified in terms of those keywords.
 * This interface defines what keywords are allowed in a user command, keywords which then define the specific command type.
 * Add more keywords to define more command types and their features.
 *
 * Example of a command: execute create:video for:youtube-ytchannel
 * Keywords to identify the type of the command: execute, create, for.
 */
export interface CommandDefinition {
  execute: boolean;
  create: boolean;
  for: boolean;
}

/**
 * The definition of a user command type
 */
export interface CommandType {
  CommandName: string;
  CommandDefinition: CommandDefinition;
}

/**
 *  A utility class to define and group types of UserCommands,
 *  methods to determine the type of a given UserCommand,
 *  and methods to determine if the user input represents a specific UserCommand.
 *  A command type is basically a command name associated with a user command definition.
 */
export class CommandDefiner {
  /**
   * The default command definition.
   */
  private static readonly UndefinedCommandDefinition: CommandDefinition = {
    execute: false,
    create: false,
    for: false,
  };

  /**
   * An array defining all available user commands.
   */
  public static readonly Types: CommandType[] = [
    {
      CommandName: "SimpleUserCommand",
      CommandDefinition: { execute: true, create: true, for: true },
    },
  ];

  /**
   * An array containing all the keywords from all the user commands available.
   */
  private static readonly UserCommandKeywordList = Object.keys(
    CommandDefiner.UndefinedCommandDefinition
  ) as (keyof CommandDefinition)[];

  // Set here more accepted values for command keywords:
  private static readonly AcceptedValuesForCommandKeywords: {
    [key in keyof CommandDefinition]: string[];
  } = {
    execute: [],
    create: ["video"],
    for: ["youtube-channel1", "youtube-channel2"],
  };

  private constructor() {}

  /**
   * Scans the input string for valid keywords and constructs a command definition based on those keywords
   * that are found in the input string.
   * @param userInput the string input that the user typed in CLI.
   * @returns the command definition constructed useful for determining the command type.
   */
  private static getCommandDefinition(userInput: string) {
    const userCommandDefiniton = {
      ...CommandDefiner.UndefinedCommandDefinition,
    } as CommandDefinition;

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
  public static getCommandType(userInput: string) {
    const userCommandDefiniton = CommandDefiner.getCommandDefinition(userInput);

    for (const commandType of CommandDefiner.Types) {
      let isMatch = true;
      let keyword: keyof CommandDefinition;
      for (keyword in userCommandDefiniton) {
        if (
          userCommandDefiniton[keyword] !==
          commandType.CommandDefinition[keyword]
        ) {
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
  public static getNumberOfTruthyKeywords(commandType: CommandType) {
    let number = 0;
    let keyword: keyof CommandDefinition;
    for (keyword in commandType.CommandDefinition) {
      if (commandType.CommandDefinition[keyword]) number++;
    }
    return number;
  }

  /**
   * Determines the accepted values for a specific command keyword.
   * @param commandKeyword a string representing the command keyword.
   * @returns an array containing the accepted values for the keyword
   */
  public static getAcceptedValuesForKeyword(commandKeyword: string) {
    if (
      Object.hasOwnProperty.call(
        CommandDefiner.AcceptedValuesForCommandKeywords,
        commandKeyword
      )
    ) {
      const key = commandKeyword as keyof CommandDefinition;
      return CommandDefiner.AcceptedValuesForCommandKeywords[key];
    } else return [];
  }

  /**
   * Constructs a truthy keyword list from a command type object.
   * @param commandType A command type from the Command Types array.
   * @returns an array of keywords set to true in the command definition of a command type.
   */
  public static getTruthyKeywordList<
    T extends string[] | (keyof CommandDefinition)[]
  >(commandType: CommandType) {
    // Define a list of truthy keywords used for this user command from the command type definition
    let userCommandKeywordList = [];
    let keyCommandType: keyof CommandDefinition;
    for (keyCommandType in commandType.CommandDefinition) {
      if (commandType.CommandDefinition[keyCommandType]) {
        userCommandKeywordList.push(keyCommandType);
      }
    }
    return userCommandKeywordList as T;
  }

  /**
   * Check to verify if an input string contains a redundant part or keyword.
   * @param commandPartList an array constructed from valid parts of the user input string.
   * @param truthyKeywordList an array constructed from the truthy keywords of a command definition.
   * @returns a redundant part or keyword found in the input string.
   */
  public static getRedundantKeyword(
    commandPartList: string[],
    truthyKeywordList: string[] = CommandDefiner.UserCommandKeywordList
  ) {
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
  public static getKeywordFromString(
    userInput: string,
    truthyKeywordList: (keyof CommandDefinition)[] = CommandDefiner.UserCommandKeywordList
  ) {
    for (const key of truthyKeywordList) {
      if (userInput.includes(key)) {
        return key;
      }
    }
  }
}
