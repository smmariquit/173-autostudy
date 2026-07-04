#!/bin/bash

# Download the screens we identified
declare -a URLS=(
  "https://www.figma.com/api/mcp/asset/2f2d0240-226c-40c5-b21c-2f811922df6a screen-01.png"
  "https://www.figma.com/api/mcp/asset/4761c1e1-c730-4532-94a4-67e4c401d261 screen-02.png"
)

for url_and_file in "${URLS[@]}"; do
  url=$(echo $url_and_file | awk '{print $1}')
  file=$(echo $url_and_file | awk '{print $2}')
  echo "Downloading $file..."
  curl -s "$url" -o "$file"
done

ls -lh screen-*.png
