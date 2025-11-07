import https from 'https';
import fs from 'fs';
import path from 'path';

const outputDir = path.join(process.cwd(), 'public', 'images', 'products');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const files = [
  { name: 'product-ceramic-bowl.jpg', seed: 'product-ceramic-bowl' },
  { name: 'product-textile.jpg', seed: 'product-textile' },
  { name: 'product-brass.jpg', seed: 'product-brass' },
  { name: 'product-pottery.jpg', seed: 'product-pottery' },
];

const download = (url, dest) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(dest);
  https.get(url, (res) => {
    if (res.statusCode && res.statusCode >= 400) {
      return reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
    }
    res.pipe(file);
    file.on('finish', () => file.close(resolve));
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    reject(err);
  });
});

(async () => {
  try {
    console.log('Downloading placeholder images to', outputDir);
    for (const f of files) {
      const url = `https://picsum.photos/seed/${encodeURIComponent(f.seed)}/800/800`;
      const dest = path.join(outputDir, f.name);
      console.log('Downloading', url, '->', dest);
      await download(url, dest);
    }
    console.log('Done.');
  } catch (err) {
    console.error('Error downloading images:', err);
    process.exit(1);
  }
})();
