'use client'

import { createClient } from 'supabase/supabase'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 초기 세션 체크
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await createClient.auth.getSession();
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // 인증 상태 변경 구독
    const {
      data: { subscription },
    } = createClient.auth.onAuthStateChange((_event, session) => {  
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      await createClient.auth.signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return {
    user,
    isLoading,
    signOut,
  }
}