const fs = require("fs");

let downloads = JSON.parse(fs.readFileSync("downloads.json"));
for (let title in downloads) {
  let download = downloads[title];
  if (!download.localFile) {
    const localFile = download.localPath.slice(
      download.localPath.lastIndexOf("/") + 1
    );
    download.localFile = localFile;
  }
}

fs.writeFileSync("downloads.json", JSON.stringify(downloads));
