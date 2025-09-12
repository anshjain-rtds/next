// app/api/queue/add-delayed-job/route.ts
import { NextRequest, NextResponse } from 'next/server';

const NESTJS_API_URL = process.env.NESTJS_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${NESTJS_API_URL}/queue/add-delayed-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Add delayed job error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add delayed job' },
      { status: 500 }
    );
  }
}
