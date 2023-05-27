"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const path = require("node:path");
class Video {
    fileName;
    filePath;
    thumbnailPath;
    title;
    playlist;
    audience;
    promotion;
    automaticChapters;
    automaticPlaces;
    tags;
    language;
    captionCertification;
    license;
    shortRemixing;
    category;
    sortBy;
    showLikeCount;
    constructor(filePath) {
        this.fileName = path.basename(filePath);
        this.filePath = filePath;
        this.thumbnailPath = "";
        this.title = "";
        this.playlist = "";
        this.audience = true;
        this.promotion = false;
        this.automaticChapters = true;
        this.automaticPlaces = true;
        this.tags = [];
        this.language = "";
        this.captionCertification = "";
        this.license = "";
        this.shortRemixing = "";
        this.category = "";
        this.sortBy = "";
        this.showLikeCount = true;
    }
}
exports.Video = Video;
//# sourceMappingURL=Video.js.map