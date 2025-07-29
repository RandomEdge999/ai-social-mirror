'use client'

import { motion } from 'framer-motion'
import { Check, Crown, Zap, Star, Users, Shield } from 'lucide-react'

export default function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out the service',
      features: [
        '5 analyses per month',
        'Basic sentiment analysis',
        'Simple tone insights',
        'Email support'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'For professionals and serious users',
      features: [
        'Unlimited analyses',
        'Advanced sentiment analysis',
        'Detailed tone breakdown',
        'Intent detection',
        'Improvement suggestions',
        'Priority support',
        'Export reports',
        'Team collaboration'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'API access',
        'Dedicated support',
        'Custom training',
        'SLA guarantees',
        'On-premise options'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  const handleSubscribe = async (plan: string) => {
    // This would integrate with Stripe
    console.log(`Subscribing to ${plan} plan`)
    // In a real app, this would redirect to Stripe checkout
  }

  return (
    <section className="py-16" id="pricing">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start free and upgrade when you need more power
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative bg-white rounded-3xl shadow-lg p-8 border-2 transition-all duration-300 hover:shadow-xl ${
              plan.popular 
                ? 'border-primary-500 shadow-primary-100' 
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </div>
              </div>
            )}

            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                {plan.name === 'Pro' ? (
                  <Crown className="w-8 h-8 text-yellow-500" />
                ) : plan.name === 'Enterprise' ? (
                  <Shield className="w-8 h-8 text-blue-500" />
                ) : (
                  <Zap className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 ml-2">{plan.period}</span>
              </div>
              <p className="text-gray-600">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.name)}
              className={`w-full py-3 px-6 rounded-2xl font-semibold transition-all duration-200 ${
                plan.popular
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 shadow-lg'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {plan.cta}
            </button>

            {plan.name === 'Pro' && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">14-day free trial</span> • Cancel anytime
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
          <div className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            <span className="text-sm">Secure payments</span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            <span className="text-sm">10,000+ users</span>
          </div>
          <div className="flex items-center">
            <Star className="w-5 h-5 mr-2" />
            <span className="text-sm">4.9/5 rating</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
} 