#! /bin/bash

rm -rvf ./dist/*
npm run build
find ../moeenn.github.io -maxdepth 1 ! -name '.git' -delete
mv -v ./dist/* ../moeenn.github.io
cd ../moeenn.github.io
git commit -m "deploy latest version"
git push origin main
