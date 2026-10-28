addChapter({title:'DOM และ Events',subtitle:'เลือกและปรับหน้าเว็บ แล้วตอบสนองการกระทำของผู้ใช้',group:'เชื่อมสู่แอปพลิเคชัน',minutes:30,sources:[['JavaScript DOM.pdf','1–2'],['HTML JavaScript.pdf','2–4'],['Methods for Applying Style to Elements.pdf','2']],
 goals:['เลือก element และตรวจผลลัพธ์ก่อนใช้งาน','เปลี่ยนเนื้อหา attributes และโครงสร้าง DOM','ติด event listener และเข้าใจความต่างของข้อความกับ HTML'],
 sections:[
 S('DOM คือแบบจำลองเอกสาร',`<p>Document Object Model แทนเอกสารเป็นต้นไม้ของ nodes เช่น element, text และ attribute-related data เบราว์เซอร์สร้าง DOM จาก HTML และให้ JavaScript เข้าถึงผ่าน document เพื่อเปลี่ยนโครงสร้าง รูปแบบ และเนื้อหาได้ระหว่างใช้งาน</p><pre><code>document
└ html
  ├ head
  └ body
    ├ h1
    └ button</code></pre><p>การเปลี่ยน DOM ไม่ได้แก้ไฟล์ HTML บนเซิร์ฟเวอร์โดยอัตโนมัติ แต่เปลี่ยนแบบจำลองของหน้าที่กำลังเปิดอยู่ จึงทำหน้าเว็บโต้ตอบได้โดยไม่ต้องโหลดทั้งหน้าใหม่</p>`),
 S('เลือก Element ให้ตรงชนิดผลลัพธ์',`<table><tr><th>API</th><th>ผลลัพธ์</th></tr><tr><td>getElementById('id')</td><td>element เดียว หรือ null</td></tr><tr><td>querySelector('selector')</td><td>element แรกที่ตรง หรือ null</td></tr><tr><td>querySelectorAll('selector')</td><td>static NodeList ของทุก element ที่ตรง</td></tr><tr><td>getElementsByTagName('p')</td><td>live HTMLCollection ตามชื่อแท็ก</td></tr><tr><td>getElementsByClassName('item')</td><td>live HTMLCollection ตามชื่อ class</td></tr></table><pre><code>const title = document.getElementById('title'); // ไม่ใส่ #
const first = document.querySelector('.item');
const all = document.querySelectorAll('.item');
all.forEach(el => console.log(el.textContent));
if (title) title.textContent = 'พร้อมเรียน';</code></pre><p>รายละเอียดเสริม: live collection เปลี่ยนตาม DOM ส่วน static NodeList จาก querySelectorAll เป็นผล ณ ตอนเลือก ถ้าไม่พบต้องระวัง null ก่อนเรียกเมธอดหรือ property ของ element</p>`),
 S('ข้อความ HTML และ Attributes',`<pre><code>const box = document.querySelector('#demo');
box.textContent = '&lt;strong&gt;Hi&lt;/strong&gt;'; // แสดงเป็นข้อความ
box.innerHTML = '&lt;strong&gt;Hi&lt;/strong&gt;';   // สร้าง strong element

const img = document.querySelector('img');
img.setAttribute('alt','อาคารเรียน');
img.getAttribute('alt');
img.removeAttribute('title');</code></pre><p>textContent จัดการเนื้อหาข้อความ ส่วน innerHTML อ่าน/เขียน markup และมีการ parse เป็น HTML การแทรกข้อความภายนอกที่ไม่เชื่อถือผ่าน innerHTML อาจเกิด XSS จึงเลือก textContent เมื่อเพียงต้องการแสดงข้อความ</p><p>Attributes คือค่าที่กำกับ element เช่น src, alt และ id การแก้ inline style หรือ classList เชื่อมกับ CSS ในบท 3</p>`),
 S('สร้าง เพิ่ม แทรก และลบ',`<pre><code>const list = document.querySelector('#list');
const item = document.createElement('li');
item.textContent = 'Arrays';
list.appendChild(item);

const first = document.createElement('li');
first.textContent = 'Variables';
list.insertBefore(first, item);
list.removeChild(item);</code></pre><p>createElement สร้าง element ในหน่วยความจำ แต่ยังไม่แสดงจนเพิ่มลงต้นไม้ appendChild เพิ่มเป็นลูกท้ายสุด insertBefore แทรกก่อนลูกที่อ้างอิง ส่วน removeChild ต้องเรียกจาก parent ที่เป็นเจ้าของลูกนั้น ถ้า append node เดิมซ้ำจะย้าย node ไม่ได้คัดลอก</p>`),
 S('Event Listener: ทำอะไรเมื่อผู้ใช้ทำสิ่งหนึ่ง',`<pre><code>&lt;button id="counter"&gt;เพิ่มคะแนน&lt;/button&gt;
&lt;p id="score"&gt;0&lt;/p&gt;

const button = document.getElementById('counter');
const output = document.getElementById('score');
let score = 0;
button.addEventListener('click', () => {
  score += 1;
  output.textContent = String(score);
});</code></pre><p>ส่งฟังก์ชันให้ listener เพื่อให้ระบบเรียกเมื่อเกิด event ไม่ใช่เรียกฟังก์ชันทันทีตอนลงทะเบียน เช่นใช้ handler แทน handler() ถ้าฟังก์ชันหลังไม่ได้คืน callback มา</p><p>ตัวอย่าง event ที่พบบ่อย: click, input, change, keydown และ submit แนวคิดเหล่านี้เป็นฐานของ event handling ใน React</p>`),
 S('Event propagation และ Default action (เสริม)',`<p>หัวข้อนี้ขยายจากรายการ event handling ในสไลด์ React: event มีเส้นทางผ่าน ancestor ใน capture phase ไปยัง target และหลาย event เช่น click จะ bubble กลับขึ้นมา <code>event.target</code> คือจุดต้นทาง ส่วน <code>currentTarget</code> คือ element ที่ listener นั้นผูกอยู่</p><p><code>preventDefault()</code> ยกเลิกพฤติกรรมเริ่มต้นที่ยกเลิกได้ เช่น submit แบบเปลี่ยนหน้า ขณะที่ <code>stopPropagation()</code> หยุดการส่งต่อไปยัง nodes ถัดไป ทั้งสองทำหน้าที่ต่างกัน ไม่ได้ใช้แทนกัน</p><pre><code>form.addEventListener('submit', event => {
  event.preventDefault();
  // ตรวจข้อมูลและแสดงผลในหน้าเดิม
});</code></pre>`)
 ],tips:[['ลำดับ DOM','เลือก → ตรวจว่าพบ → เปลี่ยน → รอ event'],['เลือกหนึ่งกับหลาย','querySelector หนึ่ง · querySelectorAll หลาย'],['ข้อความไม่ใช่ markup','textContent แสดงข้อความ · innerHTML แปลแท็ก'],['สร้างยังไม่แสดง','createElement ก่อน แล้ว appendChild'],['ส่ง function ไม่ใช่ผลลัพธ์','addEventListener("click", handler) รอคลิกจึงทำงาน']],
 quiz:[
 ['DOM แทนหน้าเว็บเป็นโครงสร้างใด','ต้นไม้ของ nodes','ตารางฐานข้อมูลเท่านั้น','ไฟล์ CSS รวม','DNS cache','DOM เป็นแบบจำลองเอกสารแบบ tree','DOM = document tree'],
 ['เลือก element ด้วย id demo ใช้ข้อใด','document.getElementById("demo")','document.getElementById("#demo")','document.getElementByClass("demo")','document.selectId(demo)','getElementById รับชื่อ id ตรง ๆ ไม่ใช้ #','ById ไม่ใส่ #'],
 ['querySelector(".item") คืนอะไร','element แรกที่ตรงหรือ null','ทุก element เป็น array','HTML string เสมอ','live collection เสมอ','querySelector ให้ตัวแรก ส่วน All ให้หลายตัว','ไม่มี All คือหนึ่ง'],
 ['querySelectorAll(".item") คืนอะไร','static NodeList','element เดียวเสมอ','String','HTMLCollection แบบ live','ผลเป็น NodeList ณ เวลาที่เรียก','All หลาย static'],
 ['getElementById ไม่พบ element จะคืนอะไร','null','[]','undefined เสมอ','0','API นี้คืน null เมื่อไม่พบ element','เลือกไม่พบ null'],
 ['ต้องแสดงข้อความจากผู้ใช้ที่มี <b> โดยไม่ให้แปลเป็นแท็ก ควรใช้','textContent','innerHTML','eval','document.write เสมอ','textContent ใส่ข้อมูลเป็น text และไม่ parse เป็น HTML','ข้อความใช้ text'],
 ['innerHTML ต่างจาก textContent อย่างไร','innerHTML parse markup เป็น nodes ได้','innerHTML แสดงตัวอักษรอย่างเดียว','textContent รัน script ทุกครั้ง','ไม่มีความต่าง','innerHTML จัดการ HTML markup จึงต้องระวังข้อมูลที่ไม่เชื่อถือ','HTML มีการแปลแท็ก'],
 ['อ่าน attribute alt ของ img ใช้ข้อใด','img.getAttribute("alt")','img.getElementById("alt")','img.createElement("alt")','img.appendChild("alt")','getAttribute อ่านค่าที่กำกับ element','get = อ่าน attribute'],
 ['ลบ attribute title ใช้ข้อใด','el.removeAttribute("title")','el.removeChild("title")','el.classList.remove("title")','el.textContent = "title"','removeAttribute ลบ attribute ไม่ใช่ลูกหรือ class','ระบุสิ่งที่ลบให้ตรง'],
 ['document.createElement("li") ทำอะไร','สร้าง li ที่ยังไม่อยู่ในต้นไม้จนกว่าจะเพิ่ม','เพิ่ม li ในทุก ul อัตโนมัติ','ลบ li เดิม','สร้าง string "li"','ต้อง append หรือ insert จึงแสดงในเอกสาร','สร้างก่อน เพิ่มทีหลัง'],
 ['เพิ่ม item เป็นลูกท้ายของ list ใช้ข้อใด','list.appendChild(item)','item.appendChild(list)','list.getAttribute(item)','list.querySelector(item)','parent เป็นฝ่ายรับ child ที่เพิ่ม','parent.appendChild(child)'],
 ['แทรก node ใหม่ก่อน referenceNode ใช้เมธอดใด','parent.insertBefore(newNode,referenceNode)','parent.insertAfter(newNode,referenceNode)','parent.removeChild(newNode)','newNode.textContent(referenceNode)','insertBefore รับ node ใหม่และลูกอ้างอิงตามลำดับ','ใหม่ก่อน ตัวอ้างอิงทีหลัง'],
 ['removeChild ต้องเรียกจากอะไร','parent ของ node ที่ต้องการลบ','document เสมอ','child ของ node ที่ต้องการลบ','Array.isArray','parent.removeChild(child) ต้องมีความสัมพันธ์เป็นลูกจริง','พ่อแม่ลบลูก'],
 ['เพิ่ม listener ให้ปุ่มคลิกใช้ event name ใด','click','onclick ใน addEventListener','pressed','button','addEventListener ใช้ชื่อ click ส่วน onclick เป็นชื่อ event handler property/attribute','listener ใช้ click'],
 ['ต้องการให้ handle ทำงานตอนคลิก ควรส่งอะไรให้ addEventListener','handle','handle() เมื่อมันไม่คืน callback','"handle()" เป็น string','return handle','ต้องส่งฟังก์ชันไว้ให้เรียกภายหลัง ไม่เรียกทันที','ส่ง function reference'],
 ['Event ใดเหมาะกับตอบสนองเมื่อผู้ใช้พิมพ์แก้ช่องข้อความ','input','load เท่านั้น','mouseover เท่านั้น','resize เท่านั้น','input เกิดเมื่อผู้ใช้เปลี่ยนค่าช่องข้อความ','พิมพ์ → input'],
 ['การเปลี่ยน DOM ด้วย JavaScript แก้ไฟล์ HTML บนเซิร์ฟเวอร์อัตโนมัติหรือไม่','ไม่ เป็นการเปลี่ยนเอกสารที่เปิดอยู่','ใช่ ทุกครั้ง','ใช่เฉพาะ textContent','ไม่ เพราะ DOM เปลี่ยนไม่ได้','การบันทึกกลับเซิร์ฟเวอร์ต้องมีกลไกแยก','DOM ของหน้านี้'],
 ['event.target ต่างจาก currentTarget อย่างไร','target จุดต้นทาง; currentTarget element ที่ listener ปัจจุบันผูกอยู่','ทั้งสองเป็น window เสมอ','target เป็น string; currentTarget เป็น number','currentTarget คือ parent เสมอ','เมื่อเกิด event จากลูก target อาจเป็นลูก แต่ currentTarget เป็น element ที่มี listener นั้น','จุดเกิด vs จุดฟัง'],
 ['preventDefault() ใช้เพื่ออะไร','ยกเลิก default action ที่ยกเลิกได้','หยุด propagation ทุกกรณี','ลบ event listener เสมอ','ปิดการใช้ DOM','เช่นป้องกัน submit แบบปกติ ส่วนหยุด propagation ต้องอีกเมธอด','default คือพฤติกรรมเริ่มต้น'],
 ['การ append node เดิมไป parent ใหม่เกิดอะไร','node ถูกย้าย','node ถูก deep copy เสมอ','กลายเป็น string','ไม่มีผลทุกกรณี','DOM node หนึ่งอยู่ในตำแหน่งเดียว การ append เดิมจึงย้ายตำแหน่ง','ย้าย ไม่ได้ clone']
 ]});

