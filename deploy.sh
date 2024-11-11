#!/bin/bash

echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -i ~/.ssh/id_rsa_google_cloud -r dist/* wilhelm_teicke@35.238.225.92:/var/www/35.238.225.92/videoflix

echo "Done"
