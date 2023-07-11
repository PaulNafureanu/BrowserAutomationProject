"use strict";
/**
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = exports.ProcessType = void 0;
var ProcessType;
(function (ProcessType) {
    ProcessType[ProcessType["CreateVideoForYoutube"] = 0] = "CreateVideoForYoutube";
    ProcessType[ProcessType["UploadVideoForYoutube"] = 1] = "UploadVideoForYoutube";
    ProcessType[ProcessType["DownloadVideoForYoutube"] = 2] = "DownloadVideoForYoutube";
    ProcessType[ProcessType["DeleteVideoForYoutube"] = 3] = "DeleteVideoForYoutube";
})(ProcessType || (exports.ProcessType = ProcessType = {}));
class Process {
    static async start(process) { }
    static async pause(process) { }
    static async restart(process) { }
    static async delete(process) { }
    static async check(process) { }
    constructor() {
        this.id = ++Process.idCount;
    }
}
exports.Process = Process;
Process.idCount = 0;
//# sourceMappingURL=Process.js.map