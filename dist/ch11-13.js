/* Supplemental lessons mapped to Scope_2026A, reviewed 2026-11-01. */
addChapter({title:'Engine, Node.js, npm และ SemVer',subtitle:'แยกภาษาออกจาก runtime แล้วอ่าน dependency และเลขเวอร์ชันให้เป็น',group:'ขอบเขตสอบเพิ่มเติม',minutes:35,sources:[],
 refs:[['Node.js · Event loop','https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick'],['npm · package.json','https://docs.npmjs.com/cli/v11/configuring-npm/package-json/'],['Semantic Versioning 2.0.0','https://semver.org/'],['npm · Version ranges','https://github.com/npm/node-semver#caret-ranges-123-025-004']],
 goals:['แยก engine, runtime, library และ framework','เลือกคำสั่ง npm และอ่าน package/lockfile','คำนวณช่วงเวอร์ชัน ^ และ ~ รวมกรณี 0.x'],
 sections:[
 S('ภาษา, Engine และ Runtime',`<p>JavaScript เป็นภาษา ส่วน <strong>engine</strong> ทำหน้าที่แปลและประมวลผลโค้ด เช่น V8 ที่ใช้ใน Chrome และ Node.js ส่วน <strong>runtime</strong> จัดสภาพแวดล้อมเพิ่มเติม เช่น API, การจัดคิวงาน และ I/O การมี engine เดียวกันจึงไม่ได้ทำให้ API ทุกอย่างเหมือนกัน</p><table><tr><th>บริบท</th><th>ตัวอย่างสิ่งที่มี</th><th>จุดสอบ</th></tr><tr><td>Browser</td><td>document, DOM, events, fetch</td><td>DOM เป็น Web API ไม่ใช่แกนภาษา JS</td></tr><tr><td>Node.js</td><td>process, node:fs, HTTP server</td><td>ไม่มี document โดยค่าเริ่มต้น; รุ่นใหม่มี fetch ได้</td></tr></table><p>library คือเครื่องมือที่เราเรียกใช้ เช่น React สำหรับ UI; framework วางโครงและจุดต่อให้แอป เช่น Next.js บน React และ Express สำหรับ HTTP server ส่วน npm เป็นเครื่องมือจัดการแพ็กเกจ ไม่ใช่ runtime</p>`),
 S('งาน synchronous และงาน I/O',`<p>ใน JavaScript execution context หนึ่ง โค้ด synchronous ทำงานบน call stack ทีละงาน Runtime ช่วยประสาน I/O และคิว callback จึงรองรับคำขอหลายงานระหว่างรอได้ คำว่า asynchronous ไม่ได้แปลว่าคำสั่ง JS ทุกบรรทัดรันพร้อมกัน</p><pre><code>// Node.js (ไฟล์ .mjs)
import { readFile } from 'node:fs/promises';
const text = await readFile('notes.txt', 'utf8');
console.log(text);</code></pre><p>การรอไฟล์แบบ async ต่างจากการวนลูปคำนวณหนักบน thread หลัก ซึ่งยังบล็อกงานอื่นได้ แม้ครอบลูปนั้นด้วย async function ก็ตาม งาน CPU หนักต้องพิจารณาวิธีอื่น เช่น worker threads ไม่ใช่เติม await แล้วเร็วขึ้นเอง</p>`),
 S('เริ่มโปรเจกต์ด้วย npm',`<pre><code>npm init -y
npm install express
npm install --save-dev eslint
npm run dev</code></pre><p><code>npm init -y</code> สร้าง package.json ด้วยค่าตั้งต้น; install ดาวน์โหลด dependency; <code>--save-dev</code> บันทึกเครื่องมือพัฒนาใน devDependencies; <code>npm run dev</code> เรียก script ชื่อ dev ที่โปรเจกต์กำหนด ต้องมี script นั้นก่อน</p><pre><code>{
  "type": "module",
  "scripts": { "dev": "node server.js" }
}</code></pre><p><code>node server.js</code> ใช้ runtime รันไฟล์ ส่วน <code>npx</code> / <code>npm exec</code> ใช้เรียก executable จากแพ็กเกจ และอาจติดตั้งเมื่อยังไม่มี จึงควรตรวจชื่อแพ็กเกจก่อนใช้</p>`),
 S('package.json, lockfile และ node_modules',`<table><tr><th>สิ่งที่พบ</th><th>บทบาท</th></tr><tr><td>package.json</td><td>metadata, scripts, dependency ranges และการตั้งค่า</td></tr><tr><td>package-lock.json</td><td>บันทึก dependency tree และเวอร์ชันที่ resolve เพื่อช่วยติดตั้งซ้ำ</td></tr><tr><td>node_modules</td><td>ไฟล์แพ็กเกจที่ติดตั้ง สร้างใหม่ได้จากข้อมูลแพ็กเกจ</td></tr></table><p>แอปทั่วไปควรเก็บ package.json และ lockfile ใน Git และ ignore node_modules เมื่อใช้ npm ตามปกติ <code>npm ci</code> ต้องมี lockfile ที่สอดคล้องกับ package.json และติดตั้งตามนั้น หากไม่ตรงจะ error แทนการแก้ lockfile ให้เอง การอยู่ใน dependencies ไม่ได้พิสูจน์ว่าโค้ดปลอดภัย</p>`),
 S('Semantic Versioning และช่วงเวอร์ชัน',`<p>สำหรับ public API ที่ใช้ SemVer รุ่นเสถียร 1.0.0 ขึ้นไป: <strong>MAJOR</strong> เปลี่ยนแบบไม่เข้ากัน, <strong>MINOR</strong> เพิ่มความสามารถที่ยังเข้ากัน, <strong>PATCH</strong> แก้บั๊กที่ยังเข้ากัน รุ่น 0.x ยังอยู่ช่วงพัฒนาเริ่มต้นและ API อาจเปลี่ยนได้</p><table><tr><th>ช่วง npm</th><th>รุ่นปกติที่ยอมรับ (ไม่พิจารณา prerelease)</th></tr><tr><td>1.2.3</td><td>เฉพาะ 1.2.3</td></tr><tr><td>~1.2.3</td><td>ตั้งแต่ 1.2.3 แต่น้อยกว่า 1.3.0</td></tr><tr><td>^1.2.3</td><td>ตั้งแต่ 1.2.3 แต่น้อยกว่า 2.0.0</td></tr><tr><td>^0.2.3</td><td>ตั้งแต่ 0.2.3 แต่น้อยกว่า 0.3.0</td></tr><tr><td>^0.0.3</td><td>ตั้งแต่ 0.0.3 แต่น้อยกว่า 0.0.4</td></tr></table><p>caret อนุญาตเปลี่ยนหลักทางขวาของหลักแรกที่ไม่เป็นศูนย์ ไม่ใช่ “minor ได้ทุกกรณี” ส่วน <code>2.0.0-beta.1</code> เป็น prerelease ที่มีลำดับก่อน 2.0.0 และ build metadata หลัง + ไม่เปลี่ยนลำดับ precedence การประกาศช่วงกว้างไม่ได้รับประกันว่าไม่มีบั๊ก ต้องทดสอบด้วย</p>`)
 ],tips:[['Engine กับ runtime','engine ประมวลผลภาษา; runtime เพิ่ม API และการจัดการงาน'],['สามไฟล์','package ระบุความต้องการ · lock บันทึกที่ resolve · node_modules คือของติดตั้ง'],['สามหลัก','MAJOR เปลี่ยนสัญญา · MINOR เพิ่ม · PATCH แก้'],['caret ที่มีศูนย์','^0.2.3 หยุดก่อน 0.3.0 ไม่ใช่ 1.0.0']],
 quiz:[
 ['V8 จัดเป็นอะไร','JavaScript engine','package registry','CSS framework','version-control system','V8 ประมวลผลภาษา ส่วน runtime เช่น Node เพิ่ม API รอบ engine','engine รันภาษา'],
 ['ข้อใดเป็น API ที่ Node.js ปกติไม่มี','document.querySelector','process.env','node:fs','setTimeout','Node ไม่ได้มี DOM ของหน้าเว็บโดยค่าเริ่มต้น','Node ไม่มีหน้าเอกสาร'],
 ['Node.js ต่างจาก npm อย่างไร','Node รัน JS; npm จัดการแพ็กเกจ','Node จัด CSS; npm รัน DOM','ทั้งคู่คือ Git remote','npm เป็น engine ของ Node','แยกตัวรันโค้ดออกจากเครื่องมือจัดการ dependencies','runtime กับ package manager'],
 ['งานใดอาจบล็อก event loop แม้เขียนใน async function','ลูปคำนวณ synchronous ขนาดใหญ่นาน ๆ','การรอ Promise ของ I/O โดย await','การประกาศ const หนึ่งตัวเสมอ','การกำหนดชื่อไฟล์ .mjs','async ไม่ย้ายโค้ดคำนวณ synchronous ไปอีก thread อัตโนมัติ','async ไม่ใช่ worker'],
 ['npm init -y ใช้ทำอะไร','สร้าง package.json ด้วยค่าตั้งต้น','เริ่ม GitHub Pull Request','ลบ node_modules','รัน server เสมอ','init เริ่มข้อมูลแพ็กเกจ ไม่ได้เปิดเซิร์ฟเวอร์','init เริ่ม package'],
 ['ติดตั้ง eslint เป็นเครื่องมือพัฒนาใช้คำสั่งใด','npm install --save-dev eslint','npm start eslint','node install eslint','git add eslint','--save-dev บันทึกลง devDependencies','เครื่องมือพัฒนา save-dev'],
 ['npm run dev จะทำงานได้เมื่อใด','มี script dev ที่เรียกได้ใน package.json','มีโฟลเดอร์ชื่อ dev เท่านั้น','ใช้ React เท่านั้น','เครื่องออนไลน์เสมอก็เพียงพอ','run เรียก script ที่โปรเจกต์กำหนด ไม่ได้รู้คำสั่ง dev แทนเรา','ดู scripts ก่อน'],
 ['สิ่งใดบันทึก dependency tree ที่ resolve แล้ว','package-lock.json','README.md','index.html','gitignore เท่านั้น','lockfile ช่วยให้การติดตั้งซ้ำได้เวอร์ชันตรงกัน','lock ล็อกผล resolve'],
 ['npm ci พบ package.json ไม่ตรงกับ lockfile ควรคาดอะไร','คำสั่งล้มเหลวแทนแก้ lockfile ให้เอง','อัปเกรดเป็น latest ทั้งหมด','ลบ package.json','เปลี่ยน Git branch','ci ต้องการข้อมูล package กับ lock ที่สอดคล้อง','ci ต้องตรง lock'],
 ['เปลี่ยน public API แบบ breaking จาก 2.4.1 ตาม SemVer ควรเป็น','3.0.0','2.4.2','2.5.0','2.4.1+breaking เท่านั้น','breaking change ในรุ่นเสถียรเพิ่ม MAJOR และ reset หลักรอง','breaking → major'],
 ['เพิ่ม feature ที่ยังเข้ากันจาก 2.4.1 ควรเป็น','2.5.0','3.0.0 เสมอ','2.4.2','2.4.1-beta','ความสามารถใหม่ที่ compatible เพิ่ม MINOR','เพิ่ม → minor'],
 ['แก้บั๊ก compatible จาก 2.4.1 ควรเป็น','2.4.2','2.5.0 เสมอ','3.0.0 เสมอ','2.0.0','PATCH ใช้กับ compatible bug fix','แก้ → patch'],
 ['รุ่นปกติใดอยู่ในช่วง ~1.2.3','1.2.9','1.3.0','2.0.0','1.2.2','~1.2.3 ยอม patch ที่ไม่ต่ำกว่าเริ่มต้นและก่อน 1.3.0','tilde คุม minor'],
 ['รุ่นปกติใดอยู่ในช่วง ^1.2.3','1.9.0','2.0.0','1.2.2','0.9.0','caret สำหรับ major 1 ยอม minor/patch ก่อน major 2','^1 ไม่ข้าม 2'],
 ['รุ่นปกติใดอยู่ในช่วง ^0.2.3','0.2.8','0.3.0','1.0.0','0.2.2','หลักแรกที่ไม่เป็นศูนย์คือ 2 จึงไม่ยอมข้าม 0.3.0','ศูนย์มีผลต่อ caret'],
 ['2.0.0-beta.1 เทียบกับ 2.0.0 เป็นอย่างไร','เป็น prerelease ที่มี precedence ต่ำกว่า','เป็น patch ที่สูงกว่า','เป็น build metadata เท่านั้น','เหมือนกันทุกประการ','ส่วนหลังขีดคือ prerelease ก่อนรุ่นปกติเลขเดียวกัน','beta ก่อน release'],
 M('ข้อใดอธิบาย runtime ถูกต้อง',['Browser มี DOM API','Node ใช้ JS ทำ HTTP server ได้'],['runtime กับ engine เป็นสิ่งเดียวกันทุกส่วน','Node ต้องมี window ของหน้าเว็บเสมอ'],'Runtime เพิ่ม API และสภาพแวดล้อม; การใช้ภาษาเดียวกันไม่รับประกันว่า API ตรงกัน','ภาษาเดียว คนละที่รัน'),
 M('ไฟล์ใดควรเก็บใน Git ของแอป npm ทั่วไป',['package.json','package-lock.json'],['node_modules ทุกไฟล์','ไฟล์ .env ที่มีรหัสจริง'],'ข้อมูล package และ lock ช่วยสร้าง dependencies ใหม่ ส่วนไฟล์ติดตั้งและ secrets ไม่ควร commit','เก็บสูตรและ lock'),
 M('รุ่นปกติใดตรง ^0.2.3',['0.2.3','0.2.9'],['0.3.0','1.0.0'],'ช่วงเริ่ม 0.2.3 ถึงก่อน 0.3.0 จึงรับทั้ง 0.2.3 และ 0.2.9','ดูหลักแรกที่ไม่เป็นศูนย์'),
 M('ข้อความเกี่ยวกับเครื่องมือใดถูกต้อง',['React เน้นสร้าง UI','Next.js เป็น framework บน React','Express ช่วยสร้างเว็บเซิร์ฟเวอร์'],['npm เป็น JavaScript engine'],'library/framework/package manager/runtime อยู่คนละบทบาท','รู้หน้าที่ก่อนจำชื่อ')
 ]});

