// app/api/queue/add-bulk-jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';

const NESTJS_API_URL = process.env.NESTJS_API_URL;

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const count = searchParams.get('count') || '10';
    
    const response = await fetch(`${NESTJS_API_URL}/queue/add-bulk-jobs?count=${count}`, {
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
    console.error('Add bulk jobs error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add bulk jobs' },
      { status: 500 }
    );
  }
}
