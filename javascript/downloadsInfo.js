const fs = require("fs");

const downloadsInfoFile = "downloads.json";

function writeInfo(softwareTitle, info) {
  let downloadsInfo = getDownloadsInfo();
  downloadsInfo[softwareTitle] = info;
  fs.writeFileSync(downloadsInfoFile, JSON.stringify(downloadsInfo));
}

function getDownloadsInfo() {
  return JSON.parse(fs.readFileSync(downloadsInfoFile));
}

module.exports = {
  writeInfo: writeInfo,
  getDownloadsInfo: getDownloadsInfo
};
