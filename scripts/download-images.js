const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Your Google Drive folder ID
const FOLDER_ID = '1y_ATn27CofUMOfPyVo7WqPP5EogXOkUL';
const OUTPUT_DIR = path.join(__dirname, '../public/images/products');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function downloadImages() {
  try {
    // Create a new instance of the drive client
    const drive = google.drive({ version: 'v3', auth: process.env.GOOGLE_API_KEY });

    // List all files in the folder
    const res = await drive.files.list({
      q: `'${FOLDER_ID}' in parents`,
      fields: 'files(id, name, mimeType, webContentLink, webViewLink)'
    });

    const files = res.data.files;
    
    if (files.length === 0) {
      console.log('No files found in the specified folder.');
      return;
    }

    console.log('Downloading files...');
    
    // Download each file
    for (const file of files) {
      if (file.mimeType.startsWith('image/')) {
        const dest = path.join(OUTPUT_DIR, file.name);
        const destStream = fs.createWriteStream(dest);
        
        console.log(`Downloading ${file.name}...`);
        
        const res = await drive.files.get(
          { fileId: file.id, alt: 'media' },
          { responseType: 'stream' }
        );
        
        await new Promise((resolve, reject) => {
          res.data
            .on('end', () => {
              console.log(`✅ Downloaded ${file.name}`);
              resolve();
            })
            .on('error', (err) => {
              console.error(`❌ Error downloading ${file.name}:`, err);
              reject(err);
            })
            .pipe(destStream);
        });
      }
    }
    
    console.log('All files downloaded successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the function
downloadImages();
