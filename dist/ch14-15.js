addChapter({title:'Errors และ Error Handling',subtitle:'จำแนกข้อผิดพลาด แล้วตามเส้นทาง try, catch, finally และ Promise rejection',group:'ขอบเขตสอบเพิ่มเติม',minutes:30,sources:[],
 refs:[['MDN · Control flow and error handling','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling'],['MDN · try…catch','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch'],['MDN · Error','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error']],
 goals:['แยก SyntaxError, ReferenceError, TypeError และ logical error','ไล่การทำงานเมื่อ throw ใน try/catch/finally','จับ asynchronous error ในบริบทที่ถูกต้อง'],
 sections:[
 S('ผิดแบบไหน: ไวยากรณ์ การทำงาน หรือความหมาย',`<table><tr><th>ประเภท</th><th>ตัวอย่าง</th><th>วิธีคิด</th></tr><tr><td>SyntaxError</td><td>วงเล็บไม่ครบ / JSON.parse ข้อความผิดรูปแบบ</td><td>อ่านรูปแบบไม่ได้</td></tr><tr><td>ReferenceError</td><td>อ่านชื่อที่ไม่ประกาศ หรือ let ใน TDZ</td><td>อ้างชื่อหรือ binding ไม่ได้</td></tr><tr><td>TypeError</td><td>null.name หรือเรียก 3() ผ่านตัวแปร number</td><td>ชนิดค่าไม่รองรับการกระทำ</td></tr><tr><td>RangeError</td><td>new Array(-1)</td><td>ค่านอกช่วงที่ API ยอมรับ</td></tr><tr><td>Logical error</td><td>สูตรลดราคาบวกแทนลบ</td><td>รันได้แต่ผลไม่ตรงโจทย์</td></tr></table><p>NaN และ Infinity เป็นค่า number ไม่ใช่ exception โดยตัวมันเอง เช่น <code>1 / 0</code> ได้ Infinity และ <code>Number('abc')</code> ได้ NaN จึงต้องตรวจค่าเอง</p>`),
 S('try, throw และ catch',`<pre><code>function readScore(text) {
  try {
    const row = JSON.parse(text);
    if (typeof row.score !== 'number' || !Number.isFinite(row.score)) {
      throw new Error('score must be a finite number');
    }
    return row.score;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}</code></pre><p>try ทำงานจนจบหรือพบ throw; เมื่อ throw จะข้ามคำสั่งที่เหลือใน try แล้วไป catch ที่รับได้ การ parse สำเร็จไม่ได้แปลว่าข้อมูลมีโครงสร้างที่คาด จึงต้อง validate เพิ่ม การ throw Error object ให้ name/message และข้อมูล stack สำหรับ debug ได้ดีกว่าข้อความลอย ๆ</p>`),
 S('finally และการคืนค่า',`<pre><code>function demo() {
  try { return 'try'; }
  finally { console.log('cleanup'); }
}
demo(); // log cleanup ก่อนคืน 'try'</code></pre><p>finally ทำหลัง try/catch ไม่ว่าทางนั้นสำเร็จหรือ throw ในการไหลของโปรแกรมปกติ เหมาะกับคืนสถานะหรือ cleanup แต่ <strong>return/throw ใน finally สามารถทับผลหรือ error เดิม</strong> จึงควรหลีกเลี่ยง</p><pre><code>function misleading() {
  try { return 1; }
  finally { return 2; }
}
misleading(); // 2</code></pre>`),
 S('catch จับได้เฉพาะสิ่งที่อยู่ในเส้นทางนั้น',`<p>SyntaxError ที่ทำให้สคริปต์ทั้งก้อนไม่ผ่านการ parse ไม่สามารถแก้ด้วย try ที่อยู่ในสคริปต์เดียวกัน แต่ JSON.parse ที่ throw SyntaxError ระหว่างรันอยู่ใน try จะจับได้</p><pre><code>try {
  setTimeout(() =&gt; {
    // callback นี้ทำภายหลัง try ด้านนอกจบไปแล้ว
    try { throw new Error('later'); }
    catch (error) { console.error(error.message); }
  }, 0);
} catch (error) {
  // ไม่ได้รับ error จาก callback ข้างบน
}</code></pre><p>ตำแหน่งที่เขียนซ้อนกันในไฟล์ไม่ได้รับประกันว่า error จะย้อนกลับไป catch ภายนอก เพราะเวลาและ call stack เปลี่ยนไปแล้ว</p>`),
 S('Promise rejection และการ await',`<pre><code>async function load() {
  try {
    await Promise.reject(new Error('offline'));
  } catch (error) {
    return {ok:false, message:error.message};
  } finally {
    // ปิดสถานะ loading
  }
}</code></pre><p><code>await</code> ของ rejected Promise ทำให้เส้นทางนั้น throw จึงจับด้วย catch ได้ หรือใช้ <code>promise.catch(handler)</code> การเรียก async function ใน try โดยไม่ await หรือจัดการ Promise ไม่ทำให้ catch ภายนอกได้รับ rejection อัตโนมัติ</p><p>อย่าจับแล้วเงียบทุกอย่าง: แยกข้อความที่ผู้ใช้แก้ได้, retry เมื่อเหมาะสม, และส่งต่อ error ที่ชั้นนี้จัดการไม่ได้ หลีกเลี่ยงแสดงรหัสลับหรือรายละเอียดระบบในหน้าข้อผิดพลาด</p>`),
 S('วิธีไล่โจทย์ Multiple Choice',`<ol><li>ตรวจว่าผ่าน syntax ก่อนหรือไม่</li><li>ระบุบรรทัดแรกที่ throw หรือได้ค่าพิเศษ เช่น NaN</li><li>หา catch ที่รับได้ในเส้นทางการทำงานจริง</li><li>ตรวจ finally ว่ามี return/throw ทับหรือไม่</li><li>ถ้าเป็น async ให้ตาม Promise และ await แยกจากโค้ด synchronous</li></ol><p>ตัวอย่าง <code>try { JSON.parse('{bad}'); console.log('A'); } catch { console.log('B'); } finally { console.log('C'); }</code> แสดง B แล้ว C โดย A ไม่ทำงาน</p>`)
 ],tips:[['อ่านชื่อ error','Syntax รูปแบบ · Reference ชื่อ · Type ชนิด · Range ช่วง'],['throw กระโดด','คำสั่งถัดไปใน try ถูกข้าม'],['finally ไม่ทับ','cleanup ได้ แต่เลี่ยง return/throw ทับ'],['async ต้องรับ Promise','await ใน try หรือ chain catch ให้ถูกตำแหน่ง']],
 quiz:[
 ['อ่านตัวแปรที่ไม่เคยประกาศโดยตรงมักเกิดอะไร','ReferenceError','TypeError เสมอ','RangeError','ได้ null เสมอ','ชื่อ binding หาไม่พบจึง ReferenceError','Reference คืออ้างชื่อ'],
 ['const x=null; x.name; เกิดอะไร','TypeError','SyntaxError','ได้ null เสมอ','ได้ 0','null ไม่มี property ให้เข้าถึงแบบนี้','ชนิดไม่รองรับ'],
 ['JSON.parse("{bad}") เกิดอะไร','SyntaxError ระหว่างรัน','คืน {}','คืน null','แก้ข้อความให้อัตโนมัติ','JSON ผิดรูปแบบจะ throw ไม่ใช่ซ่อมให้','parse ไม่ผ่านรูปแบบ'],
 ['new Array(-1) เป็นข้อผิดพลาดชนิดใด','RangeError','ReferenceError','HTTP 404','ไม่มีข้อผิดพลาด','ความยาว array ติดลบใช้ไม่ได้','ค่านอกช่วง'],
 ['สูตรคำนวณราคาผิดแต่รันจบเป็นอะไร','Logical error','ต้องเป็น SyntaxError','ต้องเป็น TypeError','Promise pending เสมอ','ผลเชิงความหมายผิดโดยไม่จำเป็นต้อง throw','รันได้ไม่แปลว่าถูก'],
 ['1 / 0 ใน JavaScript number ให้ค่าใด','Infinity','throw Error เสมอ','null','0','การหารด้วยศูนย์แบบ number นี้ให้ Infinity','ค่าพิเศษไม่ใช่ exception'],
 ['Number("abc") ให้ค่าใด','NaN','ReferenceError','0','undefined','การแปลงเลขไม่สำเร็จได้ NaN','ตรวจ Number.isNaN'],
 ['เมื่อ throw กลาง try คำสั่งถัดไปใน try เป็นอย่างไร','ถูกข้ามเพื่อไปจัดการ error','ทำครบก่อนเข้า catch เสมอ','รันซ้ำสองครั้ง','ถูกแปลงเป็น Promise อัตโนมัติ','throw หยุดเส้นทางปัจจุบัน','throw กระโดด'],
 ['catch ทำงานเมื่อใด','มี exception ที่ส่งมาถึง catch นั้น','ทุกครั้งหลัง try แม้ไม่มี error','ก่อน try เสมอ','เฉพาะ HTTP 500','catch ไม่ได้ทำทุกครั้ง มี finally สำหรับ cleanup','catch เมื่อรับ exception'],
 ['try ไม่มี error แล้วมี finally จะเกิดอะไร','finally ยังทำงานตามการไหลปกติ','finally ไม่ทำงาน','catch ต้องทำก่อนเสมอ','เกิด SyntaxError เสมอ','finally ใช้ได้ทั้งเส้นทางสำเร็จและล้มเหลว','จบท้ายทั้งสองทาง'],
 ['try return 1; finally return 2; ฟังก์ชันคืนอะไร','2','1','undefined','[1,2]','return ใน finally ทับผลเดิม','finally อาจทับ'],
 ['SyntaxError ที่ทำให้ไฟล์ทั้งก้อนไม่ผ่าน parse จับด้วย try ในไฟล์เดียวกันได้หรือไม่','ไม่ได้ เพราะโค้ดยังไม่เริ่มทำงาน','ได้เสมอ','ได้ถ้า catch ว่าง','ได้เฉพาะ const','สคริปต์ต้องผ่าน parse ก่อนจึงเข้า try ได้','แยก parse กับ runtime'],
 ['error ใน setTimeout callback ถูก catch ภายนอกที่จบไปแล้วจับได้หรือไม่','ไม่ได้ ต้องจัดการใน callback หรือเชื่อมผ่าน Promise','ได้เพราะเขียนซ้อนกัน','ได้ถ้ารอ 0ms','ไม่มี error ใน callback ได้เลย','callback ทำงานอีกเวลาและอีก call stack','ซ้อนข้อความไม่ใช่ซ้อนเวลา'],
 ['จับ rejected Promise ด้วย try/catch ใน async ควรทำอย่างไร','await Promise นั้นใน try','เรียกทิ้งใน try แล้วไม่รับผล','ใส่ await ใน finally เท่านั้น','แปลง Error เป็น string เสมอ','await เปลี่ยน rejection เป็น throw ณ จุดรอ','await ใน try'],
 ['Error.message ใช้เก็บอะไร','ข้อความอธิบาย error','HTTP status ทุกกรณี','HTML ทั้งหน้า','ชื่อ Git branch','message คือคำอธิบาย ไม่ใช่ status code อัตโนมัติ','message ข้อความ'],
 ['JSON.parse สำเร็จแล้วควรทำอะไรกับข้อมูลก่อนใช้ตาม schema','ตรวจชนิดและ fields ที่ต้องใช้','สมมติทุก field ถูกต้อง','รัน eval','เปลี่ยนเป็น global เสมอ','syntax ถูกไม่ได้ยืนยันโครงสร้างหรือเงื่อนไขของงาน','parse แล้ว validate'],
 M('ข้อใดเป็นค่าที่ไม่ใช่ exception โดยตัวมันเอง',['NaN','Infinity'],['ReferenceError ที่ถูก throw','TypeError ที่ถูก throw'],'NaN/Infinity เป็น number values ต้องตรวจเพิ่มเอง','ค่าไม่เท่ากับ error'),
 M('ข้อใดถูกเกี่ยวกับ finally',['ทำ cleanup ได้ทั้ง success/error','return ใน finally อาจทับ return เดิม'],['ทำงานเฉพาะตอน catch ล้มเหลว','ใช้แก้ SyntaxError ของไฟล์ก่อน parse ได้'],'finally เป็นการจัดการตอนออกจาก try/catch ไม่ได้ซ่อม syntax ของโปรแกรม','ตาม control flow'),
 M('วิธีใดรับ Promise rejection ได้',['await ภายใน try/catch','ต่อ .catch(handler) ให้ Promise'],['try { asyncJob(); } โดยไม่ await หรือรับ Promise','ใส่ setTimeout รอบงานโดยไม่มี handler'],'ต้องจัดการ Promise หรือ await ในขอบเขตที่จับ error','อย่าทิ้ง Promise'),
 M('การออกแบบ error handling ที่เหมาะสมมีอะไร',['ตรวจ input ก่อนใช้งาน','ส่งต่อ error ที่ชั้นนี้จัดการไม่ได้','คืนสถานะ loading เมื่อเสร็จ'],['catch ทุกอย่างแล้วแสดงว่าสำเร็จ'],'การจัดการต้องทำให้สถานะ UI และผลจริงตรงกัน','จับเพื่อรับมือ ไม่ใช่ซ่อน')
 ]});

