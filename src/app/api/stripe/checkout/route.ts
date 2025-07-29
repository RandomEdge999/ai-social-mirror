import { NextRequest, NextResponse } from 'next/server'
import { StripeService } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { priceId, successUrl, cancelUrl, customerEmail } = await request.json()

    // Validate input
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    if (!successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: 'Success and cancel URLs are required' },
        { status: 400 }
      )
    }

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { 
          error: 'Stripe is not configured',
          details: 'Please add STRIPE_SECRET_KEY to your environment variables'
        },
        { status: 500 }
      )
    }

    // Create checkout session
    const session = await StripeService.createCheckoutSession({
      priceId,
      successUrl,
      cancelUrl,
      customerEmail
    })

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url
    })

  } catch (error) {
    console.error('Stripe checkout error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 