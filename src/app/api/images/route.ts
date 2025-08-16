import { NextResponse } from 'next/server';
import manifest from './manifest.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword') ?? '';
  const matched = manifest.filter((file) => file.includes(keyword));
  return NextResponse.json(matched.map((file) => `/images/${file}`));
}
