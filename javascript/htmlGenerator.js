const fs = require("fs");

const downloadsPath = "/downloads/";

function htmlGenerator() {
  console.log("Generating HTML...");
  const downloads = JSON.parse(fs.readFileSync("downloads.json"));
  const links = JSON.parse(fs.readFileSync("links.json"));
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
          <p class="last-update">Updated ${lastUpdate}</p>
          <div>
          <h3>For other useful apps at CMB, <a target="_new" href="http://192.168.0.158/research-index.html">click here.</a></h3>
          </div>`;

  /* TODO: there is no try in either of these, very much assumes they
   * are there and well-formatted. */
  /* NB. Links will always appear first in the list, not combined
   * alphabetically. */
  links.forEach((item, index) => {
    html += entryHTML(item);
  });

  const titles = Object.keys(downloads).sort();
  for (let i = 0; i < titles.length; ++i) {
    html += entryHTML(downloads[titles[i]]);
  }

  html += `<p class="email-us">Don't see what you need? Email us at <a href="mailto:programmer_cameroon@sil.org">programmer_cameroon@sil.org</a></p>`;
  html += `</content></body></html>`;
  fs.writeFileSync("public/index.html", html);
}

function entryHTML(entry) {
  let html = `
    <div><table><tr>
  `;
  if (entry.icon) {
    html += `<td class="icon"><img src="${entry.icon}" /></td>`;
  }
  html += ` <td class="sw"><h2>${entry.title}</h2>`;
  if (entry.errorFlag) {
    html += `<p class="error" 
                data-error-message="${entry.title}: ${entry.errorFlag}">
              There was a problem updating this item. You may not be getting the latest version.
            </p>`;
  } else if (entry.downloadingNewVersion) {
    html += `<p class="error"
                data-error-message="${
                  entry.title
                }: Downloading new version...">
              A newer version is available but has not yet finished downloading.
            </p>`;
  }
  html += `<p>${entry.description}</p>`;

  if (entry.link) {
    html += `<a class="download-button" href="${entry.link}" target="_blank">
            Visit Site to Download ${entry.title}
             </a>`;
  } else {
    html += `<a class="download-button" href="${downloadsPath +
            entry.localFile}">
            Download ${entry.title} ${entry.version}
             </a>`;
  }
    html += `</td>
        </tr>
      </table>
    </div>`;
  return html;
}

module.exports = htmlGenerator;
