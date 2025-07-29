import { db } from './db'
import { users, userProfiles, analyses, usageLogs } from './db/schema'
import { eq, and, gte } from 'drizzle-orm'
import { startOfMonth } from 'date-fns'

export class UserService {
  // Get user profile with usage information
  static async getUserProfile(userId: string) {
    const profile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.userId, userId),
      with: {
        user: true
      }
    })

    if (!profile) {
      // Create profile if it doesn't exist
      const newProfile = await db.insert(userProfiles).values({
        userId,
        plan: 'free',
        monthlyUsage: 0,
        monthlyLimit: 5,
      }).returning()

      return newProfile[0]
    }

    return profile
  }

  // Check if user can perform analysis (within limits)
  static async canPerformAnalysis(userId: string): Promise<{ can: boolean; reason?: string }> {
    const profile = await this.getUserProfile(userId)
    
    if (profile.plan === 'pro' || profile.plan === 'enterprise') {
      return { can: true }
    }

    // Check monthly usage for free users
    const monthlyUsage = await this.getMonthlyUsage(userId)
    
    if (monthlyUsage >= profile.monthlyLimit) {
      return { 
        can: false, 
        reason: `Monthly limit reached (${profile.monthlyLimit} analyses). Upgrade to Pro for unlimited analyses.` 
      }
    }

    return { can: true }
  }

  // Get monthly usage count
  static async getMonthlyUsage(userId: string): Promise<number> {
    const startOfCurrentMonth = startOfMonth(new Date())
    
    const usage = await db
      .select()
      .from(analyses)
      .where(
        and(
          eq(analyses.userId, userId),
          gte(analyses.createdAt, startOfCurrentMonth)
        )
      )

    return usage.length
  }

  // Record analysis
  static async recordAnalysis(userId: string, analysisData: {
    text: string
    contentType: string
    sentiment: any
    tone: any
    intent: any
    suggestions: any
    misinterpretations: any
    isDemo: boolean
  }) {
    // Insert analysis
    const analysis = await db.insert(analyses).values({
      userId,
      text: analysisData.text,
      contentType: analysisData.contentType,
      sentiment: analysisData.sentiment,
      tone: analysisData.tone,
      intent: analysisData.intent,
      suggestions: analysisData.suggestions,
      misinterpretations: analysisData.misinterpretations,
      isDemo: analysisData.isDemo,
    }).returning()

    // Log usage
    await db.insert(usageLogs).values({
      userId,
      action: 'analysis',
      metadata: {
        analysisId: analysis[0].id,
        contentType: analysisData.contentType,
        isDemo: analysisData.isDemo,
      }
    })

    // Update monthly usage count
    const monthlyUsage = await this.getMonthlyUsage(userId)
    await db
      .update(userProfiles)
      .set({ monthlyUsage: monthlyUsage })
      .where(eq(userProfiles.userId, userId))

    return analysis[0]
  }

  // Get user's analysis history
  static async getAnalysisHistory(userId: string, limit = 10) {
    return await db.query.analyses.findMany({
      where: eq(analyses.userId, userId),
      orderBy: (analyses, { desc }) => [desc(analyses.createdAt)],
      limit,
    })
  }

  // Update user plan
  static async updateUserPlan(userId: string, plan: 'free' | 'pro' | 'enterprise') {
    const limits = {
      free: 5,
      pro: 999999, // Effectively unlimited
      enterprise: 999999,
    }

    await db
      .update(userProfiles)
      .set({ 
        plan,
        monthlyLimit: limits[plan],
        updatedAt: new Date()
      })
      .where(eq(userProfiles.userId, userId))
  }

  // Get usage statistics
  static async getUsageStats(userId: string) {
    const profile = await this.getUserProfile(userId)
    const monthlyUsage = await this.getMonthlyUsage(userId)
    
    return {
      plan: profile.plan,
      monthlyUsage,
      monthlyLimit: profile.monthlyLimit,
      remaining: Math.max(0, profile.monthlyLimit - monthlyUsage),
      usagePercentage: profile.monthlyLimit > 0 ? (monthlyUsage / profile.monthlyLimit) * 100 : 0,
    }
  }
} 