/* Ehliyet 70: kaynak kontrollü MTSK sınav biçimi ve test edilebilir seçim/puanlama. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.EhliyetExamRules=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  var OFFICIAL_2026=Object.freeze({
    total:50,minutes:45,passingScore:70,
    categories:Object.freeze({trafik:23,ilkyardim:12,motor:9,adap:6}),
    source:'https://www.meb.gov.tr/meb_iys_dosyalar/2026_07/6a6b50c06daf3993652350_MTSK_e-Sinav_Kilavuzu_2026.pdf'
  });
  function audit(bank,spec){
    spec=spec||OFFICIAL_2026;
    var counts={trafik:0,ilkyardim:0,motor:0,adap:0},seen={},duplicates=[],invalid=[];
    (bank||[]).forEach(function(q){
      if(!q||typeof q.id!=='string'||seen[q.id]){duplicates.push(q&&q.id);return}
      seen[q.id]=1;
      if(!Object.prototype.hasOwnProperty.call(counts,q.k)||!q.q||!Array.isArray(q.o)||q.o.length!==4||!q.e){invalid.push(q.id);return}
      counts[q.k]++;
    });
    var missing={};Object.keys(spec.categories).forEach(function(k){missing[k]=Math.max(0,spec.categories[k]-counts[k])});
    return {counts:counts,missing:missing,duplicates:duplicates,invalid:invalid,ready:Object.keys(missing).every(function(k){return missing[k]===0})&&!duplicates.length&&!invalid.length};
  }
  function select(bank,spec,shuffle){
    spec=spec||OFFICIAL_2026;
    shuffle=shuffle||function(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a};
    var result=audit(bank,spec);
    if(!result.ready)throw new Error('Sınav için geçerli ve benzersiz soru havuzu yetersiz.');
    var ids=[];
    Object.keys(spec.categories).forEach(function(k){
      var options=bank.filter(function(q){return q.k===k});
      ids=ids.concat(shuffle(options).slice(0,spec.categories[k]).map(function(q){return q.id}));
    });
    ids=shuffle(ids);
    if(ids.length!==spec.total||new Set(ids).size!==spec.total)throw new Error('Sınav soru sayısı/tekilliği hatalı.');
    return ids;
  }
  function score(correct,total){if(!Number.isFinite(total)||total<=0||!Number.isInteger(correct)||correct<0||correct>total)throw new RangeError('Geçersiz sınav sonucu');return Math.round(correct/total*100)}
  function remaining(startedAt,now,minutes){return Math.max(0,Math.ceil((startedAt+minutes*60000-now)/1000))}
  return Object.freeze({OFFICIAL_2026:OFFICIAL_2026,audit:audit,select:select,score:score,remaining:remaining});
});
