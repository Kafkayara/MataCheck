const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, 'public', name), 'utf8');
const html = read('index.html')
  .replace('<link rel="stylesheet" href="styles.css">', () => '<style>' + read('styles.css') + '</style>')
  .replace('<script src="app.js" defer></script>', '')
  .replace('</body>', () => '<script>' + read('app.js') + '</script></body>');
if (process.argv.includes('--check')) {
  if (html !== fs.readFileSync(path.join(root, 'MataCheck-Preview.html'), 'utf8')) {
    console.error('Preview tidak sinkron. Jalankan npm run build:preview.');
    process.exit(1);
  }
  console.log('PASS: preview sesuai sumber utama');
} else {
  fs.writeFileSync(path.join(root, 'MataCheck-Preview.html'), html, 'utf8');
  console.log('Preview diperbarui dari public/');
}
