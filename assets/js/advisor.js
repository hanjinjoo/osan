import {SETTLEMENT_FORMS} from '../../data/document-manifest.js';
const advisor=document.getElementById('docAdvisor');
if(advisor){
 function update(){
 const food=document.getElementById('advisorFood').checked,goods=document.getElementById('advisorGoods').checked;
 const clubInput=advisor.querySelector('input[name="advisorClub"]:checked');
 const club=clubInput?clubInput.value:'major';const docs=['활동보고서'];if(food||goods)docs.push('영수증 붙임철');if(goods)docs.push('검수조서');
 document.getElementById('advisorSummary').textContent=!food&&!goods?'지원금 미사용 시 준비 서류':food&&goods?'식비·다과비 및 물품 구입 시 준비 서류':goods?'재료·물품 구입 시 준비 서류':'식비·다과비 사용 시 준비 서류';
 const list=document.getElementById('advisorResultList');list.replaceChildren();docs.forEach(name=>{const li=document.createElement('li');li.textContent=name;list.appendChild(li)});
 const target=document.getElementById('advisorDownloadLinks');target.replaceChildren();
 const required=[];if(food||goods)required.push(['06','영수증 붙임 철']);if(goods)required.push(['07','검수 조서']);
 required.forEach(([num,title])=>{const data=SETTLEMENT_FORMS[club]?.[num];if(!data)return;const a=document.createElement('a');a.className='doc-download';a.href='../'+data.href;a.download=data.download;a.textContent=title+' HWP 다운로드 ↓';target.appendChild(a)});
 }
 advisor.addEventListener('change',update);update();
}