addChapter({title:'Asynchronous JavaScript และ Fetch',subtitle:'ไล่ลำดับงาน Promise, async/await แล้วรับส่งข้อมูล API อย่างถูกต้อง',group:'ขอบเขตสอบเพิ่มเติม',minutes:40,sources:[],
 refs:[['MDN · Using promises','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises'],['MDN · Fetch API','https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch'],['MDN · Microtasks','https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide']],
 goals:['ไล่ลำดับ synchronous, Promise callbacks และ timer ใน browser','ใช้ Promise.all/allSettled ให้ตรงโจทย์','ตรวจ HTTP status, JSON body และการยกเลิก request'],
 sections:[
 S('Call stack, task และ microtask',`<p>ตัวอย่างในบทนี้อิง <strong>browser ในหนึ่ง script task</strong> ไม่ปนกฎ process.nextTick หรือ phases เฉพาะ Node โค้ด synchronous จบก่อน จากนั้นระบาย microtasks ที่รออยู่ ก่อน task ถัดไป เช่น timer</p><pre><code>console.log('A');
setTimeout(() =&gt; console.log('B'), 0);
Promise.resolve().then(() =&gt; console.log('C'));
console.log('D');
// A, D, C, B</code></pre><p>setTimeout 0 ไม่ได้หมายถึงทันทีหรือรับประกันเวลาจริง 0ms แต่เป็นการตั้งงานให้มีสิทธิ์ทำภายหลังเมื่อถึงเงื่อนไข ถ้ามีงาน synchronous ยาว callback ก็ยังต้องรอ</p>`),
 S('Promise และการต่อ chain',`<p>Promise มี pending → fulfilled หรือ rejected เมื่อ settled แล้วไม่เปลี่ยนกลับไป pending <code>then</code> คืน Promise ใหม่: return ค่าธรรมดาทำให้ chain ต่อด้วยค่านั้น; return Promise ทำให้รอผลนั้น; throw ทำให้ Promise ใหม่ reject</p><pre><code>Promise.resolve(3)
  .then(n =&gt; n * 2)
  .then(n =&gt; console.log(n)); // 6

Promise.resolve(3)
  .then(n =&gt; { n * 2; })
  .then(n =&gt; console.log(n)); // undefined เพราะไม่ได้ return</code></pre><p>Promise executor ที่ส่งให้ new Promise ทำงาน synchronous ตอนสร้าง แต่ callback ของ then ทำภายหลัง อย่าสับสนสองส่วนนี้</p>`),
 S('async/await และงานอิสระ',`<p>async function คืน Promise เสมอ await พัก continuation ของฟังก์ชันนั้นโดยไม่บล็อก thread ทั้งหมด และเมื่อ Promise reject จะ throw ที่จุด await</p><pre><code>// ตัวอย่างสมมติว่ามี loadProfile/loadCourses ที่คืน Promise
const [profile, courses] = await Promise.all([
  loadProfile(), loadCourses()
]);</code></pre><p>เมื่อสองงานไม่ขึ้นต่อกัน เริ่มทั้งสองแล้วรอด้วย Promise.all ได้ ผล array เรียงตาม input ไม่ใช่ลำดับเสร็จ ถ้าตัวหนึ่ง reject all จะ reject แต่ <strong>ไม่ได้ยกเลิกงานอื่นอัตโนมัติ</strong> ใช้ allSettled เมื่อต้องการสถานะและผลทุกงานแม้บางตัวล้มเหลว ถ้างานหลังต้องใช้ผลจากงานแรก ให้ await ตาม dependency</p>`),
 S('GET: Response ก่อน data',`<pre><code>async function getCourses() {
  const response = await fetch('/api/courses');
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return await response.json();
}</code></pre><p>fetch ให้ Promise ของ Response; response.json() เป็นอีก Promise ที่อ่าน body และ parse JSON ค่า ok หมายถึง status 200-299; HTTP 404/500 ปกติยัง resolve เป็น Response ต้องตรวจเอง Network failure, abort หรือการปฏิเสธเข้าถึงบางกรณีทำให้ fetch reject</p><p>Body เป็น stream ที่อ่านแล้วโดยทั่วไปใช้ซ้ำไม่ได้ หากจำเป็นต้องอ่านสองทางให้ clone response ก่อนอ่าน Response 204 ไม่มี body จึงไม่ควรเรียก json() แบบเหมารวม ส่วน JSON.parse ใช้กับ string ที่มีอยู่แล้วและไม่คืน Promise</p>`),
 S('POST JSON และ CORS',`<pre><code>async function createCourse(title) {
  const response = await fetch('/api/courses', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({title})
  });
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return response.status === 204 ? null : await response.json();
}</code></pre><p>Content-Type บอกชนิด body; Accept บอกชนิด response ที่ client รับได้ Origin ประกอบด้วย scheme, host, port; ต่าง port ก็ข้าม origin ใน browser การอ่าน response ข้าม origin ต้องได้รับอนุญาตตาม CORS จาก server ซึ่งไม่ใช่ระบบยืนยันตัวตน</p><p><code>mode:'no-cors'</code> ไม่ใช่วิธีทำให้ browser อ่าน JSON จาก API ที่ไม่มีสิทธิ์ได้ มักได้ opaque response ที่อ่าน status/body ตามต้องการไม่ได้ เมื่อส่ง FormData ปล่อย browser กำหนด Content-Type พร้อม boundary ให้เอง</p>`),
 S('ยกเลิกงานและออกแบบสถานะ UI',`<pre><code>const controller = new AbortController();
const pending = fetch('/api/courses', {signal:controller.signal});
controller.abort();
pending.catch(error =&gt; console.log(error.name));</code></pre><p>AbortController ช่วยยกเลิก fetch ฝั่ง client แต่ไม่ได้รับประกันว่าจะย้อนผลการเปลี่ยนข้อมูลที่ server ทำไปแล้ว UI ควรแยก loading, success, empty และ error; ป้องกันผล request เก่าที่ช้ากว่าทับผลใหม่ด้วยการ abort หรือเช็ก request identity ตามบริบท</p><p>Ajax เป็นแนวทางอัปเดตข้อมูลบางส่วนโดยไม่ reload ทั้งหน้า ใช้ fetch/JSON ได้ แม้ชื่อ Ajax เดิมจะมี XML โค้ดตัวอย่างในบทเป็นตัวอย่างอ่านสอบ ไม่ได้มี API /api/courses จริงในเว็บสรุปนี้</p>`)
 ],tips:[['คิว browser','sync ก่อน → microtasks → task ถัดไป'],['chain ส่งค่า','มี { } ใน arrow แล้วต้อง return ถ้าต้องการส่งต่อ'],['Fetch สองขั้น','Response → ตรวจ status → อ่าน body'],['all กับ allSettled','all ต้องสำเร็จทุกตัว; allSettled รายงานทุกผล']],
 quiz:[
 ['ใน browser: log A, timer B, resolved Promise.then C, log D ได้ลำดับใด','A D C B','A B C D','C A D B','A C B D','sync A D จบก่อน microtask C และ timer task B','sync micro task'],
 ['setTimeout(fn,0) รับประกันอะไร','จัด callback ให้มีโอกาสทำภายหลัง ไม่ใช่เรียกทันที','fn รันก่อนบรรทัดถัดไป','ครบ 0ms ตรงเป๊ะ','หยุด UI จน fn จบ','timer ไม่แทรก synchronous code ที่ยังทำงานอยู่','0 ไม่เท่าทันที'],
 ['สถานะ Promise มีอะไร','pending, fulfilled, rejected','loading, empty, success เท่านั้น','new, run, stop','true, false, null','loading/empty เป็นสถานะ UI ไม่ใช่ Promise states','รอ สำเร็จ ปฏิเสธ'],
 ['executor ของ new Promise ทำงานเมื่อใด','synchronous ตอนสร้าง Promise','หลัง timer ทุกครั้ง','เมื่อ await เท่านั้น','ไม่ทำจนมี catch','executor กับ then callback มีเวลาทำงานต่างกัน','executor เริ่มทันที'],
 ['Promise.resolve(3).then(n=>n*2) fulfill ด้วยค่าใด','6','3','undefined','Promise.reject','arrow แบบ expression ส่งผลคูณกลับ','implicit return'],
 ['Promise.resolve(3).then(n=>{n*2;}) fulfill ด้วยค่าใด','undefined','6','3','null','block arrow ไม่มี return จึงได้ undefined','ปีกกาต้อง return'],
 ['async function ที่ return 5 ให้ผู้เรียกได้อะไร','Promise ที่ fulfill ด้วย 5','number 5 โดยตรง','undefined','DOM node','async wrap ผลใน Promise','async Promise เสมอ'],
 ['Promise.all คืนผลเรียงตามอะไร','ลำดับ Promise ใน input','ลำดับเสร็จเร็วไปช้า','ค่าจากน้อยไปมาก','ลำดับสุ่ม','result index ตรงกับ input index','รักษาลำดับ input'],
 ['หนึ่ง Promise ใน Promise.all reject แล้วเกิดอะไร','all reject แต่งานอื่นไม่ถูก cancel อัตโนมัติ','ทุกงานถูกยกเลิกอัตโนมัติ','all คืน null เสมอ','รอครบแล้ว fulfill เสมอ','fail-fast ของผลรวมไม่ใช่ cancellation','reject ไม่ใช่ cancel'],
 ['ต้องเก็บผลสำเร็จ/ล้มเหลวทุกงานควรใช้','Promise.allSettled','Promise.all เท่านั้น','JSON.stringify','setInterval เท่านั้น','allSettled รอทุกตัวแล้วรายงาน status','รับทุกผล'],
 ['await fetch(url) สำเร็จให้ค่าใด','Response','JSON object เสมอ','String body เสมอ','Boolean','ต้องอ่าน body อีกขั้น','Response ก่อน data'],
 ['fetch ได้ 404 โดยทั่วไปเป็นอย่างไร','resolve เป็น Response ที่ ok=false','reject เสมอ','ok=true เพราะมี response','แปลงเป็น 200 อัตโนมัติ','HTTP error ไม่เท่ากับ network rejection','ตรวจ ok เอง'],
 ['response.json() คืนอะไร','Promise ของค่าที่ parse จาก body','string JSON เสมอ','Response อีกตัวเสมอ','DOM tree','อ่าน stream และ parse จึง asynchronous','json เป็น Promise'],
 ['ส่ง object เป็น JSON body ของ fetch ควรทำอย่างไร','JSON.stringify พร้อม Content-Type application/json','ใส่ object ตรง ๆ แล้วได้ JSON เสมอ','ใช้ response.json() เป็น body','ใช้ innerHTML','fetch ไม่ serialize plain object เป็น JSON ให้เอง','serialize ก่อนส่ง'],
 ['response 204 ที่ไม่มี body ควรทำอย่างไร','จัดการไม่มีข้อมูลโดยไม่ parse JSON เปล่า','เรียก json() แล้วได้ {} แน่นอน','ถือเป็น network error','โหลดซ้ำไม่จำกัด','204 สำเร็จแต่ไม่มี JSON body','success อาจไม่มี body'],
 ['ยกเลิก fetch ใช้เครื่องมือใด','AbortController และ signal','clearInterval(response)','JSON.abort','response.preventDefault','ส่ง signal ให้ fetch แล้ว abort controller','controller ส่งสัญญาณ'],
 M('ข้อใดทำให้ต้องระวัง catch กับ fetch',['network failure อาจทำให้ reject','HTTP 500 ต้องตรวจ status/ok เอง'],['404 ทุกครั้งเป็น rejection','fetch ไม่เคย reject'],'แยก transport failure กับ response status','คนละชั้นของ error'),
 M('ส่วนใดใช้ระบุ origin ใน browser',['scheme','host','port'],['URL fragment หลัง #'],'scheme/host/port ต้องตรงกันจึง same-origin','สามองค์ประกอบ origin'),
 M('ข้อใดถูกเกี่ยวกับ CORS และ JSON',['server ต้องอนุญาตให้ browser อ่านตาม CORS','no-cors ไม่ได้ทำให้อ่าน opaque JSON ได้'],['CORS แทนระบบ login ได้','GET ใส่ request body ได้เสมอใน fetch'],'CORS เป็นข้อกำหนดการเข้าถึงข้าม origin; fetch GET/HEAD ไม่ใช้ body','CORS ไม่ใช่การยืนยันตัวตน'),
 M('UI ที่รับข้อมูล async ควรรองรับอะไร',['loading ระหว่างรอ','empty เมื่อสำเร็จแต่ไม่มีรายการ','error เมื่อทำงานไม่สำเร็จ'],['แสดง success ทุกครั้งที่ fetch ได้ Response'],'Response อาจ status error และสำเร็จอาจว่างได้','แยกผลกับสถานะรอ')
 ]});
