'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Menu, X, Crown, Zap } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="flex items-center">
              <Sparkles className="w-8 h-8 text-primary-600 mr-2" />
              <span className="text-xl font-bold gradient-text">
                AI Social Mirror
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-primary-600 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-primary-600 transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary-600 transition-colors">
              About
            </a>
            
            {/* Pro Badge */}
            <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              <Crown className="w-4 h-4 mr-1" />
              Pro
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors">
              Sign In
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-medium hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-primary-600 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-primary-600 transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-gray-700 hover:text-primary-600 transition-colors">
                About
              </a>
              
              <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-2 rounded-full text-sm font-medium w-fit">
                <Crown className="w-4 h-4 mr-1" />
                Pro
              </div>
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <button className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors text-left">
                  Sign In
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-medium hover:from-primary-700 hover:to-secondary-700 transition-all duration-200">
                  Get Started
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
} 