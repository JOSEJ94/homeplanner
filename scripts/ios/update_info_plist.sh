#!/bin/bash
# The purpose of this script is to copy the REVERSED_CLIENT_ID for iOS projects into the Info.plist.
# That way we can use GoogleSignIn out of the box without having to change configuration in case the file changes.

PROJECT_NAME=homeplanner
# Check if GoogleService-Info.plist exists
if [ ! -f "GoogleService-Info.plist" ]; then
    echo "Error: GoogleService-Info.plist does not exist"
    exit 1
fi

# Parse GoogleService-Info.plist to extract the REVERSED_CLIENT_ID
REVERSED_CLIENT_ID=$(sed -n -e '/<key>REVERSED_CLIENT_ID<\/key>/ { n; s/.*<string>\(.*\)<\/string>.*/\1/; p; }' GoogleService-Info.plist)

# Check if REVERSED_CLIENT_ID is empty
if [ -z "$REVERSED_CLIENT_ID" ]; then
    echo "Error: REVERSED_CLIENT_ID not found in GoogleService-Info.plist"
    exit 1
fi

# Find the position of the first occurrence of "<string>" inside "<key>CFBundleURLSchemes</key>"
START_LINE=$(grep -n "<key>CFBundleURLSchemes</key>" $PROJECT_NAME/Info.plist | cut -d: -f1)
END_LINE=$(grep -n "</array>" $PROJECT_NAME/Info.plist | awk -F: -v start=$START_LINE '$1 > start {print $1; exit}')

# Check if START_LINE or END_LINE is empty
if [ -z "$START_LINE" ] || [ -z "$END_LINE" ]; then
    echo "Error: Unable to find CFBundleURLSchemes in Info.plist"
    exit 1
fi

# Replace the placeholder value in Info.plist with the extracted REVERSED_CLIENT_ID
sed -i '' -e "${START_LINE},${END_LINE}s|<string>.*</string>|<string>$REVERSED_CLIENT_ID</string>|g" $PROJECT_NAME/Info.plist

echo "Info.plist has been updated with the REVERSED_CLIENT_ID."
