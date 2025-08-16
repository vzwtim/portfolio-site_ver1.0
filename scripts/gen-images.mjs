// scripts/gen-images.mjs (ESM)
import fg from 'fast-glob';
import path from 'node:path';
import fs from 'node:fs/promises';
import sharp from 'sharp';

const INPUT_DIR = 'public/images';     // 元画像
const OUT_DIR   = 'public/optimized';  // 出力先
const THUMB_WIDTHS   = [320, 480];     // サムネ用
const DISPLAY_WIDTHS = [1200, 1600, 2400]; // 表示用（モーダル等）
const CROP_SQUARE_THUMBS = false;      // サムネを正方形トリミングしたいなら true

await fs.mkdir(OUT_DIR, { recursive: true });

const files = await fg(`${INPUT_DIR}/**/*.{jpg,jpeg,png}`, { caseSensitiveMatch: false });

if (files.length === 0) {
  console.log('No input images found in', INPUT_DIR);
  process.exit(0);
}

const blurMap = {};

for (const inPath of files) {
  const rel = path.relative(INPUT_DIR, inPath);               // ex) trip/trip_eu_1.jpg
  const relDir = path.dirname(rel);                            // ex) trip
  const baseName = path.basename(rel).replace(/\.(jpg|jpeg|png)$/i, ''); // ex) trip_eu_1

  const outThumbDir   = path.join(OUT_DIR, 'thumbs', relDir);
  const outDisplayDir = path.join(OUT_DIR, 'display', relDir);
  await fs.mkdir(outThumbDir, { recursive: true });
  await fs.mkdir(outDisplayDir, { recursive: true });

  // --- thumbs ---
  for (const w of THUMB_WIDTHS) {
    const resizeOpts = {
      width: w,
      height: CROP_SQUARE_THUMBS ? w : undefined,
      fit: CROP_SQUARE_THUMBS ? 'cover' : 'inside',
      withoutEnlargement: true,
    };
    await sharp(inPath).resize(resizeOpts)
      .avif({ quality: 50, effort: 4, chromaSubsampling: '4:4:4' })
      .toFile(path.join(outThumbDir, `${baseName}-${w}.avif`));
    await sharp(inPath).resize(resizeOpts)
      .webp({ quality: 70 })
      .toFile(path.join(outThumbDir, `${baseName}-${w}.webp`));
  }

  // --- display ---
  for (const w of DISPLAY_WIDTHS) {
    const resizeOpts = { width: w, fit: 'inside', withoutEnlargement: true };
    await sharp(inPath).resize(resizeOpts)
      .avif({ quality: 55, effort: 5 })
      .toFile(path.join(outDisplayDir, `${baseName}-${w}.avif`));
    await sharp(inPath).resize(resizeOpts)
      .webp({ quality: 75 })
      .toFile(path.join(outDisplayDir, `${baseName}-${w}.webp`));
  }

  // --- blur placeholder ---
  const blurBuf = await sharp(inPath).resize({ width: 24, fit: 'inside' }).webp({ quality: 50 }).toBuffer();
  blurMap[`/images/${rel.replace(/\\/g, '/')}`] = `data:image/webp;base64,${blurBuf.toString('base64')}`;

  console.log('→', rel);
}

await fs.writeFile(path.join(OUT_DIR, 'blur-map.json'), JSON.stringify(blurMap, null, 2));
console.log('done:', files.length, 'files processed');
