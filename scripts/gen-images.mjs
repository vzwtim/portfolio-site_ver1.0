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

const files = await fg(`${INPUT_DIR}/**/*.{jpg,jpeg,png,webp}`, { caseSensitiveMatch: false });

// Add a definitive filter to ensure only allowed extensions are processed
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
const filteredFiles = files.filter(file => {
  const ext = path.extname(file).toLowerCase();
  return allowedExtensions.includes(ext);
});

if (filteredFiles.length === 0) {
  console.log('No processable input images found in', INPUT_DIR);
  process.exit(0);
}

const blurMapPath = path.join(OUT_DIR, 'blur-map.json');
const blurMap = {};
try {
  const existingBlurMap = await fs.readFile(blurMapPath, 'utf-8');
  Object.assign(blurMap, JSON.parse(existingBlurMap));
} catch (e) {
  if (e.code !== 'ENOENT') throw e;
}

let processedCount = 0;

for (const inPath of filteredFiles) {
  const rel = path.relative(INPUT_DIR, inPath);
  const relDir = path.dirname(rel);
  const baseName = path.basename(rel).replace(/\.(jpg|jpeg|png|webp)$/i, '');

  const outThumbDir   = path.join(OUT_DIR, 'thumbs', relDir);
  const outDisplayDir = path.join(OUT_DIR, 'display', relDir);
  await fs.mkdir(outThumbDir, { recursive: true });
  await fs.mkdir(outDisplayDir, { recursive: true });

  let fileProcessed = false;
  const inStat = await fs.stat(inPath);

  const needsProcessing = async (outPath) => {
    try {
      const outStat = await fs.stat(outPath);
      return inStat.mtimeMs > outStat.mtimeMs;
    } catch (e) {
      if (e.code === 'ENOENT') return true;
      throw e;
    }
  };

  // --- thumbs ---
  for (const w of THUMB_WIDTHS) {
    const resizeOpts = {
      width: w,
      height: CROP_SQUARE_THUMBS ? w : undefined,
      fit: CROP_SQUARE_THUMBS ? 'cover' : 'inside',
      withoutEnlargement: true,
    };
    const avifPath = path.join(outThumbDir, `${baseName}-${w}.avif`);
    if (await needsProcessing(avifPath)) {
      await sharp(inPath).resize(resizeOpts).avif({ quality: 50, effort: 4, chromaSubsampling: '4:4:4' }).toFile(avifPath);
      fileProcessed = true;
    }
    const webpPath = path.join(outThumbDir, `${baseName}-${w}.webp`);
    if (await needsProcessing(webpPath)) {
      await sharp(inPath).resize(resizeOpts).webp({ quality: 70 }).toFile(webpPath);
      fileProcessed = true;
    }
  }

  // --- display ---
  for (const w of DISPLAY_WIDTHS) {
    const resizeOpts = { width: w, fit: 'inside', withoutEnlargement: true };
    const avifPath = path.join(outDisplayDir, `${baseName}-${w}.avif`);
    if (await needsProcessing(avifPath)) {
      await sharp(inPath).resize(resizeOpts).avif({ quality: 55, effort: 5 }).toFile(avifPath);
      fileProcessed = true;
    }
    const webpPath = path.join(outDisplayDir, `${baseName}-${w}.webp`);
    if (await needsProcessing(webpPath)) {
      await sharp(inPath).resize(resizeOpts).webp({ quality: 75 }).toFile(webpPath);
      fileProcessed = true;
    }
  }

  // --- blur placeholder ---
  const blurKey = `/images/${rel.replace(/\\/g, '/')}`;
  if (!blurMap[blurKey] || fileProcessed) {
    const blurBuf = await sharp(inPath).resize({ width: 24, fit: 'inside' }).webp({ quality: 50 }).toBuffer();
    blurMap[blurKey] = `data:image/webp;base64,${blurBuf.toString('base64')}`;
  }

  if (fileProcessed) {
    console.log('→', rel);
    processedCount++;
  }
}

await fs.writeFile(blurMapPath, JSON.stringify(blurMap, null, 2));
console.log('done:', processedCount, 'new files processed.', filteredFiles.length, 'total files checked.');
