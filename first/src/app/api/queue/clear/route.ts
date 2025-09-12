// app/api/queue/clear/route.ts
import { NextResponse } from 'next/server';

const NESTJS_API_URL = process.env.NESTJS_API_URL;

export async function POST() {
  try {
    const response = await fetch(`${NESTJS_API_URL}/queue/clear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Clear queue error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to clear queue' },
      { status: 500 }
    );
  }
}