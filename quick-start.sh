#!/bin/bash

echo "🚀 AI Social Mirror - Quick Start Setup"
echo "======================================"

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔧 Setting up environment..."
if [ ! -f .env.local ]; then
    cp env.example .env.local
    echo "✅ Created .env.local from template"
else
    echo "ℹ️  .env.local already exists"
fi

echo ""
echo "🗄️  Setting up database..."
echo "ℹ️  Please set up your database and update DATABASE_URL in .env.local"
echo "ℹ️  Options:"
echo "   - Supabase (recommended): https://supabase.com"
echo "   - Railway: https://railway.app"
echo "   - Local PostgreSQL"

echo ""
echo "🔑 Setting up API keys..."
echo "ℹ️  Please add your API keys to .env.local:"
echo "   - HUGGINGFACE_API_KEY (optional - app works in demo mode)"
echo "   - GOOGLE_CLIENT_ID (optional - for OAuth)"
echo "   - GOOGLE_CLIENT_SECRET (optional - for OAuth)"
echo "   - STRIPE_* keys (optional - for payments)"

echo ""
echo "🎯 Next steps:"
echo "1. Update .env.local with your configuration"
echo "2. Run: npm run db:push"
echo "3. Run: npm run dev"
echo "4. Visit: http://localhost:3000"

echo ""
echo "📚 For detailed setup instructions, see SETUP_GUIDE.md"
echo "" 