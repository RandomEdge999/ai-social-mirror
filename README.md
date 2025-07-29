# AI Social Mirror

See how people may perceive you online with AI-powered sentiment analysis, intent detection, and tone analysis.

## 🚀 Features

- **Sentiment Analysis**: Understand the emotional tone of your content
- **Intent Detection**: Identify what your message is trying to achieve
- **Tone Analysis**: Get detailed insights into professional, friendly, confident, and empathetic aspects
- **Improvement Suggestions**: Receive actionable tips to enhance your message
- **Misinterpretation Detection**: Identify potential ways your message might be misunderstood
- **Multiple Content Types**: Analyze social posts, emails, and dating profiles
- **Pro Features**: Advanced analytics, unlimited analyses, and team collaboration

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **AI/ML**: Hugging Face Inference API
- **Payments**: Stripe
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Hugging Face API key
- Stripe account (for payments)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd ai-social-mirror
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Copy the example environment file and fill in your API keys:

```bash
cp env.example .env.local
```

Edit `.env.local` with your actual API keys:

```env
# Hugging Face API Configuration
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_PRO_PRICE_ID=price_your_pro_plan_price_id_here
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 API Setup

### Hugging Face API

1. Go to [Hugging Face](https://huggingface.co/)
2. Create an account and get your API key
3. Add the API key to your `.env.local` file

### Stripe Setup

1. Create a [Stripe account](https://stripe.com/)
2. Get your API keys from the Stripe dashboard
3. Create a product and price for the Pro plan
4. Set up webhooks for payment events
5. Add all keys to your `.env.local` file

## 📁 Project Structure

```
ai-social-mirror/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analyze/
│   │   │   │   └── route.ts
│   │   │   └── stripe/
│   │   │       ├── checkout/
│   │   │       │   └── route.ts
│   │   │       └── webhook/
│   │   │           └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AnalysisResults.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── PricingSection.tsx
│   │   └── TextAnalyzer.tsx
│   └── lib/
│       ├── huggingface.ts
│       └── stripe.ts
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎯 Usage

### Basic Text Analysis

1. Navigate to the main page
2. Select the content type (Social Post, Email, or Profile)
3. Paste your text in the input area
4. Click "Analyze Content"
5. Review the comprehensive analysis results

### Understanding Results

The analysis provides:

- **Overall Sentiment**: Positive, negative, or neutral with confidence score
- **Tone Breakdown**: Professional, friendly, confident, and empathetic scores
- **Intent Detection**: Primary and secondary intent with confidence
- **Improvement Suggestions**: Actionable tips to enhance your message
- **Potential Misinterpretations**: Ways your message might be misunderstood

## 💳 Subscription Plans

### Free Plan
- 5 analyses per month
- Basic sentiment analysis
- Simple tone insights
- Email support

### Pro Plan ($9.99/month)
- Unlimited analyses
- Advanced sentiment analysis
- Detailed tone breakdown
- Intent detection
- Improvement suggestions
- Priority support
- Export reports
- Team collaboration

### Enterprise Plan
- Everything in Pro
- Custom integrations
- API access
- Dedicated support
- Custom training
- SLA guarantees
- On-premise options

## 🔌 API Endpoints

### Analyze Text
```http
POST /api/analyze
Content-Type: application/json

{
  "text": "Your text to analyze",
  "contentType": "social"
}
```

### Create Checkout Session
```http
POST /api/stripe/checkout
Content-Type: application/json

{
  "priceId": "price_xxx",
  "successUrl": "https://yoursite.com/success",
  "cancelUrl": "https://yoursite.com/cancel",
  "customerEmail": "user@example.com"
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Email: support@aisocialmirror.com
- Documentation: [docs.aisocialmirror.com](https://docs.aisocialmirror.com)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) for AI models
- [Stripe](https://stripe.com/) for payment processing
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

---

Made with ❤️ for better online communication 
