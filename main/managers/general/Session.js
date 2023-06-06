"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
class Session {
    constructor() {
        this.id = ++Session.idCount;
    }
}
exports.Session = Session;
Session.idCount = 0;
//# sourceMappingURL=Session.js.map