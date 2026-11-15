/* SI-assisted guided demonstration. No automatic check-in or data deletion. */
'use strict';
const demoSteps=[
 {title:'A clear daily overview',copy:'Six manual indicators give the crew a shared starting point. All initial readings are synthetic.',page:'overview',scenario:'nominal',action:'Look at the observation cards and the daily health brief.'},
 {title:'Notice a change in recovery',copy:'The sleep disruption scenario records 4.8 hours of sleep and a mood rating of 2/5. These are fictional observations.',page:'overview',scenario:'fatigue',action:'Expand Sleep duration in “Understand each signal” to inspect the rule.'},
 {title:'Understand the trend',copy:'The sleep chart puts the scenario beside previous observations and the fictional 7.5-hour baseline.',page:'trends',scenario:'fatigue',metric:'sleep',action:'Read the explanation below the curve. The signal asks for review, not a diagnosis.'},
 {title:'Document a new observation',copy:'A check-in can include measurement context and notes. The tour never saves an entry automatically.',page:'overview',scenario:'nominal',action:'Use “Log health check” if you want to try a manual entry. Close the form to continue without saving.'},
 {title:'Keep a daily routine',copy:'The checklist connects observation with mission-approved routines and crew support.',page:'routine',scenario:'nominal',action:'Try a checklist action if you wish. Changes you make yourself are saved locally.'},
 {title:'Make the review portable',copy:'Download a readable report with context and rule explanations, or export the underlying JSON.',page:'trends',scenario:'fatigue',metric:'sleep',action:'Use “Readable report”. The file downloads locally and is not sent to a medical team.'},
 {title:'Trace the science',copy:'NASA Human Research Program resources inform the educational framework. Demonstration rules remain unvalidated.',page:'science',scenario:'nominal',action:'Explore the five hazards and the linked NASA resources.'}
];
let tourIndex=-1,tourSnapshot=null;
function showDemoStep(index){
 const step=demoSteps[index];if(!step)return;
 tourIndex=index;scenario=step.scenario;$('#scenario').value=scenario;if(step.metric)metric=step.metric;
 go(step.page);render();
 $('#demo-tour').hidden=false;$('#tour-progress').textContent=`GUIDED DEMO / ${index+1} OF ${demoSteps.length}`;
 $('#tour-title').textContent=step.title;$('#tour-copy').textContent=step.copy;$('#tour-action').textContent=step.action;
 $('#tour-back').disabled=index===0;$('#tour-next').textContent=index===demoSteps.length-1?'Finish demo':'Next step →';
 $('#tour-toggle').textContent='Exit guided demo';$('#tour-toggle').setAttribute('aria-expanded','true');
 $('#demo-tour').scrollIntoView({block:'start',behavior:'auto'});$('#tour-title').focus({preventScroll:true});
}
function startDemo(){
 if(tourIndex>=0){endDemo();return;}
 tourSnapshot={page:location.hash.slice(1)||'overview',scenario,metric};showDemoStep(0);
}
function endDemo(restore=true){
 const snapshot=tourSnapshot;tourIndex=-1;tourSnapshot=null;$('#demo-tour').hidden=true;
 $('#tour-toggle').textContent='▷ Guided demo';$('#tour-toggle').setAttribute('aria-expanded','false');
 if(restore&&snapshot){scenario=snapshot.scenario;metric=snapshot.metric;$('#scenario').value=scenario;go(snapshot.page);}render();
}
const goBeforeTour=go;
go=function(page){if(tourIndex>=0&&page!==demoSteps[tourIndex].page)endDemo(false);goBeforeTour(page);};
$('#tour-toggle').onclick=startDemo;$('#tour-close').onclick=endDemo;
$('#tour-back').onclick=()=>{if(tourIndex>0)showDemoStep(tourIndex-1);};
$('#tour-next').onclick=()=>{if(tourIndex===demoSteps.length-1)endDemo();else showDemoStep(tourIndex+1);};
