(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.VelthonAudio=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function measure(samples){let sum=0,peak=0;for(let i=0;i<samples.length;i++){const v=Number.isFinite(samples[i])?samples[i]:0;sum+=v*v;peak=Math.max(peak,Math.abs(v));}return {rms:Math.sqrt(sum/Math.max(1,samples.length)),peak};}
const db=value=>Math.max(-100,20*Math.log10(Math.max(1e-5,value)));
class InputLevel {
 constructor(mode='auto'){this.mode=mode;this.gain=mode==='high'?4:1;this.noise=.0002;this.elapsed=0;this.quiet=0;this.clipped=0;this.display=0;this.activity=0;}
 update(input,output,seconds=.085,interrupted=false){
  const raw=measure(input),processed=measure(output||input),dt=clamp(seconds,.005,.5);this.elapsed+=dt;
  // Track the quiet floor slowly; avoid treating steady speech as a new noise floor.
  if(raw.rms<this.noise)this.noise=raw.rms;else if(raw.rms<this.noise*1.5)this.noise+=Math.min(.00001,(raw.rms-this.noise)*dt*.05);
  this.noise=Math.max(.00001,this.noise);
  const active=raw.rms>Math.max(.00003,this.noise*1.2)&&raw.peak>.00008;
  if(active){this.activity+=dt;this.quiet=0;}else this.quiet+=dt;
  const maximum=this.mode==='high'?32:this.mode==='standard'?1:16;
  let desired=this.gain;
  if(this.mode==='standard')desired=1;
  else if(raw.rms>.00003&&raw.peak>.00008)desired=clamp(.075/Math.max(.00003,raw.rms),.25,maximum);
  // Real overload is handled immediately; silence never drives gain toward maximum.
  if(raw.peak*this.gain>.90)desired=Math.min(desired,.85/Math.max(.001,raw.peak));
  const tau=desired<this.gain?.06:.65;
  this.gain=this.mode==='standard'?1:clamp(this.gain+(desired-this.gain)*(1-Math.exp(-dt/tau)),.25,maximum);
  this.clipped=processed.peak>.98?this.clipped+dt:Math.max(0,this.clipped-dt*2);
  const target=clamp((db(processed.rms)+72)/66,0,1);
  this.display+=(target-this.display)*(1-Math.exp(-dt/(target>this.display?.09:.35)));
  let state='receiving',status='Microphone receiving audio';
  if(interrupted){state='interrupted';status='Microphone interrupted — check the selected input or browser permissions';this.display=0;}
  else if(this.elapsed<.8){state='calibrating';status='Calibrating microphone level…';}
  else if(this.clipped>.3){state='clipping';status='Strong input — reducing gain to prevent distortion';}
  else if(raw.peak<.00001&&this.elapsed>4){state='no-input';status='No signal from the selected microphone — check the input or system microphone level';}
  else if(this.quiet>1.2){state='listening';status='Listening — quiet pauses are normal';}
  else if(active&&this.gain>1.5){state='boosting';status='Quiet input detected — automatic gain active';}
  return {level:this.display,gain:this.gain,inputDb:db(raw.rms),outputDb:db(processed.rms),clipping:state==='clipping',state,status};
 }
}
function createCapture(context,stream,mode='auto'){
 const source=context.createMediaStreamSource(stream),analyser=context.createAnalyser(),gain=context.createGain(),compressor=context.createDynamicsCompressor(),destination=context.createMediaStreamDestination(),processor=context.createScriptProcessor(4096,1,1),silence=context.createGain();
 analyser.fftSize=2048;gain.gain.value=mode==='high'?4:1;silence.gain.value=0;
 compressor.threshold.value=-6;compressor.knee.value=6;compressor.ratio.value=12;compressor.attack.value=.003;compressor.release.value=.2;
 // Both the recorder and transcription receive this same boosted, limited signal.
 source.connect(analyser);analyser.connect(gain);gain.connect(compressor);compressor.connect(destination);compressor.connect(processor);processor.connect(silence);silence.connect(context.destination);
 const raw=new Float32Array(analyser.fftSize),control=new InputLevel(mode);
 return {stream:destination.stream,processor,control,update(samples,seconds){analyser.getFloatTimeDomainData(raw);const track=stream.getAudioTracks()[0],meter=control.update(raw,samples,seconds,context.state!=='running'||!track||track.readyState==='ended'||track.muted);gain.gain.setTargetAtTime(meter.gain,context.currentTime,.04);return meter;},disconnect(){processor.onaudioprocess=null;for(const n of [source,analyser,gain,compressor,processor,silence])try{n.disconnect();}catch{}for(const t of destination.stream.getTracks())t.stop();}};
}
return {measure,InputLevel,createCapture};
});

