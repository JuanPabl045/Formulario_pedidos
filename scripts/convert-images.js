const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'public', 'img');
const outDir = path.join(srcDir, 'webp');
const manifestPath = path.join(srcDir, 'manifest-images.json');
const sizes = [400, 800, 1200];

if (!fs.existsSync(srcDir)) {
  console.error('Source directory not found:', srcDir);
  process.exit(1);
}
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => /\.(jpe?g|png)$/i.test(f));
const manifest = {};

(async () => {
  for (const file of files) {
    const full = path.join(srcDir, file);
    const name = path.parse(file).name;
    manifest[file] = { webp: [], srcset: '' };

    for (const w of sizes) {
      const outName = `${name}-${w}.webp`;
      const outPath = path.join(outDir, outName);
      try {
        await sharp(full)
          .resize({ width: w })
          .webp({ quality: 80 })
          .toFile(outPath);
        manifest[file].webp.push(path.posix.join('img/webp', outName));
      } catch (err) {
        console.error('Error converting', file, '->', outName, err.message);
      }
    }

    manifest[file].srcset = manifest[file].webp.map((p, i) => `${p} ${sizes[i]}w`).join(', ');
    console.log('Processed', file);
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Wrote manifest:', manifestPath);
})();
