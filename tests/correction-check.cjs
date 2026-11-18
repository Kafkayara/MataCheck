const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../public/app.js'),'utf8');
const state={correction:'glasses',distance:{mm:1500},calibration:{status:'valid'},directions:[[0,1,2],[1]],practiced:true,switched:true,setup:[true,true]};
const handlers={},next={disabled:false};let focused=false;
const ctx=vm.createContext({formState:state,answers:[['a','b','c'],['a']],page:2,ready:true,paused:true,interrupted:true,q:1,
root:{addEventListener(type,fn){handlers[type]=fn;}},main:{querySelector:s=>s==='#next'?next:{focus(){focused=true;}}},canEnter:()=>false,go(n){ctx.page=n;}});
vm.runInContext(source.match(/\/\/ QUALITY RESET START([\s\S]*?)\/\/ QUALITY RESET END/)[1],ctx);
vm.runInContext(source.match(/\/\/ CORRECTION START([\s\S]*?)\/\/ CORRECTION END/)[1],ctx);
assert.equal(ctx.changeCorrection('glasses'),false);assert.equal(ctx.answers[0].length,3);
assert.equal(ctx.changeCorrection('__proto__'),false);assert.equal(state.correction,'glasses');
assert.equal(ctx.changeCorrection('contacts'),true);assert.equal(ctx.answers.flat().length,0);assert.equal(state.practiced,false);assert.equal(ctx.ready,false);assert.equal(state.distance.mm,1500);assert.equal(state.calibration.status,'valid');assert.equal(ctx.correctionLabel(),'Memakai lensa kontak');
vm.runInContext(source.match(/\/\/ CORRECTION UI START([\s\S]*?)\/\/ CORRECTION UI END/)[1],ctx);
handlers.change({target:{id:'correction',value:'none'}});assert.equal(state.correction,'none');assert(next.disabled);
ctx.page=5;handlers.change({target:{id:'correction',value:'glasses'}});assert.equal(state.correction,'none');
for(const correction of ['glasses','unrecorded']){
 ctx.page=4;state.correction=correction;ctx.answers=[['a','b','c'],['b']];state.practiced=true;
 handlers.click({target:{closest:()=>({id:'correction-change'})}});
 assert.equal(ctx.page,2);assert.equal(ctx.answers.flat().length,0);assert.equal(state.correction,'unrecorded');assert.equal(state.practiced,false);assert(state.setup.every(x=>!x));assert(focused);
}
console.log('PASS: correction choices, invalid values, no-op selection, reset both eyes even when unrecorded, retain scale/distance');
assert.equal(state.qualityResets.correction,3,'Each correction reset must count once, including unrecorded');

// PRD section 5 asks about optical correction during initial screening.
ctx.page=1;state.correction='unrecorded';ctx.answers=[[],[]];next.disabled=true;
handlers.change({target:{id:'correction',value:'contacts'}});
assert.equal(state.correction,'contacts','Screening must record optical correction');
assert.equal(next.disabled,true,'Correction must not bypass screening eligibility or consent');
const modeHandler=source.match(/if\(page===2&&e.target.name==='mode'\)\{([\s\S]*?)return;\}/)[1];
Object.assign(ctx,{e:{target:{name:'mode',value:'helper'}},render(){}});
state.mode=null;
vm.runInContext(modeHandler,ctx);
assert.equal(state.correction,'contacts','First mode choice must retain screening correction');
ctx.e.target.value='solo';
vm.runInContext(modeHandler,ctx);
assert.equal(state.correction,'unrecorded','Changing an existing mode must clear session conditions');
console.log('PASS: screening correction, unchanged consent guard, first mode retention and later mode reset');
