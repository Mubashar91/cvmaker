import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import { createCanvas, loadImage } from '@napi-rs/canvas';
for (const directory of ['templates', 'examples', 'cover-letters']) {
  const target = `public/${directory}/responsive`;
  await mkdir(target, { recursive: true });
  for (const name of await readdir(`public/${directory}`)) {
    if (!name.endsWith('.webp')) continue;
    const source = `public/${directory}/${name}`;
    const sourceInfo = await stat(source);
    for (const width of [320, 480, 640]) {
      const file = `${target}/${name.slice(0, -5)}-${width}.webp`;
      const existing = await stat(file).catch(() => null);
      if (existing && existing.mtimeMs >= sourceInfo.mtimeMs) continue;
      const image = await loadImage(source);
      const canvas = createCanvas(width, Math.round(width * image.height / image.width));
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
      await writeFile(file, canvas.toBuffer('image/webp', 80));
    }
  }
}
console.log('Responsive CV previews ready (320, 480 and 640px).');
