const head=document.getElementById('head'),btn=document.getElementById('menuBtn');
if(head&&btn){
 const onScroll=()=>head.classList.toggle('solid',window.scrollY>40);
 const setMenu=open=>{head.classList.toggle('open',open);btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기')};
 onScroll();window.addEventListener('scroll',onScroll,{passive:true});
 btn.addEventListener('click',()=>setMenu(!head.classList.contains('open')));
 document.querySelectorAll('#gnb a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
 document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});
}