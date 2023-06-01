/*
 * A user command is a string with specific keywords.
 * Therefore, a user command can be defined, identified, and classified in terms of those keywords.
 * This interface defines what keywords are allowed in a user command, keywords which then define the specific command type.
 * Add more keywords to define more command types and their features.
 *
 * Example of a command: execute create:video for:youtube-ytchannel
 * Keywords to identify the type of the command: execute, create, for.
 */
export interface UserCommandDefinition {
  execute: boolean;
  create: boolean;
  for: boolean;
}

/**
 * The definition of a user command type
 */
export interface UserCommandType {
  CommandName: string;
  CommandDefinition: UserCommandDefinition;
}

/**
 *  A utility class to define and group types of UserCommands,
 *  methods to determine the type of a given UserCommand,
 *  and methods to determine if the user input represents a specific UserCommand.
 *  A command type is basically a command name associated with a user command definition.
 */
export class CommandType {
  private static readonly UndefinedCommandDefinition: UserCommandDefinition = {
    execute: false,
    create: false,
    for: false,
  };

  private static readonly Types: UserCommandType[] = [
    {
      CommandName: "SimpleUserCommand",
      CommandDefinition: { execute: true, create: true, for: true },
    },
  ];

  private static readonly UserCommandKeywordList = Object.keys(
    CommandType.UndefinedCommandDefinition
  ) as (keyof UserCommandDefinition)[];

  // Set here more accepted values for command keywords:
  private static readonly AcceptedValuesForCommandKeywords: {
    [key in keyof UserCommandDefinition]: string[];
  } = {
    execute: [],
    create: ["video"],
    for: ["youtube-channel1", "youtube-channel2"],
  };

  private constructor() {}

  private static getUserCommandDefinition(userInput: string) {
    const userCommandDefiniton = {
      ...CommandType.UndefinedCommandDefinition,
    } as UserCommandDefinition;

    for (const keyword of CommandType.UserCommandKeywordList) {
      if (userInput.includes(keyword)) {
        userCommandDefiniton[keyword] = true;
      }
    }
    return userCommandDefiniton;
  }

  public static getCommandType(userInput: string) {
    const userCommandDefiniton =
      CommandType.getUserCommandDefinition(userInput);

    for (const commandType of CommandType.Types) {
      let isMatch = true;
      let keyword: keyof UserCommandDefinition;
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

  public static getNumberOfTruthyKeywords(commandType: UserCommandType) {
    let number = 0;
    let keyword: keyof UserCommandDefinition;
    for (keyword in commandType.CommandDefinition) {
      if (commandType.CommandDefinition[keyword]) number++;
    }
    return number;
  }

  public static getAcceptedValuesForCommandKeywords(commandKeyword: string) {
    if (
      Object.hasOwnProperty.call(
        CommandType.AcceptedValuesForCommandKeywords,
        commandKeyword
      )
    ) {
      const key = commandKeyword as keyof UserCommandDefinition;
      return CommandType.AcceptedValuesForCommandKeywords[key];
    } else return [];
  }

  public static getSpecificUserCommandKeywordList<
    T extends string[] | (keyof UserCommandDefinition)[]
  >(commandType: UserCommandType) {
    // Define a list of truthy keywords used for this user command from the command type definition
    let userCommandKeywordList = [];
    let keyCommandType: keyof UserCommandDefinition;
    for (keyCommandType in commandType.CommandDefinition) {
      if (commandType.CommandDefinition[keyCommandType]) {
        userCommandKeywordList.push(keyCommandType);
      }
    }
    return userCommandKeywordList as T;
  }

  public static getRedundantKeyword(
    commandPartsByUser: string[],
    commandKeywordsByDef: string[] = CommandType.UserCommandKeywordList
  ) {
    for (let part of commandPartsByUser) {
      let foundKeyForPart = false; // Let's assume that the part has no key
      for (let key of commandKeywordsByDef) {
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

  public static getKeywordFromString(
    userInput: string,
    commandKeywordsByDef: (keyof UserCommandDefinition)[] = CommandType.UserCommandKeywordList
  ) {
    for (const key of commandKeywordsByDef) {
      if (userInput.includes(key)) {
        return key;
      }
    }
  }
}
