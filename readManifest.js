const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, 'extensions/uploader/assets/manifest.json');
const assetsDir = path.join(__dirname, 'extensions/uploader/assets');
const entryPath = path.join(__dirname, '/extensions/uploader/blocks/entry.liquid');


// Function to delete all files except specified ones
function cleanAssetsDirectory(excludeFiles) {
    fs.readdir(assetsDir, (err, files) => {
        if (err) {
            console.error('Error reading assets directory:', err);
            return;
        }

        files.forEach(file => {
            if (!excludeFiles.includes(file)) {
                fs.unlink(path.join(assetsDir, file), unlinkErr => {
                    if (unlinkErr) console.error(`Error deleting file ${file}:`, unlinkErr);
                    else console.log(`Deleted file: ${file}`);
                });
            }
        });
    });
}


// Read the manifest file
fs.readFile(manifestPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading manifest.json:', err);
        return;
    }

    try {
        const manifest = JSON.parse(data);
        const themeAppConfig = manifest["frontend/entrypoints/themeApp.jsx"];
        
        if (themeAppConfig && themeAppConfig.css && themeAppConfig.css.length > 0 && themeAppConfig.file) {
            const cssFile = themeAppConfig.css[0];
            const jsFile = themeAppConfig.file;

            console.log('Retained CSS File:', cssFile);
            console.log('Retained JS File:', jsFile);

            // Clean the assets directory
            cleanAssetsDirectory([cssFile, jsFile]);
            editEntry(cssFile);
        } else {
            console.error('Invalid manifest structure');
        }
    } catch (parseErr) {
        console.error('Error parsing manifest.json:', parseErr);
    }
});




function editEntry (cssFile){
fs.readFile(entryPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Use a regular expression to find and replace the stylesheet value
  const updatedData = data.replace(/("stylesheet":\s*")[^"]+/, `$1${cssFile}`);

  fs.writeFile(entryPath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the file:', err);
      return;
    }

    console.log('File has been updated with the new stylesheet value.');
  });
});
}
