const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(path.join(__dirname, '../public/app.js'), 'utf8');
const helper = source.slice(source.indexOf('function eyeGuide('), source.indexOf('function render('));
const context = vm.createContext({});
vm.runInContext(helper, context);
for (const active of ['kiri', 'kanan']) {
  const html = context.eyeGuide(active);
  const cards = [...html.matchAll(/<span data-eye="(kiri|kanan)" class="(eye-open|eye-closed)">(.*?)<\/span>/gs)];
  assert.deepEqual(cards.map(card => card[1]), ['kiri', 'kanan']);
  for (const card of cards) {
    const open = card[1] === active;
    assert.equal(card[2], open ? 'eye-open' : 'eye-closed');
    assert.equal(card[3].includes('<circle'), open, 'Illustration must match the active eye');
    assert(card[3].includes(open ? 'TERBUKA' : 'DITUTUP'));
  }
}
assert(source.includes("${eyeGuide('kiri')}"), 'Switch screen must show the next eye');
console.log('PASS: fixed left/right positions and matching eye illustrations');
