#!/bin/bash

# App Icon Generator Script
# Usage: ./generate-app-icons.sh <source-image.png>

SOURCE_IMAGE=$1

if [ -z "$SOURCE_IMAGE" ]; then
    echo "Usage: ./generate-app-icons.sh <source-image.png>"
    echo "Please provide a source image (preferably 1024x1024 or larger)"
    exit 1
fi

if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "Error: Source image '$SOURCE_IMAGE' not found"
    exit 1
fi

# Project paths
IOS_ICON_PATH="ios/antonioR/Images.xcassets/AppIcon.appiconset"
ANDROID_RES_PATH="android/app/src/main/res"

echo "Generating iOS app icons..."

# iOS icon sizes (size@scale)
# 20x20@2x = 40px, 20x20@3x = 60px
# 29x29@2x = 58px, 29x29@3x = 87px
# 40x40@2x = 80px, 40x40@3x = 120px
# 60x60@2x = 120px, 60x60@3x = 180px
# 1024x1024@1x = 1024px (App Store)

sips -z 40 40 "$SOURCE_IMAGE" --out "$IOS_ICON_PATH/Icon-20@2x.png"
sips -z 60 60 "$SOURCE_IMAGE" --out "$IOS_ICON_PATH/Icon-20@3x.png"
sips -z 58 58 "$SOURCE_IMAGE" --out "$IOS_ICON_PATH/Icon-29@2x.png"
sips -z 87 87 "$SOURCE_IMAGE" --out "$IOS_ICON_PATH/Icon-29@3x.png"
sips -z 80 80 "$SOURCE_IMAGE" --out "$IOS_ICON_PATH/Icon-40@2x.png"
sips -z 120 120 "$SOURCE_IMAGE" --out "$IOS_ICON_PATH/Icon-40@3x.png"
sips -z 120 120 "$SOURCE_IMAGE" --out "$IOS_ICON_PATH/Icon-60@2x.png"
sips -z 180 180 "$SOURCE_IMAGE" --out "$IOS_ICON_PATH/Icon-60@3x.png"
sips -z 1024 1024 "$SOURCE_IMAGE" --out "$IOS_ICON_PATH/Icon-1024.png"

echo "Generating Android app icons..."

# Android icon sizes
# mdpi: 48x48
# hdpi: 72x72
# xhdpi: 96x96
# xxhdpi: 144x144
# xxxhdpi: 192x192

sips -z 48 48 "$SOURCE_IMAGE" --out "$ANDROID_RES_PATH/mipmap-mdpi/ic_launcher.png"
sips -z 48 48 "$SOURCE_IMAGE" --out "$ANDROID_RES_PATH/mipmap-mdpi/ic_launcher_round.png"
sips -z 72 72 "$SOURCE_IMAGE" --out "$ANDROID_RES_PATH/mipmap-hdpi/ic_launcher.png"
sips -z 72 72 "$SOURCE_IMAGE" --out "$ANDROID_RES_PATH/mipmap-hdpi/ic_launcher_round.png"
sips -z 96 96 "$SOURCE_IMAGE" --out "$ANDROID_RES_PATH/mipmap-xhdpi/ic_launcher.png"
sips -z 96 96 "$SOURCE_IMAGE" --out "$ANDROID_RES_PATH/mipmap-xhdpi/ic_launcher_round.png"
sips -z 144 144 "$SOURCE_IMAGE" --out "$ANDROID_RES_PATH/mipmap-xxhdpi/ic_launcher.png"
sips -z 144 144 "$SOURCE_IMAGE" --out "$ANDROID_RES_PATH/mipmap-xxhdpi/ic_launcher_round.png"
sips -z 192 192 "$SOURCE_IMAGE" --out "$ANDROID_RES_PATH/mipmap-xxxhdpi/ic_launcher.png"
sips -z 192 192 "$SOURCE_IMAGE" --out "$ANDROID_RES_PATH/mipmap-xxxhdpi/ic_launcher_round.png"

echo "Done! App icons generated for iOS and Android."
echo ""
echo "Next steps:"
echo "1. For iOS: Run 'cd ios && pod install' if needed"
echo "2. Rebuild your app to see the new icons"
