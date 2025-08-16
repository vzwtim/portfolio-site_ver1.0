import { NextResponse } from 'next/server';
import manifest from './manifest.json';
import { optimizedImage } from '@/lib/optimizedImage';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword') ?? '';
  const matched = manifest.filter((file) => file.includes(keyword));
  return NextResponse.json(
    matched.map((file) => optimizedImage(`/images/${file}`, { type: 'thumbs', width: 480 }))
  );
}
