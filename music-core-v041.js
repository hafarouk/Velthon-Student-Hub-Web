(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.MusicLinks=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';
function parse(value){let u;try{u=new URL(value);}catch{throw Error('Paste a full HTTPS music link.');}if(u.protocol!=='https:'||u.username||u.password)throw Error('Use an HTTPS music link without embedded account credentials.');const host=u.hostname.toLowerCase();let name=host,provider='other',embed=null,height=166;const path=u.pathname;
if(host==='open.spotify.com'){provider='spotify';name='Spotify';const p=path.match(/^\/(?:intl-[a-z]+\/)?(?:embed\/)?(track|playlist|album|artist|episode|show)\/([A-Za-z0-9]{22})\/?$/);if(p){embed='https://open.spotify.com/embed/'+p[1]+'/'+p[2];height=152;u=new URL('https://open.spotify.com/'+p[1]+'/'+p[2]);}}
else if(host==='music.apple.com'||host==='embed.music.apple.com'){provider='apple';name='Apple Music';if(/^\/[a-z]{2}\/(album|playlist|song|station)\//.test(path)){const e=new URL(u);e.hostname='embed.music.apple.com';e.search='';const song=u.searchParams.get('i');if(song&&/^\d+$/.test(song))e.searchParams.set('i',song);embed=e.href;height=175;u.hostname='music.apple.com';}}
else if(host==='soundcloud.com'||host==='www.soundcloud.com'){provider='soundcloud';name='SoundCloud';if(/^\/[\w-]+\/[\w-]+(?:\/[\w-]+)?\/?$/.test(path)){u.search='';embed='https://w.soundcloud.com/player/?url='+encodeURIComponent(u.href)+'&auto_play=false&hide_related=true&show_comments=false';}}
else if(['www.youtube.com','youtube.com','music.youtube.com','youtu.be'].includes(host)){provider='youtube';name=host==='music.youtube.com'?'YouTube Music':'YouTube';}
else if(host==='www.deezer.com'||host==='deezer.com'){provider='deezer';name='Deezer';}
else if(host==='tidal.com'||host==='listen.tidal.com'){provider='tidal';name='TIDAL';}
else if(host==='music.amazon.com'||host==='music.amazon.ca'){provider='amazon';name='Amazon Music';}
return {provider,name,url:u.href,embed,height,host};}
return {parse};});
