# CMB Software Cache

This program keeps up to date install files for commonly needed software and serves them up through a webpage.

## How to add software

The list of software that is kept up to date is found in `softwares.json`. Every entry there needs a title and a description. If the software has a download page, and the link to the download on that page is the first link to an `.exe` or `.msi` file, then the url to the download page is all that is needed.

Example:
```json
{
    "title": "Glyssen",
    "description": "Helps you produce a high-quality dramatized audio recording of Scripture.",
    "downloadPage": "https://software.sil.org/glyssen/download/"
}
```

In cases where that does not work, it is also possible to specify a `downloadLinkPattern` or a `downloadPathPattern`. The program searches the html of the download page for a match to the `downloadLinkPattern` that contains a match to the `downloadPathPattern`. The first matching group (`match[1]`) of the `downloadPathPattern` is used as the url to the download. 

The defaults that are used for the simple case described above are:
```javascript
{
    downloadLinkPattern: /<a[^>]+?>/g,
    downloadPathPattern: /href=['"]([^'"]+(msi|exe))['"]/
}
```

Example entry with custom patterns:
```json
{
    "title": "Keyman",
    "description": "Makes it possible for you to type in over 1,000 languages.",
    "downloadPage": "https://keyman.com/desktop/download.php",
    "downloadLinkPattern": "<div class=\"download-cta-big[^>]+?>",
    "downloadPathPattern": "data-url='([^\"]+exe)'"
}
```

If that doesn't work either, it is possible to specify an item as a special case in `updater.js` and write custom code to get the url for the download. An example is how FLEx is handled.

## Dependencies

- Node
- Yarn

## Setup

- Clone the repository
- `yarn install`
- Set a cron job to run `updater.js`
- Add the `downloads` folder and the `old` folder inside `public`:
```
public
   downloads
      old
    styles.css
...
```