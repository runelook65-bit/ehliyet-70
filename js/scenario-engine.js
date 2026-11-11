/* Ehliyet 70 — original illustrated traffic scenarios; not official MEB questions. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.EhliyetScenarios=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const STORAGE_KEY='ehliyet-hazirlik-v1';
  const scenarios=[
    {id:'pedestrian',type:'pedestrian',title:'Yaya geçidine yaklaşma',short:'Kontrolsüz yaya geçidinde karşıya geçmek üzere olan bir yaya var.',question:'Bu durumda sürücünün güvenli davranışı hangisidir?',options:['Yavaşlayıp yayaya ilk geçiş hakkını vermek','Korna çalarak yayayı bekletmek','Hızlanıp yayadan önce geçmek','Yaya karşıya geçtiğinde selektör yapmak'],correct:0,explanation:'Kontrolsüz yaya geçidinde yayaların geçişine olanak sağlamak için yaklaşırken hız azaltılır; gerekiyorsa durulur.'},
    {id:'red-light',type:'signal',title:'Kırmızı ışıkta yaklaşma',short:'Kavşakta kırmızı trafik ışığı yanıyor. Dur çizgisine yaklaşıyorsun.',question:'Işık kırmızıyken nasıl hareket etmelisin?',options:['Dur çizgisinden önce tamamen durmak','Araç yoksa yavaşça geçmek','Korna çalıp kavşağa girmek','Dörtlüleri yakarak geçmek'],correct:0,explanation:'Kırmızı ışık dur emridir. Araç, varsa dur çizgisinin önünde durmalıdır.'},
    {id:'braking',type:'distance',title:'Öndeki aracın fren yapması',short:'Önündeki araç aniden yavaşlıyor. Aranızdaki mesafeyi izliyorsun.',question:'En güvenli tepki nedir?',options:['Hızı kontrollü azaltıp güvenli takip mesafesini korumak','Hızlanarak hemen sollamak','Kornaya uzun süre basmak','Öndeki araca daha fazla yaklaşmak'],correct:0,explanation:'Öndeki araç yavaşladığında takip mesafesi ve yol koşulları dikkate alınarak kontrollü yavaşlanır; ani ve tehlikeli manevradan kaçınılır.'}
  ];
  function get(id){return scenarios.find(s=>s.id===id)||null}
  function check(id,choice){
    const s=get(id);
    if(!s||!Number.isInteger(choice)||choice<0||choice>=s.options.length)throw new RangeError('Geçersiz senaryo veya seçenek');
    return {correct:choice===s.correct,explanation:s.explanation,correctAnswer:s.options[s.correct]};
  }
  function read(storage){
    try{const parsed=JSON.parse(storage.getItem(STORAGE_KEY)||'{}');
      return parsed&&typeof parsed==='object'&&!Array.isArray(parsed)?parsed:{};
    }catch(e){return {}}
  }
  function progress(storage){
    const all=read(storage),p=all.visualScenarios;
    return p&&typeof p==='object'&&!Array.isArray(p)?p:{};
  }
  function saveAnswer(storage,id,choice){
    const outcome=check(id,choice);
    const all=read(storage);
    const p=(all.visualScenarios&&typeof all.visualScenarios==='object'&&!Array.isArray(all.visualScenarios))?all.visualScenarios:{};
    const prev=p[id]&&typeof p[id]==='object'?p[id]:{attempts:0,correct:0};
    p[id]={attempts:(Number.isSafeInteger(prev.attempts)?prev.attempts:0)+1,
      correct:(Number.isSafeInteger(prev.correct)?prev.correct:0)+(outcome.correct?1:0),
      lastCorrect:outcome.correct,updatedAt:new Date().toISOString()};
    all.visualScenarios=p;
    try{storage.setItem(STORAGE_KEY,JSON.stringify(all));return {saved:true,outcome:outcome}}
    catch(e){return {saved:false,outcome:outcome}}
  }
  return Object.freeze({scenarios:Object.freeze(scenarios),get:get,check:check,read:read,progress:progress,saveAnswer:saveAnswer,STORAGE_KEY:STORAGE_KEY});
});
