const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../public/app.js'),'utf8');
function session(page){
  const state={condition:'no',consent:true,mode:'solo',setup:[true,true],practiced:page!==6,switched:page===4,endedEarly:false,directions:[[0,1,2],[0]],calibration:{status:'valid'},distance:{mm:1500},correction:'glasses',interruptions:[0,0],qualityResets:{display:2,position:1,correction:1}};
  const ctx=vm.createContext({formState:state,page,q:1,ready:[3,4].includes(page),paused:false,interrupted:false,answers:page===6?[[],[]]:page===3?[['atas'],[]]:[['atas','kanan','kiri'],page===4?['bawah']:[]],heldKeys:new Set(['p']),checkCalibration(){},render(){},newDirections:()=>[0,1,2],main:{querySelector:()=>({focus(){}})},root:{addEventListener(){}}});
  vm.runInContext(source.match(/function canEnter\(n\)\{[\s\S]*?(?=const solo)/)[0],ctx);
  vm.runInContext(source.match(/\/\/ SESSION END START([\s\S]*?)\/\/ SESSION END END/)[1],ctx);
  return ctx;
}
for(const page of [3,4,6,7]){
  const ctx=session(page),before=JSON.stringify(ctx.answers);ctx.endSession();
  assert.equal(ctx.page,5);assert.equal(ctx.formState.endedEarly,true);assert.equal(ctx.ready,false);
  assert.equal(JSON.stringify(ctx.answers),before,'Stop must retain submitted responses');assert.equal(ctx.heldKeys.size,0);
  assert.equal(ctx.canEnter(5),true);for(const n of [1,2,3,4,6,7,8])assert.equal(ctx.canEnter(n),false,'Ended session must not resume');
  ctx.endSession();assert.equal(JSON.stringify(ctx.answers),before);
  ctx.resetSession(1);assert.equal(ctx.page,1);assert.equal(ctx.formState.endedEarly,false);assert.equal(ctx.answers.flat().length,0);
  assert.equal(Object.values(ctx.formState.qualityResets).reduce((a,b)=>a+b,0),0);assert.equal(ctx.formState.distance,null);assert.equal(ctx.formState.calibration,null);assert.equal(ctx.formState.correction,'unrecorded');assert.equal(ctx.formState.consent,false);
}
for(const page of [0,1,2,5,8]){const ctx=session(page);ctx.endSession();assert.equal(ctx.page,page);assert.equal(ctx.formState.endedEarly,false);}
const ctx=session(4);ctx.checkCalibration=()=>{ctx.page=8;};ctx.endSession();assert.equal(ctx.formState.endedEarly,false,'Invalidated calibration must not produce an ended summary');
console.log('PASS: early stop preserves partial answers, locks session, respects invalidation, resets all session data');
