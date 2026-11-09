/* Control Técnico PWA V1.6 — no almacena ni transmite datos de clientes */
const CACHE='control-tecnico-shell-v1.6';
const RUNTIME='control-tecnico-runtime-v1.6';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(Promise.all([
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('control-tecnico-')&&!([CACHE,RUNTIME].includes(k))).map(k=>caches.delete(k)))),
  self.clients.claim()
 ]));
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 const shell=url.origin===self.location.origin;
 const libs=url.hostname==='cdn.jsdelivr.net'||url.hostname==='cdnjs.cloudflare.com';
 if(!shell&&!libs)return;
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).then(response=>{
    if(response.ok){const clone=response.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put('./index.html',clone)))}
    return response;
  }).catch(async()=>await caches.match('./index.html')||Response.error()));
  return;
 }
 event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(response=>{
   if(response.ok || response.type==='opaque'){
     const clone=response.clone();event.waitUntil(caches.open(shell?CACHE:RUNTIME).then(c=>c.put(req,clone)));
   }
   return response;
 })));
});
