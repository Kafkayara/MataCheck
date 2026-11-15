const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../public/app.js'),'utf8');
const block=source.match(/\/\/ INTERRUPTION START([\s\S]*?)\/\/ INTERRUPTION END/);
assert(block,'Interruption handler missing');
const ctx=vm.createContext({formState:{interruptions:[0,0]},page:4,q:2,ready:true,paused:false,interrupted:false,answers:[['a','b','c'],['a','b']],heldKeys:new Set(['p']),render(){}});
vm.runInContext(block[1],ctx);ctx.interruptSession();
assert.equal(ctx.paused,true);assert.equal(ctx.interrupted,true);assert.equal(ctx.q,0);assert.equal(ctx.answers[1].length,0);assert.equal(ctx.answers[0].length,3);assert.equal(ctx.heldKeys.size,0);
ctx.interruptSession();assert.equal(ctx.answers[0].length,3);
assert.equal(ctx.formState.interruptions[1],1,"Repeated blur/hidden signals must count once");
for(const page of [0,1,2,5,6,7,8]){ctx.page=page;ctx.paused=false;ctx.interrupted=false;ctx.interruptSession();assert.equal(ctx.paused,false);}
ctx.page=3;ctx.ready=false;ctx.interruptSession();assert.equal(ctx.paused,false);
ctx.ready=true;ctx.paused=true;ctx.q=1;ctx.answers=[['a'],[]];ctx.interruptSession();assert.equal(ctx.q,0,'Hidden tab during manual pause must discard active-eye responses');
assert.equal(ctx.formState.interruptions[0],1);
assert.equal(ctx.formState.interruptions[1],1);
console.log('PASS: interruption resets active eye, preserves completed eye, ignores non-trial stages');
