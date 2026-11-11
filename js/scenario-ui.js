/* Browser UI for original animated traffic scenario lessons (no third-party media). */
(function(){
'use strict';
const engine=window.EhliyetScenarios;
const $=id=>document.getElementById(id);
if(!engine){$('title').textContent='Senaryolar yüklenemedi';return}
let current=0,answered=false,paused=false;
function svg(kind){
 const start='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 350" role="img" aria-label="';
 const end='</svg>';
 if(kind==='pedestrian'){
  return start+'Kontrolsüz yaya geçidi, yaklaşan otomobil ve karşıya yürüyen bir yaya.">'+
   '<rect width="600" height="350" fill="#e9f1e7"/><rect x="182" width="236" height="350" fill="#3c454f"/>'+
   '<path d="M299 0V350" stroke="#fcfbeb" stroke-width="4" stroke-dasharray="21 18"/>'+
   '<path d="M186 12V338M414 12V338" stroke="#f4ede6" stroke-width="5"/>'+
   '<g fill="white">'+Array.from({length:9},(_,i)=>'<rect x="'+(194+i*24)+'" y="110" width="15" height="43" rx="2"/>').join('')+'</g>'+
   '<rect x="63" y="82" width="92" height="7" rx="3" fill="#8aa38a"/><rect x="455" y="80" width="91" height="7" rx="3" fill="#8aa38a"/>'+
   '<g class="car-cross"><rect x="271" y="181" width="57" height="103" rx="14" fill="#16191e" stroke="white" stroke-width="3"/><rect x="278" y="192" width="44" height="29" rx="6" fill="#9ec3d0"/><rect x="278" y="248" width="44" height="21" rx="5" fill="#7893a2"/><rect x="276" y="185" width="11" height="7" fill="#faf9e3"/><rect x="312" y="185" width="11" height="7" fill="#faf9e3"/></g>'+
   '<g class="walker"><circle cx="151" cy="131" r="10" fill="#f6ad61" stroke="#252833" stroke-width="2"/><path d="M151 141v16m0 0-10 12m10-12 10 12m-10-18-13-4m13 4 12-4" stroke="#252833" stroke-width="5" stroke-linecap="round"/></g>'+
   '<rect x="430" y="16" width="140" height="38" rx="19" fill="#fff" stroke="#cbd3d1"/><text x="500" y="40" fill="#131416" font-size="15" text-anchor="middle" font-family="Arial" font-weight="bold">YAYA GEÇİDİ</text>'+end;
 }
 if(kind==='signal'){
  return start+'Kırmızı ışıklı kavşak; otomobil dur çizgisine yaklaşıp durur.">'+
   '<rect width="600" height="350" fill="#eaf0e8"/><rect x="0" y="133" width="600" height="147" fill="#3b4652"/>'+
   '<path d="M0 205H600" stroke="#f4f1d9" stroke-width="4" stroke-dasharray="30 25"/>'+
   '<path d="M343 140V273" stroke="#fff" stroke-width="8"/><path d="M0 135H600M0 278H600" stroke="#f5f1e7" stroke-width="4"/>'+
   '<rect x="386" y="34" width="10" height="127" fill="#4e545c"/><rect x="367" y="37" width="47" height="103" rx="13" fill="#181b1f"/>'+
   '<circle cx="390" cy="59" r="14" fill="#ed2130"/><circle cx="390" cy="89" r="14" fill="#3b3c35"/><circle cx="390" cy="118" r="14" fill="#3b3c35"/>'+
   '<g class="car-signal"><rect x="229" y="183" width="93" height="47" rx="14" fill="#16191e" stroke="#fff" stroke-width="3"/><path d="M247 186H291l10 10h-57z" fill="#9cc0cf"/><rect x="302" y="190" width="11" height="10" rx="3" fill="#fcf1cd"/><circle cx="249" cy="234" r="9" fill="#151515" stroke="#eee" stroke-width="2"/><circle cx="299" cy="234" r="9" fill="#151515" stroke="#eee" stroke-width="2"/></g>'+
   '<rect x="20" y="21" width="158" height="38" rx="18" fill="#fff" stroke="#cbd3d1"/><text x="99" y="45" fill="#161616" font-size="15" text-anchor="middle" font-family="Arial" font-weight="bold">KIRMIZI IŞIK</text>'+end;
 }
 return start+'Aynı şeritte ilerleyen öndeki araç fren yaparken arkadaki araç güvenli mesafe bırakarak yavaşlar.">'+
  '<rect width="600" height="350" fill="#e7edee"/><rect x="0" y="133" width="600" height="147" fill="#3c4751"/>'+
  '<path d="M0 205H600" stroke="#fff8dd" stroke-width="4" stroke-dasharray="24 21"/>'+
  '<path d="M0 139H600M0 276H600" stroke="#fff" stroke-width="5"/>'+
  '<rect x="388" y="181" width="92" height="49" rx="14" fill="#af1b24" stroke="white" stroke-width="3"/><rect x="400" y="187" width="43" height="15" rx="4" fill="#dce6eb"/><rect x="387" y="191" width="10" height="13" rx="2" fill="#ffbdc2"/><rect x="470" y="191" width="10" height="13" rx="2" fill="#ffbdc2"/><circle cx="408" cy="237" r="9" fill="#1e2227" stroke="#fff" stroke-width="2"/><circle cx="455" cy="237" r="9" fill="#1e2227" stroke="#fff" stroke-width="2"/>'+
  '<g class="car-distance"><rect x="214" y="181" width="93" height="49" rx="14" fill="#15191e" stroke="white" stroke-width="3"/><rect x="226" y="187" width="43" height="15" rx="4" fill="#b9d3e0"/><rect x="297" y="191" width="10" height="13" rx="2" fill="#fff7cf"/><circle cx="235" cy="237" r="9" fill="#1e2227" stroke="#fff" stroke-width="2"/><circle cx="281" cy="237" r="9" fill="#1e2227" stroke="#fff" stroke-width="2"/></g>'+
  '<path d="M318 161h58" stroke="#ee202c" stroke-width="4" stroke-dasharray="8 8"/><rect x="19" y="18" width="190" height="38" rx="19" fill="white" stroke="#cbd3d1"/><text x="114" y="42" fill="#161616" font-family="Arial" font-size="15" font-weight="bold" text-anchor="middle">TAKİP MESAFESİ</text>'+end;
}
function shuffledIndices(length){
 const a=Array.from({length:length},(_,i)=>i);
 for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=a[i];a[i]=a[j];a[j]=t}
 return a;
}
function render(){
 const s=engine.scenarios[current];answered=false;paused=false;
 $('step').textContent='Senaryo '+(current+1)+' / '+engine.scenarios.length;
 $('dots').replaceChildren(...engine.scenarios.map((_,i)=>{const d=document.createElement('span');d.className='dot'+(i===current?' on':'');return d}));
 $('title').textContent=s.title;$('desc').textContent=s.short;$('question').textContent=s.question;
 $('art').innerHTML=svg(s.type);$('art').classList.remove('paused');
 $('toggle').textContent='⏸ Duraklat';$('toggle').setAttribute('aria-pressed','false');
 $('feedback').hidden=true;$('feedback').replaceChildren();
 $('next').hidden=true;$('next').textContent=current===engine.scenarios.length-1?'Senaryolara baştan başla ↻':'Sonraki senaryo →';
 const answers=$('answers');answers.replaceChildren();
 shuffledIndices(s.options.length).forEach((idx,n)=>{
  const b=document.createElement('button');b.type='button';b.className='answer';
  const letter=document.createElement('b');letter.textContent=String.fromCharCode(65+n);
  const label=document.createElement('span');label.textContent=s.options[idx];
  b.append(letter,label);b.dataset.choice=String(idx);
  b.addEventListener('click',()=>choose(idx));answers.append(b);
 });
 let progress={};try{progress=engine.progress(localStorage)}catch(e){}
 const count=engine.scenarios.filter(x=>progress[x.id]&&progress[x.id].correct>0).length;
 $('progress').textContent='Bu cihazda başarıyla tamamlanan senaryo: '+count+' / '+engine.scenarios.length;
}
function choose(idx){
 if(answered)return;
 const s=engine.scenarios[current];const result=engine.check(s.id,idx);answered=true;
 let saved=false;try{saved=engine.saveAnswer(localStorage,s.id,idx).saved}catch(e){}
 const buttons=Array.from($('answers').children);
 buttons.forEach(b=>{const answer=Number(b.dataset.choice);b.disabled=true;if(answer===s.correct)b.classList.add('correct');if(answer===idx&&!result.correct)b.classList.add('wrong')});
 const feedback=$('feedback');feedback.replaceChildren();
 const heading=document.createElement('strong');heading.textContent=result.correct?'Doğru karar!':'Tekrar değerlendirelim';
 const text=document.createElement('p');text.textContent=result.explanation;
 feedback.append(heading,text);
 if(!saved){const warn=document.createElement('p');warn.className='error';warn.textContent='Bu cihazda ilerleme kaydedilemedi.';feedback.append(warn)}
 feedback.hidden=false;$('next').hidden=false;feedback.focus();
 if(saved){const p=engine.progress(localStorage);const count=engine.scenarios.filter(x=>p[x.id]&&p[x.id].correct>0).length;$('progress').textContent='Bu cihazda başarıyla tamamlanan senaryo: '+count+' / '+engine.scenarios.length}
}
$('toggle').addEventListener('click',()=>{
 paused=!paused;$('art').classList.toggle('paused',paused);$('toggle').textContent=paused?'▶ Devam et':'⏸ Duraklat';
 $('toggle').setAttribute('aria-pressed',String(paused));
});
$('replay').addEventListener('click',()=>{
 const art=$('art');art.classList.remove('paused');art.innerHTML=svg(engine.scenarios[current].type);paused=false;
 $('toggle').textContent='⏸ Duraklat';$('toggle').setAttribute('aria-pressed','false');
});
$('next').addEventListener('click',()=>{current=(current+1)%engine.scenarios.length;render();$('step').scrollIntoView({block:'nearest'})});
render();
})();
