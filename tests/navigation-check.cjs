const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

// Exercise the real guard with isolated session state, without claiming DOM coverage.
const source = fs.readFileSync(path.join(__dirname, '..', 'public', 'app.js'), 'utf8');
const guard = source.match(/function canEnter\(n\)\{.*?\}(?=\s*function go)/s);
assert(guard, 'Navigation guard not found');
const state = { directions:[[],[]], condition: null, consent: false, setup: [false, false] };
const answers = [[], []];
const context = vm.createContext({ formState: state, answers });
vm.runInContext(guard[0], context);
const canEnter = n => context.canEnter(n);
for (const n of [-1, 9, 1.5, NaN, Infinity, undefined, null, '2']) {
  assert.equal(canEnter(n), false, `Invalid screen accepted: ${String(n)}`);
}
assert.equal(canEnter(0), true);
assert.equal(canEnter(1), true);
for (const n of [2, 3, 4, 5, 6, 7]) assert.equal(canEnter(n), false);
state.condition = 'yes'; state.consent = true; state.setup = [true, true];
for (const n of [2, 3, 4, 5, 6, 7]) assert.equal(canEnter(n), false, 'Symptoms must stop the flow');
state.condition = 'no'; state.consent = false;
assert.equal(canEnter(2), false);
state.consent = true; state.setup = [false, false];
assert.equal(canEnter(2), true);
assert.equal(canEnter(3), false);
state.setup = [true, false]; assert.equal(canEnter(3), false);
state.setup = [true, true]; assert.equal(canEnter(6), false); state.mode='invalid'; assert.equal(canEnter(6), false); state.mode='solo'; assert.equal(canEnter(6), true); state.mode='helper'; assert.equal(canEnter(6), true); assert.equal(canEnter(3), false);
state.practiced = true; assert.equal(canEnter(3), true);
state.distanceEditing=true;assert.equal(canEnter(6),false);assert.equal(canEnter(3),false);state.distanceEditing=false;
for(const status of ['pending','stale','blocked']){state.calibration={status};assert.equal(canEnter(6),false);assert.equal(canEnter(8),true);}
for(const status of ['valid','skipped']){state.calibration={status};assert.equal(canEnter(6),true);}
state.calibration=null;
assert.equal(canEnter(4), false);
answers[0].push('kanan', 'atas'); assert.equal(canEnter(4), false);
answers[0].push('tidak terlihat'); assert.equal(canEnter(7), true); assert.equal(canEnter(4), false);
state.switched = true; assert.equal(canEnter(4), true);
assert.equal(canEnter(5), false);
answers[1].push('kiri', 'bawah'); assert.equal(canEnter(5), false);
answers[1].push('atas'); assert.equal(canEnter(5), true);
state.consent = false; assert.equal(canEnter(5), false);
console.log('PASS: invalid screens, symptoms, consent, preparation and both-eye prerequisites');

const navigate = source.match(/function go\(n\)\{.*?\}(?=\s*const solo)/s)[0];
Object.assign(context, { page: 7, q: 0, ready: false, paused: false,
  newDirections:()=>[0,1,2], render() {}, checkCalibration() {}, main: { querySelector: () => ({ focus() {} }) } });
vm.runInContext(navigate, context);
state.consent = true; state.switched = false;
context.go(4);
assert.equal(context.page, 7, 'Unconfirmed switch must stay locked');
state.switched = true;
context.go(4);
assert.equal(context.page, 4);
assert.equal(context.ready, true, 'Confirmed switch must start left eye without a second confirmation');
assert.equal(context.q, 0);
assert.equal(context.answers[1].length, 0, 'Left eye must start with no stale responses');
assert.equal(context.answers[0].length, 3, 'Right eye responses must remain');
context.go(2);
assert.equal(context.ready, false, 'Returning to preparation must stop the session');
console.log('PASS: one confirmed transition starts left eye and preserves right eye responses');
