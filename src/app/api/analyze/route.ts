import { NextRequest, NextResponse } from 'next/server'
import { HuggingFaceService } from '@/lib/huggingface'

export async function POST(request: NextRequest) {
  try {
    const { text, contentType } = await request.json()

    // Validate input
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      )
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: 'Text must be less than 5000 characters' },
        { status: 400 }
      )
    }

    // Check if Hugging Face API key is available
    if (!process.env.HUGGINGFACE_API_KEY) {
      // Return demo data if API key is not configured
      const { demoAnalysisResults } = await import('@/lib/demo-data')
      return NextResponse.json({
        success: true,
        data: demoAnalysisResults,
        contentType,
        timestamp: new Date().toISOString(),
        demo: true
      })
    }

    // Analyze the text using Hugging Face
    const analysis = await HuggingFaceService.analyzeText(text)

    // Return the analysis results
    return NextResponse.json({
      success: true,
      data: analysis,
      contentType,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Analysis API error:', error)
    
    // Try to return demo data as fallback
    try {
      const { demoAnalysisResults } = await import('@/lib/demo-data')
      return NextResponse.json({
        success: true,
        data: demoAnalysisResults,
        contentType: 'social',
        timestamp: new Date().toISOString(),
        demo: true,
        error: 'Using demo data due to API error'
      })
    } catch (fallbackError) {
      return NextResponse.json(
        { 
          error: 'Analysis failed. Please try again.',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      )
    }
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'AI Social Mirror Analysis API',
      version: '1.0.0',
      endpoints: {
        analyze: 'POST /api/analyze'
      }
    }
  )
} 