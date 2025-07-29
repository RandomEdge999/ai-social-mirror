@echo off
echo ========================================
echo AI Social Mirror - Installation Script
echo ========================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

echo Node.js is installed!
echo.

echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo Dependencies installed successfully!
echo.

echo Setting up environment variables...
if not exist .env.local (
    copy env.example .env.local
    echo Created .env.local file
    echo.
    echo IMPORTANT: Please edit .env.local and add your API keys:
    echo - HUGGINGFACE_API_KEY
    echo - STRIPE_SECRET_KEY
    echo - STRIPE_PUBLISHABLE_KEY
    echo - STRIPE_WEBHOOK_SECRET
    echo - STRIPE_PRO_PRICE_ID
    echo.
) else (
    echo .env.local already exists
)

echo.
echo ========================================
echo Installation completed!
echo ========================================
echo.
echo To start the development server, run:
echo npm run dev
echo.
echo Then open http://localhost:3000 in your browser
echo.
pause 