addChapter({title:'Modules',subtitle:'แบ่งโค้ดใช้ซ้ำ และแยกระบบ CommonJS กับ ES Modules',group:'เชื่อมสู่แอปพลิเคชัน',minutes:25,sources:[['Node.js - Module System.pdf','1–9']],
 goals:['อธิบายเหตุผลในการแบ่งโมดูล','ตั้งค่า package.json และอ่าน import/export','แยก named/default export และรู้ข้อจำกัดการนำเข้าทรัพยากร'],
 sections:[
 S('ทำไมต้องแบ่ง Modules',`<p>Module รวมโค้ดที่เกี่ยวข้องไว้เป็นหน่วยและระบุสิ่งที่ส่งออกไปให้ไฟล์อื่นใช้ ช่วยใช้ซ้ำ แบ่งหน้าที่ และติดตาม dependencies เช่น math ทำงานคำนวณ ส่วน app ประกอบการทำงานของหน้าเว็บ</p><p>Node.js เป็น runtime สำหรับรัน JavaScript นอกเบราว์เซอร์และมีระบบโมดูลสองแนวคือ CommonJS กับ ECMAScript Modules (ESM) คำว่า Node.js ไม่ได้หมายถึง DOM ในเบราว์เซอร์ และ Node.js ไม่ได้มี document ให้ใช้โดยค่าเริ่มต้น</p>`),
 S('ตั้งค่าระบบโมดูล',`<pre><code>// package.json สำหรับไฟล์ .js ที่ใช้ ES Modules
{
  "type": "module"
}

// ถ้าต้องการ CommonJS ให้ใช้
{
  "type": "commonjs"
}</code></pre><p>ตัวอย่างสองชุดนี้เป็นคนละไฟล์ทางเลือก ไม่ใช่ใส่ object สองก้อนติดกันในไฟล์จริง package.json เป็น JSON จึงใช้ double quotes และไม่มี comments ในไฟล์จริง นามสกุล .mjs ระบุ ESM ชัดเจน ส่วน .cjs ระบุ CommonJS รายละเอียดของไฟล์ .js ขึ้นกับ package scope และการตั้งค่าที่เกี่ยวข้อง</p>`),
 S('ES Modules: Named export / import',`<pre><code>// addTwo.mjs
function addTwo(num) { return num+2; }
export { addTwo };

// app.mjs
import { addTwo } from './addTwo.mjs';
console.log(addTwo(4)); // 6</code></pre><p>Named import ใช้ชื่อ export ที่ตรงกันในปีกกา หรือเปลี่ยนชื่อ binding ในไฟล์ผู้ใช้ด้วย as เช่น <code>import {addTwo as plusTwo} from './addTwo.mjs'</code> ใน Node ESM ควรระบุนามสกุลให้ครบใน relative specifier เช่น './addTwo.mjs'</p><p>export ได้ทั้ง function, var, let, const และ class แต่ไม่จำเป็นต้องเปิดทุกสิ่งภายในโมดูล ให้ส่งออกเฉพาะส่วนที่ผู้ใช้งานต้องรู้</p>`),
 S('Default export และ CommonJS (เสริมตัวอย่าง)',`<pre><code>// ES module
export default function sum(a,b) { return a+b; }
// อีกไฟล์
import calculate from './sum.mjs'; // เลือกชื่อ binding ได้

// CommonJS: sum.cjs
function sum(a,b) { return a+b; }
module.exports = {sum};
// อีกไฟล์ CommonJS
const {sum} = require('./sum.cjs');</code></pre><p>Named export มีหลายชื่อได้ ส่วน default export มีได้หนึ่งต่อโมดูล Syntax หลักของ CommonJS คือ require และ module.exports ไม่ควรสลับ syntax ทั้งสองระบบโดยไม่ตรวจบริบท แม้ runtime บางกรณีรองรับ interoperability</p>`),
 S('นำเข้า JSON และข้อจำกัด CSS',`<pre><code>import colors from './colors.json' with { type:'json' };</code></pre><p>Node ESM รุ่นที่รองรับ JSON import attributes ต้องใช้ type:'json' และ JSON module เปิดให้ใช้เป็น default export จึง import colors โดยไม่ใช้ปีกกา</p><p class="note">ปรับบริบทจากสไลด์หน้า 9: <code>import styles from './styles.css' with {type:'css'}</code> ไม่ใช่ความสามารถที่ควรสรุปว่าใช้ได้โดยตรงใน Node.js ปกติ การ import CSS ขึ้นกับเบราว์เซอร์ เครื่องมือ build หรือ loader ที่รองรับ ถ้าเป็นหน้า HTML ธรรมดาใช้ link rel="stylesheet" ได้ตรงกว่า</p>`),
 S('เชื่อมโมดูลในเบราว์เซอร์ (เสริม)',`<pre><code>&lt;script type="module" src="app.js"&gt;&lt;/script&gt;</code></pre><p>เบราว์เซอร์รองรับ ES Modules ผ่าน type="module" และมีพฤติกรรมรันหลัง parse เอกสารโดยปริยาย ควรทดสอบผ่าน HTTP server แทนเปิด file:// เพราะการโหลดโมดูลมีข้อกำหนดเรื่อง origin และการเข้าถึงไฟล์</p><p>แนวคิดออกแบบ: ให้แต่ละ module มีหน้าที่ชัดเจน ไม่ผูกทุกอย่างกับ global variables และตั้งชื่อ exports ให้บอกว่าทำอะไร</p>`)
 ],tips:[['สองภาษาโมดูล','CommonJS → require/module.exports · ESM → import/export'],['ดูชนิดไฟล์','mjs = module · cjs = CommonJS · js ดู package'],['วงเล็บ import','{name} = named; name เปล่า = default'],['package.json เป็น JSON','double quotes และไม่มี comments ในไฟล์จริง'],['เช็ก environment','syntax นำเข้าทรัพยากรไม่ได้แปลว่าทุก runtime รองรับเหมือนกัน']],
 quiz:[
 ['จุดประสงค์หลักของ module คืออะไร','แพ็กโค้ดเพื่อใช้ซ้ำและแบ่งหน้าที่','เปลี่ยนทุกตัวแปรเป็น global','แทนที่ HTTP','แปลง HTML เป็น PDF','โมดูลช่วยจัดขอบเขต dependencies และ interface ของโค้ด','แบ่งงาน ใช้ซ้ำ'],
 ['Node.js มีสองระบบโมดูลหลักอะไร','CommonJS และ ECMAScript Modules','DOM และ CSSOM','HTTP และ DNS','JSON และ HTML','สไลด์แยก CommonJS กับ ESM','CJS / ESM'],
 ['package.json ที่ต้องการใช้ ES Modules กับ .js ควรระบุอะไร','"type":"module"','"type":"commonjs"','"module":false','"language":"css"','type module กำหนดรูปแบบ .js ใน package scope','type module → ESM'],
 ['นามสกุลใดระบุ ES Module ชัดเจน',' .mjs',' .cjs',' .json',' .css','mjs ถูกใช้ระบุ ESM ส่วน cjs ระบุ CommonJS','m = module'],
 ['นามสกุลใดระบุ CommonJS ชัดเจน',' .cjs',' .mjs',' .html',' .jsx เสมอ','cjs เป็นนามสกุลชัดเจนของ CommonJS','c = CommonJS'],
 ['Syntax หลักของ CommonJS คือข้อใด','require และ module.exports','import และ export เท่านั้น','getElementById และ querySelector','link และ style','CommonJS ใช้ require เพื่อโหลดและ module.exports เพื่อส่งออก','CJS require/export object'],
 ['โมดูล export {addTwo}; ควร import แบบใด','import {addTwo} from "./addTwo.mjs";','import addTwo from "./addTwo.mjs"; เมื่อไม่มี default','require export addTwo;','import "addTwo" as all;','เป็น named export จึงใช้ named import ตามชื่อ','named ใช้ {}'],
 ['addTwo(num){return num+2;} เรียก addTwo(4) ได้อะไร','6','42','2','undefined','ตัวอย่างโมดูลในสไลด์คืน 4+2','import แล้วเรียกเหมือน function'],
 ['ต้องการเปลี่ยนชื่อ named import ใช้คำใด','as','with แทน as','rename','from แทน as','import {addTwo as plusTwo} สร้าง binding ชื่อ plusTwo','as = ใช้ชื่อว่า'],
 ['Default export มีได้กี่ตัวต่อโมดูล','หนึ่ง','ไม่จำกัด','สองเสมอ','ศูนย์เท่านั้น','หนึ่งโมดูลมี default export ได้อย่างมากหนึ่ง แต่ named หลายตัวได้','default หนึ่งเดียว'],
 ['Default import ต้องใช้ชื่อเดียวกับชื่อ function ต้นทางเสมอหรือไม่','ไม่ ผู้ import เลือกชื่อ local binding ได้','ต้องเหมือนทุกตัวอักษร','ใช้ได้เฉพาะชื่อ default','ใช้ได้เฉพาะเลข','default import ไม่จับคู่ named export ด้วยชื่อ','default ตั้งชื่อเองได้'],
 ['สิ่งใด export ได้ตามสไลด์','Function, variable และ class','เฉพาะ function เท่านั้น','เฉพาะ HTML element','เฉพาะ string เท่านั้น','ส่งออก binding ได้หลายประเภท เช่น const และ class','export สิ่งที่อยากเปิดใช้'],
 ['ข้อใดเป็น package.json ที่ถูกต้อง','{"type":"module"}','{\'type\':\'module\'}','{type:module}','{"type":"module",}','JSON ใช้ double quotes และไม่อนุญาต trailing comma','JSON ไม่ใช่ object literal ทุกแบบ'],
 ['Node ESM relative import ควรเขียนเส้นทางอย่างไร','./addTwo.mjs พร้อมนามสกุล','addTwo โดยไม่ระบุจุดเสมอ','C: โดยไม่มีชื่อไฟล์','https เท่านั้น','relative specifier เริ่ม ./ หรือ ../ และระบุนามสกุลตามการ resolve ของ Node ESM','เส้นทางครบ ไฟล์ชัด'],
 ['JSON import แบบใหม่ที่สไลด์ใช้มีส่วนใด','with {type:"json"}','as {type:"css"}','defer="json"','require=true','import attributes ระบุชนิด json ที่ runtime ต้องใช้','JSON มี type json'],
 ['JSON module ของ Node ESM import ตามตัวอย่างเป็นอะไร','Default import','Named import ของทุก key โดยอัตโนมัติ','DOM element','CSS stylesheet','JSON module เปิด default export ของข้อมูลที่ parse แล้ว','JSON default data'],
 ['import CSS ตามตัวอย่างใช้ได้ใน Node.js ปกติทุกกรณีหรือไม่','ไม่ ต้องดูการรองรับของ runtime/build tool/loader','ได้เสมอเพราะเป็น ES6','ได้เมื่อชื่อไฟล์สีเขียว','ไม่ได้ในทุกสภาพแวดล้อมรวมเบราว์เซอร์','การรองรับทรัพยากรต่างกันตาม environment ไม่ใช่แค่ syntax','ดูที่รัน ไม่ดู syntax อย่างเดียว'],
 ['หน้า HTML ใช้ ES Modules ผ่านแท็กใด','<script type="module" src="app.js"></script>','<module href="app.js">','<style type="module">','<script type="commonjs"> ในเบราว์เซอร์ทั่วไป','type module เปิดการใช้ ES Modules ในเบราว์เซอร์','browser module ใช้ script'],
 ['Node.js มี document สำหรับ DOM มาโดยค่าเริ่มต้นหรือไม่','ไม่มี เพราะเป็น runtime นอกเบราว์เซอร์','มีเหมือน browser ทุกอย่าง','มีเฉพาะเมื่อใช้ const','มีเมื่อ port เป็น 80','DOM เป็น Web API ของเบราว์เซอร์ ไม่ใช่ค่ามาตรฐานของ Node ปกติ','JS language ≠ ทุก Web API'],
 ['Module ที่ออกแบบดีควรมีลักษณะใด','มีหน้าที่ชัดและ export เฉพาะ interface ที่ต้องใช้','ทุกไฟล์แก้ global ชุดเดียวกัน','export ทุกตัวแปรเสมอ','รวมทุกหน้าที่เป็นไฟล์เดียว','ขอบเขตชัดช่วยใช้ซ้ำและลด coupling','เปิดเท่าที่จำเป็น']
 ]});

