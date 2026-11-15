const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../public/app.js'),'utf8');
const block=source.match(/\/\/ SUMMARY EXPORT START([\s\S]*?)\/\/ SUMMARY EXPORT END/)[1];
let blob,clicked=0,removed=0,revoked=0,printed=0,allowed=true,fail=false;
const status={textContent:''},report={innerText:'Pengamatan\nMata kanan\nTidak terlihat\nKualitas sesi\nMakna catatan\nTindak lanjut'},timers=[];
const ctx=vm.createContext({page:5,canEnter:()=>allowed,Blob,URL:{createObjectURL(value){blob=value;return 'blob:report';},revokeObjectURL(value){assert.equal(value,'blob:report');revoked++;}},
  root:{addEventListener(){}},main:{querySelector:s=>s==='#export-status'?status:report},
  document:{body:{append(){}},createElement(){return {click(){assert.equal(this.download,'MataCheck-catatan-simulasi.txt');if(fail)throw Error('blocked');clicked++;},remove(){removed++;}};}},
  window:{print(){printed++;}},setTimeout(fn){timers.push(fn);}});
vm.runInContext(block,ctx);
(async()=>{
  for(const page of [0,1,2,3,4,6,7,8]){ctx.page=page;ctx.exportSummary('text');ctx.exportSummary('print');}
  assert.equal(clicked,0);assert.equal(printed,0);
  ctx.page=5;allowed=false;ctx.exportSummary('text');assert.equal(clicked,0);allowed=true;
  ctx.exportSummary('text');assert.equal(clicked,1);assert.equal(removed,1);
  assert.equal(blob.type,'text/plain;charset=utf-8');
  assert.equal(await blob.text(),'MataCheck - Catatan simulasi\nBukan pemeriksaan mata atau resep.\n\n'+report.innerText);
  assert.equal(revoked,0);timers.shift()();assert.equal(revoked,1);
  ctx.exportSummary('print');assert.equal(printed,1);
  fail=true;ctx.exportSummary('text');assert(status.textContent.includes('belum berhasil'));assert.equal(removed,2);timers.shift()();assert.equal(revoked,2);
  ctx.window.print=()=>{throw Error('blocked');};ctx.exportSummary('print');assert(status.textContent.includes('tidak dapat'));
  console.log('PASS: export uses visible report, guards incomplete sessions, releases URL and handles errors');
})().catch(e=>{console.error(e);process.exitCode=1;});
