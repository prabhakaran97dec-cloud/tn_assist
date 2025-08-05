#!/bin/bash

echo "📦 Building React App..."
npm run build

echo "📂 Adding changes to git..."
git add .

echo "✅ Committing changes..."
git commit -m "update build"

echo "🚀 Pushing to main branch..."
git push origin main

echo "🌳 Creating temporary branch from build directory..."
git subtree split --prefix build -b gh-pages-temp

echo "📤 Force pushing to gh-pages branch..."
git push origin gh-pages-temp:gh-pages --force

echo "🧹 Deleting temporary branch..."
git branch -D gh-pages-temp

echo "🎉 Deployment complete! Check your GitHub Pages site."
