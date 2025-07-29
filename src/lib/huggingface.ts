import { HfInference } from '@huggingface/inference'

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export interface SentimentResult {
  label: string
  score: number
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
  sentiment: {
    score: number
    label: string
    confidence: number
  }
  tone: ToneAnalysis
  intent: IntentResult
  suggestions: string[]
  potentialMisinterpretations: string[]
}

export class HuggingFaceService {
  // Sentiment Analysis using a pre-trained model
  static async analyzeSentiment(text: string): Promise<SentimentResult> {
    try {
      const result = await hf.textClassification({
        model: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
        inputs: text,
      })
      
      return {
        label: result[0].label.toLowerCase(),
        score: result[0].score
      }
    } catch (error) {
      console.error('Sentiment analysis failed:', error)
      // Fallback to neutral sentiment
      return {
        label: 'neutral',
        score: 0.5
      }
    }
  }

  // Tone Analysis using multiple models
  static async analyzeTone(text: string): Promise<ToneAnalysis> {
    try {
      // This would use multiple specialized models for different tone aspects
      // For now, we'll simulate the analysis
      const professionalScore = await this.analyzeProfessionalTone(text)
      const friendlyScore = await this.analyzeFriendlyTone(text)
      const confidentScore = await this.analyzeConfidentTone(text)
      const empatheticScore = await this.analyzeEmpatheticTone(text)

      return {
        professional: professionalScore,
        friendly: friendlyScore,
        confident: confidentScore,
        empathetic: empatheticScore
      }
    } catch (error) {
      console.error('Tone analysis failed:', error)
      return {
        professional: 0.5,
        friendly: 0.5,
        confident: 0.5,
        empathetic: 0.5
      }
    }
  }

  // Intent Detection
  static async detectIntent(text: string): Promise<IntentResult> {
    try {
      // This would use a specialized intent classification model
      const intents = await hf.textClassification({
        model: 'facebook/bart-large-mnli',
        inputs: text,
        parameters: {
          candidate_labels: [
            'informative',
            'persuasive',
            'entertaining',
            'professional',
            'casual',
            'formal',
            'friendly',
            'authoritative'
          ]
        }
      })

      return {
        primary: intents.labels[0],
        secondary: intents.labels[1],
        confidence: intents.scores[0]
      }
    } catch (error) {
      console.error('Intent detection failed:', error)
      return {
        primary: 'informative',
        secondary: 'neutral',
        confidence: 0.5
      }
    }
  }

  // Generate suggestions based on analysis
  static async generateSuggestions(
    text: string,
    sentiment: SentimentResult,
    tone: ToneAnalysis,
    intent: IntentResult
  ): Promise<string[]> {
    const suggestions: string[] = []

    // Sentiment-based suggestions
    if (sentiment.score < 0.3) {
      suggestions.push('Consider using more positive language to improve engagement')
    } else if (sentiment.score > 0.8) {
      suggestions.push('Your positive tone is great for engagement')
    }

    // Tone-based suggestions
    if (tone.professional < 0.4) {
      suggestions.push('Consider making your tone more professional for business contexts')
    }
    if (tone.friendly < 0.3) {
      suggestions.push('Adding more friendly language could make your message more approachable')
    }
    if (tone.confident < 0.5) {
      suggestions.push('Using more confident language could strengthen your message')
    }

    // Intent-based suggestions
    if (intent.primary === 'persuasive' && intent.confidence < 0.7) {
      suggestions.push('Consider strengthening your persuasive elements with specific examples')
    }

    return suggestions.slice(0, 3) // Limit to 3 suggestions
  }

  // Identify potential misinterpretations
  static async identifyMisinterpretations(
    text: string,
    sentiment: SentimentResult,
    tone: ToneAnalysis
  ): Promise<string[]> {
    const misinterpretations: string[] = []

    // Check for potential issues
    if (tone.professional > 0.8 && tone.friendly < 0.3) {
      misinterpretations.push('Your message might be perceived as too formal or cold')
    }
    if (sentiment.score < 0.2) {
      misinterpretations.push('Your message could be interpreted as negative or complaining')
    }
    if (tone.confident > 0.8 && tone.empathetic < 0.3) {
      misinterpretations.push('Your confident tone might come across as arrogant')
    }

    return misinterpretations
  }

  // Main analysis function
  static async analyzeText(text: string): Promise<AnalysisResult> {
    try {
      // Run all analyses in parallel
      const [sentiment, tone, intent] = await Promise.all([
        this.analyzeSentiment(text),
        this.analyzeTone(text),
        this.detectIntent(text)
      ])

      // Generate suggestions and identify misinterpretations
      const [suggestions, misinterpretations] = await Promise.all([
        this.generateSuggestions(text, sentiment, tone, intent),
        this.identifyMisinterpretations(text, sentiment, tone)
      ])

      return {
        sentiment: {
          score: sentiment.score,
          label: sentiment.label,
          confidence: 0.85 // This would be calculated based on model confidence
        },
        tone,
        intent,
        suggestions,
        potentialMisinterpretations: misinterpretations
      }
    } catch (error) {
      console.error('Text analysis failed:', error)
      throw new Error('Analysis failed. Please try again.')
    }
  }

  // Helper methods for tone analysis (these would use specific models)
  private static async analyzeProfessionalTone(text: string): Promise<number> {
    // This would use a specialized model for professional tone detection
    // For now, we'll use a simple heuristic
    const professionalWords = ['professional', 'business', 'corporate', 'formal', 'official']
    const matches = professionalWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length
    return Math.min(matches / 3, 1)
  }

  private static async analyzeFriendlyTone(text: string): Promise<number> {
    const friendlyWords = ['hello', 'hi', 'thanks', 'appreciate', 'great', 'awesome', 'wonderful']
    const matches = friendlyWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length
    return Math.min(matches / 4, 1)
  }

  private static async analyzeConfidentTone(text: string): Promise<number> {
    const confidentWords = ['will', 'can', 'definitely', 'certainly', 'assure', 'guarantee']
    const matches = confidentWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length
    return Math.min(matches / 3, 1)
  }

  private static async analyzeEmpatheticTone(text: string): Promise<number> {
    const empatheticWords = ['understand', 'feel', 'sorry', 'hope', 'wish', 'care']
    const matches = empatheticWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length
    return Math.min(matches / 3, 1)
  }
} 