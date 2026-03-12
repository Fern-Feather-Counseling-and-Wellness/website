const { google } = require('googleapis');
const fs = require('fs');
const http = require('http');
const url = require('url');

const OAuth2 = google.auth.OAuth2;

// Your credentials
const CLIENT_ID = '530322445740-3s5vg5rbu8khb976j3qb0n7vm9nu4dpc.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'http://localhost:3000';

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

const SCOPES = ['https://www.googleapis.com/auth/drive'];

function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent'
  });
}

async function getToken(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  console.log('Tokens acquired:', tokens);
  
  // Save tokens
  fs.writeFileSync('/root/.openclaw/workspace/.gdrive_tokens.json', JSON.stringify(tokens, null, 2));
  console.log('Tokens saved to .gdrive_tokens.json');
  
  return tokens;
}

async function listFiles() {
  const drive = google.drive({ version: 'v3', auth: oauth2Client });
  const res = await drive.files.list({ pageSize: 10, fields: 'files(name, id)' });
  console.log('Files:');
  res.data.files.forEach(file => console.log(`${file.name} (${file.id})`));
}

// Simple server to capture the auth code
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      const query = url.parse(req.url, true).query;
      if (query.code) {
        res.end('Authentication successful! You can close this tab.');
        server.close();
        resolve(query.code);
      } else {
        res.end('Waiting for authentication...');
      }
    });
    server.listen(3000, () => console.log('Listening on http://localhost:3000'));
  });
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args[0] === 'auth') {
    const authUrl = getAuthUrl();
    console.log('Open this URL in your browser:');
    console.log(authUrl);
    console.log('\nWaiting for authentication...');
    
    const code = await startServer();
    console.log('Got code, exchanging for tokens...');
    await getToken(code);
    console.log('Done!');
    
  } else if (args[0] === 'test') {
    const tokens = JSON.parse(fs.readFileSync('/root/.openclaw/workspace/.gdrive_tokens.json'));
    oauth2Client.setCredentials(tokens);
    await listFiles();
  } else {
    console.log('Usage: node gdrive-simple.js auth|test');
  }
}

main().catch(console.error);
