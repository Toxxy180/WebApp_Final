addChapter({title:'Arrays',subtitle:'เก็บรายการข้อมูล วนซ้ำ แปลง กรอง ค้นหา และรวมผล',group:'ภาษา JavaScript',minutes:35,sources:[['JavaScript - Array.pdf','1–8']],
 goals:['เข้าถึงสมาชิกและเลือกวิธีเพิ่ม/ลบให้ถูกด้าน','แยก map, forEach, filter, find และ reduce','อ่านผลกระทบต่อ array เดิมและใช้ destructuring'],
 sections:[
 S('พื้นฐาน Index และ length',`<p>Array เป็น object สำหรับรายการที่มีลำดับ เข้าถึงด้วย index เริ่มที่ 0 และมี length บอกความยาว ใช้รวมหลายค่าและอาจเก็บคนละชนิดได้ แต่ในงานจริงรายการที่มีรูปแบบสม่ำเสมอจะประมวลผลง่ายกว่า</p><pre><code>const cars = ['Toyota','Honda','BMW'];
cars[0];              // 'Toyota'
cars.length;          // 3
cars[cars.length-1];  // 'BMW'
cars[3];              // undefined (เลยรายการที่มีอยู่)
typeof cars;          // 'object'
Array.isArray(cars);  // true</code></pre><p>length ไม่ใช่ index ของสมาชิกท้ายสุด และไม่ใช่เมธอดจึงไม่ใส่ () ใช้ Array.isArray เพื่อตรวจ array เพราะ typeof ไม่แยก array ออกจาก object ทั่วไป</p>`),
 S('เพิ่มและลบ: หัวกับท้าย',`<table><tr><th>เมธอด</th><th>ผลต่อ array เดิม</th><th>ค่าที่คืน</th></tr><tr><td>push(x)</td><td>เพิ่มท้าย</td><td>length ใหม่</td></tr><tr><td>pop()</td><td>ลบท้าย</td><td>สมาชิกที่ลบ</td></tr><tr><td>unshift(x)</td><td>เพิ่มหัว</td><td>length ใหม่</td></tr><tr><td>shift()</td><td>ลบหัว</td><td>สมาชิกที่ลบ</td></tr></table><pre><code>const list = ['A','B'];
const length = list.push('C'); // list=['A','B','C'], length=3
const last = list.pop();       // last='C', list=['A','B']
const first = list.shift();    // first='A', list=['B']
list.unshift('Z');             // list=['Z','B']</code></pre><p>const ที่ผูก array ยังเรียกเมธอดที่แก้สมาชิกได้ เพราะไม่ได้เปลี่ยน binding ถ้าต้องการข้อมูลชุดใหม่ให้เลือกวิธีที่คืน array ใหม่</p>`),
 S('วนซ้ำและ Destructuring',`<pre><code>const cars = ['Toyota','Honda','BMW'];
for (let i=0; i<cars.length; i++) {
  console.log(i, cars[i]);
}
cars.forEach((car,index,array) => {
  console.log(car,index,array.length);
});
const [first,second] = cars; // Toyota, Honda</code></pre><p>callback ของ forEach/map/filter รับค่าปัจจุบัน, index และ array ตามลำดับ forEach เหมาะกับทำงานแต่ละรายการและไม่ได้เก็บค่าคืนของ callback เป็น array ใหม่ การเขียน i &lt;= length จะทำให้เข้าเลยท้ายหนึ่งตำแหน่ง</p>`),
 S('รวม แยก ตรวจ และคัดช่วง',`<table><tr><th>เมธอด</th><th>ความหมาย</th></tr><tr><td>concat(other)</td><td>รวมและคืน array ใหม่</td></tr><tr><td>join(separator)</td><td>คืน string โดยใส่ตัวคั่น</td></tr><tr><td>includes(value, fromIndex)</td><td>ตรวจว่ามีค่านั้นหรือไม่</td></tr><tr><td>slice(start,end)</td><td>คัดช่วงเป็น array ใหม่ รวม start แต่ไม่รวม end</td></tr></table><pre><code>const a = ['A','B','C','D'];
a.slice(1,3);      // ['B','C']
a.includes('B');   // true
a.includes('B',2); // false: เริ่มค้นจาก index 2
a.concat(['E']);   // ['A','B','C','D','E']
a.join('-');       // 'A-B-C-D'
// a ยังเป็น ['A','B','C','D']</code></pre>`),
 S('map กับ filter และ find',`<p><strong>map</strong> แปลงสมาชิกแต่ละตัวและคืน array ใหม่ขนาดเท่าเดิมสำหรับ array ปกติที่ไม่มีช่องว่าง <strong>filter</strong> เก็บเฉพาะสมาชิกที่ผ่านเงื่อนไขและคืน array ใหม่ <strong>find</strong> คืนสมาชิกแรกที่ผ่านเงื่อนไข ถ้าไม่พบจะได้ undefined</p><pre><code>const students = [
  {name:'Adam', score:54},
  {name:'Freda',score:65},
  {name:'Molly',score:32}
];
students.map(s => s.name); // ['Adam','Freda','Molly']
students.filter(s => s.score >= 50); // Adam และ Freda
students.find(s => s.score >= 50);   // object ของ Adam
students.filter(s => s.name.toLowerCase().includes('m'));
// Adam และ Molly โดยไม่แยกตัวพิมพ์</code></pre><p>การคืน array ใหม่ไม่ได้แปลว่าทำ deep copy ของ object ภายใน หาก callback ไปแก้ property ของสมาชิก ข้อมูลต้นฉบับก็อาจเปลี่ยนตามได้</p>`),
 S('reduce: รวมหลายค่าเป็นผลลัพธ์เดียว',`<pre><code>const numbers = [2,4,8,16];
const total = numbers.reduce((acc,n) => acc+n, 0); // 30
// acc: 0→2→6→14→30

const stats = numbers.reduce((acc,n,idx,arr) => ({
  sum: acc.sum+n,
  avg: acc.avg+n/arr.length,
  min: Math.min(acc.min,n),
  max: Math.max(acc.max,n)
}), {sum:0,avg:0,min:Infinity,max:-Infinity});</code></pre><p>accumulator เก็บผลสะสม ค่าที่ callback คืนจะเป็น accumulator ของรอบถัดไป ควรใส่ initialValue ให้ชัดเจน โดยเฉพาะเมื่อ array อาจว่าง การใช้ค่าเริ่ม min=0 จะให้คำตอบผิดกับชุดเลขบวกล้วน จึงใช้ Infinity หรือจัดการจากสมาชิกแรกอย่างเหมาะสม สำหรับ array ว่างควรกำหนดนโยบายก่อนใช้ min/max ต่อ</p>`),
 S('โจทย์เชื่อมข้อมูลกับหน้าจอ',`<pre><code>const prices = [10000,12000,5000,25000,30000];
const html = prices
  .map(n => '&lt;li&gt;' + n.toLocaleString('en-US') + '&lt;/li&gt;')
  .join('');
// '&lt;li&gt;10,000&lt;/li&gt;&lt;li&gt;12,000&lt;/li&gt;...'</code></pre><p>ลำดับคิดคือข้อมูล → แปลงแต่ละรายการ → รวม string ไม่ต้องแก้ array เดิม ตัวอย่างนี้เป็นตัวเลขที่เรากำหนดเอง หากมีข้อความจากผู้ใช้ ให้สร้าง DOM และใส่ผ่าน textContent แทนการต่อเข้า innerHTML โดยตรง</p>`)
 ],tips:[['หัวท้าย','push/pop = ท้าย · unshift/shift = หัว'],['เลือกเมธอดจากผลที่อยากได้','แปลง → map · คัดหลาย → filter · หาแรก → find · รวม → reduce'],['map กับ forEach','ต้องการ array ผลลัพธ์ใช้ map; ทำงานทีละตัวใช้ forEach'],['slice','เริ่มนับรวม จุดจบไม่รวม'],['reduce','ผลรอบนี้จะกลายเป็น acc รอบหน้า']],
 quiz:[
 ['สมาชิกแรกของ array ใช้ index ใด','0','1','-1 เสมอ','length','JavaScript array เริ่ม index ที่ 0','เริ่มศูนย์'],
 ['const a=[10,20,30]; a[a.length-1] ได้อะไร','30','20','undefined','3','length=3 index ท้ายจึงเป็น 2','ท้าย = length-1'],
 ['ตรวจว่า value เป็น array ควรใช้','Array.isArray(value)','typeof value === "array"','value.isArray() เสมอ','value.length()','typeof array เป็น object จึงใช้ Array.isArray ให้เฉพาะเจาะจง','ตรวจ array ใช้ Array'],
 ['push เพิ่มที่ใดและคืนอะไร','เพิ่มท้าย คืนความยาวใหม่','เพิ่มหัว คืนสมาชิกแรก','เพิ่มท้าย คืน array ใหม่เสมอ','ลบท้าย คืนสมาชิกที่ลบ','push เปลี่ยน array เดิมและคืน length ใหม่','push ดันท้าย'],
 ['const a=[1,2]; const x=a.pop(); x เป็นอะไร','2','1','[1]','0','pop เอาสมาชิกท้ายออกและคืนสมาชิกนั้น','pop หยิบท้าย'],
 ['ต้องเพิ่มสมาชิกที่หัว array ใช้เมธอดใด','unshift','push','pop','slice','unshift เพิ่มหัว ส่วน shift ลบหัว','unshift ใส่หัว'],
 ['forEach เหมาะกับงานใด','ทำงานกับแต่ละสมาชิกโดยไม่ต้องรับ array จากค่าคืน callback','สร้าง array ใหม่จากค่าคืน callback เสมอ','คืนสมาชิกแรกที่ตรงเงื่อนไข','เรียง array อัตโนมัติ','forEach ไม่รวบรวม return ของ callback เป็นผล array','forEach ทำทีละตัว'],
 ['[1,2,3].map(n=>n*2) ได้อะไร','[2,4,6]','6','[1,2,3]','undefined','map ใช้ผลคืนของ callback เป็นสมาชิกใน array ใหม่','map = แปลงทุกตัว'],
 ['[1,2,3,4].filter(n=>n>2) ได้อะไร','[3,4]','3','true','[false,false,true,true]','filter เก็บสมาชิกเดิมที่เงื่อนไข truthy','filter คัดตัวผ่าน'],
 ['[1,2,3,4].find(n=>n>2) ได้อะไร','3','[3,4]','true','2','find คืนสมาชิกแรกที่ผ่านเงื่อนไข ไม่ใช่ array','find = ตัวแรก'],
 ['find ที่ไม่พบสมาชิกตรงเงื่อนไขคืนอะไร','undefined','[]','false เสมอ','null เสมอ','ไม่มีค่าที่พบจึงคืน undefined ส่วน filter จะคืน []','find ไม่เจอ undefined'],
 ['filter ที่ไม่มีสมาชิกผ่านเงื่อนไขคืนอะไร','[]','undefined','null','0','filter คืน array เสมอ แม้ไม่มีสมาชิก','filter ยังเป็น array'],
 ['[1,2,3].reduce((a,n)=>a+n,0) ได้อะไร','6','[1,2,3]','3','0','สะสม 0+1+2+3=6','acc รับผลต่อเนื่อง'],
 ['ค่าที่ callback ของ reduce คืน ใช้ทำอะไรต่อ','เป็น accumulator ของรอบถัดไป','เป็น index ของรอบถัดไปเสมอ','แทน array ต้นฉบับทุกครั้ง','เป็นชื่อเมธอด','ผลรวมสะสมถูกส่งต่อผ่าน accumulator','คืนรอบนี้ รับรอบหน้า'],
 ['["A","B","C","D"].slice(1,3) ได้อะไร','["B","C"]','["B","C","D"]','["A","B","C"]','["A","D"]','slice รวม start และไม่รวม end','[start,end)'],
 ['["A","B"].concat(["C"]) มีผลต่อ array ต้นฉบับอย่างไร','ไม่เปลี่ยนต้นฉบับและคืน array ใหม่','เพิ่ม C ในต้นฉบับโดยตรง','ลบ A','เปลี่ยนเป็น string','concat คืนชุดรวมใหม่','concat รวมใหม่'],
 ['["A","B"].join("-") คืนชนิดใด','String','Array','Object ของ DOM','Boolean','join รวมสมาชิกเป็นข้อความ','join → string'],
 ['const [a,b]=[10,20,30]; b เป็นอะไร','20','10','30','[20,30]','destructuring จับคู่ตามตำแหน่ง','array ดูตำแหน่ง'],
 ['ถ้าใช้ map แล้วไปแก้ property ของ object สมาชิกเดิม จะรับประกันต้นฉบับไม่เปลี่ยนหรือไม่','ไม่ เพราะ object ภายในอาจยังแชร์ reference','รับประกันเพราะ map deep clone เสมอ','รับประกันเพราะ const','ไม่เพราะ map คืน string','array ใหม่ไม่ได้หมายถึง object ทุกชั้นถูกคัดลอก','ใหม่ชั้นนอก ไม่เท่ากับ deep copy'],
 ['คำนวณ min ของ [2,4,8] ด้วย reduce เริ่ม min=0 มีปัญหาอะไร','ได้ 0 ทั้งที่ไม่มี 0 ในข้อมูล','ได้ 8 เสมอ','ทำให้ array ว่าง','syntax error เสมอ','เมื่อเทียบกับ 0 เลขบวกทุกตัวไม่ต่ำกว่า จึงคง 0 ที่ผิดจากข้อมูล','ค่าเริ่มต้องเหมาะกับงาน']
 ]});

