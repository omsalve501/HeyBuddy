#!/bin/bash

# HeyBuddy - Deploy to GitHub Pages
# This script builds and deploys the frontend to GitHub Pages

set -e

echo "🚀 HeyBuddy - GitHub Pages Deployment"
echo "======================================"
echo ""

# Check if gh-pages is installed
if ! npm list -g gh-pages > /dev/null 2>&1; then
    echo "📦 Installing gh-pages..."
    npm install -g gh-pages
fi

# Navigate to client directory
cd client

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo "⚠️  .env.production not found!"
    echo ""
    echo "📝 You need to configure your backend URL first:"
    echo "   1. Edit client/.env.production"
    echo "   2. Set REACT_APP_SERVER_URL to your deployed backend URL"
    echo ""
    echo "Example:"
    echo "   REACT_APP_SERVER_URL=https://your-backend.railway.app"
    echo ""
    exit 1
fi

# Check backend URL is configured
BACKEND_URL=$(grep "REACT_APP_SERVER_URL" .env.production | cut -d '=' -f 2)

if [ -z "$BACKEND_URL" ] || [ "$BACKEND_URL" = "https://your-backend-url.com" ]; then
    echo "⚠️  Backend URL not configured!"
    echo ""
    echo "Please update .env.production with your deployed backend URL:"
    echo "   REACT_APP_SERVER_URL=https://your-backend-url.com"
    echo ""
    exit 1
fi

echo "✅ Backend URL: $BACKEND_URL"
echo ""

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm install > /dev/null 2>&1

# Build the app
echo "🔨 Building React app..."
npm run build

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
npm run deploy

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your app is live at:"
echo "   https://omsalve501.github.io/HeyBuddy"
echo ""
echo "💡 Next steps:"
echo "   1. Open the URL above in 2 browser tabs"
echo "   2. Enter different usernames"
echo "   3. Click START in both windows"
echo "   4. Send messages and chat in real-time!"
echo ""
