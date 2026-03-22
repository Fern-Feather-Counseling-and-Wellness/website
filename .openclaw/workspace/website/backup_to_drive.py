#!/usr/bin/env python3
"""Script to backup website files to Google Drive"""

import os
import pickle
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/drive']

def get_drive_service():
    """Get authenticated Google Drive service"""
    creds = None
    # The file token.pickle stores the user's access and refresh tokens
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            print("Google Drive credentials not available or invalid")
            return None
    
    return build('drive', 'v3', credentials=creds)

def upload_folder_to_drive(service, local_folder_path, parent_id=None):
    """Recursively upload a folder to Google Drive"""
    folder_name = os.path.basename(local_folder_path)
    
    # Create folder on Drive
    folder_metadata = {
        'name': folder_name,
        'mimeType': 'application/vnd.google-apps.folder',
        'parents': [parent_id] if parent_id else []
    }
    
    try:
        folder = service.files().create(body=folder_metadata, fields='id').execute()
        folder_id = folder.get('id')
        print(f"Created folder: {folder_name} (ID: {folder_id})")
        
        # Upload contents
        for item in os.listdir(local_folder_path):
            item_path = os.path.join(local_folder_path, item)
            
            if os.path.isdir(item_path):
                # Recursively upload subdirectories
                upload_folder_to_drive(service, item_path, folder_id)
            else:
                # Upload file
                file_metadata = {'name': item, 'parents': [folder_id]}
                media = MediaFileUpload(item_path, resumable=True)
                file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
                print(f"Uploaded: {item}")
                
    except Exception as e:
        print(f"Error uploading {local_folder_path}: {e}")

def main():
    service = get_drive_service()
    if service:
        website_folder = '/root/.openclaw/workspace/website'
        if os.path.exists(website_folder):
            print(f"Backing up website folder to Google Drive...")
            upload_folder_to_drive(service, website_folder)
            print("Backup complete!")
        else:
            print(f"Website folder not found: {website_folder}")
    else:
        print("Failed to authenticate with Google Drive")

if __name__ == '__main__':
    main()
