/*
 * A user command is a string with specific keywords.
 * Therefore, a user command can be defined, identified, and classified in terms of those keywords.
 * This interface defines what keywords are allowed in a user command, keywords which then define the specific command type.
 * Add more keywords to define more command types and their features.
 *
 * Example of a command: execute create:video for:youtube-ytchannel
 * Keywords to identify the type of the command: execute, create, for.
 */
interface UserCommandDefinition {
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
}
