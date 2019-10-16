const fs = require("fs");

const downloadsInfoFile = "downloads.json";

function writeInfo(softwareTitle, info) {
  let downloadsInfo = getDownloadsInfo();
  downloadsInfo[softwareTitle] = info;
  fs.writeFileSync(downloadsInfoFile, JSON.stringify(downloadsInfo));
}

function unlistOldSoftwares(softwares) {
  const downloadsInfo = getDownloadsInfo();
  const toRemove = [];
  Object.keys(downloadsInfo).forEach(softwareTitle => {
    if (!softwares.some(software => software.title === softwareTitle))
      toRemove.push(softwareTitle);
  });
  toRemove.forEach(title => {
    delete downloadsInfo[title];
  });
  fs.writeFileSync(downloadsInfoFile, JSON.stringify(downloadsInfo));
  return downloadsInfo;
}

function getDownloadsInfo() {
  return JSON.parse(fs.readFileSync(downloadsInfoFile));
}

module.exports = {
  writeInfo,
  getDownloadsInfo,
  unlistOldSoftwares
};
