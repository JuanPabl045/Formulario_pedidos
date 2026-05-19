const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'css', 'site.css');
const out = path.join(__dirname, '..', 'public', 'css', 'site.min.css');

if (!fs.existsSync(src)) {
  console.error('source file not found:', src);
  process.exit(2);
}

let css = fs.readFileSync(src, 'utf8');
// Remove comments
css = css.replace(/\/\*[\s\S]*?\*\//g, '');
// Collapse whitespace
css = css.replace(/\s+/g, ' ');
// Remove space around symbols
css = css.replace(/\s*([{}:,;>~\(\)])\s*/g, '$1');
// Trim
css = css.trim();

fs.writeFileSync(out, css, 'utf8');
console.log('Wrote', out);
