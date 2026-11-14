const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const project = path.join(__dirname, '..');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'matacheck-preview-test-'));
try {
  fs.cpSync(path.join(project, 'public'), path.join(temporary, 'public'), { recursive: true });
  fs.mkdirSync(path.join(temporary, 'scripts'));
  const script = path.join(temporary, 'scripts', 'build-preview.cjs');
  fs.copyFileSync(path.join(project, 'scripts', 'build-preview.cjs'), script);
  const run = (...args) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
  const preview = path.join(temporary, 'MataCheck-Preview.html');
  assert.equal(run().status, 0, 'Build should succeed');
  const generated = fs.readFileSync(preview, 'utf8');
  assert(!generated.includes('src="app.js"'), 'Preview must embed JavaScript');
  assert(!generated.includes('href="styles.css"'), 'Preview must embed CSS');
  assert.equal(run('--check').status, 0, 'Fresh preview must pass');
  fs.appendFileSync(path.join(temporary, 'public', 'app.js'), '\n// Changed source\n');
  assert.notEqual(run('--check').status, 0, 'Stale preview must fail');
  assert.equal(fs.readFileSync(preview, 'utf8'), generated, 'Check must not rewrite preview');
  assert.equal(run().status, 0);
  const htmlPath = path.join(temporary, 'public', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  for (const anchor of ['<link rel="stylesheet" href="styles.css">', '<script src="app.js" defer></script>', '</body>']) {
    fs.writeFileSync(htmlPath, html.replace(anchor, ''));
    const previous = fs.readFileSync(preview, 'utf8');
    assert.notEqual(run().status, 0, `Missing anchor must fail: ${anchor}`);
    assert.equal(fs.readFileSync(preview, 'utf8'), previous, 'Failed build must preserve preview');
  }
  console.log('PASS: standalone build, stale preview detection and missing asset rejection');
} finally {
  const resolved = path.resolve(temporary);
  assert.equal(path.dirname(resolved), path.resolve(os.tmpdir()));
  assert(path.basename(resolved).startsWith('matacheck-preview-test-'));
  fs.rmSync(resolved, { recursive: true, force: true });
}
