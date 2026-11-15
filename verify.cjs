// Focused logic checks without third-party packages; not a browser-rendering test.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
class Element{constructor(){this.dataset={};this.style={};this.classList={add(){},remove(){},toggle(){}};this.value='';this.children=[];}set innerHTML(v){this.html=v;}get innerHTML(){return this.html;}append(v){this.children.push(v);}replaceChildren(...v){this.children=v;}setAttribute(k,v){this[k]=v;}scrollIntoView(){}focus(){}showModal(){this.open=true;}close(){this.open=false;}}
const nodes=new Map(),store=new Map();const get=s=>{if(!nodes.has(s))nodes.set(s,new Element());return nodes.get(s);};
const ctx=vm.createContext({document:{querySelector:get,querySelectorAll:()=>[],createElement:()=>new Element(),createTextNode:s=>s},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},navigator:{onLine:true},window:{addEventListener(){}},location:{_hash:'',get hash(){return this._hash;},set hash(v){this._hash=v?'#'+v.replace(/^#/,''):'';}},setTimeout:()=>1,clearTimeout(){},confirm:()=>true,FormData:class{get(k){return this.values[k];}},Date,Blob,URL,console});
vm.runInContext(fs.readFileSync('app.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('review.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('tour.js','utf8'),ctx);
function evalCode(code){return vm.runInContext(code,ctx);}
assert.equal(evalCode('definitions.filter(d=>flagged(d,current())).length'),1);
evalCode("scenario='fatigue';render()");assert.equal(get('#attention-count').textContent,2);
evalCode("scenario='review';render()");assert.equal(get('#attention-count').textContent,6);
assert.equal(evalCode('records.length'),0,'Scenarios must not mutate saved observations');
assert.equal(evalCode('flagged(definitions[1],{sys:118,dia:94})'),true,'Diastolic change must trigger');
assert.equal(evalCode('flagged(definitions[3],{temp:37.5})'),true,'Exactly 0.8 C above baseline must trigger despite floating-point rounding');
assert.equal(evalCode('flagged(definitions[3],{temp:37.4})'),false);
assert.equal(evalCode('current().origin'),'Simulated scenario','A scenario must not be mislabeled as a manual observation');
assert.ok(evalCode('explainSignal(definitions[1],{sys:118,dia:94}).reason').includes('18 mmHg'));
const report=evalCode(`buildReadableReport({...synthetic[0],notes:'<script>alert(1)</script>',context:'After exercise'},[synthetic[0]])`);
assert.ok(report.includes('&lt;script&gt;alert(1)&lt;/script&gt;'),'Notes must be escaped in the standalone HTML report');
assert.ok(!report.includes('<script>'),'Export must not execute embedded scripts');
assert.ok(report.includes('After exercise'));
assert.ok(report.includes('Content-Security-Policy'));
evalCode("scenario='nominal';records.push({...synthetic[0],sleep:7.5,date:'2026-11-15T12:00:00Z',origin:'Manual entry'});persist();render()");
assert.equal(get('#attention-count').textContent,0);assert.equal(JSON.parse(store.get('astra-records')).length,1);
evalCode("done=['check','exercise','recovery','crew'];renderTasks()");assert.equal(get('#task-count').textContent,'4 / 4 COMPLETE');
assert.equal(get('#task-progress').style.width,'100%');
for(const id of ['overview','trends','routine','science']){evalCode(`go('${id}')`);assert.equal(ctx.location.hash,'#'+id);}
assert.ok(get('#chart').innerHTML.includes('<svg'));assert.ok(get('#sources').innerHTML.includes('https://www.nasa.gov/hrp/hazards/'));
evalCode("scenario='review';metric='hr';go('routine')");
const beforeRecords=evalCode('JSON.stringify(records)'),beforeTasks=evalCode('JSON.stringify(done)');
evalCode('startDemo()');assert.equal(evalCode('tourIndex'),0);assert.equal(get('#demo-tour').hidden,false);
for(let i=1;i<7;i++)evalCode(`showDemoStep(${i})`);
assert.equal(evalCode('JSON.stringify(records)'),beforeRecords,'Tour must not save observations automatically');
assert.equal(evalCode('JSON.stringify(done)'),beforeTasks,'Tour must not check tasks automatically');
evalCode('endDemo()');assert.equal(evalCode('scenario'),'review');assert.equal(evalCode('metric'),'hr');assert.equal(ctx.location.hash,'#routine');assert.equal(get('#demo-tour').hidden,true);
evalCode("startDemo();go('trends')");assert.equal(evalCode('tourIndex'),-1,'Manual navigation must close the tour instead of leaving a misleading step');assert.equal(get('#demo-tour').hidden,true);assert.equal(ctx.location.hash,'#trends');
evalCode("records[0].temp=40;scenario='fatigue'");assert.equal(evalCode('current().temp'),36.7,'Synthetic scenarios must not inherit saved manual values');
console.log('Passed: tour state restoration and non-mutation, independent synthetic scenarios, signal rules, readable report escaping/context, persistence, checklist and navigation. Browser layout, downloads and offline behavior still require manual QA.');
