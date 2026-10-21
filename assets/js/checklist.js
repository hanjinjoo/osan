// 기존 브라우저 저장 키를 반드시 유지: 이전 체크 상태 복구
const checkboxes=Array.from(document.querySelectorAll('[data-preflight-check]'));
const key='osan-club-submission-checklist-2026-2';
if(checkboxes.length){
 const count=document.getElementById('preflightCount'),progress=document.getElementById('preflightProgress'),status=document.getElementById('preflightStatus'),reset=document.getElementById('preflightReset');
 function update(){const completed=checkboxes.filter(x=>x.checked).length;count.textContent=completed+' / '+checkboxes.length+' 완료';progress.value=completed;status.textContent=completed===checkboxes.length?'모든 확인 항목을 체크했습니다. 실제 제출과 승인은 별도로 완료해야 합니다.':'확인할 항목이 '+(checkboxes.length-completed)+'개 남았습니다.';try{localStorage.setItem(key,JSON.stringify(checkboxes.map(x=>x.checked)))}catch(_){}}
 try{const old=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(old)&&old.length===checkboxes.length)checkboxes.forEach((x,i)=>x.checked=old[i]===true)}catch(_){}
 checkboxes.forEach(x=>x.addEventListener('change',update));reset.addEventListener('click',()=>{checkboxes.forEach(x=>x.checked=false);update()});update();
}