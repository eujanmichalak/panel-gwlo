import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Twoja logika pobierania statystyk
    return NextResponse.json({ success: true, stats: [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}