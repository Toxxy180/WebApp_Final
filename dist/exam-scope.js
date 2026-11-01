/* Scope names transcribed from the image in Scope_2026A.pdf, page 1.
   The source repeats numeric labels, so this map uses unique topic keys. */
Course.revision='scope-2026a-2';
Course.reviewed='1 พฤศจิกายน 2026';
Course.sources.push(['Scope_2026A.pdf',1]);
Course.scope=[
 ['core-html','Core Web','HTML, CSS, JS, & How they work together',[1,2,3],'มีพื้นฐานเดิม','เสริม semantic HTML, forms และการทำงานร่วมกัน'],
 ['core-http','Core Web','HTTP/HTTPS and related protocols',[1,15],'มีพื้นฐานเดิม','เสริม methods, DNS/TLS และ origin/CORS'],
 ['core-runtime','Core Web','JavaScript Engine and Runtime Environment',[11],'ยังไม่มีบทตรง','เพิ่ม engine/runtime และ browser/Node APIs'],
 ['core-node','Core Web','Server-Side JavaScript: Node.js & npm',[9,11,20],'มีเพียง modules','เพิ่ม runtime, npm scripts, package/lockfile'],
 ['css-basic','CSS','Basic Styling',[3],'มีบทเดิม','คงคำอธิบาย cascade ที่แก้ความแม่นยำแล้ว'],
 ['css-box','CSS','CSS Box Model',[12],'ยังไม่มีบทตรง','เพิ่มสูตร content-box/border-box'],
 ['css-layout','CSS','Grid & Flex',[12],'ยังไม่มีบทตรง','เพิ่ม axes, grow/basis, tracks/fr/gap'],
 ['js-basic','JavaScript','Comments, Variables, Data types, Operator, & Functions',[4,5],'มีพื้นฐานเดิม','เติม comments และโจทย์เลือกหลายคำตอบ'],
 ['js-data','JavaScript','Array and Object',[6,7],'มีบทเดิม','เพิ่มโจทย์ reference/mutation และ shallow copy'],
 ['js-array','JavaScript','Array Methods (map, forEach)',[6,10,16],'มีบทเดิม','ย้ำ return value และการแสดง lists'],
 ['js-dom','JavaScript','DOM Manipulation & Event Handling',[8],'มีบทเดิม','เสริมโจทย์ target/default/propagation'],
 ['js-json','JavaScript','JSON (stringify & parse)',[7,13,15],'มีพื้นฐานเดิม','เสริมข้อจำกัด JSON และ response.json'],
 ['js-date','JavaScript','Data Format & Data Format for Date Time',[13],'ยังไม่มีบทตรง','เพิ่ม ISO, timestamp, UTC/offset และ Intl'],
 ['js-modern','JavaScript','Modern JavaScript (ES6+)',[5,7,9,10],'กระจายในบทเดิม','เพิ่ม optional chaining/nullish และเชื่อมบทเดิม'],
 ['js-error','JavaScript','Error & Error Handling',[14,15],'มี try/catch สั้น ๆ','เพิ่มชนิด error, finally และ async catch'],
 ['js-async','JavaScript','Asynchronous JavaScript',[10,11,15],'มีบทนำ','เพิ่ม queue order, chain, all/allSettled'],
 ['js-fetch','JavaScript','Fetch API',[10,15],'มี GET เบื้องต้น','เพิ่ม POST, CORS, abort และ empty body'],
 ['lib-semver','Libraries & Frameworks','Semantic Versioning',[11],'ยังไม่มีบทตรง','เพิ่ม MAJOR/MINOR/PATCH, ^/~ และ 0.x'],
 ['lib-modules','Libraries & Frameworks','JavaScript Modules',[9],'มีบทเดิม','คง CJS/ESM พร้อมแยก runtime context'],
 ['lib-react','Libraries & Frameworks','React.js',[16],'มีเพียงพื้นฐานก่อน React','เพิ่ม JSX, props/state, Hooks, list/key'],
 ['lib-next','Libraries & Frameworks','Next.js',[17],'ยังไม่มีบทตรง','เพิ่ม App Router และ server/client; รอ router/version อาจารย์'],
 ['lib-express','Libraries & Frameworks','Express.js',[18],'ยังไม่มีบทตรง','เพิ่ม routing/middleware; ระบุส่วนต่าง Express 4/5'],
 ['setup-git','Project Setup','Git & Github & Using .gitignore',[19],'ยังไม่มีบทตรง','เพิ่ม staging, commit, remote, PR และ tracked files'],
 ['setup-env','Project Setup','Environment Variable',[20,17],'ยังไม่มีบทตรง','เพิ่ม string parsing, .env loader และ secret/public']
];
Course.chapters.forEach(c=>{
 c.basis=c.id<=10?'PDF + คำอธิบายเสริม':'บทเสริมจากเอกสารทางการตาม Scope_2026A';
 c.reviewed=Course.reviewed;
});

