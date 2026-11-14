const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
assert.equal(config.outputDirectory, 'public', 'Only public/ may be deployed');
const files = fs.readdirSync(path.join(root, 'public')).sort();
assert.deepEqual(files, ['app.js', 'index.html', 'styles.css'], 'Review new public files before deployment');
const allRoutes = config.headers.find(rule => rule.source === '/(.*)');
assert(allRoutes, 'Security headers must cover all routes');
const headers = Object.fromEntries(allRoutes.headers.map(header => [header.key.toLowerCase(), header.value]));
assert.equal(headers['x-content-type-options'], 'nosniff');
assert.equal(headers['referrer-policy'], 'no-referrer');
for (const permission of ['camera=()', 'microphone=()', 'geolocation=()']) {
  assert(headers['permissions-policy'].includes(permission), `Missing permission restriction: ${permission}`);
}
const csp = headers['content-security-policy'];
for (const directive of ["default-src 'self'", "script-src 'self'", "connect-src 'none'", "object-src 'none'", "base-uri 'none'", "frame-ancestors 'none'"]) {
  assert(csp.split(';').map(part => part.trim()).includes(directive), `Missing CSP directive: ${directive}`);
}
console.log('PASS: public deployment boundary and configured security headers (not a hosted HTTP test)');
