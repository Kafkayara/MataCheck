const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../public/app.js'),'utf8');
const block=source.match(/\/\/ DEMO STIMULUS START([\s\S]*?)\/\/ DEMO STIMULUS END/)[1];
const values=[0,.25,.5,.75,.999999,0];let index=0;
const math=Object.create(Math);math.random=()=>values[index++];
const ctx=vm.createContext({Math:math});vm.runInContext(block,ctx);
assert.deepEqual(Array.from(ctx.newDirections()),[0,1,2]);assert.deepEqual(Array.from(ctx.newDirections()),[3,3,0]);
for(let i=0;i<4;i++){
 const svg=ctx.demoSymbol(i);assert(svg.includes('viewBox="0 0 5 5"'));assert(svg.includes(`rotate(${i*90}deg)`));
 assert(svg.includes('M0 0H5V1H1V2H5V3H1V4H5V5H0Z'));assert(svg.includes('aria-hidden="true"'));
}
for(const value of [-1,4,NaN,undefined,'0'])assert.equal(ctx.demoSymbol(value),'');
console.log('PASS: independent demo directions, fixed E geometry, four rotations, invalid values rejected');
ctx.formState={directions:[[0,1,2,3],[3,0,1]]};
ctx.answers=[['kanan','bawah','kiri','atas'],['tidak terlihat']];
let log=ctx.trialLog(0);
for(const label of ['Kanan','Bawah','Kiri','Atas'])assert(log.includes('Simbol: <strong>'+label+'</strong>'));
assert.equal((log.match(/<li>/g)||[]).length,4);
log=ctx.trialLog(1);assert.equal((log.match(/<li>/g)||[]).length,1,'Unanswered trials must not appear');
assert(log.includes('Simbol: <strong>Atas'));assert(log.includes('Respons: <strong>Tidak terlihat'));
ctx.formState.directions[1]=[];ctx.answers[1]=['<script>'];log=ctx.trialLog(1);
assert(!log.includes('<script>'));assert(log.includes('Tidak tercatat'));
ctx.answers[1]=[];assert.equal(ctx.trialLog(1),'');
console.log('PASS: displayed directions match recorded rotation, partial logs exclude unanswered trials, unknown values are not guessed');
