const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const scenario = fs.readFileSync(path.join(__dirname, 'browser-scenario.js'), 'utf8');
const helper = scenario.match(/const key=\(value,release=true\)=>\{[^\n]+/)[0];
const events = [];
const after = { dispatchEvent: event => events.push(['after', event]) };
const document = {
  dispatchEvent() { throw Error('Keyboard input must originate at the focused element'); },
  activeElement: { dispatchEvent(event) { events.push(['before', event]); document.activeElement = after; } }
};
const context = vm.createContext({ document, KeyboardEvent: class {
  constructor(type, options) { this.type = type; Object.assign(this, options); }
} });
assert.throws(() => vm.runInNewContext(
  helper.replaceAll('document.activeElement.dispatchEvent', 'document.dispatchEvent') + '\nkey("ArrowRight");',
  { document, KeyboardEvent: context.KeyboardEvent }
), /Keyboard input must originate/, 'Regression must reject the previous document target');
vm.runInContext(helper + '\nkey("ArrowRight"); key("ArrowUp",false);', context);
assert.deepEqual(events.map(([target, event]) => [target, event.type, event.key, event.bubbles]), [
  ['before', 'keydown', 'ArrowRight', true],
  ['after', 'keyup', 'ArrowRight', true],
  ['after', 'keydown', 'ArrowUp', true]
]);
console.log('PASS: browser input starts at focused element, follows focus changes, supports held keys');
