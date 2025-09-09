// components/SessionProvider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CustomSession, CustomUser } from '@/lib/session'
import { useSession as useNextAuthSession } from 'next-auth/react'

interface SessionContextType {
  session: CustomSession | null
  user: CustomUser | null
  isLoading: boolean
  refreshSession: () => Promise<void>
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  user: null,
  isLoading: true,
  refreshSession: async () => {}
})

export function CustomSessionProvider({ 
  children,
  initialSession 
}: { 
  children: React.ReactNode
  initialSession?: CustomSession | null
}) {
  const [session, setSession] = useState<CustomSession | null>(initialSession || null)
  const [isLoading, setIsLoading] = useState(!initialSession)
  
  const { data: nextAuthSession, status } = useNextAuthSession()

  const refreshSession = async () => {
    try {
      const response = await fetch('/api/session')
      if (response.ok) {
        const data = await response.json()
        setSession(data.session)
      } else {
        setSession(null)
      }
    } catch (error) {
      console.error('Error refreshing session:', error)
      setSession(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // If NextAuth session exists, prioritize it
    if (nextAuthSession?.user) {
      setSession({
        user: {
          id: nextAuthSession.user.id || '',
          email: nextAuthSession.user.email || '',
          name: nextAuthSession.user.name || '',
          image: nextAuthSession.user.image || '',
          authType: 'github'
        },
        expires: nextAuthSession.expires
      })
      setIsLoading(false)
    } else if (status === 'unauthenticated') {
      // Only check for credentials session if no NextAuth session
      refreshSession()
    }
  }, [nextAuthSession, status])

  return (
    <SessionContext.Provider 
      value={{
        session,
        user: session?.user || null,
        isLoading: isLoading || status === 'loading',
        refreshSession
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useCustomSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useCustomSession must be used within CustomSessionProvider')
  }
  return context
}