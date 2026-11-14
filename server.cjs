const http=require('node:http');const fs=require('node:fs');const path=require('node:path');
const root=path.join(__dirname,'public');
const files={'/':'index.html','/index.html':'index.html','/styles.css':'styles.css','/app.js':'app.js'};
http.createServer((req,res)=>{const name=files[new URL(req.url,'http://localhost').pathname];if(!name){res.writeHead(404);return res.end('Not found')}const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};res.writeHead(200,{'Content-Type':types[path.extname(name)],'X-Content-Type-Options':'nosniff','Cache-Control':'no-store'});fs.createReadStream(path.join(root,name)).pipe(res)}).listen(4173,'127.0.0.1',()=>console.log('MataCheck: http://127.0.0.1:4173'));
