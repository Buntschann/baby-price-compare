const CACHE_NAME="baby-price-watch-shell-v6.7.0";

self.addEventListener("install",event=>{
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET") return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin) return;

  // Navigation and app files: network first so Home Screen apps do not get stuck on old versions.
  if(req.mode==="navigate" || /\.(?:html|js|css|json|webmanifest)$/.test(url.pathname) || url.pathname.endsWith("/")){
    event.respondWith((async()=>{
      try{
        return await fetch(req,{cache:"no-store"});
      }catch{
        const cached=await caches.match(req,{ignoreSearch:true});
        return cached || new Response("オフラインです。通信後に再度開いてください。",{status:503,headers:{"Content-Type":"text/plain;charset=utf-8"}});
      }
    })());
  }
});
