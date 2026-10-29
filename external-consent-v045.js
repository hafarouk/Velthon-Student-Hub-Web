'use strict';
window.ExternalConsent=(()=>{
const VERSION='2026-10-29.1';let pending=false;
async function ask(options){if(pending||!account)return false;pending=true;try{const yes=await SecurityCenter.external(options);if(yes){SecurityCenter.activity('provider.connection_requested');state.profile.externalConsents||={};state.profile.externalConsents[options.key]={version:VERSION,at:new Date().toISOString(),provider:options.name};queueSave();}return yes;}finally{pending=false;}}
function revoke(key){SecurityCenter.noteRevocation(key);if(state?.profile?.externalConsents){delete state.profile.externalConsents[key];queueSave();}}

async function openLink(options){const url=new URL(options.url);if(url.protocol!=='https:'||url.username||url.password)throw Error('Only HTTPS provider links are supported.');const granted=await ask({...options,destination:url.origin,onContinue:()=>{const a=document.createElement('a');a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';document.body.append(a);a.click();a.remove();}});if(granted){notify('Provider search opened. If a new tab was blocked, use this link:');const link=document.createElement('a');link.href=url.href;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Open '+options.name;link.style.color='inherit';link.style.textDecoration='underline';$('message').append(' ',link);clearTimeout(messageTimer);messageTimer=setTimeout(()=>$('message').hidden=true,15000);}return granted;}
return {ask,openLink,revoke,VERSION};})();

