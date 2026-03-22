#!/usr/bin/env python3
import os
import pickle
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.auth.transport.requests import Request

def backup_to_drive():
    """Backup website folder to Google Drive"""
    SCOPES = ['https://www.googleapis.com/auth/drive']
    
    # Load credentials
    creds = None
    if os.path.exists('/root/.openclaw/workspace/token.pickle'):
        with open('/root/.openclaw/workspace/token.pickle', 'rb') as token:
            creds = pickle.load(token)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            print("ERROR: Google Drive credentials not available")
            return False
    
    service = build('drive', 'v3', credentials=creds)
    
    # Create or find Fern & Feather folder
    folder_name = "Fern & Feather Website"
    query = f"mimeType='application/vnd.google-apps.folder' and name='{folder_name}' and trashed=false"
    results = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute()
    items = results.get('files', [])
    
    if items:
        folder_id = items[0]['id']
        print(f"Using existing folder: {folder_name}")
    else:
        # Create folder
        file_metadata = {
            'name': folder_name,
            'mimeType': 'application/vnd.google-apps.folder'
        }
        folder = service.files().create(body=file_metadata, fields='id').execute()
        folder_id = folder.get('id')
        print(f"Created folder: {folder_name}")
    
    # Upload files recursively
    website_path = '/root/.openclaw/workspace/website'
    
    def upload_recursive(local_path, parent_id):
        for item in os.listdir(local_path):
            item_path = os.path.join(local_path, item)
            
            if os.path.isdir(item_path):
                # Create subfolder
                subfolder_metadata = {
                    'name': item,
                    'mimeType': 'application/vnd.google-apps.folder',
                    'parents': [parent_id]
                }
                subfolder = service.files().create(body=subfolder_metadata, fields='id').execute()
                upload_recursive(item_path, subfolder.get('id'))
            else:
                # Upload file
                file_metadata = {'name': item, 'parents': [parent_id]}
                media = MediaFileUpload(item_path, resumable=True)
                file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
                print(f"Uploaded: {item}")
    
    upload_recursive(website_path, folder_id)
    print("✓ Website backup to Google Drive complete")
    return True

if __name__ == '__main__':
    backup_to_drive()