addChapter({title:'CSS Box Model, Flex และ Grid',subtitle:'คำนวณขนาดกล่อง อ่านแกน Flex และจัดแถวคอลัมน์ด้วย Grid',group:'ขอบเขตสอบเพิ่มเติม',minutes:35,sources:[],
 refs:[['MDN · Box model','https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model'],['MDN · Flexbox','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts'],['MDN · Grid','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts']],
 goals:['คำนวณ content-box และ border-box โดยแยก margin','อ่าน main/cross axis เมื่อเปลี่ยน flex-direction','เลือก Flex/Grid และอ่าน repeat, fr, gap'],
 sections:[
 S('กล่องสี่ชั้น',`<p>จากด้านในออกนอกคือ <strong>content → padding → border → margin</strong> padding เว้นในขอบ border; margin เว้นนอกขอบ กล่องหลายใบจึงมีระยะห่างโดยไม่ทำให้พื้นหลังขยายเข้า margin</p><pre><code>.card {
  width: 200px;
  padding: 20px;
  border: 2px solid;
  margin: 10px;
}</code></pre><p>สมมติเป็น block ที่ไม่มีข้อจำกัดอื่น และใช้ content-box: ความกว้างถึงขอบ border = 200 + 40 + 4 = <strong>244px</strong>; รวม margin แนวนอน = 264px ตัวเลข width เพียงตัวเดียวจึงยังตอบขนาดรวมไม่ได้</p>`),
 S('box-sizing และ display',`<p><code>box-sizing: border-box</code> ให้ width รวม content, padding และ border แต่ไม่รวม margin ตัวอย่างเดิมถ้า width 200px แบบ border-box: content กว้าง 156px และรวม margin เป็น 220px</p><pre><code>*, *::before, *::after { box-sizing: border-box; }
img { max-width: 100%; height: auto; }</code></pre><p>block มักเริ่มบรรทัดใหม่ใน normal flow; inline ไม่รับ width/height แบบกล่อง block ทั่วไป; inline-block ยังวางในบรรทัดแต่กำหนดขนาดได้ <code>display:none</code> เอากล่องออกจาก layout ส่วน <code>visibility:hidden</code> ซ่อนแต่ยังจองพื้นที่ Margin แนวตั้งของ block บางกรณี collapse จึงอย่าบวกทุกกรณีอย่างกลไก</p>`),
 S('Flexbox: แกนหลักกับแกนขวาง',`<p>Flex เหมาะกับการจัดเรียงหนึ่งมิติ เปิดด้วย display:flex ที่ parent แล้วลูกโดยตรงเป็น flex items <code>flex-direction</code> กำหนด main axis; cross axis ตั้งฉากกับมัน</p><table><tr><th>property</th><th>หน้าที่</th></tr><tr><td>justify-content</td><td>จัดการพื้นที่ว่างตาม main axis</td></tr><tr><td>align-items</td><td>จัด items ตาม cross axis</td></tr><tr><td>flex-wrap: wrap</td><td>ยอมให้แยกหลาย flex lines</td></tr><tr><td>gap</td><td>ระยะห่างระหว่าง items/lines</td></tr></table><p>เมื่อ writing mode แนวนอนปกติ: row มีแกนหลักแนวนอน แต่ column มีแกนหลักแนวตั้ง ดังนั้น “justify-content จัดแนวนอนเสมอ” เป็นคำตอบผิด</p><pre><code>.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}</code></pre>`),
 S('การโตและหดของ flex item',`<p><code>flex-grow</code> แบ่งพื้นที่ว่างเพิ่มตามสัดส่วน; <code>flex-shrink</code> เกี่ยวข้องกับการลดขนาดเมื่อพื้นที่ไม่พอ; <code>flex-basis</code> ระบุฐานขนาดก่อนแบ่งพื้นที่</p><pre><code>.main { flex: 2 1 0; min-width: 0; }
.aside { flex: 1 1 0; min-width: 0; }</code></pre><p>ในตัวอย่างที่ไม่มี padding/gap/min-content มากีดขวาง ใช้ basis 0 เหมือนกัน จะจัดพื้นที่ตาม grow 2:1 แต่ไม่ควรเหมารวมว่า grow 2 ทำให้ทุกกล่องกว้างสองเท่าเสมอ เพราะ basis, intrinsic size และ constraints มีผล <code>min-width:0</code> ช่วยให้ item หดต่ำกว่า min-content เมื่อเนื้อหายาว</p>`),
 S('Grid: สองมิติและ track',`<p>Grid ออกแบบให้จัดแถวและคอลัมน์ร่วมกัน: container เปิด display:grid; grid-template-columns ระบุ column tracks; <code>fr</code> แบ่งพื้นที่ที่เหลือหลังคำนึงถึง fixed tracks และ gaps</p><pre><code>.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.featured { grid-column: span 2; }</code></pre><p>ตัวอย่างนี้มีสามคอลัมน์และ featured กินสอง tracks <code>repeat(3,1fr)</code> ไม่ได้สั่งสามแถว ถ้า container กว้าง 900px, gap 30px และไม่มีข้อจำกัดอื่น พื้นที่คอลัมน์คือ (900 - 60) / 3 = 280px ต่อคอลัมน์</p>`),
 S('เลือก layout และปรับตามหน้าจอ',`<p>แถบปุ่มเรียงแถวหรือคอลัมน์เหมาะกับ Flex; ตารางการ์ดที่ต้องการแนวคอลัมน์สอดคล้องหลายแถวเหมาะกับ Grid ใช้ซ้อนกันได้โดยไม่ต้องเลือกอย่างใดอย่างหนึ่งทั้งเว็บ</p><pre><code>@media (max-width: 600px) {
  .cards { grid-template-columns: 1fr; }
  .featured { grid-column: auto; }
}</code></pre><p>Media query ใช้ปรับกฎตาม viewport; rem อ้าง font-size ของ root และ % อ้างค่าฐานตาม property/บริบท อย่าสรุปว่า % อ้าง viewport เสมอ จุดฝึกสอบคืออ่านเงื่อนไขก่อน แล้วคำนวณ layout ที่เหลือ</p>`)
 ],tips:[['กล่อง','เนื้อหา → ช่องว่างใน → ขอบ → ช่องว่างนอก'],['border-box','width รวม padding+border แต่ไม่รวม margin'],['Flex axes','ดู direction ก่อนตอบ justify/align'],['Grid fr','หัก gap และ fixed size ก่อนแบ่งพื้นที่']],
 quiz:[
 ['ลำดับ box model จากในออกนอกคืออะไร','content, padding, border, margin','margin, border, content, padding','content, margin, border, padding','border, content, padding, margin','padding อยู่ระหว่างเนื้อหากับขอบ และ margin อยู่นอก','ในไปนอก'],
 ['content-box width 200, padding ข้างละ 20, border ข้างละ 2 กว้างถึง border เท่าไร','244px','200px','224px','264px','200+20+20+2+2 = 244 ไม่รวม margin','บวกสองข้าง'],
 ['border-box width 200, padding ข้างละ 20, border ข้างละ 2 มี content กว้างเท่าไร','156px','200px','244px','160px','200-40-4 = 156','หัก padding และ border'],
 ['margin รวมอยู่ใน width ของ border-box หรือไม่','ไม่รวม','รวมเสมอ','รวมเฉพาะ flex','รวมเฉพาะ grid','border-box หยุดที่ border','margin อยู่นอก'],
 ['ต้องซ่อนพร้อมเอาพื้นที่ออกจาก layout ใช้อะไร','display:none','visibility:hidden','opacity:0 เท่านั้น','color:transparent','display none ไม่สร้างกล่อง layout','ไม่มี display ไม่จองที่'],
 ['เปิด Flex ที่ element ใดเพื่อจัดลูกโดยตรง','parent container','ทุก text node','head เสมอ','เฉพาะลูกตัวแรก','display flex บน parent ทำให้ลูกโดยตรงเป็น flex items','parent เปิด layout'],
 ['flex-direction:column ใน writing mode แนวนอนทั่วไปมี main axis ทิศใด','แนวตั้ง','แนวนอน','แนวทแยง','ไม่มีแกน','column จัดแกนหลักเป็นคอลัมน์','column ลงล่าง'],
 ['justify-content จัดตามอะไร','main axis','แนวนอนเสมอ','cross axis เสมอ','แกน z','ต้องดู flex-direction ก่อนเลือกทิศ','justify ตาม main'],
 ['align-items ทำหน้าที่ใด','จัด item ตาม cross axis','สร้างคอลัมน์ Grid','ตั้งจำนวน flex lines','เปลี่ยน border-box','align-items อ้างแกนขวาง','align ตาม cross'],
 ['ยอมให้ flex items ขึ้นหลายบรรทัดใช้ข้อใด','flex-wrap:wrap','flex-direction:wrap','display:wrap','align-items:wrap','wrap เป็นค่าของ flex-wrap','wrap แยก line'],
 ['flex:2 1 0 มีค่า flex-grow เท่าไร','2','1','0','3','shorthand เรียง grow shrink basis','โต หด ฐาน'],
 ['Grid คำสั่ง repeat(3,1fr) ใน grid-template-columns สร้างอะไร','สาม column tracks','สาม row tracks เสมอ','ขอบหนา 3px','สาม grid containers','property columns ระบุคอลัมน์','อ่านชื่อ property'],
 ['Grid 900px สามคอลัมน์เท่ากัน gap 30px ไม่มีข้อจำกัดอื่น คอลัมน์ละเท่าไร','280px','300px','290px','270px','สามคอลัมน์มีสองช่องว่าง: (900-60)/3','ช่องว่าง n-1'],
 ['grid-column:span 2 ใช้ทำอะไร','ให้ item กินสอง column tracks','เพิ่มจำนวนแถวเป็นสอง','ทำสำเนา item','ย้าย item ไปชั้น z ที่ 2','span บอกจำนวน tracks ที่กิน','span คือกินช่วง'],
 ['rem ใน font-size อ้างอิงอะไร','font-size ของ root element','width ของ parent','ความสูง viewport','padding ของ element','rem เป็น root em','r = root'],
 ['@media (max-width:600px) ใช้กฎเมื่อใด','viewport กว้างไม่เกิน 600px','viewport สูงเกิน 600px','รูปกว้าง 600px เท่านั้น','ทุกจอเสมอ','media width ตรวจ viewport สำหรับเงื่อนไขนี้','max มีเพดาน'],
 M('ส่วนใดอยู่ภายใน border edge',['content','padding'],['margin','ระยะ gap ระหว่างกล่อง'],'border edge ครอบเนื้อหาและ padding แต่ไม่รวมพื้นที่ภายนอก','ขอบล้อมด้านใน'),
 M('ข้อใดถูกเกี่ยวกับ Flex',['flex-direction เปลี่ยน main axis ได้','flex-wrap ยอมแยกหลาย lines'],['justify-content คือแนวนอนเสมอ','grow 2 รับประกันกว้างสองเท่าทุกกรณี'],'ทิศทางและ constraints ต้องใช้ร่วมกันก่อนคำนวณ','ดูแกน ดูฐาน'),
 M('ข้อใดถูกเกี่ยวกับ Grid',['จัดแถวและคอลัมน์ร่วมกันได้','gap ใช้เว้นระหว่าง tracks'],['fr เท่ากับจำนวนพิกเซลคงที่','Grid ใช้ซ้อนกับ Flex ไม่ได้'],'fr เป็นสัดส่วนพื้นที่ ไม่ใช่ px และ layout ซ้อนกันได้','สองมิติและสัดส่วน'),
 M('ข้อใดต่างกันจริงระหว่าง display:none และ visibility:hidden',['display:none ไม่จองพื้นที่กล่อง','visibility:hidden ยังจองพื้นที่'],['ทั้งสองลบ node จาก DOM','ทั้งสองเปลี่ยน HTML ต้นฉบับบน server'],'การซ่อน CSS ไม่ได้ลบ DOM หรือแก้ไฟล์ server','ซ่อนกับลบคนละเรื่อง')
 ]});

