import Stripe from 'stripe'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  stripePriceId: string
}

export interface CreateCheckoutSessionParams {
  priceId: string
  successUrl: string
  cancelUrl: string
  customerEmail?: string
}

export interface CreateCustomerPortalParams {
  customerId: string
  returnUrl: string
}

export class StripeService {
  // Available subscription plans
  static readonly PLANS: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      interval: 'month',
      features: [
        '5 analyses per month',
        'Basic sentiment analysis',
        'Simple tone insights',
        'Email support'
      ],
      stripePriceId: ''
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 9.99,
      interval: 'month',
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
      stripePriceId: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_monthly'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 0, // Custom pricing
      interval: 'month',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'API access',
        'Dedicated support',
        'Custom training',
        'SLA guarantees',
        'On-premise options'
      ],
      stripePriceId: ''
    }
  ]

  // Create a checkout session for subscription
  static async createCheckoutSession(params: CreateCheckoutSessionParams) {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: params.priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: params.successUrl,
        cancel_url: params.cancelUrl,
        customer_email: params.customerEmail,
        allow_promotion_codes: true,
        billing_address_collection: 'auto',
        metadata: {
          product: 'ai-social-mirror-pro'
        }
      })

      return session
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw new Error('Failed to create checkout session')
    }
  }

  // Create a customer portal session
  static async createCustomerPortalSession(params: CreateCustomerPortalParams) {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: params.customerId,
        return_url: params.returnUrl,
      })

      return session
    } catch (error) {
      console.error('Error creating customer portal session:', error)
      throw new Error('Failed to create customer portal session')
    }
  }

  // Get subscription details
  static async getSubscription(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['customer', 'items.data.price.product']
      })

      return subscription
    } catch (error) {
      console.error('Error retrieving subscription:', error)
      throw new Error('Failed to retrieve subscription')
    }
  }

  // Cancel subscription
  static async cancelSubscription(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true
      })

      return subscription
    } catch (error) {
      console.error('Error canceling subscription:', error)
      throw new Error('Failed to cancel subscription')
    }
  }

  // Reactivate subscription
  static async reactivateSubscription(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false
      })

      return subscription
    } catch (error) {
      console.error('Error reactivating subscription:', error)
      throw new Error('Failed to reactivate subscription')
    }
  }

  // Get customer details
  static async getCustomer(customerId: string) {
    try {
      const customer = await stripe.customers.retrieve(customerId)
      return customer
    } catch (error) {
      console.error('Error retrieving customer:', error)
      throw new Error('Failed to retrieve customer')
    }
  }

  // Create a customer
  static async createCustomer(email: string, name?: string) {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
        metadata: {
          product: 'ai-social-mirror'
        }
      })

      return customer
    } catch (error) {
      console.error('Error creating customer:', error)
      throw new Error('Failed to create customer')
    }
  }

  // Get usage-based pricing (for API calls)
  static async createUsageRecord(subscriptionItemId: string, quantity: number) {
    try {
      const usageRecord = await stripe.subscriptionItems.createUsageRecord(
        subscriptionItemId,
        {
          quantity,
          timestamp: Math.floor(Date.now() / 1000),
          action: 'increment'
        }
      )

      return usageRecord
    } catch (error) {
      console.error('Error creating usage record:', error)
      throw new Error('Failed to create usage record')
    }
  }

  // Handle webhook events
  static async handleWebhookEvent(event: Stripe.Event) {
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
          break
        case 'customer.subscription.created':
          await this.handleSubscriptionCreated(event.data.object as Stripe.Subscription)
          break
        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
          break
        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
          break
        case 'invoice.payment_succeeded':
          await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice)
          break
        case 'invoice.payment_failed':
          await this.handlePaymentFailed(event.data.object as Stripe.Invoice)
          break
        default:
          console.log(`Unhandled event type: ${event.type}`)
      }
    } catch (error) {
      console.error('Error handling webhook event:', error)
      throw error
    }
  }

  // Webhook event handlers
  private static async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    // Handle successful checkout completion
    console.log('Checkout session completed:', session.id)
    // Here you would typically:
    // 1. Update user's subscription status in your database
    // 2. Send welcome email
    // 3. Grant access to premium features
  }

  private static async handleSubscriptionCreated(subscription: Stripe.Subscription) {
    console.log('Subscription created:', subscription.id)
    // Handle new subscription creation
  }

  private static async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    console.log('Subscription updated:', subscription.id)
    // Handle subscription updates (plan changes, etc.)
  }

  private static async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    console.log('Subscription deleted:', subscription.id)
    // Handle subscription cancellation
  }

  private static async handlePaymentSucceeded(invoice: Stripe.Invoice) {
    console.log('Payment succeeded:', invoice.id)
    // Handle successful payment
  }

  private static async handlePaymentFailed(invoice: Stripe.Invoice) {
    console.log('Payment failed:', invoice.id)
    // Handle failed payment
  }

  // Utility methods
  static getPlanById(planId: string): SubscriptionPlan | undefined {
    return this.PLANS.find(plan => plan.id === planId)
  }

  static getPlanByStripePriceId(priceId: string): SubscriptionPlan | undefined {
    return this.PLANS.find(plan => plan.stripePriceId === priceId)
  }

  static isSubscriptionActive(subscription: Stripe.Subscription): boolean {
    return subscription.status === 'active' || subscription.status === 'trialing'
  }

  static isSubscriptionCanceled(subscription: Stripe.Subscription): boolean {
    return subscription.cancel_at_period_end || subscription.status === 'canceled'
  }
} 