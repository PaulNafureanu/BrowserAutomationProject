"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Stage/Step:
async function YoutubeUploadVideoRoutine() {
    await openYoutubeUploadVideoForm();
    await selectAndSendFilesFromMachine();
    await completeYoutubeVideoUploading();
    return await checkYoutubeVideoForErrors(); //boolean true or error when resolved
}
//Routines:
async function openYoutubeUploadVideoForm() { }
async function selectAndSendFilesFromMachine() { }
async function completeYoutubeVideoUploading() { }
async function checkYoutubeVideoForErrors() { }
exports.default = YoutubeUploadVideoRoutine;
//# sourceMappingURL=YoutubeUploadVideoRoutine.js.map