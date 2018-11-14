const fs = require("fs");

function htmlGenerator() {
  console.log("Generating HTML...");
  const downloads = JSON.parse(fs.readFileSync("downloads.json"));
  const lastUpdate = fs.statSync("downloads.json").mtime.toString();
  let html = "";

  html = `<html>
      <head>
        <title>CMB Software Downloads</title>
        <link href="styles.css" rel="stylesheet" type="text/css">
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
    <div>
  `;
  if (download.icon) {
    html += `<span class="icon"><img src="${download.icon}" /></span>`;
  }
  html += ` <span class="sw"><h2>${download.title}</h2>`;
  if (download.errorFlag) {
    html += `<p class="error" 
                data-error-message="${download.title}: ${download.errorFlag}">
              There was a problem updating this item. You may not be getting the latest version.
            </p>`;
  }
  html += `
      <p>${download.description}</p>
      <a class="download-button" href="${download.localPath}">
        Download ${download.title} ${download.version}
      </a>
      </span>
    </div>`;
  return html;
}

module.exports = htmlGenerator;
