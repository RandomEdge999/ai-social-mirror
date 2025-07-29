'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  MessageSquare, 
  Mail, 
  User, 
  TrendingUp, 
  Shield, 
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
  Heart
} from 'lucide-react'
import TextAnalyzer from '@/components/TextAnalyzer'
import AnalysisResults from '@/components/AnalysisResults'
import PricingSection from '@/components/PricingSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import toast from 'react-hot-toast'

export default function Home() {
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalysis = async (text: string) => {
    setIsAnalyzing(true)
    try {
      // Try to use the API first
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          contentType: 'social' // This could be dynamic based on user selection
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAnalysisResults(data.data)
        toast.success('Analysis completed successfully!')
      } else {
        // Fallback to demo data if API is not available
        await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API delay
        const { demoAnalysisResults } = await import('@/lib/demo-data')
        setAnalysisResults(demoAnalysisResults)
        toast.success('Analysis completed (demo mode)!')
      }
    } catch (error) {
      console.error('Analysis failed:', error)
      // Fallback to demo data
      try {
        const { demoAnalysisResults } = await import('@/lib/demo-data')
        setAnalysisResults(demoAnalysisResults)
        toast.success('Analysis completed (demo mode)!')
      } catch (fallbackError) {
        toast.error('Analysis failed. Please try again.')
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-primary-600 mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold gradient-text">
                AI Social Mirror
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              See how people may perceive you online with AI-powered sentiment analysis, 
              intent detection, and tone analysis.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <MessageSquare className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-gray-700">Social Posts</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <Mail className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-gray-700">Emails</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <User className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-gray-700">Dating Profiles</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Main Analyzer */}
        <section className="max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TextAnalyzer 
              onAnalyze={handleAnalysis}
              isAnalyzing={isAnalyzing}
            />
          </motion.div>
        </section>

        {/* Results Section */}
        {analysisResults && (
          <section className="max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AnalysisResults results={analysisResults} />
            </motion.div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AI Social Mirror?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Like Grammarly, but for emotional tone and social accuracy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg card-hover"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Sentiment Analysis
              </h3>
              <p className="text-gray-600">
                Understand the emotional tone of your content and how it might be perceived by different audiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg card-hover"
            >
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Intent Detection
              </h3>
              <p className="text-gray-600">
                Identify the underlying intent of your message and ensure it aligns with your goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-white rounded-2xl p-8 shadow-lg card-hover"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Tone Analysis
              </h3>
              <p className="text-gray-600">
                Get detailed insights into the professional, friendly, confident, and empathetic aspects of your tone.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 bg-white/50 rounded-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perfect For
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Students, professionals, and social media users who want to make the right impression
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-8">
            {[
              {
                icon: <User className="w-8 h-8" />,
                title: "Job Applications",
                description: "Craft professional emails and cover letters that make the right impression"
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Social Media",
                description: "Ensure your posts convey the right message and tone"
              },
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Business Communication",
                description: "Write emails that build relationships and drive results"
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Dating Profiles",
                description: "Create profiles that attract the right kind of attention"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary-600">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />
      </main>

      <Footer />
    </div>
  )
} 