const assert=require('node:assert/strict');
const install=require('./privacy-guard.cjs');
let originalCalls=0;
const original=()=>{originalCalls++;};
class XHR{};XHR.prototype.open=original;
class Storage{};Storage.prototype.setItem=original;
class Document{};Object.defineProperty(Document.prototype,'cookie',{configurable:true,get(){return '';},set:original});
const target={fetch:original,WebSocket:original,EventSource:original,XMLHttpRequest:XHR,Storage,Document,
 navigator:{sendBeacon:original,mediaDevices:{getUserMedia:original,getDisplayMedia:original},serviceWorker:{register:original}},indexedDB:{open:original},caches:{open:original}};
const audit=install(target);assert.deepEqual(audit.calls,[]);
const operations=[()=>target.fetch('secret'),()=>new target.WebSocket('secret'),()=>new target.EventSource('secret'),()=>new XHR().open('POST','secret'),()=>target.navigator.sendBeacon('secret','payload'),()=>target.navigator.mediaDevices.getUserMedia({video:true}),()=>target.navigator.mediaDevices.getDisplayMedia({video:true}),()=>new Storage().setItem('secret','payload'),()=>target.indexedDB.open('secret'),()=>target.caches.open('secret'),()=>target.navigator.serviceWorker.register('secret'),()=>{new Document().cookie='secret=payload';}];
for(const operation of operations)assert.throws(operation,/Unexpected privacy API/);
assert.equal(audit.calls.length,operations.length);assert.equal(originalCalls,0,'A blocked API must not execute');
assert(!JSON.stringify(audit).includes('secret'));assert(!JSON.stringify(audit).includes('payload'));
assert.equal(new Document().cookie,'');assert.deepEqual(install({}).calls,[]);
console.log('PASS: privacy guard blocks network/media/storage APIs and records names without payloads');
