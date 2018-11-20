const fs = require("fs");
const download = require("download");
const downloadsInfo = require("./downloadsInfo");
const htmlGenerator = require("./htmlGenerator");

const downloadsPath = "public/downloads/";

async function updateDownload(downloadInfo, url, newVersion) {
  downloadInfo.downloadingNewVersion = true;
  downloadsInfo.writeInfo(downloadInfo.title, downloadInfo);

  const filename = newFilename(url, newVersion, downloadInfo.localFile);
  await downloadFile(url, filename);

  moveOldFile(downloadInfo.localFile);

  updateDownloadsInfoAndWebpage(downloadInfo, newVersion, filename);
}

// Make sure the filename for the new version is different from the old
function newFilename(url, version, oldDownloadFilename) {
  let filename = filenameOf(url);
  if (oldDownloadFilename && filename == oldDownloadFilename) {
    const lastDot = filename.lastIndexOf(".");
    filename = filename.slice(0, lastDot) + version + filename.slice(lastDot);
  }
  return filename;
}

// Download from the url and save to the downloads folder
async function downloadFile(url, filename) {
  console.log("Downloading " + filename + " at " + url);
  await download(url, downloadsPath, { filename: filename });
}

function moveOldFile(oldFileName) {
  if (oldFileName) {
    fs.rename(
      `${downloadsPath}/${oldFileName}`,
      `${downloadsPath}old/${oldFileName}`,
      () => {}
    );
  }
}

function updateDownloadsInfoAndWebpage(downloadInfo, version, filename) {
  downloadInfo.downloadingNewVersion = undefined;
  downloadInfo.version = version;
  downloadInfo.localFile = filename;
  downloadsInfo.writeInfo(downloadInfo.title, downloadInfo);
  htmlGenerator();
  console.log(
    `Finished updating ${downloadInfo.title} with version ${version}.`
  );
}

function filenameOf(urlOrPath) {
  return urlOrPath.slice(urlOrPath.lastIndexOf("/") + 1);
}

module.exports = {
  updateDownload: updateDownload
};
