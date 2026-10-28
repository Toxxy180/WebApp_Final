addChapter({title:'JavaScript พื้นฐาน',subtitle:'ตัวแปร ตัวดำเนินการ ข้อความ ตัวเลข และรูปแบบการเขียนโค้ด',group:'ภาษา JavaScript',minutes:45,sources:[['JavaScript - Variable.pdf','1–6'],['JavaScript - Operator.pdf','1–3'],['JavaScript - String _ Number.pdf','1–2'],['JavaScript - Style Guide.pdf','1']],
 goals:['เลือก let/const และอธิบาย scope ได้','คำนวณและเปรียบเทียบค่าโดยระวังการแปลงชนิด','จัดการข้อความ ตัวเลข และตั้งชื่อโค้ดอย่างสม่ำเสมอ'],
 sections:[
 S('ตัวแปรและชนิดข้อมูล',`<p>ตัวแปรคือชื่อที่ผูกกับค่าเพื่อใช้ระหว่างทำงาน JavaScript แยกตัวพิมพ์เล็ก/ใหญ่ เช่น score และ Score เป็นคนละชื่อ และเป็นภาษา dynamic type: binding ที่ใช้ let เปลี่ยนไปอ้างค่าคนละชนิดได้</p><pre><code>const name = 'Mali';       // string
let score = 85;             // number
const passed = score >= 50; // boolean
const student = { name, score }; // object
const scores = [70, 85, 90];     // array (เป็น object ชนิดหนึ่ง)</code></pre><p>คำอธิบายเสริม: primitive ได้แก่ string, number, boolean, undefined, null, bigint และ symbol ส่วน object รวม array และ function ด้วย การกำหนด object ให้ตัวแปรอีกตัวไม่ได้ทำสำเนา object แต่แชร์การอ้างอิง</p><pre><code>const a = { score: 10 };
const b = a;
b.score = 20;
console.log(a.score); // 20</code></pre>`),
 S('let, const, var และ Scope',`<table><tr><th>ประเด็น</th><th>var</th><th>let</th><th>const</th></tr><tr><td>Scope หลัก</td><td>function scope</td><td>block scope</td><td>block scope</td></tr><tr><td>ประกาศชื่อซ้ำใน scope เดียวกัน</td><td>ได้ในกรณีทั่วไป</td><td>ไม่ได้</td><td>ไม่ได้</td></tr><tr><td>กำหนดค่าใหม่</td><td>ได้</td><td>ได้</td><td>ไม่ได้</td></tr><tr><td>ต้องมีค่าเมื่อประกาศ</td><td>ไม่จำเป็น</td><td>ไม่จำเป็น</td><td>จำเป็น</td></tr></table><p>เริ่มด้วย const ถ้าจะเปลี่ยน binding จึงใช้ let และหลีกเลี่ยง var ในโค้ดใหม่ Block คือขอบเขตภายในวงเล็บปีกกา เช่น if หรือ for ส่วน var ไม่ได้ถูกจำกัดด้วย block ของ if</p><pre><code>if (true) {
  var a = 1;
  let b = 2;
}
console.log(a); // 1
// console.log(b); // ReferenceError

const user = { name: 'Mali' };
user.name = 'Nok'; // ได้: แก้ข้อมูลใน object
// user = {};     // ไม่ได้: เปลี่ยน binding ของ const</code></pre><p class="note">ปรับความแม่นยำจากสไลด์: var ถูก initialize เป็น undefined ก่อนถึงบรรทัดประกาศ แต่ let/const อยู่ใน Temporal Dead Zone จนถึงการประกาศ จึงเข้าถึงก่อนบรรทัดนั้นไม่ได้ หลัง <code>let x;</code> ทำงานแล้ว x จึงมีค่า undefined ทั้งนี้ top-level scope ยังแตกต่างระหว่าง script, ES module และ Node.js</p>`),
 S('ตั้งชื่อและ Style Guide',`<p>ใช้ชื่อที่สื่อความหมาย เช่น totalPrice แทน x ชื่อเริ่มด้วยตัวอักษร, underscore หรือ $ ได้ และห้ามใช้คำสงวนหรือเริ่มด้วยตัวเลข</p><table><tr><th>รูปแบบ</th><th>ตัวอย่าง</th></tr><tr><td>camelCase</td><td>studentName</td></tr><tr><td>PascalCase</td><td>StudentProfile</td></tr><tr><td>snake_case</td><td>student_name</td></tr><tr><td>UPPER_SNAKE_CASE</td><td>MAX_SCORE</td></tr><tr><td>kebab-case</td><td>student-name (ไม่ใช่ชื่อตัวแปร JS แบบหนึ่ง identifier)</td></tr></table><p>สไลด์ชี้แหล่ง Style Guide เช่น Idiomatic.js, Standard, Airbnb, Google และ Clean Code JavaScript สิ่งสำคัญคือเลือกข้อตกลงที่ทีมใช้และทำให้สม่ำเสมอ ชื่อรูปแบบเหล่านี้เป็น convention ไม่ใช่ชนิดข้อมูลหรือคำสั่งพิเศษ</p>`),
 S('คำนวณ เปรียบเทียบ และตรรกะ',`<table><tr><th>กลุ่ม</th><th>ตัวอย่าง</th><th>หน้าที่</th></tr><tr><td>Arithmetic</td><td>+ - * / %</td><td>คำนวณและหาเศษ</td></tr><tr><td>Comparison</td><td>== === != !== &gt; &lt; &gt;= &lt;=</td><td>เปรียบเทียบค่า</td></tr><tr><td>Logical</td><td>&amp;&amp; || !</td><td>รวม/กลับเงื่อนไข</td></tr><tr><td>Assignment</td><td>= += -=</td><td>กำหนดหรือปรับค่า</td></tr></table><pre><code>console.log(10 % 2);     // 0 → เลขคู่
console.log(5 == '5');   // true: มีการแปลงชนิด
console.log(5 === '5');  // false: คนละชนิด
console.log(5 !== '5');  // true
let count = 2;
count += 3;             // เทียบได้กับ count = count + 3
const allowed = count >= 5 && count < 10; // true</code></pre><p>ใช้ === เป็นค่าเริ่มต้นเมื่อไม่ต้องการการแปลงชนิดโดยอัตโนมัติ เครื่องหมาย = คือกำหนดค่า ไม่ใช่ตรวจความเท่ากัน รายละเอียดเสริม: &amp;&amp; และ || คืนค่า operand ตาม short-circuit ไม่จำเป็นต้องได้ boolean เสมอ เช่น <code>'' || 'Guest'</code> ได้ 'Guest'</p>`),
 S('จัดการ String',`<table><tr><th>คำสั่ง</th><th>ใช้ทำอะไร</th></tr><tr><td>str.length</td><td>จำนวนหน่วย UTF-16 (ไม่ใช่จำนวนตัวอักษรที่เห็นเสมอ)</td></tr><tr><td>toUpperCase / toLowerCase</td><td>คืนข้อความตัวพิมพ์ใหญ่/เล็ก</td></tr><tr><td>trim</td><td>ตัด whitespace ที่หัวและท้าย</td></tr><tr><td>replace / replaceAll</td><td>แทนที่รายการแรกเมื่อใช้ string pattern / ทุกตำแหน่ง</td></tr><tr><td>concat หรือ +</td><td>ต่อข้อความ</td></tr><tr><td>split</td><td>แยก string เป็น array</td></tr><tr><td>includes / startsWith / endsWith</td><td>ตรวจว่ามี / เริ่มด้วย / ลงท้ายด้วย</td></tr><tr><td>array.join</td><td>รวม array เป็น string</td></tr></table><pre><code>const raw = '  Web App  ';
console.log(raw.trim().toLowerCase()); // 'web app'
console.log('a-b-c'.split('-'));       // ['a','b','c']
console.log(['Web','App'].join(' '));  // 'Web App'
console.log('banana'.replace('a','o')); // 'bonana'
console.log('banana'.replaceAll('a','o')); // 'bonono'</code></pre><p>String เป็น immutable เมธอดที่เปลี่ยนข้อความจะคืนค่าใหม่ ถ้าต้องการใช้ต่อให้รับค่านั้นไว้ <code>split('')</code> แยกเป็นหน่วย UTF-16 จึงควรระวัง emoji และอักขระประกอบ</p><p class="note">แก้ชื่อเมธอดที่สะกดคลาดในสไลด์: ใช้ <code>startsWith()</code> และ <code>endsWith()</code> โดยมี s</p>`),
 S('Number, การแปลงชนิด และสุ่มเลข',`<pre><code>Number('12.5');      // 12.5
parseInt('12.5',10); // 12
(12.345).toFixed(2); // '12.35' เป็น string
(2500).toString();  // '2500'
typeof 2500;        // 'number'

// จำนวนเต็มสุ่ม min ถึง max รวมปลายทั้งสอง (min/max เป็นจำนวนเต็ม)
const randomInt = (min,max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;</code></pre><p><code>Math.random()</code> ได้ค่า 0 ถึงน้อยกว่า 1; คูณความกว้างช่วง, floor เพื่อตัดเป็นจำนวนเต็ม, บวก min เพื่อเลื่อนจุดเริ่ม เช่น min=3, max=9 จะได้ 3–9</p><p class="note">ปรับโค้ดจากสไลด์: ชื่อที่ถูกคือ <code>parseInt</code> ไม่ใช่ parseInv และสูตรสุ่มต้องบวก <strong>min</strong> แทน +1 เพื่อรองรับช่วงที่ไม่ได้เริ่ม 1 ส่วน Number กับ parseInt มีพฤติกรรมต่างกัน เช่น Number('12px') เป็น NaN แต่ parseInt('12px',10) เป็น 12</p>`)
 ],tips:[['เลือกประกาศ','const ก่อน → ต้องเปลี่ยน binding ค่อย let → หลีกเลี่ยง var'],['const ล็อกอะไร','ล็อก binding ไม่ได้แช่แข็ง object'],['เทียบให้ชัด','=== ตรวจทั้งชนิดและค่า; = ใช้กำหนดค่า'],['แยกกับรวม','String.split → Array; Array.join → String'],['สูตรสุ่ม','floor(random × จำนวนค่าที่เป็นไปได้) + จุดเริ่ม'],['แปลงก่อนคำนวณ','toFixed คืน string; ถ้าจะบวกเป็นตัวเลขให้แปลงด้วย Number']],
 quiz:[
 ['ตัวแปรที่จะกำหนดค่าใหม่ภายหลังควรใช้คำใด','let','const','import','return','let อนุญาตให้เปลี่ยน binding ได้โดยยังมี block scope','เปลี่ยนค่าใช้ let'],
 ['const a = {x:1}; a.x = 2; ผลเป็นอย่างไร','ทำได้และ a.x เป็น 2','SyntaxError ทุกครั้ง','a.x ยังคงเป็น 1','a กลายเป็น number','const ห้ามเปลี่ยน binding แต่แก้ property ของ object ได้','const ไม่ได้ freeze'],
 ['ข้อใดเป็นชื่อตัวแปรที่ใช้ได้','studentScore','2students','student-score','const','ชื่อห้ามเริ่มด้วยเลข ห้ามใช้คำสงวน และขีดกลางเป็น operator ลบ','ชื่อมีความหมาย ไม่มีขีดกลาง'],
 ['var ต่างจาก let ใน if block อย่างไร','var ไม่ถูกจำกัดด้วย block ของ if แต่ let ถูกจำกัด','ทั้งสองเป็น block scope เหมือนกัน','let เป็น global เสมอ','var ใช้ใน function ไม่ได้','var มี function scope ขณะที่ let มี block scope','var ดู function, let ดู block'],
 ['หลัง let score; ทำงานแล้ว score มีค่าใด','undefined','null','0','ReferenceError เสมอ','let ที่ประกาศแล้วแต่ไม่ได้ให้ค่าเริ่มต้นมีค่า undefined','ประกาศแล้ว ยังไม่ใส่ค่า'],
 ['เข้าถึง let ก่อนบรรทัดประกาศใน scope เดียวกันจะเกิดอะไร','ReferenceError จาก Temporal Dead Zone','ได้ undefined เสมอ','ได้ null เสมอ','สร้างตัวแปร global ให้เอง','let/const ยังเข้าถึงไม่ได้ก่อนถูก initialize ณ การประกาศ','TDZ = ยังห้ามแตะ'],
 ['5 === "5" ได้อะไร','false','true','5','"5"','ชนิด number กับ string ต่างกันจึงไม่ strict equal','=== ไม่แปลงชนิด'],
 ['5 == "5" ได้อะไร','true','false','undefined','TypeError','== ยอมแปลงชนิดตามกฎก่อนเทียบ ทำให้กรณีนี้เท่ากัน','== มี conversion'],
 ['17 % 2 มีค่าเท่าใด','1','8','0','2','% ให้เศษจากการหาร 17 หาร 2 เหลือ 1','เศษ 1 = คี่'],
 ['let x=4; x+=3; x มีค่าเท่าใด','7','43','3','1','+= กับตัวเลขนี้คือ x=x+3','อ่าน += ว่าบวกแล้วเก็บ'],
 ['"  Web  ".trim() ได้อะไร','"Web"','"  Web"','"Web  "','"web"','trim ตัด whitespace เฉพาะหัวท้าย ไม่เปลี่ยนตัวพิมพ์','trim ตัดขอบ'],
 ['"a,b,c".split(",") ได้ชนิดข้อมูลใด','Array','String','Number','Boolean','split แยก string ตามตัวคั่นและคืน array','split ออกเป็นชุด'],
 ['["a","b"].join("-") ได้อะไร','"a-b"','["a-b"]','"ab-"','"a,b"','join รวมสมาชิกโดยใช้ - คั่น','join รวมด้วยตัวคั่น'],
 ['ต้องตรวจว่า filename ลงท้าย .pdf ใช้เมธอดใด','endsWith(".pdf")','endWith(".pdf")','startsWith(".pdf")','trim(".pdf")','endsWith เป็นชื่อเมธอดที่ถูกต้องและตรวจท้ายข้อความ','ends มี s'],
 ['"banana".replace("a","o") ได้อะไร','"bonana"','"bonono"','"banana"','"oananaa"','เมื่อ pattern เป็น string replace แทนที่ match แรก; ถ้าทุกจุดใช้ replaceAll','replace แรก replaceAll ทุก'],
 ['(12.345).toFixed(2) คืนค่าชนิดใด','String','Number','Boolean','Array','toFixed จัดรูปแบบจำนวนทศนิยมและคืนข้อความ','รูปแบบเลขยังเป็นข้อความ'],
 ['parseInt("12.5",10) ได้อะไร','12','12.5','13','NaN','parseInt อ่านจำนวนเต็มในฐาน 10 จนพบส่วนที่อ่านต่อไม่ได้','Int = integer'],
 ['Number("12px") ได้อะไร','NaN','12','0','"12px"','Number ต้องแปลงข้อความทั้งชุดเป็นจำนวนที่ถูกต้อง ต่างจาก parseInt','Number ดูทั้งข้อความ'],
 ['สูตรสุ่มจำนวนเต็ม min ถึง max รวมปลายทั้งสองคือข้อใด','Math.floor(Math.random()*(max-min+1))+min','Math.floor(Math.random()*(max-min+1))+1','Math.random()+max','Math.floor(Math.random())*max','จำนวนค่าที่เป็นไปได้คือ max-min+1 และต้องเลื่อนจุดเริ่มด้วย min','ความกว้าง + จุดเริ่ม'],
 ['รูปแบบ studentName เรียกว่าอะไร','camelCase','PascalCase','snake_case','kebab-case','camelCase เริ่มตัวเล็กและคำถัดไปขึ้นต้นตัวใหญ่','อูฐหลังแรกตัวเล็ก']
 ]});