addChapter({title:'Data Format และ Date/Time',subtitle:'แยกข้อมูลจากข้อความ แปลง JSON และจัดเวลาระหว่าง UTC กับ Bangkok',group:'ขอบเขตสอบเพิ่มเติม',minutes:30,sources:[],
 refs:[['MDN · Date','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date'],['MDN · JSON.stringify','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify'],['MDN · Intl.DateTimeFormat','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat']],
 goals:['เลือก JSON/CSV และแยก serialize/parse','แปลง epoch seconds กับ milliseconds','อ่าน ISO 8601, UTC, offset และระบุ timeZone ตอนแสดงผล'],
 sections:[
 S('รูปแบบข้อมูลกับค่าที่ใช้คำนวณ',`<p>JavaScript object อยู่ในหน่วยความจำ ส่วน JSON เป็นข้อความแลกเปลี่ยนข้อมูล มี object, array, string, number, boolean และ null ใช้ double quotes กับชื่อ key/ข้อความ ไม่รองรับ comments, undefined หรือ function แบบ JSON value</p><pre><code>const text = '{"id":7,"active":true}';
const row = JSON.parse(text);      // ข้อความ → ค่า JS
const saved = JSON.stringify(row); // ค่า JS → ข้อความ</code></pre><p>CSV เหมาะข้อมูลตารางแถว/คอลัมน์; JSON รองรับโครงสร้างซ้อนได้ตรงกว่า ทั้งสองเป็นรูปแบบข้อมูล ไม่ใช่ protocol และค่าเลขที่จัดรูปแบบเพื่อแสดง เช่น "1,200.00" ต้องจัดการตัวคั่นก่อนนำกลับไปคำนวณ ไม่ควรพึ่ง parseFloat เพื่ออ่านทุก locale</p>`),
 S('ข้อมูลที่ JSON ไม่รักษาให้เอง',`<pre><code>JSON.stringify({name:'A', optional:undefined}); // '{"name":"A"}'
JSON.stringify([undefined]);                  // '[null]'
JSON.parse('{"day":"2026-11-01"}').day;       // string</code></pre><p>JSON ไม่มี Date type; แปลงกลับแล้วต้องสร้าง Date เองเมื่อความหมายข้อมูลเป็นจุดเวลา Object ที่อ้างอิงตัวเองเป็นวงจรทำให้ JSON.stringify ปกติ throw ส่วนวิธี JSON stringify/parse เพื่อ copy ข้อมูลไม่ใช่ deep clone ที่ใช้ได้กับข้อมูลทุกชนิด</p>`),
 S('Date กับ Unix timestamp',`<p>Date เก็บค่าจุดเวลาเป็นจำนวน <strong>milliseconds</strong> นับจาก 1970-01-01T00:00:00Z ส่วน Unix timestamp ที่ API เรียกว่า seconds ต้องตรวจสัญญาแล้วคูณ 1000 ก่อนส่งให้ Date</p><pre><code>new Date(0).toISOString(); // '1970-01-01T00:00:00.000Z'
const unixSeconds = 60;
new Date(unixSeconds * 1000).toISOString();
// '1970-01-01T00:01:00.000Z'
Date.now(); // number หน่วย milliseconds ณ ขณะเรียก</code></pre><p>เวลาเดินผ่านไป 1 วินาที timestamp เพิ่ม 1000 ไม่ใช่ 1 และ <code>getTime()</code> อ่าน milliseconds จาก Date ที่มีอยู่</p>`),
 S('ISO 8601, Z และ timezone offset',`<p>รูปแบบชัดเจนสำหรับแลกเปลี่ยนจุดเวลา เช่น <code>2026-11-01T09:00:00+07:00</code> โดย T แยกวันกับเวลา; +07:00 คือเร็วกว่า UTC เจ็ดชั่วโมง; <code>Z</code> หมายถึง UTC ดังนั้นจุดเดียวกันใน UTC คือ <code>2026-11-01T02:00:00.000Z</code></p><pre><code>const at = new Date('2026-11-01T09:00:00+07:00');
at.toISOString(); // '2026-11-01T02:00:00.000Z'
new Date('2026-11-01T02:00:00Z').getTime() === at.getTime(); // true</code></pre><p>toISOString แสดง UTC เสมอ การเปลี่ยนรูปแบบแสดงผลไม่ได้เปลี่ยนจุดเวลาเดิม วันที่อย่างวันเกิดเป็น “วันตามปฏิทิน” อาจเหมาะกับ YYYY-MM-DD โดยไม่แปลงเป็นจุดเวลาโดยไม่จำเป็น</p>`),
 S('Parsing และเดือนที่เริ่มศูนย์',`<pre><code>new Date(2026, 0, 15);   // 15 มกราคม ตามเวลาท้องถิ่น
new Date(2026, 10, 1);   // 1 พฤศจิกายน ตามเวลาท้องถิ่น
new Date('2026-11-01');  // รูปแบบ date-only นี้ตีความเป็น UTC
new Date('2026-11-01T09:00:00'); // date-time ไม่มี offset ใช้ local time</code></pre><p>constructor แบบตัวเลขใช้ monthIndex 0-11 แต่เดือนใน ISO string ใช้ 01-12 อย่าใช้ "01/02/2026" แลกข้อมูลโดยไม่ระบุรูปแบบ เพราะกำกวมระหว่างวัน/เดือน การเรียก getMonth() เป็น local เดือนเริ่มศูนย์; getUTCMonth() ใช้ UTC</p><p>ตรวจ Date ที่ parse ไม่ได้ด้วย <code>Number.isNaN(date.getTime())</code> อย่างไรก็ดี parser อาจ normalize บางวันที่เกินช่วง การตรวจ input แบบเข้มงวดต้องตรวจส่วนวันเดือนด้วย ไม่ใช่เช็ก NaN เพียงอย่างเดียว</p>`),
 S('จัดรูปแบบสำหรับผู้ใช้',`<pre><code>const formatter = new Intl.DateTimeFormat('th-TH', {
  timeZone: 'Asia/Bangkok',
  calendar: 'gregory',
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
});
formatter.format(new Date('2026-11-01T02:00:00Z'));
// แสดงวัน 1 พ.ย. 2026 เวลา 09:00 ใน Bangkok
// รูปแบบตัวคั่นขึ้นกับ locale/runtime</code></pre><p>locale ควบคุมรูปแบบภาษา; timeZone ควบคุมเขตเวลา; calendar ควบคุมปฏิทิน เช่น gregory ใช้ ค.ศ. แยกจากปฏิทินพุทธศักราช อย่าเพิ่ม 7 ชั่วโมงใน timestamp แล้วกำหนด Bangkok ซ้ำอีก เพราะจะชดเชยสองครั้ง</p>`)
 ],tips:[['parse กับ stringify','อ่านข้อความเข้า JS / ส่ง JS ออกข้อความ'],['หน่วย Date','Date ใช้ ms; API seconds ต้อง ×1000'],['เวลาเดียวหลายหน้าตา','09:00 +07:00 = 02:00Z'],['เดือน','constructor ตัวเลขเริ่ม 0; ISO เริ่ม 01']],
 quiz:[
 ['แปลงข้อความ JSON เป็นค่า JavaScript ใช้อะไร','JSON.parse','JSON.stringify','Date.now','Object.keys','parse อ่านรูปแบบข้อความเป็นค่าที่ใช้ได้','parse เข้า'],
 ['แปลง object เป็น JSON string ใช้อะไร','JSON.stringify','JSON.parse','parseInt','new Date','stringify serialize ค่า','stringify ออก'],
 ['ข้อใดเป็น JSON ที่ถูกต้อง','{"name":"Mali"}','{name:"Mali"}','{"name":undefined}','{"name":"Mali",}','JSON ต้อง quote key และไม่มี undefined/trailing comma','เข้มกว่า object literal'],
 ['JSON.parse ได้ {"day":"2026-11-01"} ค่า day เป็นชนิดใด','string','Date อัตโนมัติ','number','function','JSON ไม่มี Date type','ต้องแปลง Date เอง'],
 ['JSON.stringify({a:undefined,b:1}) ได้อะไร','{"b":1}','{"a":undefined,"b":1}','{"a":null,"b":1}','undefined เสมอ','property object ที่เป็น undefined ถูกละออก','object ละ undefined'],
 ['JSON.stringify([undefined]) ได้อะไร','[null]','[]','[undefined]','throw เสมอ','ใน array คงตำแหน่งโดยใช้ null','array ไม่ทิ้งตำแหน่ง'],
 ['Date.now() คืนหน่วยใด','milliseconds','seconds','minutes','days','JavaScript Date ใช้ milliseconds จาก epoch','1000 ms = 1s'],
 ['API ส่ง timestamp 60 หน่วย seconds ต้องสร้าง Date แบบใด','new Date(60 * 1000)','new Date(60)','new Date(60 / 1000)','new Date("60ms")','แปลงวินาทีเป็น ms ก่อน','วินาทีคูณพัน'],
 ['new Date(0).toISOString() เริ่มวันใด','1970-01-01T00:00:00.000Z','2000-01-01T00:00:00.000Z','0000-01-01T00:00:00.000Z','วันปัจจุบันเสมอ','ศูนย์คือ Unix epoch','epoch 1970'],
 ['Z ท้าย ISO date-time หมายถึงอะไร','UTC','เวลาท้องถิ่นทุกเครื่อง','Asia/Bangkok เสมอ','ไม่มี timezone','Z ระบุ UTC offset ศูนย์','Z ศูนย์'],
 ['2026-11-01T09:00:00+07:00 ตรงกับเวลาใดใน UTC','2026-11-01T02:00:00Z','2026-11-01T16:00:00Z','2026-11-01T09:00:00Z','2026-10-31T09:00:00Z','+07 เร็วกว่า UTC จึงลบเจ็ดชั่วโมง','กลับ UTC ลบ offset'],
 ['toISOString() ใช้ timezone อะไร','UTC','local เสมอ','Bangkok เสมอ','ตามภาษาใน browser เสมอ','วิธีนี้ serialize จุดเวลาเป็น UTC ลงท้าย Z','ISO ของ Date เป็น UTC'],
 ['new Date(2026,0,15) มีเดือนอะไร','มกราคม','ธันวาคม 2025','กุมภาพันธ์','เดือนไม่ถูกต้อง','constructor แบบตัวเลขเริ่มเดือนที่ 0','0 มกราคม'],
 ['ISO date-only "2026-11-01" ใน Date ถูกตีความเป็นอะไร','เที่ยงคืน UTC','เที่ยงคืน Bangkok ทุกเครื่อง','เวลาปัจจุบันของวันนั้น','error เสมอ','รูปแบบ date-only ตามกฎ Date ใช้ UTC ต่างจาก date-time ไม่มี offset','date-only UTC'],
 ['วิธีใดตรวจ Date ที่มี time value เป็น NaN','Number.isNaN(d.getTime())','d === NaN','d === "Invalid Date"','typeof d === "invalid"','getTime ได้ NaN สำหรับ Invalid Date แต่ไม่แทน validation วันเดือนทุกแบบ','ตรวจ time value'],
 ['ต้องการแสดงใน Bangkok อย่างชัดเจนควรกำหนดอะไร','timeZone:"Asia/Bangkok"','locale:"UTC" เท่านั้น','เพิ่ม 7 ชั่วโมงให้ทุก Date เสมอ','calendar:"thai-time"','timeZone ระบุเขตเวลา locale ไม่ได้บอกเขตเวลาแทน','ภาษาไม่ใช่ timezone'],
 M('ข้อใดเป็นชนิดค่าที่ JSON รองรับ',['null','boolean','array'],['function'],'JSON รองรับค่าข้อมูลพื้นฐานและโครงสร้าง แต่ไม่มีฟังก์ชัน','JSON ส่งข้อมูล'),
 M('ข้อใดเป็นจุดเวลาเดียวกับ 2026-11-01T02:00:00Z',['2026-11-01T09:00:00+07:00','2026-11-01T03:00:00+01:00'],['2026-11-01T09:00:00Z','2026-11-01T02:00:00+07:00'],'หัก offset ของแต่ละตัวแล้วต้องได้ 02:00 UTC','เทียบหลังแปลง UTC'),
 M('ข้อใดถูกเกี่ยวกับรูปแบบและเวลา',['locale กับ timeZone คนละหน้าที่','toISOString แสดง UTC'],['เปลี่ยน locale แล้ว timestamp เปลี่ยนเอง','JSON.parse คืน Date ให้อัตโนมัติ'],'รูปแบบแสดงผลไม่ใช่ค่าจุดเวลา และ JSON string ยังเป็นข้อความ','ค่าเดียวหลายรูปแบบ'),
 M('ข้อใดควรระวังเมื่อรับวันที่จาก API',['ตรวจว่าหน่วย timestamp เป็น seconds หรือ ms','หลีกเลี่ยงวันเดือนที่กำกวม เช่น 01/02/2026','แยกวันตามปฏิทินออกจากจุดเวลา'],['สมมติทุกเครื่องใช้ timezone เดียวกัน'],'หน่วย รูปแบบ และความหมายข้อมูลต้องตกลงกันก่อน parse','หน่วย รูปแบบ ความหมาย')
 ]});
