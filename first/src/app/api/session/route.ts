// app/api/session/route.ts
import { NextResponse } from 'next/server'
import { getCustomSession } from '@/lib/session'

export async function GET() {
  try {
    const session = await getCustomSession()
    
    return NextResponse.json({ 
      session,
      authenticated: !!session 
    })
  } catch (error) {
    console.error('Session API error:', error)
    return NextResponse.json({ 
      session: null, 
      authenticated: false 
    }, { status: 500 })
  }
}