addChapter({title:'Objects และ JSON',subtitle:'จำลองข้อมูลด้วย properties, methods และส่งต่อข้อมูลด้วย JSON',group:'ภาษา JavaScript',minutes:35,sources:[['JavaScript - Object.pdf','1–8']],
 goals:['เข้าถึง แก้ และวน properties ของ object','ใช้ this, destructuring, spread และ rest','แยก object ในโปรแกรมออกจาก JSON ที่ใช้แลกเปลี่ยนข้อมูล'],
 sections:[
 S('Object คือชุด Key–Value',`<p>Object รวมข้อมูลที่สัมพันธ์กันเป็น properties แต่ละ property มี key และ value ต่างจาก array ที่เข้าถึงด้วยลำดับ index เหมาะกับจำลองบุคคล รถ หรือข้อมูลนักศึกษา</p><pre><code>const student = {
  id: 'CE001', name: 'Mali', score: 85,
  passed: true,
  introduce: function() { return 'I am ' + this.name; }
};
student.name;       // 'Mali'
student['score'];   // 85
student.score = 90;
student.major = 'Computer Engineering';
student.missing;    // undefined</code></pre><p>value เป็นฟังก์ชันได้ จึงเรียกว่า method การเพิ่ม property ใหม่ทำได้ขณะทำงาน ไม่ต้องประกาศโครงสร้างตายตัวล่วงหน้า</p>`),
 S('Dot, Bracket และ this',`<pre><code>const key = 'score';
student[key];             // อ่าน property ชื่อ score
// student.key อ่าน property ชื่อ key ซึ่งเป็นคนละอย่าง
student.introduce();      // 'I am Mali'
student['introduce']();   // เรียก method ผ่าน bracket ก็ได้</code></pre><p>Dot ใช้ชื่อ property ที่เขียนตรงในโค้ด ส่วน bracket ประเมินนิพจน์ก่อน จึงใช้กับ key ที่อยู่ในตัวแปรหรือชื่อที่ไม่ใช่ identifier ได้ เช่น obj['first-name']</p><p>สำหรับ method แบบ function ปกติที่เรียกเป็น <code>obj.method()</code>, this โดยทั่วไปอ้างถึง obj การแยก method ไปเรียกเดี่ยวทำให้บริบทเปลี่ยน และ arrow function ไม่สร้าง this ของตัวเอง จึงต้องเลือกให้เหมาะ</p>`),
 S('วน properties และอ่าน keys/values',`<pre><code>const coach = {firstName:'Bryan',lastName:'Wilson',age:34};
for (const key in coach) {
  console.log(key, coach[key]);
}
Object.keys(coach);   // ['firstName','lastName','age']
Object.values(coach); // ['Bryan','Wilson',34]</code></pre><p>for...in วน enumerable string properties รวมที่สืบทอดมาด้วย ส่วน Object.keys/values คืน array ของ own enumerable string properties จึงมักเหมาะเมื่อต้องการเฉพาะข้อมูลบน object นั้น</p><p class="note">หัวข้อในสไลด์ใช้ Object.key()/Object.value() แต่ชื่อ API ที่ถูกต้องเป็น <strong>Object.keys()</strong> และ <strong>Object.values()</strong> โดยมี s</p>`),
 S('Destructuring และ object ซ้อน',`<pre><code>const coach = {
  firstName:'Bryan', lastName:'Wilson',
  location:{city:'BKK',country:'Thailand'}
};
const {firstName,lastName} = coach;
const {firstName: givenName} = coach; // เปลี่ยนชื่อ binding
const {location:{country}} = coach;

function greet({firstName,lastName}) {
  return 'Hello ' + firstName + ' ' + lastName;
}</code></pre><p>Object destructuring จับคู่ตามชื่อ key ไม่ใช่ลำดับ ช่วยดึงข้อมูลที่ต้องใช้และย่อการรับ parameter ส่วน nested destructuring ต้องแน่ใจว่า object ชั้นกลางมีอยู่ มิฉะนั้นอาจเกิดข้อผิดพลาด</p>`),
 S('Spread กับ Rest: จุดสามจุดคนละบริบท',`<pre><code>// Spread: กระจายออก
const a = {x:1,y:2};
const b = {y:3,z:4};
const merged = {...a,...b}; // {x:1,y:3,z:4} หลังทับก่อน
const copy = {...a};       // shallow copy
const nums = [3,4,5];
function sum(a,b,c) { return a+b+c; }
sum(...nums);             // 12

// Rest: รวมส่วนที่เหลือเข้า
function count(...args) { return args.length; }
count(3,4,5);             // 3
const {x,...remaining} = a; // remaining={y:2}</code></pre><p>Spread ขยายข้อมูล ส่วน rest รวบข้อมูลที่เหลือ ทั้งสองใช้ ... เหมือนกันแต่ดูจากตำแหน่ง การ spread object เป็น shallow copy ถ้ามี object ซ้อน การอ้างอิงชั้นในยังแชร์กัน</p>`),
 S('Object กับ JSON',`<table><tr><th>ประเด็น</th><th>JavaScript Object</th><th>JSON</th></tr><tr><td>รูปแบบ</td><td>ค่าในหน่วยความจำของโปรแกรม</td><td>ข้อความรูปแบบแลกเปลี่ยนข้อมูล</td></tr><tr><td>Key</td><td>ใช้ชื่อไม่ใส่ quote ได้ตามไวยากรณ์</td><td>ต้องเป็น string ใน double quotes</td></tr><tr><td>Function</td><td>เก็บเป็น method ได้</td><td>ไม่มีชนิด function</td></tr><tr><td>การใช้งาน</td><td>ประมวลผลใน JavaScript</td><td>หลายภาษาอ่าน/เขียนได้</td></tr></table><pre><code>const user = {name:'Mali',score:85,hello(){ return 'Hi'; }};
const text = JSON.stringify(user); // '{"name":"Mali","score":85}'
const data = JSON.parse(text);     // object ใหม่
typeof text; // 'string'
typeof data; // 'object'</code></pre><p>stringify แปลงข้อมูลเป็น JSON text โดย function-valued object properties จะไม่ถูกเขียนออกมา parse อ่าน JSON text กลับเป็นค่าของ JavaScript ไม่ได้สร้าง methods ที่หายไปกลับคืน JSON ที่ไม่ถูกต้องทำให้ parse throw error จึงควรใช้ try/catch เมื่อข้อมูลภายนอกไม่แน่นอน</p>`),
 S('แบบฝึกหัดลบ property โดยคืน object ใหม่',`<p>สไลด์ให้สร้าง delKey(obj,propertyName) แต่เฉลยลบ age แบบระบุชื่อคงที่ ตัวอย่างต่อไปนี้ใช้ชื่อที่รับเข้าจริง โดยใช้ computed property ร่วมกับ rest</p><pre><code>function delKey(obj, propertyName) {
  const { [propertyName]: removed, ...remaining } = obj;
  return remaining;
}
const person = {firstName:'Julia',lastName:'Wilson',age:34};
const result = delKey(person,'age');
// result={firstName:'Julia',lastName:'Wilson'}
// person ยังมี age อยู่</code></pre><p>จำลองข้อมูลให้ตรงงาน: student object รวม id/name/score, array รวม student หลายคน, JSON ใช้ส่งชุดข้อมูลนั้นผ่านเครือข่าย ส่วน validation และการออกแบบฐานข้อมูลยังไม่ได้ลงลึกในสไลด์นี้</p>`)
 ],tips:[['Array vs Object','Array ดูตำแหน่ง; Object ดูชื่อ key'],['Dot vs Bracket','ชื่อคงที่ใช้ dot; ชื่ออยู่ในตัวแปรใช้ bracket'],['จุดสามจุด','Spread กระจายออก; Rest รวบเข้า'],['สำเนาตื้น','{...obj} ใหม่ชั้นนอก แต่ชั้นในอาจยังเป็นของเดิม'],['JSON ไปกลับ','stringify → string; parse → ค่า JavaScript']],
 quiz:[
 ['Object เหมาะกับข้อมูลแบบใด','คุณสมบัติที่สัมพันธ์กัน เช่น name และ score','ตัวอักษรหนึ่งตัวเท่านั้น','เลขเรียงลำดับเท่านั้น','CSS selector เท่านั้น','object รวมคุณสมบัติด้วย key-value','object = ข้อมูลมีชื่อ'],
 ['const p={age:20}; p.age ได้อะไร','20','"age"','undefined','[20]','dot อ่าน property ตามชื่อที่ระบุ','p.age = age ของ p'],
 ['const key="age"; ต้องอ่าน property ตามค่า key ใช้ข้อใด','p[key]','p.key','p["key"]','p(key)','bracket ประเมินตัวแปร key ก่อนจึงอ่าน age','key แปรผันใช้ []'],
 ['การอ่าน property ที่ไม่มีอยู่ใน object ทั่วไปได้อะไร','undefined','0','null เสมอ','[]','เมื่อไม่พบ property ใน prototype chain จะได้ undefined','ไม่พบค่า → undefined'],
 ['Property ที่มี value เป็นฟังก์ชันมักเรียกว่าอะไร','Method','Selector','Header','Index เสมอ','method คือฟังก์ชันที่เป็นสมาชิกของ object','พฤติกรรมของ object'],
 ['ใน obj.say() ถ้า say เป็น function ปกติ this โดยทั่วไปหมายถึงอะไร','obj','window เสมอ','say เสมอ','null เสมอ','การเรียกแบบ object.method ผูก this กับ object ที่ใช้เรียก','ดูผู้เรียกหน้า dot'],
 ['for...in วนสิ่งใด','Enumerable string properties รวมที่สืบทอดมา','ค่า array เท่านั้น','เฉพาะ methods เสมอ','จำนวนรอบตาม length เสมอ','for...in วนชื่อ property และอาจรวมจาก prototype','in ดู keys'],
 ['Object.keys({a:1,b:2}) ได้อะไร','["a","b"]','[1,2]','"a,b"','{a:1,b:2}','keys คืน array ของชื่อ own enumerable string properties','keys = ชื่อ'],
 ['Object.values({a:1,b:2}) ได้อะไร','[1,2]','["a","b"]','2','undefined','values คืน array ของค่าจาก properties นั้น','values = ค่า'],
 ['ชื่อ API ใดถูกต้อง','Object.keys(obj)','Object.key(obj)','obj.keys เสมอ','Object.keyOf(obj)','ชื่อ keys และ values เป็นพหูพจน์','keys มี s'],
 ['const {name}= {score:10,name:"Mali"}; name เป็นอะไร','"Mali"','10','undefined','"name"','object destructuring จับคู่ชื่อ key ไม่ใช่ตำแหน่ง','ชื่อ key ต้องตรง'],
 ['const {name:studentName}={name:"Mali"}; binding ที่สร้างคือข้อใด','studentName','name เท่านั้น','name และ studentName เสมอ','ไม่มี binding','ด้านขวาของ : ใน destructuring คือชื่อ binding ใหม่','key: ชื่อใหม่'],
 ['{...{x:1,y:2},...{y:3}} ให้ค่า y เท่าใด','3','2','[2,3]','undefined','property ชื่อซ้ำที่ spread ภายหลังทับค่าก่อนหน้า','หลังทับก่อน'],
 ['const a={nested:{x:1}}; const b={...a}; b.nested.x=9; a.nested.x เป็นเท่าใด','9','1','undefined','0','spread คัดลอกตื้นจึงแชร์ object nested','ชั้นในยังร่วมกัน'],
 ['ใน function f(...args) args เป็นอะไร','Array ของ arguments ที่ถูกรวบรวม','String ของชื่อ function','Object ของ DOM','Number เสมอ','rest parameter รวบ arguments ที่เหลือเป็น array','Rest รวบเข้า'],
 ['JSON.stringify({x:1}) คืนชนิดใด','String','Object','Array','Function','stringify สร้างข้อความ JSON','stringify → string'],
 ['JSON.parse("{\"x\":1}") ได้อะไร','Object ที่มี x เป็น 1','String เดิม','Function','SyntaxError เสมอ','ข้อความนี้เป็น JSON ถูกต้องจึง parse เป็น object','parse กลับเป็นข้อมูล'],
 ['ข้อใดเป็น JSON ที่ถูกต้อง','{"name":"Mali"}','{name:"Mali"}','{\'name\':\'Mali\'}','{"run":function(){}}','JSON ใช้ double quotes สำหรับ key/string และไม่มี function','JSON เข้มเรื่อง quote'],
 ['stringify object ที่มี method แล้ว parse กลับ method จะเป็นอย่างไร','method ที่ถูกละออกไม่กลับคืนมา','กลับมาเป็นฟังก์ชันเดิมเสมอ','กลายเป็น arrow อัตโนมัติ','กลายเป็น CSS','JSON ไม่มี function จึงไม่เหมาะกับเก็บพฤติกรรมของ object','JSON เก็บข้อมูล ไม่เก็บ method'],
 ['delKey(obj,key) ที่ต้องคืน object ใหม่และลบ key แบบแปรผันควรใช้แนวใด','const {[key]:removed,...rest}=obj; return rest;','const {age,...rest}=obj; return rest; สำหรับทุก key','return obj.key;','obj = key; return obj;','computed key อ่านชื่อจากตัวแปรและ rest เก็บ properties ที่เหลือ','[key] คือชื่อจากตัวแปร']
 ]});
