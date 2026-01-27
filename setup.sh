#!/bin/bash

# HeyBuddy Quick Start Script

echo "🚀 HeyBuddy - Chat Room Application Setup"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install server dependencies"
    exit 1
fi
cd ..
echo "✅ Server dependencies installed"
echo ""

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install client dependencies"
    exit 1
fi
cd ..
echo "✅ Client dependencies installed"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "To start the application, run in two separate terminals:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd server && npm start"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd client && npm start"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
echo "💡 Tip: Open two browser windows to test with multiple users!"
