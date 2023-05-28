"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserManager_1 = require("./main/managers/user/UserManager");
// The main function
function init() {
    // Prompting the user to enter a command from the command line interface
    UserManager_1.UserManager.promptForCommand();
}
// The main entrypoint of Browser Automation Project App
init();
//# sourceMappingURL=init.js.map