const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const KEYFILEPATH = '/root/.openclaw/workspace/.service-account.json';
const SCOPES = ['https://www.googleapis.com/auth/drive'];

async function uploadFile(filePath, folderId = null) {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });

  const drive = google.drive({ version: 'v3', auth });
  
  const fileName = path.basename(filePath);
  const fileMetadata = {
    name: fileName,
    parents: folderId ? [folderId] : undefined,
  };
  
  const media = {
    mimeType: 'text/markdown',
    body: fs.createReadStream(filePath),
  };

  try {
    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, webViewLink',
    });
    
    console.log('File uploaded successfully!');
    console.log('File ID:', file.data.id);
    console.log('Link:', file.data.webViewLink);
    return file.data;
  } catch (error) {
    console.error('Error uploading file:', error.message);
    throw error;
  }
}

async function findFolder(folderName) {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });

  const drive = google.drive({ version: 'v3', auth });
  
  try {
    const res = await drive.files.list({
      q: `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
    });
    
    if (res.data.files.length > 0) {
      console.log('Found folder:', res.data.files[0].name, 'ID:', res.data.files[0].id);
      return res.data.files[0].id;
    } else {
      console.log('Folder not found:', folderName);
      return null;
    }
  } catch (error) {
    console.error('Error finding folder:', error.message);
    throw error;
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args[0] === 'find') {
    await findFolder(args[1]);
  } else if (args[0] === 'upload') {
    const filePath = args[1];
    const folderId = args[2] || null;
    await uploadFile(filePath, folderId);
  } else {
    console.log('Usage:');
    console.log('  node gdrive.js find "Folder Name"');
    console.log('  node gdrive.js upload /path/to/file [folderId]');
  }
}

main().catch(console.error);
