#!/bin/bash

# Download additional screens we found
curl -s "https://www.figma.com/api/mcp/asset/e36b1e04-1edc-48dd-bf5e-cf053a1a3f01" -o screen-03-temp.png
curl -s "https://www.figma.com/api/mcp/asset/5988e562-f91e-4256-ba83-e3f46b3e274b" -o screen-04-temp.png

# Check sizes
echo "Downloaded temporary screens:"
ls -lh screen-0[34]-temp.png

# These are 402x874 full-screen images - good!
# Verify they're valid PNGs
file screen-0[34]-temp.png
