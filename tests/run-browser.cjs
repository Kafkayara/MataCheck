const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { pathToFileURL } = require('node:url');
const { spawnSync } = require('node:child_process');
const assert = require('node:assert/strict');

const root = path.join(__dirname, '..');
const artifacts = path.join(__dirname, 'artifacts');
fs.mkdirSync(artifacts, { recursive: true });
// Remove previous evidence so a failed launch cannot leave an old PASS report.
for (const name of ['browser-report.txt', 'browser-output.html', 'browser-stderr.txt']) {
  fs.rmSync(path.join(artifacts, name), { force: true });
}
const candidates = [process.env.MATACHECK_BROWSER, '/usr/bin/google-chrome', '/usr/bin/chromium',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'];
const browser = candidates.find(file => file && fs.existsSync(file));
assert(browser, 'Chrome/Chromium not found. Set MATACHECK_BROWSER to its executable path.');
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'matacheck-browser-'));
try {
  const result = spawnSync(browser, ['--headless', '--disable-gpu', '--no-first-run',
    '--no-default-browser-check', `--user-data-dir=${profile}`, '--dump-dom',
    '--timeout=20000', '--virtual-time-budget=10000',
    pathToFileURL(path.join(artifacts, 'browser-test.html')).href],
  { cwd: root, encoding: 'utf8', timeout: 30000, maxBuffer: 16 * 1024 * 1024, windowsHide: true });
  fs.writeFileSync(path.join(artifacts, 'browser-output.html'), result.stdout || '');
  fs.writeFileSync(path.join(artifacts, 'browser-stderr.txt'), result.stderr || '');
  assert(!result.error, `Browser launch failed: ${result.error?.message}`);
  assert.equal(result.status, 0, `Browser exit ${result.status}; signal ${result.signal}`);
  // Only read the rendered report list, not PASS strings inside embedded test scripts.
  const list = result.stdout.match(/<ul id="results">([\s\S]*?)<\/ul>/)?.[1] || '';
  const reports = [...list.matchAll(/<li>([^<]+)<\/li>/g)].map(match => match[1]);
  fs.writeFileSync(path.join(artifacts, 'browser-report.txt'), reports.join('\n') + '\n');
  assert.equal(reports.length, 5, 'Expected five completed viewport reports');
  const sizes = ['1366 x 768', '768 x 1024', '375 x 812', '320 x 568', '812 x 375'];
  reports.forEach((report, i) => {
    console.log(report);
    assert(report.startsWith(sizes[i] + ': PASS '), 'Browser scenario failed or did not complete');
  });
} finally {
  const resolved = path.resolve(profile);
  assert.equal(path.dirname(resolved), path.resolve(os.tmpdir()));
  assert(path.basename(resolved).startsWith('matacheck-browser-'));
  try { fs.rmSync(resolved, { recursive: true, force: true }); }
  catch (error) { console.warn('Temporary browser profile cleanup failed: ' + error.code); }
}
