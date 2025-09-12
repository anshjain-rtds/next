// app/api/queue/status/route.ts
import { NextResponse } from 'next/server';

const NESTJS_API_URL = process.env.NESTJS_API_URL;

export async function GET() {
  try {
    const response = await fetch(`${NESTJS_API_URL}/queue/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Queue status fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch queue status' },
      { status: 500 }
    );
  }
}