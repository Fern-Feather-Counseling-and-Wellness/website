# Website Backup Script
# Usage: Run this script to create a local backup of the website repository.
# You can also set this up as a Windows Scheduled Task for automatic backups.
#
# To schedule it weekly:
#   1. Open Task Scheduler
#   2. Create Task > Triggers tab > Weekly
#   3. Actions tab > Start a program:
#      Program: powershell.exe
#      Arguments: -ExecutionPolicy Bypass -File "C:\path\to\this\script\backup-website.ps1"

param(
    [string]$BackupDir = "$env:USERPROFILE\Backups\fern-feather-website",
    [string]$RepoUrl = "https://github.com/Fern-Feather-Counseling-and-Wellness/website.git"
)

$Date = Get-Date -Format 'yyyy-MM-dd'
$ZipName = "website-backup-$Date.zip"
$ZipPath = Join-Path $BackupDir $ZipName
$TempDir = Join-Path $env:TEMP "website-backup-$Date"

# Create backup directory if it doesn't exist
if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    Write-Host "Created backup directory: $BackupDir"
}

# Clean up temp directory if it exists from a previous failed run
if (Test-Path $TempDir) {
    Remove-Item $TempDir -Recurse -Force
}

# Clone the repo (full history)
Write-Host "Cloning repository..."
$ErrorActionPreference = 'SilentlyContinue'
git clone --mirror $RepoUrl $TempDir 2>&1 | Out-Null
$ErrorActionPreference = 'Continue'

if (Test-Path "$TempDir/HEAD") {
    # Create zip from the mirror clone
    Write-Host "Creating backup archive..."
    Compress-Archive -Path "$TempDir\*" -DestinationPath $ZipPath -Force

    # Clean up temp
    Remove-Item $TempDir -Recurse -Force

    # Get file size
    $Size = (Get-Item $ZipPath).Length / 1MB
    Write-Host "Backup complete: $ZipPath ($([math]::Round($Size, 2)) MB)" -ForegroundColor Green
} else {
    Write-Host "Error: Failed to clone repository." -ForegroundColor Red
    exit 1
}

# Optional: Clean up backups older than 90 days
Get-ChildItem -Path $BackupDir -Filter "website-backup-*.zip" | Where-Object {
    $_.CreationTime -lt (Get-Date).AddDays(-90)
} | ForEach-Object {
    Remove-Item $_.FullName -Force
    Write-Host "Removed old backup: $($_.Name)"
}

Write-Host "Done!"