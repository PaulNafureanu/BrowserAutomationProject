"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
class Session {
    static idCount = 0;
    id;
    constructor() {
        this.id = ++Session.idCount;
    }
}
exports.Session = Session;
//# sourceMappingURL=Session.js.map