const fs = require("fs");

const downloadsPath = "/downloads/";

function htmlGenerator() {
  console.log("Generating HTML...");
  const downloads = JSON.parse(fs.readFileSync("downloads.json"));
  const lastUpdate = fs.statSync("downloads.json").mtime.toString();
  let html = "";

  html = `<html>
      <head>
        <title>CMB Software Downloads</title>
        <link href="styles.css" rel="stylesheet" type="text/css">
        <meta charset="utf-8" />
      </head>
      <body>
        <div id="content">
          <h1>SIL CMB Software Downloads</h1>
          <p class="last-update">Updated ${lastUpdate}</p>`;

  const titles = Object.keys(downloads).sort();
  for (let i = 0; i < titles.length; ++i) {
    html += downloadHTML(downloads[titles[i]]);
  }

  html += `<p class="email-us">Don't see what you need? Email us at <a href="mailto:programmer_cameroon@sil.org">programmer_cameroon@sil.org</a></p>`;
  html += `</content></body></html>`;
  fs.writeFileSync("public/index.html", html);
}

function downloadHTML(download) {
  let html = `
    <div><table><tr>
  `;
  if (download.icon) {
    html += `<td class="icon"><img src="${download.icon}" /></td>`;
  }
  html += ` <td class="sw"><h2>${download.title}</h2>`;
  if (download.errorFlag) {
    html += `<p class="error" 
                data-error-message="${download.title}: ${download.errorFlag}">
              There was a problem updating this item. You may not be getting the latest version.
            </p>`;
  } else if (download.downloadingNewVersion) {
    html += `<p class="error"
                data-error-message="${
                  download.title
                }: Downloading new version...">
              A newer version is available but has not yet finished downloading.
            </p>`;
  }
  html += `
          <p>${download.description}</p>
          <a class="download-button" href="${downloadsPath +
            download.localFile}">
            Download ${download.title} ${download.version}
          </a>
          </td>
        </tr>
      </table>
    </div>`;
  return html;
}

module.exports = htmlGenerator;
