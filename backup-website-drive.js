const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const OAuth2 = google.auth.OAuth2;

// Load tokens
const tokens = JSON.parse(fs.readFileSync('/root/.openclaw/workspace/.gdrive-token.json'));

const oauth2Client = new OAuth2(
  '530322445740-3s5vg5rbu8khb976j3qb0n7vm9nu4dpc.apps.googleusercontent.com',
  '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',
  'http://localhost:3000'
);

oauth2Client.setCredentials(tokens);

const drive = google.drive({ version: 'v3', auth: oauth2Client });

async function findOrCreateFolder(name, parentId = null) {
  const query = `mimeType='application/vnd.google-apps.folder' and name='${name}' and trashed=false${parentId ? ` and '${parentId}' in parents` : ''}`;
  const res = await drive.files.list({ q: query, fields: 'files(id, name)' });
  
  if (res.data.files.length > 0) {
    return res.data.files[0].id;
  }
  
  const fileMetadata = {
    name: name,
    mimeType: 'application/vnd.google-apps.folder',
    parents: parentId ? [parentId] : []
  };
  
  const folder = await drive.files.create({ resource: fileMetadata, fields: 'id' });
  return folder.data.id;
}

async function uploadFile(filePath, parentId) {
  const fileName = path.basename(filePath);
  const fileMetadata = { name: fileName, parents: [parentId] };
  const media = { body: fs.createReadStream(filePath) };
  
  await drive.files.create({ resource: fileMetadata, media: media, fields: 'id' });
  console.log(`✓ Uploaded: ${fileName}`);
}

async function uploadFolder(localPath, parentId) {
  const folderName = path.basename(localPath);
  const folderId = await findOrCreateFolder(folderName, parentId);
  
  const items = fs.readdirSync(localPath);
  for (const item of items) {
    const itemPath = path.join(localPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      await uploadFolder(itemPath, folderId);
    } else {
      await uploadFile(itemPath, folderId);
    }
  }
}

async function backupWebsite() {
  try {
    console.log('Starting Google Drive backup...');
    
    // Refresh token if needed
    const accessToken = await oauth2Client.getAccessToken();
    console.log('✓ Access token refreshed');
    
    // Find or create main backup folder
    const backupFolderId = await findOrCreateFolder('Fern & Feather Website Backup');
    console.log(`✓ Backup folder ready (ID: ${backupFolderId})`);
    
    // Upload website folder
    const websitePath = '/root/.openclaw/workspace/website';
    await uploadFolder(websitePath, backupFolderId);
    
    console.log('✓ Website backup to Google Drive complete!');
  } catch (error) {
    console.error('Backup failed:', error.message);
    process.exit(1);
  }
}

backupWebsite();
