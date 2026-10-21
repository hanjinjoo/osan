const note=document.getElementById('kakaoNote');
if(note&&/KAKAOTALK/i.test(navigator.userAgent)){
 note.hidden=false;
 document.querySelectorAll('a.dl-btn').forEach(a=>a.addEventListener('click',event=>{
  event.preventDefault();const abs=new URL(a.getAttribute('href'),location.href).href;
  location.href='kakaotalk://web/openExternal?url='+encodeURIComponent(abs);
 }));
}
const tabs=Array.from(document.querySelectorAll('[data-settlement-tab]'));
function activate(type,focus=false){
 tabs.forEach(tab=>{const on=tab.dataset.settlementTab===type;tab.setAttribute('aria-selected',String(on));tab.tabIndex=on?0:-1;if(on&&focus)tab.focus()});
 document.querySelectorAll('[data-settlement-panel]').forEach(panel=>panel.hidden=panel.dataset.settlementPanel!==type);
}
tabs.forEach((tab,i)=>{
 tab.addEventListener('click',()=>activate(tab.dataset.settlementTab));
 tab.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const offset=e.key==='ArrowRight'?1:-1;const next=tabs[(i+offset+tabs.length)%tabs.length];activate(next.dataset.settlementTab,true)}});
});