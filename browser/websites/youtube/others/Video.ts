import path = require("node:path");

export class Video {
  public fileName: string;
  public filePath: string;
  public thumbnailPath: string;
  public title: string;
  public playlist: string;
  public audience: boolean;
  public promotion: boolean;
  public automaticChapters: boolean;
  public automaticPlaces: boolean;
  public tags: string[];
  public language: string;
  public captionCertification: string;
  public license: string;
  public shortRemixing: string;
  public category: string;
  public sortBy: string;
  public showLikeCount: boolean;

  constructor(filePath: string) {
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

  //name of the file.mp4 and / or the path to it
  /**
   * //Details:
   *
   * Title
   * Description
   * Thumbnail: Name and/or path to the file
   * Playlist: choose
   * Audience: kids or not
   * Promotion: yes / no
   * Automatic chapters and places
   * Tags
   * language and caption certification
   * Recording date and location
   * License
   * Short remixing
   * Category
   * Comments and rating ???
   * Sort by
   * Show like count
   *
   * //Video elements:
   * Add subtitles
   * Add end screen
   * Add cards
   *
   * //Checks:
   * verify all checks
   *
   * Visibility:
   * Schedule
   * Publish type
   */
}
