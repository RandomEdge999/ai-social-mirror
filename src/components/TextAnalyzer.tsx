'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, Sparkles } from 'lucide-react'

interface TextAnalyzerProps {
  onAnalyze: (text: string) => void
  isAnalyzing: boolean
}

export default function TextAnalyzer({ onAnalyze, isAnalyzing }: TextAnalyzerProps) {
  const [text, setText] = useState('')
  const [contentType, setContentType] = useState<'social' | 'email' | 'profile'>('social')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() && !isAnalyzing) {
      onAnalyze(text.trim())
    }
  }

  const examples: Record<'social' | 'email' | 'profile', string> = {
    social: "Just finished an amazing project! Can't wait to share the results with everyone. #excited #newproject",
    email: "Hi Sarah, I hope this email finds you well. I wanted to follow up on our discussion about the quarterly report. Looking forward to hearing from you soon. Best regards, John",
    profile: "Passionate software engineer with 5+ years of experience building scalable web applications. Love hiking, reading sci-fi novels, and trying new restaurants. Looking for meaningful connections!"
  }

  const loadExample = () => {
    setText(examples[contentType])
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6 text-primary-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">
            Analyze Your Content
          </h2>
        </div>
        <p className="text-gray-600">
          Paste your social post, email, or bio to see how others might perceive it
        </p>
      </div>

      {/* Content Type Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-full p-1">
          {[
            { key: 'social', label: 'Social Post', icon: '📱' },
            { key: 'email', label: 'Email', icon: '📧' },
            { key: 'profile', label: 'Profile', icon: '👤' }
          ].map((type) => (
            <button
              key={type.key}
              onClick={() => setContentType(type.key as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                contentType === type.key
                  ? 'bg-white text-primary-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Text Input */}
        <div>
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
            Your Content
          </label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Paste your ${contentType === 'social' ? 'social media post' : contentType === 'email' ? 'email' : 'profile bio'} here...`}
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            disabled={isAnalyzing}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {text.length} characters
            </span>
            <button
              type="button"
              onClick={loadExample}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Load example
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!text.trim() || isAnalyzing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-200 flex items-center justify-center ${
            !text.trim() || isAnalyzing
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-lg'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Analyze Content
            </>
          )}
        </motion.button>
      </form>

      {/* Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-2xl">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Tips for better analysis:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Include context about your audience and goals</li>
          <li>• Be specific about the tone you're aiming for</li>
          <li>• Consider the platform and medium you're using</li>
        </ul>
      </div>
    </div>
  )
} 