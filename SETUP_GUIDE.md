# 🚀 AI Social Mirror - Complete Setup Guide

## 📋 **What's New in This Enhanced Version**

### ✅ **Added Features:**
- **🔐 Authentication System** - Login/signup with Google OAuth and email/password
- **💾 Database Integration** - PostgreSQL with Drizzle ORM for data persistence
- **👤 User Management** - User profiles, usage tracking, plan management
- **📊 Free User Mode** - 5 analyses per month with upgrade prompts
- **📈 Analytics Dashboard** - Usage statistics and analysis history
- **🔑 API Key Management** - Proper environment variable handling
- **⚡ Rate Limiting** - Usage limits and plan restrictions
- **🎯 User Dashboard** - Personal analytics and history

### 🗄️ **Database Schema:**
- **Users** - Authentication and basic user info
- **User Profiles** - Plan, usage limits, subscription data
- **Analyses** - Complete analysis history
- **Usage Logs** - Detailed usage tracking
- **API Keys** - Enterprise API key management

---

## 🛠️ **Step-by-Step Setup**

### **1. Install Dependencies**

```bash
npm install
```

### **2. Database Setup**

#### **Option A: Local PostgreSQL**
```bash
# Install PostgreSQL locally
# Create database
createdb ai_social_mirror

# Run migrations
npm run db:push
```

#### **Option B: Supabase (Recommended for Demo)**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get your database URL from Settings → Database
4. Update `.env.local` with the URL

#### **Option C: Railway**
1. Go to [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL service
4. Copy the connection URL

### **3. Environment Variables**

Create `.env.local` with:

```env
# Database
DATABASE_URL=your_database_url_here

# NextAuth
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Hugging Face API
HUGGINGFACE_API_KEY=your_huggingface_api_key

# Stripe (Optional for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
```

### **4. API Keys Setup**

#### **Hugging Face API Key:**
1. Go to [huggingface.co](https://huggingface.co)
2. Sign up/login
3. Go to Settings → Access Tokens
4. Create new token with "Read" permissions
5. Copy the token (starts with `hf_`)

#### **Google OAuth (Optional):**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` to authorized redirects

#### **Stripe (Optional):**
1. Go to [stripe.com](https://stripe.com)
2. Create account
3. Get API keys from Dashboard
4. Create product and price for Pro plan
5. Set up webhooks

### **5. Database Migration**

```bash
# Generate migration files
npm run db:generate

# Push to database
npm run db:push

# View database (optional)
npm run db:studio
```

### **6. Start Development Server**

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🎯 **Features Overview**

### **🔐 Authentication**
- **Google OAuth** - One-click signup with Google
- **Email/Password** - Traditional login (demo mode)
- **Session Management** - Secure JWT sessions
- **Protected Routes** - User-only areas

### **💳 Free User Mode**
- **5 analyses per month** - Clear usage limits
- **Upgrade prompts** - Seamless upgrade flow
- **Usage tracking** - Real-time usage display
- **Plan management** - Easy plan switching

### **📊 User Dashboard**
- **Usage Statistics** - Monthly usage and limits
- **Analysis History** - Complete analysis log
- **Plan Information** - Current plan and features
- **Upgrade Options** - Easy plan upgrades

### **🔑 API Management**
- **Environment Variables** - Secure API key storage
- **Fallback Mode** - Works without API keys
- **Error Handling** - Graceful API failures
- **Rate Limiting** - Usage-based restrictions

---

## 🚀 **Deployment Options**

### **Vercel (Recommended)**
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

### **Railway**
1. Connect GitHub repo
2. Add PostgreSQL service
3. Set environment variables
4. Deploy

### **DigitalOcean App Platform**
1. Connect repository
2. Add PostgreSQL database
3. Configure environment
4. Deploy

---

## 🧪 **Testing the Application**

### **Without API Keys (Demo Mode)**
- App works immediately with demo data
- All features functional
- Realistic analysis results
- Perfect for testing

### **With API Keys (Full Mode)**
- Real AI analysis
- Live payment processing
- Complete functionality
- Production ready

---

## 📈 **Usage Flow**

1. **User visits site** → Landing page with features
2. **Signs up** → Google OAuth or email/password
3. **Gets free plan** → 5 analyses per month
4. **Analyzes text** → Real AI analysis or demo data
5. **Views history** → Complete analysis log
6. **Upgrades** → Seamless Stripe integration
7. **Unlimited usage** → Pro plan benefits

---

## 🔧 **Troubleshooting**

### **Database Issues**
```bash
# Reset database
npm run db:push --force

# View database
npm run db:studio
```

### **Authentication Issues**
- Check Google OAuth credentials
- Verify NEXTAUTH_SECRET is set
- Ensure NEXTAUTH_URL is correct

### **API Issues**
- Verify Hugging Face API key
- Check API key permissions
- App falls back to demo mode

---

## 🎉 **Success!**

Your AI Social Mirror application is now:
- ✅ **Fully functional** with authentication
- ✅ **Database integrated** with user management
- ✅ **Free user mode** with usage limits
- ✅ **Production ready** with proper error handling
- ✅ **Scalable** with proper architecture

**The application provides a complete demo experience and can be easily upgraded to full production use!** 
