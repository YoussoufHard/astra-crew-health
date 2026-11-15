/* SI-assisted prototype. Rules are illustrative and not clinically validated. */
'use strict';
function escapeReport(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function explainSignal(d,r){
 const triggered=flagged(d,r),value=`${format(d,r)} ${d.unit}`;
 let reference=`${d.baseline} ${d.unit}`,rule,reason;
 if(d.key==='sleep'){
  rule='Review when sleep is below 6.5 h.';
  reason=`${r.sleep.toFixed(1)} h recorded, ${(Math.abs(r.sleep-7.5)).toFixed(1)} h ${r.sleep<7.5?'below':'above'} the fictional baseline.`;
 }else if(d.key==='mood'){
  rule='Review a self-reported mood rating of 1 or 2.';
  reason=`Self-reported mood is ${r.mood}/5. This is an observation, not a behavioral health diagnosis.`;
 }else if(d.key==='sys'){
  reference='118/76 mmHg';rule='Review a systolic difference of at least 20 mmHg or a diastolic difference of at least 15 mmHg.';
  reason=`Systolic difference: ${Math.abs(r.sys-118)} mmHg. Diastolic difference: ${Math.abs(r.dia-76)} mmHg. Both components are evaluated.`;
 }else{
  rule=`Review an absolute difference of at least ${d.tolerance} ${d.unit}.`;
  const difference=Math.abs(r[d.key]-d.baseline).toFixed(d.decimals);
  reason=`Absolute difference from the fictional baseline: ${difference} ${d.unit}.`;
 }
 const action=d.key==='sleep'?'Review interruptions and planned sleep opportunity with the crew.':d.key==='mood'?'Record the context and consider a crew support check-in.':'Verify the observation, equipment and measurement context using mission procedures.';
 return {name:d.name,value,reference,rule,reason,action,triggered};
}
function renderReview(){
 const r=current(),signals=definitions.map(d=>explainSignal(d,r)),changed=signals.filter(s=>s.triggered);
 $('#review-summary').textContent=changed.length?`${changed.length} ${changed.length===1?'observation needs':'observations need'} review under the demonstration rules.`:'No demonstration rules triggered. Continue scheduled observations and report symptoms.';
 $('#signal-review').innerHTML=(changed.length?changed:signals).map(s=>`<details class="signal-detail"><summary><span>${s.name}</span><b>${s.value}</b><span class="review-state ${s.triggered?'watch':''}">${s.triggered?'Review change':'No demo flag'}</span></summary><div class="signal-content"><p><b>What changed</b> ${s.reason}</p><p><b>Fictional reference</b> ${s.reference}</p><p><b>Demonstration rule</b> ${s.rule}</p><p><b>Suggested review</b> ${s.action}</p></div></details>`).join('');
 $('#observation-context').textContent=`${r.origin} · ${r.date} · Context: ${r.context||'Not recorded'}`;
}
function buildReadableReport(r=current(),rows=history()){
 const e=escapeReport,signals=definitions.map(d=>explainSignal(d,r));
 const table=rows.slice(-50).reverse().map(row=>`<tr><td>${e(row.date)}<small>${e(row.origin)}</small></td><td>${e(row.hr)}</td><td>${e(row.sys)}/${e(row.dia)}</td><td>${e(row.sleep)}</td><td>${e(row.temp)}</td><td>${e(row.glucose)}</td><td>${e(row.mood)}/5</td><td>${e(row.context)}<small>${e(row.notes)}</small></td></tr>`).join('');
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'"><title>ASTRA observation report</title><style>body{font:15px/1.6 Arial,sans-serif;color:#173039;max-width:1050px;margin:40px auto;padding:0 24px}h1{font-size:36px;line-height:1.2}h2{margin-top:32px;font-size:22px}h3{margin-bottom:6px}p{margin:8px 0}.notice{background:#f3f6ec;border-left:4px solid #b18b39;padding:15px}article{border-top:1px solid #d0dfdc;padding:12px 0}small{display:block;color:#536a70;overflow-wrap:anywhere}table{width:100%;border-collapse:collapse;font-size:11px}td,th{text-align:left;vertical-align:top;border-bottom:1px solid #d0dfdc;padding:8px 5px}a{color:#155e53}footer{border-top:1px solid #d0dfdc;margin-top:30px;padding-top:15px;font-size:12px}@media print{body{margin:0;max-width:none;padding:0}article,tr{break-inside:avoid}h2,h3{break-after:avoid}a{color:inherit}}</style></head><body><p>ASTRA / CREW HEALTH</p><h1>Observation review report</h1><p>Generated ${e(new Date().toISOString())}</p><div class="notice"><b>SI-assisted prototype. Synthetic demonstration samples.</b><p>Educational use only. Rules are illustrative and clinically unvalidated. This report is a local download and has not been transmitted to a medical team. Print or save as PDF using your browser.</p></div><h2>Current observation</h2><p>${e(r.origin)} / ${e(r.date)}</p><p>Measurement context: ${e(r.context||'Not recorded')}</p><p>Notes: ${e(r.notes||'None recorded')}</p><h2>Rule explanations</h2>${signals.map(s=>`<article><h3>${e(s.name)}: ${e(s.value)}</h3><p><b>${s.triggered?'Review change':'No demo flag'}</b> / Fictional reference: ${e(s.reference)}</p><p>${e(s.reason)}</p><p>${e(s.rule)}</p><p>${e(s.action)}</p></article>`).join('')}<h2>Observation history</h2><p>Latest ${Math.min(rows.length,50)} of ${rows.length} observations. Starting samples and scenario rows are synthetic. Manual entries are separately identified.</p><table><thead><tr><th>Recorded / origin</th><th>HR<br>bpm</th><th>BP<br>mmHg</th><th>Sleep<br>h</th><th>Temp<br>°C</th><th>Glucose<br>mg/dL</th><th>Mood</th><th>Context / notes</th></tr></thead><tbody>${table}</tbody></table><h2>Scientific resources</h2><p>NASA resources inform education, not the demonstration rule thresholds.</p><ul><li><a href="${sourceLinks.hazards}">NASA HRP: 5 Hazards of Human Spaceflight</a></li><li><a href="${sourceLinks.risks}">NASA HRP: Risks of Human Spaceflight</a></li><li><a href="${sourceLinks.body}">NASA: The Human Body in Space</a></li></ul><footer>No flag does not rule out illness. Follow mission medical procedures and report symptoms independently of this software. No NASA endorsement is implied.</footer></body></html>`;
}
$('#export-readable').onclick=()=>{
 const blob=new Blob([buildReadableReport()],{type:'text/html;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download='astra-observation-report.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 toast('Readable report downloaded. Open it to print or save as PDF.');
};
const renderOriginal=render;
render=function(){renderOriginal();renderReview();};
renderReview();
