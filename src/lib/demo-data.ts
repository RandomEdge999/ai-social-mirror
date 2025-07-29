export const demoAnalysisResults = {
  sentiment: {
    score: 0.75,
    label: 'positive',
    confidence: 0.89
  },
  tone: {
    professional: 0.8,
    friendly: 0.7,
    confident: 0.6,
    empathetic: 0.4
  },
  intent: {
    primary: 'informative',
    secondary: 'persuasive',
    confidence: 0.82
  },
  suggestions: [
    'Consider adding more specific details to make your message clearer',
    'The tone is professional but could be more engaging',
    'Your confidence level is good, but could be enhanced with concrete examples'
  ],
  potentialMisinterpretations: [
    'Some readers might find this too formal',
    'The message could be perceived as lacking enthusiasm'
  ]
}

export const demoExamples = {
  social: "Just finished an amazing project! Can't wait to share the results with everyone. #excited #newproject",
  email: "Hi Sarah, I hope this email finds you well. I wanted to follow up on our discussion about the quarterly report. Looking forward to hearing from you soon. Best regards, John",
  profile: "Passionate software engineer with 5+ years of experience building scalable web applications. Love hiking, reading sci-fi novels, and trying new restaurants. Looking for meaningful connections!"
}

export const demoTexts = [
  {
    type: 'social',
    text: "Just finished an amazing project! Can't wait to share the results with everyone. #excited #newproject",
    description: "A positive social media post about completing a project"
  },
  {
    type: 'email',
    text: "Hi Sarah, I hope this email finds you well. I wanted to follow up on our discussion about the quarterly report. Looking forward to hearing from you soon. Best regards, John",
    description: "A professional follow-up email"
  },
  {
    type: 'profile',
    text: "Passionate software engineer with 5+ years of experience building scalable web applications. Love hiking, reading sci-fi novels, and trying new restaurants. Looking for meaningful connections!",
    description: "A dating profile bio"
  },
  {
    type: 'social',
    text: "Ugh, another Monday. Can't believe I have to deal with this mess again. So over it.",
    description: "A negative social media post"
  },
  {
    type: 'email',
    text: "Dear Hiring Manager, I am writing to express my strong interest in the Software Engineer position at your company. With my extensive experience in full-stack development and passion for creating innovative solutions, I am confident I would be a valuable addition to your team.",
    description: "A job application email"
  }
] 