// Test fixture only: install before app code. Record API names, never payloads.
function installPrivacyGuard(target){
  const calls=[];
  const block=name=>function(){calls.push(name);throw new Error('Unexpected privacy API: '+name);};
  const replace=(object,key,name)=>{if(object&&typeof object[key]==='function')Object.defineProperty(object,key,{configurable:true,writable:true,value:block(name)});};
  for(const key of ['fetch','WebSocket','EventSource'])replace(target,key,key);
  replace(target.XMLHttpRequest?.prototype,'open','XMLHttpRequest.open');
  replace(target.navigator,'sendBeacon','sendBeacon');
  replace(target.navigator?.mediaDevices,'getUserMedia','getUserMedia');
  replace(target.navigator?.mediaDevices,'getDisplayMedia','getDisplayMedia');
  replace(target.Storage?.prototype,'setItem','Storage.setItem');
  replace(target.indexedDB,'open','indexedDB.open');
  replace(target.caches,'open','caches.open');
  replace(target.navigator?.serviceWorker,'register','serviceWorker.register');
  const documentPrototype=target.Document?.prototype;
  const cookie=documentPrototype&&Object.getOwnPropertyDescriptor(documentPrototype,'cookie');
  if(cookie?.set)Object.defineProperty(documentPrototype,'cookie',{...cookie,set:block('document.cookie')});
  return {calls};
}
if(typeof window!=='undefined')window.__privacyAudit=installPrivacyGuard(window);
if(typeof module!=='undefined')module.exports=installPrivacyGuard;