addChapter({title:'เตรียมพร้อม React',subtitle:'ES6+, async, closures และวิธีคิดแบบไม่แก้ข้อมูลเดิม',group:'เชื่อมสู่แอปพลิเคชัน',minutes:40,sources:[['JavaScript - for React.pdf','1–2'],['_Scope.pdf','1']],
 goals:['เชื่อม ES6+ และ array methods กับการเขียน UI','เข้าใจ Promise, async/await, fetch และ error handling ระดับพื้นฐาน','อธิบาย closure, this, immutability และ pure function'],
 sections:[
 S('ขอบเขตบทนี้',`<p>สไลด์นี้เป็นรายการแนวคิด JavaScript ที่ควรรู้ก่อนใช้ React ไม่ใช่บทสอน React แบบครบทั้ง framework ตัวอย่างในบทนี้เป็นคำอธิบายเสริมเพื่อให้เข้าใจรายการนั้น และข้อสอบเป็นแบบฝึกที่จัดทำใหม่ ไม่ใช่ข้อสอบจริงของอาจารย์</p><table><tr><th>พื้นฐาน</th><th>นำไปใช้กับ UI อย่างไร</th></tr><tr><td>Arrow / callback</td><td>กำหนดงานเมื่อเกิด event และแปลงข้อมูล</td></tr><tr><td>Destructuring</td><td>ดึงค่าจาก object หรือ array</td></tr><tr><td>Template literal</td><td>ประกอบข้อความจากข้อมูล</td></tr><tr><td>Spread / rest</td><td>สร้างชุดข้อมูลใหม่และรับหลายค่า</td></tr><tr><td>Modules</td><td>แยกส่วนประกอบและ utilities</td></tr><tr><td>map / filter / reduce</td><td>แปลงรายการ คัดรายการ และรวมผล</td></tr></table>`),
 S('Template literals และ Array pipeline',`<pre><code>const name = 'Mali';
const label = &grave;Hello, &#36;{name}!&grave;;

const students = [{name:'Mali',score:85},{name:'Nok',score:40}];
const labels = students
  .filter(s => s.score >= 50)
  .map(s => &grave;&#36;{s.name}: &#36;{s.score}&grave;);
// ['Mali: 85']</code></pre><p>Template literal ใช้ backtick และแทรกนิพจน์ด้วย dollar sign ตามด้วยปีกกา การแยกขั้นตอน filter → map ทำให้เห็นว่าคัดข้อมูลก่อนแล้วแปลงเพื่อแสดงผล ใน React map มักใช้สร้างรายการ elements; รายละเอียด JSX และ keys ยังไม่ได้สอนอย่างเต็มในสไลด์</p>`),
 S('Asynchronous JavaScript และ Promise (เสริมตัวอย่าง)',`<p>งานอย่างอ่านข้อมูลผ่านเครือข่ายไม่ได้จบทันที Promise ใช้แทนผลลัพธ์ที่อาจสำเร็จหรือล้มเหลวภายหลัง มีสถานะ pending, fulfilled หรือ rejected ส่วน async function คืน Promise เสมอ และ await รอผลภายใน async function โดยพักการทำงานของฟังก์ชันนั้น ไม่ได้หยุดทั้งเบราว์เซอร์</p><pre><code>async function doubleLater(n) {
  const value = await Promise.resolve(n);
  return value*2;
}
// doubleLater(3) คืน Promise ที่ fulfill เป็น 6
doubleLater(3).then(value => console.log(value));</code></pre><p>async/await เป็น syntax ที่ทำให้เขียนลำดับงานที่พึ่งกันอ่านง่ายขึ้น ไม่ได้เปลี่ยนงาน asynchronous ให้ทำเสร็จทันที</p>`),
 S('Fetch API, JSON และ Error handling (เสริมตัวอย่าง)',`<pre><code>async function loadStudents() {
  try {
    const response = await fetch('/api/students');
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    const students = await response.json();
    return students;
  } catch (error) {
    console.error(error.message);
    throw error; // ส่งความล้มเหลวให้ผู้เรียกตัดสินใจต่อ
  }
}</code></pre><p>fetch คืน Promise ของ Response; การอ่าน body เป็น JSON เป็นอีกขั้นที่ต้อง await ค่า response.ok เป็น true สำหรับสถานะ 200–299 การได้ HTTP 404/500 โดยตัวมันเองไม่ได้ทำให้ fetch reject จึงต้องตรวจสถานะ ขณะที่ความล้มเหลวเครือข่ายอาจ reject ได้</p><p>ตอนออกแบบ UI ควรมีสถานะ loading, success, empty และ error ตัวอย่างนี้อธิบายแนวคิด ไม่ได้เรียก API จริงในหน้าเรียน</p>`),
 S('this และ Closures',`<p>this ของ function ปกติสัมพันธ์กับวิธีเรียก ส่วน arrow ใช้ this จากขอบเขตที่สร้าง <strong>Closure</strong> คือฟังก์ชันที่ยังเข้าถึง binding ใน lexical environment รอบตัวได้ แม้ฟังก์ชันชั้นนอกจะจบแล้ว ช่วยให้ callback จดจำบริบท</p><pre><code>function createCounter() {
  let count = 0;
  return () => ++count;
}
const next = createCounter();
next(); // 1
next(); // 2
const another = createCounter();
another(); // 1: environment คนละชุด</code></pre><p>จุดสำคัญคือฟังก์ชันจำการเข้าถึง binding ไม่ใช่ถ่ายภาพค่าทุกตัวแบบตายตัว ความเข้าใจนี้ช่วยอ่าน callbacks และเหตุผลเกี่ยวกับค่าที่ callback เห็นในแต่ละรอบการทำงานของ UI</p>`),
 S('Functional Programming, Immutability และ OOP',`<p><strong>Pure function</strong> ให้ผลเดิมเมื่อ input เดิมและไม่มี side effects ที่สังเกตได้ภายนอก <strong>Higher-order function</strong> รับ function หรือคืน function เช่น map รับ callback ส่วน <strong>Immutability</strong> ในการอัปเดต state คือสร้างข้อมูลใหม่แทนการแก้ข้อมูลเดิมตรง ๆ</p><pre><code>const student = {name:'Mali',score:80};
const updated = {...student,score:90}; // student.score ยัง 80

const students = [{id:1,score:80},{id:2,score:70}];
const next = students.map(s =>
  s.id===1 ? {...s,score:90} : s
);</code></pre><p>React state ควรถูกอัปเดตผ่าน API ของ React และใช้ object/array ใหม่เมื่อข้อมูลเปลี่ยน ส่วน Object-Oriented Programming เน้นวัตถุที่มีข้อมูลและพฤติกรรม แนวคิด class, inheritance และ polymorphism ยังมีประโยชน์กับโค้ดเดิมและ class components ตามที่สไลด์กล่าวถึง แต่ไม่จำเป็นต้องใช้ class กับทุกปัญหา</p>`),
 S('เชื่อมกับคำอธิบายวิชา: MVC และ Ajax (เนื้อหาเสริม)',`<p>สองเรื่องนี้อยู่ในคำอธิบายวิชาที่ผู้เรียนให้มา แต่ไม่ได้ลงรายละเอียดใน PDF บทเรียน จึงสรุปเพื่อเชื่อมภาพรวม:</p><ul><li><strong>Model</strong> จัดการข้อมูลและกฎของงาน <strong>View</strong> แสดงผล และ <strong>Controller</strong> รับการกระทำแล้วประสานงาน เช่นรับคำขอเพิ่มนักศึกษา → ให้ Model ตรวจและบันทึก → เลือกผลลัพธ์ให้ View แสดง</li><li><strong>Ajax</strong> คือแนวทางขอข้อมูลแบบ asynchronous แล้วอัปเดตบางส่วนของหน้าโดยไม่โหลดทั้งหน้าใหม่ ชื่อมี XML แต่ข้อมูลจริงอาจเป็น JSON ใช้ fetch หรือ XMLHttpRequest ได้</li></ul><p>React เน้นชั้น UI ไม่ได้แปลว่า React เพียงตัวเดียวเป็นสถาปัตยกรรม MVC เต็มระบบ ขอบเขตวิชายังระบุ Next.js, Express, Tailwind, Git/GitHub, npm, semantic versioning, environment variables, CSS box model/Grid/Flex และรูปแบบ Date/Time แต่ชุด PDF นี้ยังไม่มีบทอธิบายเรื่องเหล่านั้นเต็ม จึงไม่แต่งเพิ่มเป็นบทสไลด์หรือออกข้อสอบบังคับในเรื่องที่ขาด</p>`)
 ],tips:[['รอสองขั้น','await fetch → ตรวจ status → await response.json'],['404 ไม่ใช่ network reject','fetch สำเร็จในการรับ Response ได้ แม้ HTTP เป็นข้อผิดพลาด'],['Closure','ฟังก์ชันพกสิทธิ์เข้าถึงขอบเขตที่สร้าง'],['อัปเดตข้อมูล','อย่าแก้ของเดิม → สร้างของใหม่ → ให้ UI ใช้ค่าใหม่'],['MVC','Model ข้อมูล · View แสดง · Controller ประสาน'],['Ajax','ขอข้อมูลแล้วอัปเดตบางส่วน ไม่จำเป็นต้องใช้ XML']],
 quiz:[
 ['จุดประสงค์ของสไลด์ JavaScript for React คืออะไร','สรุปพื้นฐาน JavaScript ที่ควรรู้ก่อนใช้ React','สอน deployment Next.js ครบระบบ','เป็นเอกสาร API ของ React ทุกตัว','อธิบายฐานข้อมูล SQL ทั้งหมด','ไฟล์ 2 หน้าเป็น concept checklist ก่อนเรียน React','รู้พื้นฐานก่อน framework'],
 ['Template literal ใช้เครื่องหมายใดครอบข้อความ','Backtick (`)','Double quote เท่านั้น','Single quote เท่านั้น','วงเล็บเหลี่ยม','template literal ใช้ backtick และแทรก expression ได้','backtick + expression'],
 ['ใน template literal การแทรก expression ใช้รูปแบบใด','${expression}','#{expression}','@expression','{{expression}} เสมอ','dollar sign และปีกกาเป็น syntax ของ interpolation','ดอลลาร์ปีกกา'],
 ['ต้องสร้างรายการชื่อจาก array ของนักศึกษาเหมาะกับเมธอดใด','map','find เท่านั้น','pop','shift','map แปลงสมาชิกแต่ละตัวเป็นผลลัพธ์ใหม่สำหรับแสดงรายการ','map สร้างรายการใหม่'],
 ['ต้องคัดเฉพาะนักศึกษาคะแนนผ่านก่อนแสดงผลควรใช้','filter','join อย่างเดียว','unshift','Object.keys เสมอ','filter เลือกสมาชิกที่ตรงเงื่อนไขก่อน map เพื่อแสดงผล','คัดก่อนแปลง'],
 ['Promise ใช้แทนสิ่งใด','ผลลัพธ์ของงานที่อาจเสร็จภายหลัง','DOM element ทุกชนิด','CSS class','เฉพาะผลลัพธ์ที่สำเร็จทันที','Promise อาจ pending แล้ว fulfill หรือ reject','สัญญาของผลภายหลัง'],
 ['สถานะหลักของ Promise คือชุดใด','pending, fulfilled, rejected','loading, CSS, HTML','true, false, null เท่านั้น','open, save, close','Promise มีสามสถานะหลักและ settled เมื่อ fulfilled/rejected','รอ สำเร็จ ล้มเหลว'],
 ['async function คืนค่าในรูปแบบใดเสมอ','Promise','String เสมอ','Array เสมอ','DOM node เสมอ','ค่าที่ return จะถูกใช้เป็น fulfilled value ของ Promise','async → Promise'],
 ['await ภายใน async function ทำอะไร','พักการทำงานของฟังก์ชันนั้นจน Promise settle','หยุดทั้ง browser และ UI เสมอ','เปลี่ยนงานเครือข่ายให้เสร็จทันที','ลบ Promise ออกจากภาษา','await ช่วยรอผลเป็นลำดับโดยไม่บล็อก main thread แบบรอค้างทั้งระบบ','พักฟังก์ชัน ไม่ใช่ทั้งเว็บ'],
 ['await fetch(url) โดยทั่วไปให้ค่าใด','Response object','ข้อมูล JSON ที่ parse แล้วเสมอ','DOM tree','CSSOM','fetch รับ response ก่อน ส่วนการอ่าน body เป็นอีกขั้น','Response ก่อน data'],
 ['หลัง fetch ต้องการอ่าน JSON body ใช้อะไร','await response.json()','response.innerHTML','JSON.stringify(response) แล้วจบ','response.querySelectorAll()','json อ่านและ parse body เป็นค่า JavaScript โดยคืน Promise','body ต้องอ่านอีกครั้ง'],
 ['fetch ได้ HTTP 404 จะ reject เสมอหรือไม่','ไม่ ต้องตรวจ response.ok หรือ status','ใช่ เพราะทุก 4xx เป็น network error','ใช่เฉพาะ GET','ไม่เพราะ 404 คือ success code','การรับ HTTP response ได้สำเร็จต่างจากความสำเร็จของคำขอในระดับแอป','HTTP error ≠ network reject'],
 ['response.ok เป็น true เมื่อใด','Status อยู่ช่วง 200–299','Status ทุกค่าต่ำกว่า 500','เมื่อมี body เท่านั้น','เฉพาะ 200 เท่านั้น','ok ครอบคลุมกลุ่ม 2xx','ok = 2xx'],
 ['try/catch มีประโยชน์อย่างไรกับ await','จัดการข้อผิดพลาดที่ throw หรือ Promise reject ใน try','ทำให้ 404 กลายเป็น 200','รับประกัน network ไม่ล่ม','แทนที่ JSON parsing ทุกกรณี','catch รับ failure ที่ถูก throw/reject ไม่ได้แก้ต้นเหตุอัตโนมัติ','จับ error แล้วตัดสินใจ'],
 ['Closure อธิบายอะไร','ฟังก์ชันยังเข้าถึง lexical bindings รอบตัวได้','ฟังก์ชันลบ scope รอบตัวเสมอ','ตัวแปรทุกตัวเป็น global','ตัวแปรจะ freeze ทุกครั้ง','closure รักษาการเข้าถึง environment ที่สร้างฟังก์ชัน','พกขอบเขตติดตัว'],
 ['createCounter คืนฟังก์ชันที่ ++count เริ่ม 0 เรียกสองครั้งได้ค่าใด','1 แล้ว 2','1 แล้ว 1','0 แล้ว 0','undefined ทั้งคู่','ฟังก์ชันที่คืนเก็บการเข้าถึง count ชุดเดิมผ่าน closure','จำ binding เดิม'],
 ['การเรียก createCounter() ใหม่อีกครั้งสร้างอะไร','Lexical environment และ count อีกชุด','ใช้ count global เดิมเสมอ','ลบ counter ตัวแรก','คืน CSS class','แต่ละการเรียกสร้าง local environment แยกกัน','แต่ละโรงงานได้ counter ใหม่'],
 ['Pure function มีคุณสมบัติหลักใด','input เดิมได้ผลเดิมและไม่มี side effects ภายนอก','ต้องแก้ global เพื่อทำงาน','ต้อง fetch ทุกครั้ง','ใช้ได้เฉพาะ arrow syntax','pure กล่าวถึงพฤติกรรม ไม่ใช่รูปแบบ syntax','คงผล ไม่กระทบภายนอก'],
 ['อัปเดต object ที่เป็น React state ควรทำอย่างไร','สร้าง object ใหม่แล้วใช้ API อัปเดต state','แก้ property ของ state เดิมแล้วจบ','เปลี่ยนด้วย const reassignment โดยตรง','แก้ DOM แทน state ทุกครั้ง','immutability ช่วยให้การอัปเดตข้อมูลสอดคล้องกับ model ของ React','ข้อมูลใหม่ ผ่าน state API'],
 ['Higher-order function คืออะไร','ฟังก์ชันที่รับฟังก์ชันหรือคืนฟังก์ชัน','ฟังก์ชันที่อยู่บรรทัดแรก','ฟังก์ชันที่ใช้ตัวเลขสูง','ฟังก์ชันที่ต้องเป็น class','เช่น map รับ callback และ createCounter คืนฟังก์ชัน','function รับ/คืน function']
 ]});
