const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

// Exercise the real guard with isolated session state, without claiming DOM coverage.
const source = fs.readFileSync(path.join(__dirname, '..', 'public', 'app.js'), 'utf8');
const guard = source.match(/function canEnter\(n\)\{.*?\}(?=\s*function go)/s);
assert(guard, 'Navigation guard not found');
const state = { condition: null, consent: false, setup: [false, false] };
const answers = [[], []];
const context = vm.createContext({ formState: state, answers });
vm.runInContext(guard[0], context);
const canEnter = n => context.canEnter(n);
for (const n of [-1, 8, 1.5, NaN, Infinity, undefined, null, '2']) {
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
state.setup = [true, true]; assert.equal(canEnter(6), true); assert.equal(canEnter(3), false);
state.practiced = true; assert.equal(canEnter(3), true);
assert.equal(canEnter(4), false);
answers[0].push('kanan', 'atas'); assert.equal(canEnter(4), false);
answers[0].push('tidak terlihat'); assert.equal(canEnter(7), true); assert.equal(canEnter(4), false);
state.switched = true; assert.equal(canEnter(4), true);
assert.equal(canEnter(5), false);
answers[1].push('kiri', 'bawah'); assert.equal(canEnter(5), false);
answers[1].push('atas'); assert.equal(canEnter(5), true);
state.consent = false; assert.equal(canEnter(5), false);
console.log('PASS: invalid screens, symptoms, consent, preparation and both-eye prerequisites');
