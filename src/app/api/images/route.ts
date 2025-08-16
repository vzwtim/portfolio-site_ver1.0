import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword') ?? '';
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  let files: string[] = [];
  try {
    files = fs.readdirSync(imagesDir);
  } catch (err) {
    return NextResponse.json([]);
  }
  const matched = files.filter((file) => file.includes(keyword));
  return NextResponse.json(matched.map((file) => `/images/${file}`));
}