Course.chapters[0].sections.push(S('HTTP methods และโปรโตคอลที่เกี่ยวข้อง (เสริมตาม Scope)',`<p>DNS แปลงชื่อเป็นข้อมูลที่อยู่; TCP เป็นการขนส่งที่ใช้กับ HTTP/1.1/2 โดยทั่วไป; TLS ปกป้องการสื่อสาร HTTPS; HTTP/3 ใช้ QUIC บน UDP คำเหล่านี้อยู่คนละบทบาท</p><table><tr><th>Method</th><th>เจตนาหลัก</th></tr><tr><td>GET / HEAD</td><td>อ่าน representation / อ่าน metadata โดยไม่มี response body สำหรับ HEAD</td></tr><tr><td>POST</td><td>ส่งข้อมูลเพื่อประมวลผลตาม semantics ของ resource เช่นสร้างรายการ</td></tr><tr><td>PUT</td><td>สร้างหรือแทน representation ณ URI ที่ระบุ</td></tr><tr><td>PATCH</td><td>ปรับบางส่วนตาม patch operation</td></tr><tr><td>DELETE</td><td>ขอเอาความสัมพันธ์ของ resource ที่ URI ออก</td></tr></table><p>Idempotent หมายถึงส่งคำขอเหมือนเดิมซ้ำแล้วผลที่ตั้งใจต่อสถานะ server เท่ากับทำครั้งเดียว ไม่ได้แปลว่า response status ต้องเหมือนทุกครั้ง GET/HEAD/PUT/DELETE มี semantics แบบ idempotent; POST/PATCH ไม่รับประกันโดยตัว method ส่วน safe methods เช่น GET มีเจตนาให้อ่าน ไม่ใช้เปลี่ยนข้อมูลธุรกิจ แม้ server อาจ log ได้</p>`));
Course.chapters[0].refs=[['MDN · HTTP methods','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods']];
Course.chapters[1].sections.push(S('Semantic HTML, Forms และภาพรวมสามภาษา (เสริม)',`<p>ใช้ main สำหรับเนื้อหาหลัก, nav สำหรับการนำทาง, button สำหรับการกระทำ และ a href สำหรับการนำทางไป URL ความหมายของ element ช่วยทั้งผู้ใช้และเครื่องมือช่วยเข้าถึง ไม่ควรแทนปุ่มทุกอย่างด้วย div ที่คลิกได้</p><pre><code>&lt;form id="signup"&gt;
  &lt;label for="email"&gt;อีเมล&lt;/label&gt;
  &lt;input id="email" name="email" type="email" required&gt;
  &lt;button type="submit"&gt;ส่ง&lt;/button&gt;
&lt;/form&gt;</code></pre><p>label for ตรงกับ input id; name ใช้เป็นชื่อ field เมื่อส่งฟอร์ม; type/required ช่วย validation ฝั่ง browser แต่ server ยังต้องตรวจอีกครั้ง กำหนด type="button" ให้ปุ่มที่ไม่ต้องการ submit เมื่ออยู่ใน form</p><p>HTML กำหนดโครงสร้างฟอร์ม; CSS จัดช่องและปุ่ม; JavaScript ฟัง submit, อ่านค่าและส่ง fetch หากยกเลิกการส่งแบบเดิมใช้ preventDefault() สำหรับ script ภายนอกแบบ classic: defer รอ parse และรักษาลำดับเอกสาร; async ทำเมื่อโหลดพร้อมและไม่รับประกันลำดับระหว่างหลายไฟล์ ส่วน module scripts defer โดยปริยายเมื่อไม่มี async</p>`));
Course.chapters[1].refs=[['MDN · Forms','https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form']];
Course.chapters[3].refs=[['MDN · Comments and lexical grammar','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar']];
Course.chapters[4].refs=[['MDN · Default parameters','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters']];
Course.chapters[5].refs=[['MDN · Array.splice','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice'],['MDN · Array.forEach','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach']];
Course.chapters[3].sections.push(S('Comments และการอ่านค่าที่เหมือนกันแต่คนละชนิด (เสริม)',`<pre><code>// comment บรรทัดเดียว
/* comment หลายบรรทัด
   ไม่ใช่โค้ดที่ถูก execute */
const text = '5';
const number = 5;
text + number;       // '55'
Number(text) + number; // 10
typeof null;         // 'object' เป็นข้อยกเว้นเก่าของภาษา
Array.isArray([]);   // true</code></pre><p>Comments ใช้อธิบายเหตุผลโดยไม่เปลี่ยนผลการทำงาน แต่ JSON ไม่มี comments ตามไวยากรณ์มาตรฐาน อย่าใช้ typeof null ตัดสินว่า null เป็น object ที่เข้าถึง properties ได้ และ typeof array เป็น object จึงใช้ Array.isArray เพื่อแยก array</p>`));
Course.chapters[4].sections.push(S('Default parameters: ไม่ส่งค่ากับส่ง null (เสริม)',`<pre><code>function greet(name = 'Guest') { return 'Hello ' + name; }
greet();          // 'Hello Guest'
greet(undefined); // 'Hello Guest'
greet(null);      // 'Hello null'
greet('');        // 'Hello '</code></pre><p>ค่าเริ่มต้นใช้เมื่อ argument เป็น undefined หรือไม่ได้ส่งมา ไม่แทน null, 0 หรือข้อความว่างโดยอัตโนมัติ ถ้าโจทย์ถามผลของ function ต้องดูค่าจริงที่ส่ง ไม่ใช้เพียงการตีความว่า “เหมือนไม่มีค่า”</p>`));
Course.chapters[5].sections.push(S('Mutation และผลคืนของเมธอด (เสริม)',`<pre><code>const items = ['A','B','C'];
const copy = items.slice(1,3); // ['B','C']; items ยังเดิม
const removed = items.splice(1,1,'X');
// removed = ['B']; items = ['A','X','C']
const result = items.forEach(item =&gt; item.toLowerCase());
// result = undefined; ไม่รวบรวม return ของ callback</code></pre><p>splice(start,deleteCount,...newItems) แก้ array เดิมและคืน array ของสิ่งที่ลบ ส่วน slice คัดช่วงเป็น array ใหม่ map/forEach ไม่ได้ห้าม callback แก้ object ที่อ้างร่วมกัน จึงไม่ควรสรุปว่าใช้ map แล้วไม่มี side effect เสมอ ถ้าต้องการข้อมูลใหม่ให้เขียน callback ที่ไม่แก้ของเดิมด้วย</p>`));
Course.chapters[9].sections.push(S('Modern JavaScript ที่ต้องต่อให้ครบ (เสริม)',`<pre><code>const user = {profile:{name:''}};
user.profile?.name ?? 'Guest'; // '' ไม่ถูกแทน เพราะไม่ใช่ null/undefined
user.profile?.name || 'Guest'; // 'Guest' เพราะ '' เป็น falsy
const missing = {};
missing.profile?.name ?? 'Guest'; // 'Guest'

function greet(name = 'Guest') { return 'Hello ' + name; }
greet(undefined); // 'Hello Guest'
greet(null);      // 'Hello null'</code></pre><p>?. หยุดการเข้าถึงต่อเมื่อฐานตรงจุดนั้นเป็น null/undefined ไม่ได้ตรวจ schema ทั้งก้อน และไม่ช่วยกรณีตัวแปรไม่ประกาศ ?? ใช้ fallback เฉพาะ nullish; default parameter ใช้เมื่อ argument เป็น undefined หรือไม่ได้ส่ง</p><p>ES6+ เป็นคำรวมหลายรุ่น ไม่ใช่ทุก syntax เพิ่มใน ES2015 พร้อมกัน: let/const, arrow, template literal, destructuring, modules เป็นพื้นฐาน ส่วน async/await, optional chaining และ nullish coalescing เพิ่มภายหลัง อ่านแนวคิดก่อนท่องเลขปี</p>`));
// Replace the stale scope paragraph; MVC/Ajax remain explicitly optional context.
Course.chapters[9].sections.find(s=>s.title.startsWith('เชื่อมกับคำอธิบายวิชา')).body=`<p><strong>MVC</strong>: Model จัดข้อมูล/กฎ, View แสดงผล, Controller รับการกระทำและประสานงาน <strong>Ajax</strong> ขอข้อมูลแบบ asynchronous เพื่ออัปเดตบางส่วนของหน้าโดยไม่ reload ทั้งหน้า และใช้ JSON ได้</p><p class="note">ส่วนนี้เป็นบริบทเสริมจากคำอธิบายวิชาเดิม MVC และ Tailwind ไม่ได้ถูกระบุเป็นหัวข้อใน Scope_2026A ฉบับที่แนบครั้งนี้ จึงไม่เพิ่มเป็นบทบังคับ เนื้อหา React, Next.js, Express, Git และหัวข้อที่ Scope ระบุเพิ่มเติมอยู่ในบท 11-20 โดยอ้างอิงเอกสารทางการ แยกจากสไลด์อาจารย์</p>`;
Course.chapters[9].refs=[['MDN · Optional chaining','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining'],['MDN · Nullish coalescing','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing']];

