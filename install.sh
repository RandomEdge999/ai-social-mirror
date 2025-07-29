#!/bin/bash

echo "========================================"
echo "AI Social Mirror - Installation Script"
echo "========================================"
echo

echo "Checking if Node.js is installed..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    echo "Then run this script again."
    exit 1
fi

echo "Node.js is installed!"
echo

echo "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies!"
    exit 1
fi

echo
echo "Dependencies installed successfully!"
echo

echo "Setting up environment variables..."
if [ ! -f .env.local ]; then
    cp env.example .env.local
    echo "Created .env.local file"
    echo
    echo "IMPORTANT: Please edit .env.local and add your API keys:"
    echo "- HUGGINGFACE_API_KEY"
    echo "- STRIPE_SECRET_KEY"
    echo "- STRIPE_PUBLISHABLE_KEY"
    echo "- STRIPE_WEBHOOK_SECRET"
    echo "- STRIPE_PRO_PRICE_ID"
    echo
else
    echo ".env.local already exists"
fi

echo
echo "========================================"
echo "Installation completed!"
echo "========================================"
echo
echo "To start the development server, run:"
echo "npm run dev"
echo
echo "Then open http://localhost:3000 in your browser"
echo 