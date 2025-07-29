export interface SentimentResult {
  score: number
  label: string
  confidence: number
}

export interface ToneAnalysis {
  professional: number
  friendly: number
  confident: number
  empathetic: number
}

export interface IntentResult {
  primary: string
  secondary: string
  confidence: number
}

export interface AnalysisResult {
  sentiment: SentimentResult
  tone: ToneAnalysis
  intent: IntentResult
  suggestions: string[]
  potentialMisinterpretations: string[]
}

export interface TextAnalyzerProps {
  onAnalyze: (text: string) => void
  isAnalyzing: boolean
}

export interface AnalysisResultsProps {
  results: AnalysisResult
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  stripePriceId: string
  popular?: boolean
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

export type ContentType = 'social' | 'email' | 'profile'

export interface DemoText {
  type: ContentType
  text: string
  description: string
} 