// Four multi-select exercises per original chapter; 16 existing single-answer
// questions retain their option seeds. Revision-aware storage handles new items.
const multiReview=[
 [
 M('ข้อความใดถูกต้องเกี่ยวกับเว็บ',['HTML กำหนดโครงสร้าง','CSS จัดรูปแบบ','JavaScript จัดพฤติกรรม'],['DNS ส่ง HTML แทน server'],'สามภาษาแยกหน้าที่; DNS ช่วยค้นที่อยู่','โครง รูป พฤติกรรม'),
 M('ข้อใดถูกเกี่ยวกับ HTTPS และสถานะ',['HTTPS ใช้ TLS ปกป้องการสื่อสาร','HTTP stateless ยังทำ session ผ่านกลไกแอปได้'],['HTTPS รับประกันเนื้อหาเว็บถูกต้องทั้งหมด','ใช้ TCP เดิมแล้วได้ login session เอง'],'ความปลอดภัยการขนส่งและสถานะผู้ใช้เป็นคนละชั้น','TLS ไม่ใช่ความน่าเชื่อถือเนื้อหา'),
 M('ข้อใดมี semantics แบบ idempotent',['GET','PUT','DELETE'],['POST รับประกันเสมอ'],'idempotent ดูผลที่ตั้งใจต่อสถานะเมื่อทำซ้ำ ไม่ได้บังคับ status response เหมือนเดิม','ทำซ้ำผลเดิมเชิงสถานะ'),
 M('ข้อความใดถูกเกี่ยวกับ HTTP versions',['HTTP/1.1 มีรูปแบบข้อความให้อ่านได้','HTTP/3 ใช้ QUIC บน UDP'],['ทุกเวอร์ชันใช้ TCP เท่านั้น','HTTP/2 เป็น CSS framework'],'ต้องระบุเวอร์ชันเมื่อพูดถึง transport/รูปแบบ','HTTP เป็นครอบครัวเวอร์ชัน')
 ],[
 M('ข้อความใดถูกเกี่ยวกับ HTML table/list',['tr สร้างแถว','li เป็นสมาชิกของ ul/ol','th ใช้หัวเซลล์'],['table ควรใช้วาง layout ทุกหน้าเสมอ'],'ตารางใช้ข้อมูลแถวคอลัมน์และรายการใช้สมาชิก','ใช้ตามความหมาย'),
 M('ข้อใดเหมาะกับภาพในเว็บ',['เขียน alt ตามบริบทของภาพ','ใช้ lazy กับภาพด้านล่างเมื่อเหมาะสม'],['lazy ทุกภาพรวมภาพหลักเสมอ','src ใช้แทน alt สำหรับผู้ใช้ที่ไม่เห็นภาพ'],'alt ให้ข้อความทดแทน ส่วน lazy เลื่อนโหลดตามความจำเป็น','ความหมายกับการโหลด'),
 M('ข้อใดถูกเกี่ยวกับ script ภายนอก classic',['defer รักษาลำดับไฟล์ในเอกสาร','async ไม่รับประกันลำดับระหว่างหลายไฟล์'],['async รอ parse จบเสมอเหมือน defer','defer ทำให้ไม่ execute JS'],'defer รอ parse; async รันเมื่อพร้อม','defer เรียง async พร้อม'),
 M('ข้อใดถูกเกี่ยวกับ form',['label for ควรตรง input id','name เป็นชื่อ field เมื่อส่งข้อมูล','server ต้องตรวจ input แม้มี required'],['button ใน form ไม่มีทาง submit ถ้าไม่ใส่ type'],'button ที่ไม่ต้องการ submit ควรกำหนด type button ชัดเจน','label name validation')
 ],[
 M('วิธีใดใส่ CSS ในหน้าได้',['style attribute','style element','link rel=stylesheet'],['script type=json ทำให้กลายเป็น CSS เอง'],'สามวิธีเป็น inline/internal/external','สามทางใส่ style'),
 M('ข้อใดถูกเกี่ยวกับ cascade',['internal ไม่ได้ specificity สูงกว่า external โดยตัวมันเอง','source order มีผลเมื่อเงื่อนไขก่อนหน้าเท่ากัน'],['กฎที่อยู่ไฟล์นอกแพ้เสมอ','inline ปกติชนะ important ทุกกรณี'],'ต้องพิจารณา cascade ไม่ใช่ตำแหน่งไฟล์อย่างเดียว','น้ำหนักก่อนลำดับ'),
 M('เปลี่ยน class ผ่าน JavaScript ใช้อะไรได้',['el.classList.add("active")','el.classList.remove("active")','el.classList.toggle("active")'],['el.querySelectorAll("active") เพิ่ม class ให้เอง'],'classList จัดชุด class ส่วน querySelectorAll ค้น node','จัด class ไม่ใช่ค้น'),
 M('เมื่อ origin/layer/importance เท่ากัน ข้อใดถูก',['#menu specificity สูงกว่า .menu','.menu specificity สูงกว่า nav'],['style element ชนะ link เสมอ','selector ทุกแบบ specificity เท่ากัน'],'id > class > type ภายใต้เงื่อนไขเดียวกัน','กำหนดเงื่อนไขก่อนเปรียบเทียบ')
 ],[
 M('ข้อใดถูกเกี่ยวกับชนิดข้อมูล',['typeof null ได้ "object"','Array.isArray([]) ได้ true'],['typeof [] ได้ "array"','const ทำให้ object แก้ property ไม่ได้'],'typeof มีข้อยกเว้น null และ arrays เป็น objects; const ห้าม rebind','แยกชนิดกับ binding'),
 M('ข้อใดถูกเกี่ยวกับการแปลงตัวเลข',['parseInt("12px",10) ได้ 12','Number("12px") ได้ NaN','(12.5).toFixed(2) คืน string'],['parseInt("12.5",10) ได้ 12.5'],'parseInt อ่านจำนวนเต็มช่วงต้น Number ตรวจทั้งข้อความ toFixed จัดรูปแบบ','parse กับ format'),
 M('ข้อใดถูกเกี่ยวกับ comments',['// ใช้ comment บรรทัดเดียว','/* ... */ ใช้ comment หลายบรรทัดได้'],['JSON มาตรฐานรองรับ comment เหมือน JS','comment ถูก execute เป็นคำสั่งเสมอ'],'comments ไม่ใช่คำสั่งและไม่ได้มีใน JSON มาตรฐาน','JS comment ไม่ใช่ JSON'),
 M('สำหรับ min/max เป็นจำนวนเต็มและ min<=max ข้อใดถูกเกี่ยวกับการสุ่ม',['Math.random() อยู่ตั้งแต่ 0 แต่น้อยกว่า 1','Math.floor(Math.random()*(max-min+1))+min ให้ช่วงรวม min/max ตามสูตรมาตรฐาน'],['Math.random() คืน 1 ได้ตามนิยามช่วง','บวก 1 แทน min ใช้ได้ทุกช่วง'],'คูณจำนวนค่าที่เป็นไปได้แล้วเลื่อนด้วย min','ช่วง × จำนวน + จุดเริ่ม')
 ],[
 M('ข้อใดถูกเกี่ยวกับ return',['ส่งค่ากลับให้ผู้เรียก','จบการทำงานของ function ณ จุดนั้น'],['เหมือน console.log ทุกด้าน','ต้องเป็นบรรทัดสุดท้ายของไฟล์เสมอ'],'log แสดงผล แต่ return ส่งค่าและออกจาก function','ส่งค่าแล้วออก'),
 M('arrow แบบใดคืนค่า 6 เมื่อเรียกด้วย 3',['n => n*2','n => {return n*2;}'],['n => {n*2;}','n => console.log(n*2)'],'expression คืนอัตโนมัติ; block ต้อง return; console.log คืน undefined','ปีกกาต้อง return'),
 M('ข้อใดถูกเกี่ยวกับ parameters/arguments',['parameter เป็นชื่อที่ประกาศใน function','argument เป็นค่าที่ส่งตอนเรียก'],['ทั้งสองต้องชื่อเหมือนกันเสมอ','argument ต้องเป็น number เท่านั้น'],'ค่าที่ส่งอาจเป็นชนิดใดหรือ function ตาม API','ชื่อรับ กับค่าส่ง'),
 M('เมื่อ function greet(name="Guest") ข้อใดใช้ค่าเริ่มต้น',['greet()','greet(undefined)'],['greet(null)','greet("")'],'default parameter ใช้เมื่อ undefined ไม่ใช่ทุก falsy','default เมื่อไม่ได้ให้ค่า')
 ],[
 M('เมธอดใดแก้ array ต้นฉบับตามพฤติกรรมของเมธอด',['push','pop','splice'],['slice'],'slice สร้างช่วงใหม่ ส่วนอีกสามแก้โครงสร้างเดิม','slice copy / splice edit'),
 M('ข้อใดถูกเกี่ยวกับ map/forEach',['map สร้าง array จากค่าคืน callback','forEach คืน undefined'],['forEach รวบรวมค่าคืนเป็น array ใหม่','map รับประกัน callback ไม่มี side effect'],'เมธอดไม่ได้ห้าม callback แก้ข้อมูลภายนอก ต้องเขียนให้เหมาะ','ผลคืนกับ side effect คนละเรื่อง'),
 M('ข้อใดถูกเกี่ยวกับการค้น/กรอง',['filter คืน array ของสมาชิกที่ผ่าน','find คืนตัวแรกที่ผ่านหรือ undefined'],['find คืน array ทุกครั้ง','filter แก้ length ของ array เดิมโดยตัวมันเอง'],'filter กับ find ต่างรูปแบบผลลัพธ์','หลาย filter / แรก find'),
 M('ให้ a=[10,20,30] ข้อใดถูก',['a.slice(1,3) ได้ [20,30]','a.length เป็น 3','a[0] เป็น 10'],['a[3] เป็น 30'],'index เริ่มศูนย์และจุดจบ slice ไม่นับรวม','index 0 ถึง length-1')
 ],[
 M('ข้อใดถูกเกี่ยวกับ object references',['const b=a ทำให้สองชื่ออ้าง object เดียวเมื่อ a เป็น object','spread เป็น shallow copy'],['spread ทำ deep clone ทุกชั้น','const ห้ามแก้ property object เสมอ'],'reference assignment ไม่สร้าง object ใหม่ และ spread copy ชั้นแรก','ชื่อร่วม ของซ้อนร่วม'),
 M('ข้อใดเป็นการอ่าน property ได้',['user.name','user["name"]'],['user->name ใน JavaScript','user::name ใน JavaScript'],'dot และ bracket เป็น property access ที่ถูก syntax','dot/bracket'),
 M('ข้อใดถูกเกี่ยวกับ JSON',['JSON.stringify serialize เป็นข้อความ','JSON.parse อ่านข้อความเป็นค่า JS'],['JSON รองรับ function โดยตรง','JSON ใช้ unquoted keys เหมือน object literal ได้'],'JSON เป็นรูปแบบข้อมูลเข้มกว่า JS literal','stringify ออก parse เข้า'),
 M('ข้อใดถูกเกี่ยวกับ object utilities',['Object.keys คืน array ของ own enumerable string keys','Object.values คืน array ของ own enumerable string-keyed property values'],['Object.keys แก้ key ให้เป็นตัวใหญ่','delete obj.x เป็น deep clone'],'utilities อ่านรายการ ไม่แปลงหรือ clone ทั้ง object','keys values entries')
 ],[
 M('ข้อใดถูกเกี่ยวกับ event',['target คือจุดต้นทางของ event','currentTarget คือจุดที่ listener ปัจจุบันผูก'],['currentTarget เป็น parent เสมอ','target ต้องเป็น window เสมอ'],'เมื่อ event จากลูก bubble มาถึง parent ค่าสองตัวอาจต่างกัน','จุดเกิดกับจุดฟัง'),
 M('ข้อใดถูกเกี่ยวกับการควบคุม event',['preventDefault ยกเลิก default action ที่ยกเลิกได้','stopPropagation หยุดการส่งต่อไป node ถัดไป'],['preventDefault หยุด propagation ทุกกรณี','stopPropagation ลบ listener อัตโนมัติ'],'default action และ propagation คนละหน้าที่','default ไม่ใช่ propagation'),
 M('ข้อใดถูกเกี่ยวกับ DOM nodes',['createElement สร้าง node ที่ยังต้องเพิ่มเข้า tree','appendChild node เดิมไป parent ใหม่เป็นการย้าย'],['appendChild ทำ deep clone เสมอ','เปลี่ยน DOM แล้วไฟล์ server เปลี่ยนตามอัตโนมัติ'],'DOM ที่เปิดอยู่กับไฟล์ต้นทางคนละสิ่ง','สร้างแล้วเพิ่ม / เดิมแล้วย้าย'),
 M('ข้อใดเหมาะกับการจัดข้อความและ listener',['ใช้ textContent แสดง input เป็นข้อความ','ส่ง function reference ให้ addEventListener'],['ใช้ innerHTML กับ input ใดก็ปลอดภัยเสมอ','เรียก handler() แทน handler เสมอ'],'ข้อความที่ไม่ต้องแปลแท็กใช้ textContent และ listener ต้องรับ callback','ข้อความเป็น text ส่ง function')
 ],[
 M('ข้อใดเป็นรูปแบบ ESM',['export {sum};','import {sum} from "./sum.mjs";'],['module.exports = {sum}; เป็น ESM syntax','require("./sum.cjs") เป็น ESM import syntax'],'import/export เป็น ESM; require/module.exports เป็น CommonJS','แยกระบบ'),
 M('ข้อใดถูกเกี่ยวกับ named/default export',['named import ใช้ชื่อ export หรือ alias','หนึ่ง module มี default export ได้หนึ่งตัว'],['หนึ่ง module มี default export กี่ตัวก็ได้','default import ต้องตั้งชื่อตรงเดิมเท่านั้น'],'default binding ตั้งชื่อในไฟล์นำเข้าได้','named ชื่อตรง default ตั้งชื่อ'),
 M('ข้อใดถูกเกี่ยวกับ file extension/package',['.mjs ระบุ ESM','.cjs ระบุ CommonJS','type:module ใน package.json ใช้กับ .js ใน scope นั้น'],['ทุก .js เป็น CommonJS เสมอทุกบริบท'],'ระบบของ .js ต้องดู package scope และ runtime','ดูนามสกุลกับ package'),
 M('ข้อใดถูกเกี่ยวกับการโหลด modules',['browser ใช้ script type=module ได้','การ import CSS ต้องดูเครื่องมือ/runtime ที่รองรับ'],['Node ปกติ import CSS ได้ทุกแบบเสมอ','package.json ใส่ comment ได้ตาม JSON มาตรฐาน'],'ทรัพยากรพิเศษขึ้นกับ loader และ package.json เป็น JSON','ตรวจ environment')
 ],[
 M('ข้อใดถูกเกี่ยวกับ closures',['function ยังเข้าถึง lexical bindings รอบตัวได้','เรียกโรงงาน counter ใหม่อาจได้ environment แยกชุด'],['closure แช่แข็งค่าทุกตัวเสมอ','closure ทำทุกตัวแปรเป็น global'],'closure เก็บการเข้าถึง binding ไม่ใช่ freeze snapshot ทุกอย่าง','จำขอบเขต'),
 M('ข้อใดเป็นลักษณะ pure function',['input เดิมให้ผลเดิม','ไม่มี side effects ที่สังเกตได้ภายนอก'],['ต้องแก้ global เสมอ','ต้องเป็น arrow เท่านั้น'],'pure เป็นพฤติกรรมไม่ใช่ syntax','คงผล ไม่เปลี่ยนภายนอก'),
 M('ข้อใดเกี่ยวกับ immutability ถูกต้อง',['เปลี่ยน object state โดยสร้าง object ใหม่','copy ทุกชั้นที่ต้องแก้เมื่อข้อมูลซ้อน'],['spread clone ลึกทุกชั้น','เปลี่ยน property เดิมแล้วไม่แจ้ง state ก็พอ'],'spread ตื้น จึงต้องตามชั้นที่แก้จริง','ใหม่ทุกชั้นที่เปลี่ยน'),
 M('ข้อใดถูกเกี่ยวกับ modern operators',['?? แทนค่าเฉพาะ null/undefined','?. ช่วยหยุดเมื่อฐานตรงจุดนั้นเป็น nullish'],['?? แทน 0 ด้วย default เสมอ','?. ช่วยให้ใช้ตัวแปรที่ไม่เคยประกาศได้เสมอ'],'nullish ไม่ใช่ falsy และ optional chaining ไม่แก้ undeclared variables','ศูนย์และข้อความว่างยังเป็นค่า')
 ]
];
multiReview.forEach((items,index)=>items.forEach((q,i)=>{
 Course.chapters[index].quiz[16+i]=normalizeQuestion(q,index+1,16+i);
}));
