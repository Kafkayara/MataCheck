const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.join(__dirname, '..');
const preview = fs.readFileSync(path.join(root, 'MataCheck-Preview.html'), 'utf8');
const scenario = fs.readFileSync(path.join(__dirname, 'browser-scenario.js'), 'utf8');
const hash = crypto.createHash('sha256').update(preview).digest('hex');
const payload = JSON.stringify(preview.replace('</body>', () => '<script>' + scenario + '</script></body>')).replace(/</g, '\\u003c');
const html = `<!doctype html><html lang="id"><meta charset="utf-8"><title>MataCheck browser checks</title>
<style>body{font:16px/1.5 sans-serif;margin:24px}iframe{display:block;border:1px solid #777;max-width:none;margin:20px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere}li{margin:12px 0}</style>
<h1>MataCheck browser checks</h1><p>Preview SHA-256: ${hash}</p>
<p>Viewport iframe nyata, bukan perangkat ponsel fisik. Tunggu kelima hasil selesai.</p>
<ul id="results"></ul><div id="frames"></div><script>
const sizes = [[1366,768],[768,1024],[375,812],[320,568],[812,375]];
const source = ${payload}; let index = 0;
function next() {
  if(index === sizes.length) return;
  const [width,height] = sizes[index++];
  const item = document.createElement('li'); item.textContent = width+' x '+height+': RUNNING';
  document.querySelector('#results').append(item);
  const frame = document.createElement('iframe'); frame.width=width; frame.height=height;
  frame.title='MataCheck '+width+' x '+height;
  frame.onload=()=>{
    const report=frame.contentDocument.querySelector('#qa-result');
    item.textContent=width+' x '+height+': '+(report?report.textContent:'FAIL: missing test report');
    next();
  };
  frame.srcdoc=source; document.querySelector('#frames').append(frame);
}
next();
</script></html>`;
const artifacts = path.join(__dirname, 'artifacts');
fs.mkdirSync(artifacts, { recursive: true });
fs.writeFileSync(path.join(artifacts, 'browser-test.html'), html, 'utf8');
console.log('Browser fixture ready: tests/artifacts/browser-test.html');
console.log('Not executed yet. Open the file in a browser and inspect all five reports.');