addChapter({title:'Functions',subtitle:'สร้างชุดคำสั่งใช้ซ้ำ รับค่า คืนค่า และเขียน Arrow Function',group:'ภาษา JavaScript',minutes:25,sources:[['JavaScript Function - A Cheat Sheet for Developer.pdf','1–3']],
 goals:['แยก declaration, expression และการเรียกใช้','อธิบาย parameter, argument และ return','อ่านและเขียน arrow function ทั้ง block และ concise body'],
 sections:[
 S('ฟังก์ชันคืออะไร',`<p>ฟังก์ชันรวมชุดคำสั่งเพื่อทำงานหนึ่งอย่างหรือคำนวณค่า ช่วยใช้ตรรกะซ้ำและตั้งชื่อให้ขั้นตอนในโปรแกรม การประกาศยังไม่ได้ทำให้ body ทำงาน ต้องเรียกใช้ด้วยวงเล็บ</p><pre><code>function sum(a, b) {
  return a + b;
}
const result = sum(3, 6);
console.log(result); // 9</code></pre><p>ลองไล่ทีละขั้น: sum รับ 3 เป็น a และ 6 เป็น b → คำนวณ 9 → return ส่ง 9 กลับ → result รับค่า 9</p>`),
 S('Parameters กับ Arguments',`<p><strong>Parameters</strong> คือชื่อตัวแปรรับเข้าตอนนิยาม เช่น a,b ส่วน <strong>Arguments</strong> คือค่าที่ส่งจริงตอนเรียก เช่น 3,6 ฟังก์ชันไม่จำเป็นต้องมี parameter ก็ได้</p><pre><code>function greet(name) {
  return 'Hello, ' + name;
}
greet('Mali'); // name คือ parameter, 'Mali' คือ argument

function hello() { return 'Hello'; }
hello();</code></pre><p>รายละเอียดเสริม: ถ้าขาด argument และไม่มีค่า default parameter นั้นจะเป็น undefined ส่วน arguments ที่เกินไม่ได้กลายเป็น parameter เพิ่มโดยอัตโนมัติ สามารถรองรับจำนวนไม่แน่นอนด้วย rest parameter ซึ่งอยู่ในบท Objects</p>`),
 S('return กับ console.log คนละหน้าที่',`<p><code>return</code> หยุดการทำงานของฟังก์ชันครั้งนั้นและส่งค่ากลับไปยังจุดเรียก ถ้าจบฟังก์ชันโดยไม่มี return ที่ให้ค่า ผลลัพธ์จะเป็น undefined ส่วน console.log แสดงข้อมูลเพื่อดูผล ไม่ได้แทน return</p><pre><code>function printSum(a,b) { console.log(a+b); }
const x = printSum(2,4); // พิมพ์ 6 แต่ x เป็น undefined

function getSum(a,b) { return a+b; }
const y = getSum(2,4);   // y เป็น 6

function check(score) {
  if (score < 50) return 'retry';
  return 'pass';
}</code></pre>`),
 S('Declaration, Expression และ Anonymous',`<pre><code>// Function declaration
function add(a,b) { return a+b; }

// Function expression ที่ผูกกับตัวแปร
const dog = function() { return 'Woof!'; };

// ใช้เป็น callback โดยไม่ต้องผูกชื่อตัวแปรแยก
[1,2].map(function(n) { return n*2; });</code></pre><p>Declaration ใช้ function พร้อมชื่อเป็นคำสั่งประกาศ ส่วน expression สร้างค่าฟังก์ชันในนิพจน์และอาจผูกกับตัวแปร ฟังก์ชันเป็นค่าชนิดหนึ่ง จึงส่งเข้า function อื่นและคืนออกมาได้</p><p class="note">ปรับความแม่นยำจากสไลด์: anonymous หมายถึงรูปแบบนิยามไม่มีชื่อโดยตรง แต่ JavaScript สามารถอนุมาน <code>name</code> จากตัวแปรได้ เช่น <code>dog.name</code> เป็น 'dog' จึงไม่ควรจำว่า anonymous ไม่มี name property เสมอ</p>`),
 S('Arrow Functions และการคืนค่าแบบย่อ',`<pre><code>const sum = (a,b) => { return a+b; };
const multiply = (a,b) => a*b; // implicit return
const double = n => n*2;      // parameter เดียว ตัด () ได้
const hello = () => 'Hello';  // ไม่มี parameter ต้องมี ()

const makeUser = name => ({ name }); // คืน object ต้องครอบ ()</code></pre><p>เมื่อใช้ body แบบปีกกา ต้องใส่ return เองถ้าต้องการค่า หากใช้ expression เดียวแบบไม่มีปีกกา จะคืนค่านั้นอัตโนมัติ การคืน object literal ควรครอบวงเล็บเพื่อไม่ให้สับสนกับ block</p><p>รายละเอียดเสริมที่เชื่อมบท React: arrow function ไม่มี this ของตัวเอง แต่ใช้ this จากขอบเขตที่สร้าง จึงไม่ได้แทน function ปกติได้ทุกสถานการณ์ โดยเฉพาะ method ที่ต้องอ้าง this ของ object</p>`),
 S('ไล่โค้ดให้เป็นก่อนท่องไวยากรณ์',`<pre><code>const double = n => n*2;
const add = (a,b) => a+b;
const answer = add(double(3),4); // add(6,4) → 10</code></pre><ol><li>หาว่าบรรทัดไหนนิยาม และบรรทัดไหนเรียกใช้</li><li>จับคู่ argument กับ parameter ตามลำดับ</li><li>คำนวณใน body และดูจุดที่ return</li><li>แทนค่าที่ได้กลับตรงตำแหน่งเรียก แล้วคำนวณต่อ</li></ol><p>ถ้าได้ undefined โดยไม่คาดคิด ให้ตรวจว่าลืม return หรือใช้ arrow body แบบ block แต่คิดว่าจะคืนอัตโนมัติหรือไม่</p>`)
 ],tips:[['ชื่อกับค่าจริง','Parameter อยู่ตอนประกาศ; Argument อยู่ตอนเรียก'],['return คือส่งของกลับ','console.log คือเปิดดูของ ไม่ใช่ส่งผลลัพธ์ให้ผู้เรียก'],['ปีกกามีหน้าที่','Arrow มี {} → เขียน return; expression เดียวไม่มี {} → คืนเอง'],['คืน object','ใช้ n => ({ value:n }) เพื่อแยก object จาก function block'],['ไล่จากในออกนอก','ฟังก์ชันซ้อนกันให้แทนค่าการเรียกด้านในก่อน']],
 quiz:[
 ['เหตุผลหลักของการสร้างฟังก์ชันคืออะไร','รวมตรรกะเป็นชุดที่เรียกใช้ซ้ำได้','ทำให้ทุกตัวแปรเป็น global','เปลี่ยน HTML เป็น CSS','บังคับให้โปรแกรมไม่มี input','ฟังก์ชันช่วยแยกหน้าที่ ใช้ซ้ำ และคำนวณค่าจาก input','งานหนึ่ง ตั้งชื่อหนึ่ง'],
 ['ใน function sum(a,b) ค่า a,b เรียกว่าอะไร','Parameters','Arguments ที่ส่งจริง','Properties ของ DOM','HTTP headers','a,b เป็นตัวรับค่าที่ระบุในนิยามฟังก์ชัน','ประกาศ → parameter'],
 ['ใน sum(3,6) ค่า 3,6 เรียกว่าอะไร','Arguments','Parameters ใน declaration','Selectors','Modules','Arguments คือค่าที่ส่งตอนเรียกฟังก์ชัน','เรียก → argument'],
 ['ข้อใดเรียกฟังก์ชัน hello ให้ทำงาน','hello()','hello','const hello','return hello','วงเล็บหลังค่าฟังก์ชันทำให้เกิดการเรียกใช้','วงเล็บ = เรียก'],
 ['function sum(a,b){ return a+b; } sum(3,6) ได้อะไร','9','36','undefined','3','จับคู่ a=3 b=6 แล้วคืนผลบวก 9','แทนค่าแล้ว return'],
 ['ฟังก์ชันที่จบโดยไม่ return ค่าให้ผลใด','undefined','null เสมอ','0 เสมอ','false เสมอ','ค่าคืนโดยปริยายคือ undefined','ไม่มีของส่งกลับ → undefined'],
 ['return มีผลอย่างไรต่อคำสั่งถัดไปใน function เดียวกัน','หยุดการทำงานของการเรียกนั้นและส่งค่ากลับ','ทำให้รันทุกบรรทัดต่อเสมอ','เริ่ม function ใหม่','เปลี่ยน argument เป็น global','หลัง return ปกติคำสั่งถัดไปในเส้นทางนั้นไม่ทำงาน','return คือทางออก'],
 ['function f(){ console.log(7); } const x=f(); x เป็นอะไร','undefined','7','"7"','console','console.log แสดง 7 แต่ f ไม่ได้ return ค่าจึงคืน undefined','พิมพ์ ≠ คืน'],
 ['ข้อใดเป็น Function Expression','const f = function(){ return 1; };','function f(){ return 1; }','f();','return 1;','ฟังก์ชันถูกสร้างเป็นส่วนของนิพจน์ฝั่งขวาแล้วผูกกับ f','Expression เป็นค่า'],
 ['ข้อใดเป็น Function Declaration','function add(a,b){ return a+b; }','const add = (a,b) => a+b;','add(1,2);','const x = 3;','รูป function ชื่อ(...) {...} เป็น declaration','ประกาศมี function และชื่อ'],
 ['Arrow Function ใช้สัญลักษณ์ใด','=>','->','==>','<=','=> แยก parameters ออกจาก body','ลูกศรอ้วน =>'],
 ['const double = n => n*2; double(4) ได้อะไร','8','undefined','2','"44"','expression body คืน n*2 อัตโนมัติ','expression เดียวคืนเอง'],
 ['const double = n => { n*2; }; double(4) ได้อะไร','undefined','8','4','TypeError','block body ไม่มี return จึงคืน undefined','มีปีกกา ต้อง return'],
 ['Arrow function ไม่มี parameter ควรเขียนแบบใด','() => "Hello"','=> "Hello"','n => ()','function => "Hello"','กรณีไม่มี parameter ต้องใช้วงเล็บว่าง','ศูนย์คนรับ ใช้ ()'],
 ['กรณีใดตัดวงเล็บ parameter ของ arrow ได้','มี parameter เดียวแบบชื่อธรรมดา','ไม่มี parameter','มีสอง parameters','ทุกกรณีรวม destructuring','n=>n*2 ตัดได้ แต่ () และ (a,b) ยังจำเป็น','หนึ่งชื่อ ตัดได้'],
 ['Arrow ใดคืน object {value:3} ได้','() => ({value:3})','() => {value:3}','() => [value:3]','() => return {value:3}','วงเล็บช่วยให้ปีกกาถูกอ่านเป็น object literal แทน block','object คืนใน ()'],
 ['const f=n=>n+1; const g=n=>n*2; g(f(3)) ได้อะไร','8','7','6','4','f(3)=4 แล้ว g(4)=8','ในก่อน นอกทีหลัง'],
 ['ถ้า f(name) ถูกเรียกเป็น f() และไม่มี default name จะเป็นอะไร','undefined','null อัตโนมัติ','"name"','0','argument ที่ไม่ได้ส่งทำให้ parameter ไม่มีค่าที่กำหนดจึงเป็น undefined','ไม่ได้ส่ง → undefined'],
 ['ข้อใดถูกเกี่ยวกับ anonymous function expression ที่ผูกกับ const dog','เอนจินอาจอนุมาน name เป็น dog ได้','ไม่มี name property ในทุกกรณี','เรียกใช้ไม่ได้','ต้องมี parameter อย่างน้อยหนึ่งตัว','การไม่มีชื่อใน syntax ไม่ได้แปลว่า name property ไม่มีค่าเสมอ','ชื่ออาจถูกอนุมาน'],
 ['Arrow function ต่างจาก function ปกติเรื่อง this อย่างไร','ไม่มี this ของตัวเองและใช้จากขอบเขตที่สร้าง','สร้าง this ใหม่ทุกครั้งเสมอ','this เป็นชื่อ parameter บังคับ','ใช้เป็น callback ไม่ได้','lexical this เป็นคุณสมบัติสำคัญของ arrow จึงต้องเลือกให้เหมาะกับบริบท','Arrow ยืม this รอบข้าง']
 ]});
