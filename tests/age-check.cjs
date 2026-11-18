const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../public/app.js'),'utf8');
const block=source.match(/\/\/ AGE START([\s\S]*?)\/\/ AGE END/);
assert(block,'Age input behavior must exist');
const state={condition:'no',consent:true,age:null,ageInput:'',ageInvalid:false};
const next={disabled:false},error={textContent:''};let handler;
const ctx=vm.createContext({formState:state,page:1,root:{addEventListener(type,fn){handler=fn;}},main:{querySelector:s=>s==='#next'?next:error}});
vm.runInContext(source.match(/function canEnter\(n\)\{.*?\}(?=\s*function go)/s)[0],ctx);
vm.runInContext(block[1],ctx);
const input=value=>handler({target:{id:'age',value}});
for(const value of ['24','0','0018']){
 input(value);assert.equal(state.age,Number(value));assert.equal(state.ageInvalid,false);assert.equal(next.disabled,false);
 assert(ctx.ageLabel().includes(String(Number(value))));
}
for(const value of ['-1','1.5','1,5','1e2','Infinity','abc','9007199254740992','<img>']){
 input(value);assert.equal(state.age,null);assert.equal(state.ageInvalid,true);assert.equal(ctx.canEnter(2),false);assert(next.disabled);assert(error.textContent);
}
input('');assert.equal(state.age,null);assert.equal(state.ageInvalid,false);assert.equal(ctx.ageLabel(),'Tidak dicatat');
state.condition='yes';input('24');assert(next.disabled,'Age must not override symptoms');
state.condition='no';state.consent=false;input('24');assert(next.disabled,'Age must not override consent');
ctx.page=5;input('99');assert.equal(state.age,24,'Ended report must not be editable');
Object.assign(ctx,{heldKeys:new Set(),go(){},answers:[[],[]]});
vm.runInContext(source.match(/\/\/ SESSION END START([\s\S]*?)\/\/ SESSION END END/)[1],ctx);
ctx.resetSession(0);assert.equal(state.age,null);assert.equal(state.ageInput,'');assert.equal(state.ageInvalid,false);
console.log('PASS: age format, optional omission, no clinical cutoff, screening guards, locked summary and reset');
