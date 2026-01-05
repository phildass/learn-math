'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

interface UserData {
  id: string
  email?: string
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({
    level: '',
    interests: [] as string[],
    goals: [] as string[],
    experience: ''
  })
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      setUser(session.user)
    }
    checkUser()
  }, [router])

  const levels = [
    { id: 'beginner', name: 'Beginner', description: 'Just starting with mathematics' },
    { id: 'intermediate', name: 'Intermediate', description: 'Comfortable with basic concepts' },
    { id: 'advanced', name: 'Advanced', description: 'Ready for complex topics' },
    { id: 'expert', name: 'Expert', description: 'Advanced mathematical knowledge' }
  ]

  const interests = [
    'Algebra', 'Geometry', 'Calculus', 'Statistics', 
    'Number Theory', 'Trigonometry', 'Linear Algebra', 'Probability'
  ]

  const goals = [
    'Academic Excellence', 'Competitive Exams', 'Career Development',
    'Teaching', 'Research', 'Problem Solving'
  ]

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      completeOnboarding()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const completeOnboarding = async () => {
    if (!user) return
    
    try {
      // Save onboarding data to profile
      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_level: userData.level,
          onboarding_interests: userData.interests,
          onboarding_goals: userData.goals,
          onboarding_experience: userData.experience,
          onboarding_completed: true
        })
        .eq('id', user.id)

      if (error) throw error

      router.push('/')
    } catch (error) {
      console.error('Error completing onboarding:', error)
    }
  }

  const toggleInterest = (interest: string) => {
    setUserData({
      ...userData,
      interests: userData.interests.includes(interest)
        ? userData.interests.filter(i => i !== interest)
        : [...userData.interests, interest]
    })
  }

  const toggleGoal = (goal: string) => {
    setUserData({
      ...userData,
      goals: userData.goals.includes(goal)
        ? userData.goals.filter(g => g !== goal)
        : [...userData.goals, goal]
    })
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-1/3 h-2 mx-1 rounded ${
                  s <= step ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Step {step} of 3
          </p>
        </div>

        {/* Step 1: Level Selection */}
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What&apos;s your math level?
            </h2>
            <p className="text-gray-600 mb-6">
              Help us personalize your learning experience
            </p>
            <div className="space-y-3">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setUserData({ ...userData, level: level.id })}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    userData.level === level.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{level.name}</div>
                  <div className="text-sm text-gray-600">{level.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What interests you?
            </h2>
            <p className="text-gray-600 mb-6">
              Select the topics you&apos;d like to focus on (select multiple)
            </p>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    userData.interests.includes(interest)
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Goals */}
        {step === 3 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What are your goals?
            </h2>
            <p className="text-gray-600 mb-6">
              What do you want to achieve? (select multiple)
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {goals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    userData.goals.includes(goal)
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Previous Experience (Optional)
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Tell us about your math background..."
                value={userData.experience}
                onChange={(e) => setUserData({ ...userData, experience: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !userData.level) ||
              (step === 2 && userData.interests.length === 0) ||
              (step === 3 && userData.goals.length === 0)
            }
            className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 3 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
