'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Zap, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Info,
  ThumbsUp,
  ThumbsDown,
  Target,
  MessageSquare
} from 'lucide-react'

interface AnalysisResultsProps {
  results: {
    sentiment: {
      score: number
      label: string
      confidence: number
    }
    tone: {
      professional: number
      friendly: number
      confident: number
      empathetic: number
    }
    intent: {
      primary: string
      secondary: string
      confidence: number
    }
    suggestions: string[]
    potentialMisinterpretations: string[]
  }
}

export default function AnalysisResults({ results }: AnalysisResultsProps) {
  const getSentimentColor = (score: number) => {
    if (score >= 0.7) return 'text-green-600'
    if (score >= 0.4) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getSentimentIcon = (score: number) => {
    if (score >= 0.7) return <ThumbsUp className="w-5 h-5" />
    if (score >= 0.4) return <Info className="w-5 h-5" />
    return <ThumbsDown className="w-5 h-5" />
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600'
    if (confidence >= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-8">
      {/* Overall Sentiment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
            <TrendingUp className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Overall Sentiment</h3>
            <p className="text-gray-600">How your content might be perceived emotionally</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-2xl">
            <div className={`flex items-center justify-center mb-2 ${getSentimentColor(results.sentiment.score)}`}>
              {getSentimentIcon(results.sentiment.score)}
            </div>
            <div className="text-2xl font-bold text-gray-900 capitalize">
              {results.sentiment.label}
            </div>
            <div className="text-sm text-gray-600">Sentiment</div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-2xl">
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(results.sentiment.score * 100)}%
            </div>
            <div className="text-sm text-gray-600">Sentiment Score</div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-2xl">
            <div className={`text-2xl font-bold ${getConfidenceColor(results.sentiment.confidence)}`}>
              {Math.round(results.sentiment.confidence * 100)}%
            </div>
            <div className="text-sm text-gray-600">Confidence</div>
          </div>
        </div>
      </motion.div>

      {/* Tone Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mr-4">
            <Shield className="w-6 h-6 text-secondary-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Tone Analysis</h3>
            <p className="text-gray-600">Breakdown of different tone characteristics</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(results.tone).map(([key, value]) => (
            <div key={key} className="p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {key}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {Math.round(value * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${value * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Intent Detection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
            <Target className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Intent Detection</h3>
            <p className="text-gray-600">What your message is trying to achieve</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-semibold text-gray-900">Primary Intent</span>
            </div>
            <div className="text-lg font-medium text-gray-700 capitalize">
              {results.intent.primary}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center mb-2">
              <Info className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-semibold text-gray-900">Secondary Intent</span>
            </div>
            <div className="text-lg font-medium text-gray-700 capitalize">
              {results.intent.secondary}
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-2xl">
          <div className="flex items-center mb-2">
            <Zap className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-semibold text-blue-900">Confidence Level</span>
          </div>
          <div className={`text-lg font-bold ${getConfidenceColor(results.intent.confidence)}`}>
            {Math.round(results.intent.confidence * 100)}% confident
          </div>
        </div>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
            <MessageSquare className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Improvement Suggestions</h3>
            <p className="text-gray-600">Tips to enhance your message's impact</p>
          </div>
        </div>

        <div className="space-y-4">
          {results.suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start p-4 bg-yellow-50 rounded-2xl">
              <CheckCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-800">{suggestion}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Potential Misinterpretations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Potential Misinterpretations</h3>
            <p className="text-gray-600">How your message might be misunderstood</p>
          </div>
        </div>

        <div className="space-y-4">
          {results.potentialMisinterpretations.map((misinterpretation, index) => (
            <div key={index} className="flex items-start p-4 bg-red-50 rounded-2xl">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-800">{misinterpretation}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 