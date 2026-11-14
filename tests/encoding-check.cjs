const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
for(const name of ['index.html','app.js','styles.css']){
 const s=fs.readFileSync(path.join(__dirname,'..','public',name),'utf8');
 assert(!/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffd]/.test(s),'Karakter rusak pada '+name);
}
console.log('PASS: encoding sumber');
