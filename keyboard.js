(function(){
'use strict';
let nativeVisible=false, baseline=window.innerHeight, timer;
const editable=element=>element&&element.matches('textarea,input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]),[contenteditable="true"]');
function viewport(){const v=window.visualViewport;return {top:v?v.offsetTop:0,height:v?v.height:window.innerHeight};}
function ensureVisible(){const field=document.activeElement;if(!editable(field))return;const v=viewport(),r=field.getBoundingClientRect(),margin=16;const top=v.top+margin,bottom=v.top+v.height-margin;
 if(r.top<top||r.bottom>bottom)field.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});
}
function refresh(){const v=viewport();if(!editable(document.activeElement)&&!nativeVisible)baseline=Math.max(baseline,window.innerHeight);
 const open=nativeVisible||(editable(document.activeElement)&&baseline-v.height>140);document.body.classList.toggle('keyboard-open',!!open);document.documentElement.style.setProperty('--visible-height',Math.round(v.height)+'px');
 clearTimeout(timer);requestAnimationFrame(ensureVisible);timer=setTimeout(ensureVisible,220);
}
window.VelthonKeyboard={setNativeVisible(value){nativeVisible=!!value;refresh();},refresh,ensureVisible};
document.addEventListener('focusin',refresh);document.addEventListener('focusout',()=>setTimeout(refresh,60));window.addEventListener('resize',refresh);window.addEventListener('orientationchange',()=>{baseline=window.innerHeight;setTimeout(refresh,250);});
if(window.visualViewport){window.visualViewport.addEventListener('resize',refresh);window.visualViewport.addEventListener('scroll',()=>requestAnimationFrame(ensureVisible));}
refresh();
})();
