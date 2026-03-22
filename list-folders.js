const { google } = require('googleapis');

const KEYFILEPATH = '/root/.openclaw/workspace/.service-account.json';
const SCOPES = ['https://www.googleapis.com/auth/drive'];

async function listFolders() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });

  const drive = google.drive({ version: 'v3', auth });
  
  try {
    const res = await drive.files.list({
      q: "mimeType = 'application/vnd.google-apps.folder' and trashed = false",
      fields: 'files(id, name, createdTime)',
      pageSize: 50,
    });
    
    console.log('Folders found:');
    res.data.files.forEach(folder => {
      console.log(`- ${folder.name} (ID: ${folder.id})`);
    });
    
    if (res.data.files.length === 0) {
      console.log('No folders found. Service account may not have access.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

listFolders();
