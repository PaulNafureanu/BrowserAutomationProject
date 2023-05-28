import { UserManager } from "./main/managers/user/UserManager";

// The main function
function init() {
  // Prompting the user to enter a command from the command line interface
  UserManager.promptForCommand();
}

// The main entrypoint of Browser Automation Project App
init();
