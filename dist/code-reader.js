/* Render authored traces without evaluating lesson code or calling example APIs. */
(() => {
 const fingerprint=code=>{
  let hash=2166136261;
  for(const char of code.replace(/\r\n/g,'\n').trimEnd())hash=Math.imul(hash^char.charCodeAt(0),16777619)>>>0;
  return hash.toString(16);
 };
 const element=(tag,className,text)=>{
  const el=document.createElement(tag);el.className=className;
  if(text!==undefined)el.textContent=text;return el;
 };
 window.enhanceLessonCode=(wrap,pre,raw,id)=>{
  const guide=window.CodeGuides?.[id];
  const lines=raw.replace(/\r\n/g,'\n').split('\n');
  const code=element('code','numbered-code');
  lines.forEach((text,i)=>{
   const line=element('span','code-line',text||' ');
   line.dataset.line=i+1;code.append(line);
  });
  pre.replaceChildren(code);wrap.classList.add('numbered-example');
  pre.setAttribute('aria-label',`โค้ดตัวอย่าง ${id} พร้อมเลขบรรทัด`);
  pre.dataset.codeId=id;
  // A stale explanation must not be silently attached to a changed snippet.
  if(!guide||guide.fingerprint!==fingerprint(raw))return;
  wrap.classList.add('guided-example');
  const header=element('div','example-heading');
  header.append(element('strong','','อ่านโค้ดทีละขั้น'),element('span','example-id',`ตัวอย่าง ${id}`));
  const input=element('p','example-input');input.append(element('strong','','ก่อนเริ่ม: '),document.createTextNode(guide.input));
  wrap.prepend(header,input);
  const panel=element('div','trace-panel');
  const controls=element('div','trace-controls');
  const previous=element('button','btn','← ย้อนขั้น');previous.type='button';
  const next=element('button','btn primary','ขั้นถัดไป →');next.type='button';
  const counter=element('span','trace-counter');
  controls.append(previous,counter,next);
  const live=element('div','trace-live');live.setAttribute('aria-live','polite');live.setAttribute('aria-atomic','true');
  const title=element('h3','trace-title');const state=element('p','trace-state');live.append(title,state);
  const result=element('div','example-result');
  result.append(element('h3','','ผลลัพธ์ที่คาดว่าจะได้'),element('samp','example-output',guide.output));
  const all=element('details','trace-all');all.append(element('summary','','ดูลำดับทั้งหมด'));
  const list=element('ol','');
  guide.steps.forEach(([start,end,explanation,value])=>{
   const row=element('li','');row.append(element('strong','',`บรรทัด ${start===end?start:`${start}-${end}`}: ${explanation}`),element('p','',value));list.append(row);
  });all.append(list);
  panel.append(controls,live,all,result);wrap.append(panel);
  let stepIndex=0;
  const render=()=>{
   const [start,end,explanation,value]=guide.steps[stepIndex];
   code.querySelectorAll('.code-line').forEach(line=>{
    const active=Number(line.dataset.line)>=start&&Number(line.dataset.line)<=end;
    line.classList.toggle('is-current-line',active);
   });
   counter.textContent=`ขั้น ${stepIndex+1} / ${guide.steps.length}`;
   title.textContent=`บรรทัด ${start===end?start:`${start}-${end}`}: ${explanation}`;
   state.textContent=value;
   previous.disabled=stepIndex===0;next.disabled=stepIndex===guide.steps.length-1;
  };
  previous.addEventListener('click',()=>{if(stepIndex>0){stepIndex--;render();}});
  next.addEventListener('click',()=>{if(stepIndex<guide.steps.length-1){stepIndex++;render();}});
  render();
 };
})();
