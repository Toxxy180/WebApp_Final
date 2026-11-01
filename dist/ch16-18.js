addChapter({title:'React: Components, Props และ State',subtitle:'อ่าน JSX, events, lists และ Hooks ใน function components',group:'Libraries & Frameworks',minutes:40,sources:[],
 refs:[['React · Quick Start','https://react.dev/learn'],['React · useState','https://react.dev/reference/react/useState'],['React · useEffect','https://react.dev/reference/react/useEffect'],['React · Updating objects in state','https://react.dev/learn/updating-objects-in-state']],
 goals:['อ่าน JSX และการส่ง props','คำนวณ state updates แบบ value/updater','เลือก key และใช้ Hooks/Effect ในบริบทที่ถูกต้อง'],
 sections:[
 S('React และ Component',`<p>React เป็น library สำหรับสร้าง UI จาก components โดยอธิบายว่าหน้าจอควรเป็นอย่างไรเมื่อข้อมูลเปลี่ยน แทนการไล่แก้ DOM ทุกจุดเอง บทนี้ใช้ function components และ Hooks เป็นหลัก</p><pre><code>function Greeting({name}) {
  return &lt;h1&gt;สวัสดี {name}&lt;/h1&gt;;
}
// ใช้งานใน JSX: &lt;Greeting name="Mali" /&gt;</code></pre><p>ชื่อ component ขึ้นต้นตัวใหญ่ให้ JSX แยกจากแท็ก HTML ตัวเล็ก <code>{name}</code> แทรก expression ไม่ใช่ string ตัวอักษร name และ JSX ไม่ใช่ HTML string ที่ browser เข้าใจเองโดยไม่ผ่านเครื่องมือแปลง</p>`),
 S('กฎ JSX และการแสดงตามเงื่อนไข',`<p>ปิดแท็กให้ครบ เช่น &lt;img /&gt;; ใช้ <code>className</code> แทน class ในการเขียน React JSX ทั่วไป; หลาย sibling ที่ return ต้องมี wrapper เช่น Fragment <code>&lt;&gt;...&lt;/&gt;</code> โดยไม่เพิ่ม DOM element</p><pre><code>function Status({ready}) {
  return &lt;p className="status"&gt;{ready ? 'พร้อม' : 'กำลังโหลด'}&lt;/p&gt;;
}</code></pre><p>ปีกกาใช้ expression; จะใส่ if statement ตรง ๆ ในปีกกา JSX ไม่ได้ แต่แยก if ก่อน return ได้ ระวัง <code>0 &amp;&amp; &lt;Badge /&gt;</code> ให้ค่า 0 ซึ่ง React แสดงได้ ถ้าต้องการไม่แสดงเมื่อจำนวนเป็นศูนย์ ใช้ <code>count &gt; 0 ? ... : null</code></p>`),
 S('Props, State และ events',`<p><strong>Props</strong> เป็น input จาก parent ให้อ่าน ไม่แก้ตรง ๆ; <strong>state</strong> คือข้อมูลที่ component จดจำข้าม render และอัปเดตผ่าน setter การเปลี่ยน local variable ธรรมดาไม่ได้สั่ง React render ใหม่</p><pre><code>import {useState} from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  return &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;
    {count}
  &lt;/button&gt;;
}</code></pre><p>onClick รับ function ที่จะถูกเรียกเมื่อคลิก เช่น onClick={handle} ไม่ใช่ onClick={handle()} ที่เรียกขณะ render ถ้าไม่ได้ตั้งใจให้คืน handler</p>`),
 S('State เป็น snapshot และ updater',`<pre><code>// สมมติ count = 0 ใน render ของ event นี้
setCount(count + 1);
setCount(count + 1);
// หลังอัปเดต: 1 เพราะทั้งคู่ส่งค่า 1

// อีกกรณี เริ่ม count = 0
setCount(c =&gt; c + 1);
setCount(c =&gt; c + 1);
// หลังอัปเดต: 2 เพราะ updater ต่อจาก pending state</code></pre><p>setter ไม่เปลี่ยนตัวแปร count ใน handler ที่กำลังรันให้กลายเป็นค่าใหม่ทันที เมื่ออัปเดตต่อจากค่าเดิมใช้ functional updater ช่วยอ่านลำดับได้ถูก โดย updater ต้อง pure และไม่แก้ข้อมูลเดิม</p><pre><code>setUser(previous =&gt; ({...previous, name:'Nok'}));
setItems(previous =&gt; [...previous, newItem]);</code></pre><p>Spread เป็น shallow copy ถ้ามีข้อมูลซ้อน ต้อง copy ทุกชั้นที่แก้ การแก้ state object/array เดิมตรง ๆ อาจทำให้การอัปเดตและ snapshot ไม่ถูกต้อง</p>`),
 S('Lists, keys และ controlled input',`<pre><code>// สมมติ rows เป็น array ของ {id, title}
&lt;ul&gt;{rows.map(row =&gt; &lt;li key={row.id}&gt;{row.title}&lt;/li&gt;)}&lt;/ul&gt;

// อยู่ใน component ที่มี state name/setName
&lt;input value={name} onChange={event =&gt; setName(event.target.value)} /&gt;</code></pre><p>key ต้องคงที่และ unique ระหว่าง siblings เพื่อให้ React ติดตาม identity เมื่อรายการสลับ/เพิ่ม/ลบ หลีกเลี่ยง random key หรือ index เมื่อรายการเปลี่ยนลำดับ key ไม่ใช่ prop ปกติที่ลูกอ่านได้ หากต้องใช้ id ให้ส่ง id แยก Controlled input ใช้ state เป็นแหล่งค่าปัจจุบันและอัปเดตผ่าน onChange</p>`),
 S('Hooks และ Effect',`<p>เรียก useState/useEffect ที่ระดับบนสุดของ function component หรือ custom Hook ไม่เรียกใน if, loop หรือ handler เพราะ React ต้องอาศัยลำดับ Hooks ที่สม่ำเสมอ</p><pre><code>import {useEffect} from 'react';
function PageTitle({title}) {
  useEffect(() =&gt; {
    const old = document.title;
    document.title = title;
    return () =&gt; { document.title = old; };
  }, [title]);
  return &lt;h1&gt;{title}&lt;/h1&gt;;
}</code></pre><p>Effect ใช้ synchronize กับระบบภายนอก เช่น DOM API หรือ subscription ระบุ reactive dependencies ที่อ่านและ cleanup เพื่อยกเลิกสิ่งที่เริ่มไว้ ค่าอนุพันธ์อย่างชื่อเต็มคำนวณตอน render ได้โดยไม่ต้องมี Effect เพิ่ม</p><p>ไม่ควรจำว่า Effect ที่ dependencies [] “รันครั้งเดียวแน่นอนทุกกรณี” เพราะการ remount และการตรวจ setup/cleanup เพิ่มใน development Strict Mode มีผล บทนี้ไม่ทำนายรายละเอียดข้อสอบตาม React version ที่อาจารย์ยังไม่ระบุ</p>`)
 ],tips:[['props/state','props รับจาก parent · state จำใน component'],['setter','ส่งค่า = แทนค่า · ส่ง updater = คิดต่อจากค่าคิว'],['key','คงที่และ unique ใน siblings ไม่สุ่มทุก render'],['Effect','เชื่อมภายนอก มี dependencies และ cleanup']],
 quiz:[
 ['React มีบทบาทหลักอะไร','library สำหรับ UI ที่ประกอบจาก components','JavaScript engine','ฐานข้อมูล SQL','Git server','React เน้นส่วนติดต่อผู้ใช้','UI components'],
 ['ชื่อ JSX component ที่ผู้ใช้สร้างควรเริ่มแบบใด','ตัวพิมพ์ใหญ่ เช่น Profile','ตัวเล็กทั้งหมดเสมอ','ตัวเลข','เครื่องหมาย #','ตัวใหญ่แยก component ออกจากแท็ก HTML','Component ตัวใหญ่'],
 ['JSX {name} หมายถึงอะไร','ประเมิน expression name','พิมพ์ข้อความ name เสมอ','สร้าง JSON object เสมอ','เรียก CSS selector','ปีกกาแทรก expression ใน JSX','ปีกกาเชื่อม JS'],
 ['attribute สำหรับ CSS class ใน React JSX ทั่วไปคืออะไร','className','cssClass','styleName','classList เป็น string','className ใช้กำหนด class attribute ผ่าน React','className'],
 ['Fragment ใช้เพื่ออะไร','รวม JSX siblings โดยไม่เพิ่ม DOM wrapper','สร้าง HTTP fragment','เก็บ state อัตโนมัติ','แทน JSON.parse','Fragment จัดโครง JSX โดยไม่สร้าง div เพิ่ม','รวมโดยไม่เพิ่มกล่อง'],
 ['Props ควรถูกใช้โดย child อย่างไร','อ่านเป็น input ไม่แก้ตรง ๆ','แก้ตรง ๆ เพื่ออัปเดต parent เสมอ','เป็น global ของทุก component','เปลี่ยนได้เฉพาะด้วย document','props เป็น input snapshot จาก parent','props อ่านอย่างเดียว'],
 ['useState คืนอะไร','คู่ค่า state กับ setter','DOM element กับ CSS','Promise ของ state','JSON string','destructure [value,setValue]','ค่ากับตัวอัปเดต'],
 ['ส่ง handler ให้ปุ่มอย่างถูกต้องคือข้อใด','onClick={handle}','onClick={handle()} เมื่อไม่คืน function','onclick="handle" สำหรับ React JSX เสมอ','onClick={42}','ต้องส่ง function ให้รอ event','ส่ง function reference'],
 ['เริ่ม count=0 ใน handler เดียว เรียก setCount(count+1) สองครั้ง ได้ค่าใหม่ใด','1','2','0','undefined','ทั้งสองเรียกคำนวณจาก snapshot 0 จึงส่ง 1','ค่าเดิมของ render'],
 ['เริ่ม 0 แล้วเรียก setCount(c=>c+1) สองครั้งใน handler เดียว ได้เท่าไร','2','1','0','NaN','updater ที่สองรับ pending state จากอันแรก','updater ต่อคิว'],
 ['แก้ user state อย่างเหมาะสมคือข้อใด','setUser(prev=>({...prev,name:"Nok"}))','user.name="Nok" แล้วไม่เรียก setter','document.user="Nok"','setUser = "Nok"','สร้าง object ใหม่และคง fields เดิม','copy แล้ว set'],
 ['key ที่เหมาะกับรายการที่อาจ reorder คืออะไร','id ที่คงที่ของข้อมูล','Math.random() ทุก render','index เสมอไม่ต้องดูโจทย์','ชื่อ component ซ้ำทุกตัว','stable identity ช่วยจับคู่รายการเดิม','key ต้องคงที่'],
 ['Controlled input เก็บค่าปัจจุบันไว้ที่ใด','state ที่ส่งเข้า value และเปลี่ยนผ่าน onChange','CSS stylesheet','Git commit','ชื่อไฟล์ HTML','state เป็นแหล่งค่าของ input','state คุม value'],
 ['useState ควรเรียกที่ใด','ระดับบนสุดของ component หรือ custom Hook','ใน if ตามค่า props เสมอ','ภายใน loop ที่จำนวนเปลี่ยนได้','ใน event handler','Hooks ต้องมีลำดับเรียกสม่ำเสมอ','top level'],
 ['งานใดเหมาะกับ useEffect','ตั้ง subscription กับระบบภายนอกพร้อม cleanup','บวก 1+2 เพื่อแสดงผลธรรมดา','แปลงชื่อเต็มที่คำนวณจาก props โดยต้องใช้ Effect เสมอ','เปลี่ยน JSX เป็น JSON ทุก render','Effect ใช้ synchronize ระบบภายนอก','external synchronization'],
 ['0 && <Badge /> ให้ผลที่ React อาจแสดงเป็นอะไร','0','Badge เสมอ','null เสมอ','SyntaxError','&& คืนค่า operand ที่ falsy คือ 0 ซึ่ง React render ได้','0 เป็นค่าที่แสดงได้'],
 M('การอัปเดต state ข้อใดเหมาะสม',['ใช้ updater เมื่อค่าถัดไปอิงค่าก่อนหน้า','สร้าง array/object ใหม่เมื่อเปลี่ยนข้อมูล'],['แก้ array เดิมแล้วไม่เรียก setter','คาดว่า setter เปลี่ยน snapshot ใน handler ทันที'],'setter จัดคิว render และข้อมูลควร immutable','snapshot และคิว'),
 M('ข้อใดถูกเกี่ยวกับ keys',['ต้อง unique ระหว่าง siblings','ควรคงที่เมื่อข้อมูลเดิมย้ายตำแหน่ง'],['ต้อง unique ทั้งโลก','ใช้ random ทุก render เพื่อให้ React เร็วขึ้น'],'key ระบุ identity ในรายการของ parent นั้น','unique ในบริบท'),
 M('ข้อใดเกี่ยวกับ Effect ถูกต้อง',['cleanup ใช้ยกเลิก subscription ได้','dependencies ควรรวม reactive values ที่ Effect อ่าน'],['[] รับประกันไม่ setup ใหม่แม้ remount','Effect ใช้แทน event handler ทุกกรณี'],'Effect ต้องสัมพันธ์กับข้อมูลที่อ่านและจัดการ lifecycle ของสิ่งภายนอก','setup คู่ cleanup'),
 M('ข้อใดถูกเกี่ยวกับ JSX',['ใช้ expression ในปีกกาได้','หลาย siblings รวมด้วย Fragment ได้','แท็กควรปิดให้ครบ'],['ใส่ if statement ในปีกกา JSX ได้โดยตรง'],'JSX มีไวยากรณ์ที่เข้มกว่า HTML และปีกการับ expression','expression ไม่ใช่ statement')
 ]});

addChapter({title:'Next.js เบื้องต้น',subtitle:'อ่าน App Router, page/layout และขอบเขต Server/Client Components',group:'Libraries & Frameworks',minutes:35,sources:[],
 refs:[['Next.js · Layouts and pages','https://nextjs.org/docs/app/getting-started/layouts-and-pages'],['Next.js · Server and Client Components','https://nextjs.org/docs/app/getting-started/server-and-client-components'],['Next.js · Route handlers','https://nextjs.org/docs/app/getting-started/route-handlers'],['Next.js · Environment variables','https://nextjs.org/docs/app/guides/environment-variables']],
 goals:['เทียบ React กับ Next.js','อ่านเส้นทาง app/page, layout และ dynamic segments','แยก server/client กับรูปแบบ rendering โดยไม่เหมารวม'],
 sections:[
 S('Next.js เพิ่มอะไรให้ React',`<p>Next.js เป็น framework บน React ที่มี routing, การ render ฝั่ง server, การจัดการ build และส่วน server ของแอป บทนี้อิง <strong>App Router</strong> ในโฟลเดอร์ app ตามเอกสารที่ตรวจวันที่ 1 พฤศจิกายน 2026</p><p>อีกระบบคือ Pages Router ใน pages ซึ่งใช้ไฟล์และ API ต่างกัน เช่น pages/index.js อย่าผสมคำตอบของสองระบบ บทนำนี้ไม่กำหนดว่าเอกสารอาจารย์จะเลือก router หรือเวอร์ชันใด ต้องเทียบเมื่อได้รับลิงก์จริง โดยเฉพาะ caching defaults และ API ที่เปลี่ยนตามรุ่น</p>`),
 S('File-system routing: page กับ layout',`<pre><code>app/
  layout.jsx             // root layout
  page.jsx               // /
  courses/
    page.jsx             // /courses
    [id]/
      page.jsx           // /courses/123 เป็นต้น
  api/
    health/
      route.js           // /api/health</code></pre><p>folder สร้าง segment; <code>page</code> เปิด UI ของ route; <code>layout</code> ครอบเนื้อหาที่ใช้ร่วมกันและรับ children; <code>[id]</code> คือ dynamic segment ไม่ใช่ชื่อ path ที่ผู้ใช้ต้องพิมพ์พร้อมปีกกา Root layout กำหนด html/body และ route group แบบ (group) ใช้จัดโครงโดยไม่เพิ่ม segment ใน URL</p><pre><code>// app/layout.jsx
export default function RootLayout({children}) {
  return &lt;html lang="th"&gt;&lt;body&gt;{children}&lt;/body&gt;&lt;/html&gt;;
}</code></pre>`),
 S('Server และ Client Components',`<p>ใน App Router pages/layouts เป็น Server Components โดยค่าเริ่มต้น เหมาะกับอ่านข้อมูลฝั่ง server และเก็บ secrets ไว้ฝั่งนั้น เมื่อต้องใช้ state, event handlers หรือ browser APIs ให้มี Client Component boundary ด้วย <code>'use client'</code> ที่ต้นไฟล์ก่อน imports</p><pre><code>// app/counter.jsx
'use client';
import {useState} from 'react';
export default function Counter() {
  const [n, setN] = useState(0);
  return &lt;button onClick={() =&gt; setN(x =&gt; x + 1)}&gt;{n}&lt;/button&gt;;
}</code></pre><p>ไม่ต้องใส่ use client ทุกไฟล์ในต้นไม้ แต่เป็นจุดแบ่งของ module graph ข้อมูลที่ส่งจาก server ไป client เป็น props ต้องอยู่ในรูปที่ React serialize รองรับ และไม่ส่ง secret ไปเพียงเพราะต้นทางอยู่ server</p>`),
 S('อย่าสับสน use client กับ render ที่ไหนทั้งหมด',`<p>Client Components อาจถูก prerender เป็น HTML ฝั่ง server สำหรับการโหลดครั้งแรก แล้ว hydrate ใน browser ดังนั้น use client <strong>ไม่ใช่คำสั่งให้ทุกบรรทัดทำเฉพาะ browser เท่านั้น</strong> การอ่าน window/localStorage ขณะ render ต้องพิจารณาการ prerender และ hydration; งาน browser-only มักอยู่ใน event หรือ Effect ตามความเหมาะสม</p><table><tr><th>คำ</th><th>แนวคิด</th></tr><tr><td>SSR</td><td>สร้างผล render ฝั่ง server เมื่อรับคำขอ</td></tr><tr><td>Static generation</td><td>สร้าง/เตรียมผลล่วงหน้าตามการตั้งค่า</td></tr><tr><td>CSR</td><td>สร้าง/อัปเดต UI ด้วย JavaScript ฝั่ง client</td></tr><tr><td>Hydration</td><td>เชื่อม React กับ HTML ที่ server เตรียมมาให้โต้ตอบได้</td></tr></table><p>Server Component ไม่เท่ากับ “ต้อง SSR ทุก request” และ client component ไม่เท่ากับ “ไม่มี HTML จาก server” แยกสองเรื่องนี้ก่อนอ่านโจทย์</p>`),
 S('Link และ Route Handler',`<pre><code>import Link from 'next/link';
// ภายใน component
&lt;Link href="/courses"&gt;รายวิชา&lt;/Link&gt;

// app/api/health/route.js (คนละไฟล์)
export async function GET() {
  return Response.json({ok:true});
}</code></pre><p>Link ใช้ navigation ภายในแอป; route.js จัดการ HTTP endpoint และ export ตาม method เช่น GET/POST ต่างจาก page ที่แสดง UI ไม่วาง page และ route ให้แย่ง path เดียวกัน Route handler ไม่ต้องใช้ Express เพื่อทำ endpoint พื้นฐานนี้</p>`),
 S('การตั้งค่าและจุดหลอกในข้อสอบ',`<p>ใน Next.js ปกติอ่าน env ฝั่ง server ผ่าน process.env ตัวแปรที่ตั้งใจเปิดให้ bundle client ใช้ NEXT_PUBLIC_ และถูก inline ณ build ในการอ้างแบบที่รองรับ จึงห้ามใช้ prefix นี้กับ secret</p><p>เวลาตอบเรื่อง data fetching/caching ให้ระบุ router และเวอร์ชัน ไม่จำว่าทุก fetch ถูก cache เสมอ เพราะการตั้งค่าและค่าเริ่มต้นเปลี่ยนได้ เนื้อหาในบทนี้เน้นแนวคิดที่ใช้แยกหน้าที่ ส่วนคำสั่งตั้งโปรเจกต์และเวอร์ชันแพ็กเกจให้ยึด document อาจารย์เมื่อส่งมา</p>`)
 ],tips:[['App Router','folder = segment · page = UI · layout = โครงร่วม · route = HTTP'],['use client','เปิด boundary สำหรับ interaction ไม่ได้แปลว่าไม่มี prerender'],['สองแกน','Server/Client Component แยกจาก static/dynamic rendering'],['เวอร์ชัน','ดู router และ version ก่อนตอบเรื่อง cache/API']],
 quiz:[
 ['Next.js มีความสัมพันธ์กับ React อย่างไร','framework ที่ใช้ React และเพิ่มความสามารถระดับแอป','engine แทน JavaScript','ฐานข้อมูลของ React','ชื่อใหม่ของ npm','Next ต่อเติม routing/rendering และโครงแอปบน React','React บวก framework'],
 ['บทนี้อิง router ใด','App Router ใน app','Pages Router ใน pages เท่านั้น','Express Router','Hash Router ที่ต้องติดตั้ง React Router','ต้องระบุบริบทให้ตรงกับไฟล์ตัวอย่าง','app = App Router'],
 ['app/courses/page.jsx เปิด UI ที่ path ใด','/courses','/app/courses/page.jsx','/page/courses','/api/courses เสมอ','folder เป็น segment และ page เปิดหน้า','page ไม่อยู่ใน URL'],
 ['app/page.jsx แสดงหน้าใด','/','/page','/app','/api','page ใต้ app โดยตรงคือ root route','root page'],
 ['layout รับส่วน UI ของ route ที่ซ้อนผ่าน prop ใด','children','paramsOnly','request','next','layout ครอบ children ที่ framework ส่งมา','layout ครอบ children'],
 ['โฟลเดอร์ [id] หมายถึงอะไร','dynamic segment','URL ต้องมี [id] ตรง ๆ','ไฟล์ CSS','private route อัตโนมัติ','เช่น /courses/123 ให้ค่า id ตาม segment','ปีกกาสร้าง parameter'],
 ['page/layout ใน App Router โดยค่าเริ่มต้นเป็นอะไร','Server Components','Client Components ทั้งหมด','Express middleware','JSON schema','เปิด client boundary เมื่อต้อง interaction','server โดยค่าเริ่มต้น'],
 ['ต้องใช้ useState กับ onClick ควรทำอย่างไร','สร้าง Client Component boundary ด้วย use client','ใส่ use server ทุกไฟล์','ใช้ CSS แทน state เสมอ','แก้ package-lock ด้วยมือ','state และ handlers ต้องทำใน Client Component','interactive client'],
 ['use client ควรอยู่ตำแหน่งใด','ต้นไฟล์ก่อน imports','ท้าย return','ใน callback ของ onClick','ในไฟล์ CSS','เป็น directive ระดับโมดูล','directive ก่อน import'],
 ['Client Component ได้ HTML จาก server ครั้งแรกได้หรือไม่','ได้จาก prerender แล้ว hydrate','ไม่ได้ทุกกรณี','ได้เฉพาะไม่มี React','ได้เฉพาะไฟล์ .html','client boundary ไม่ได้ปิด server prerender','client อาจ prerender'],
 ['Hydration หมายถึงอะไร','เชื่อม React กับ HTML จาก server ให้โต้ตอบได้','แปลง CSS เป็น JSON','ส่ง Git commit','ลบ state ทุกครั้งที่ click','hydration ต่อการทำงาน UI กับ HTML ที่มีอยู่','HTML สู่ interactive'],
 ['app/api/health/route.js ใช้ทำอะไร','HTTP endpoint /api/health','หน้า UI /health เสมอ','root layout','CSS animation','route handler ต่างจาก page','route คือ HTTP'],
 ['รองรับ GET ใน Route Handler ใช้รูปแบบใด','export function GET() { return Response.json({ok:true}); }','app.page.get() เสมอ','export const css = GET;','module.html = GET;','export ชื่อตาม HTTP method','ชื่อ method ตัวใหญ่'],
 ['นำทางภายในแอปแบบ Next มักใช้อะไร','Link จาก next/link','git switch','JSON.parse','node:fs','Link เป็น navigation component','Link นำทาง'],
 ['ตัวแปร NEXT_PUBLIC_API_KEY ควรถูกมองว่าอย่างไร','อาจถูกเปิดเผยใน client bundle ไม่ใช้เก็บ secret','secret เสมอเพราะอยู่ .env','อ่านได้เฉพาะ server ทุกกรณี','มีการเข้ารหัสอัตโนมัติ','prefix ตั้งใจเผยแพร่ให้ client เมื่อ bundle อ้างอิง','PUBLIC คือเผยแพร่'],
 ['คำกล่าวใดแม่นยำเรื่อง caching ใน Next.js','ต้องดูเวอร์ชัน router และการตั้งค่า','ทุก fetch cache เสมอทุกเวอร์ชัน','ไม่มี cache ได้เลย','cache เท่ากับ localStorage เสมอ','defaults/API มีการเปลี่ยนจึงไม่เหมารวม','บริบทก่อนคำตอบ'],
 M('สิ่งใดเป็นหน้าที่ของไฟล์ App Router',['page แสดง UI ของ route','layout ครอบ UI ร่วม','route จัดการ HTTP methods'],['ทุกไฟล์ .js ใน app กลายเป็น public route เอง'],'file conventions กำหนดหน้าที่ ไม่ใช่ทุกไฟล์เปิด endpoint','จำ convention'),
 M('ข้อใดถูกเกี่ยวกับ Client Components',['ใช้ state และ events ได้','อาจ prerender ฝั่ง server ใน initial load'],['เก็บ server secret ใน props แล้วปลอดภัยเสมอ','use client ทำให้ทุกบรรทัดรันเฉพาะ browser เสมอ'],'ต้องแยก client capability กับขั้นตอน rendering และการเปิดเผยข้อมูล','boundary ไม่ใช่ secret vault'),
 M('ข้อใดถูกเกี่ยวกับ rendering',['SSR เป็นการ render ฝั่ง server สำหรับ request','Static generation เตรียมผลล่วงหน้าได้'],['Server Component ทุกตัวต้อง SSR ทุก request','Hydration คือการ parse JSON อย่างเดียว'],'ชนิด component กับกลยุทธ์ rendering เป็นคนละมิติ','แยกสองแกน'),
 M('เรื่องใดควรเทียบกับ document อาจารย์เมื่อได้รับ',['App Router หรือ Pages Router','เวอร์ชันและค่าเริ่มต้น caching','รูปแบบ API ที่ใช้ในตัวอย่าง'],['สมมติทุกตัวอย่างทุกเวอร์ชันเหมือนกัน'],'ข้อสอบมักยึดบริบทที่สอน จึงต้องตรวจ router/version','บริบทจากอาจารย์')
 ]});

addChapter({title:'Express.js: Routes และ Middleware',subtitle:'อ่านคำขอ HTTP แยก params/query/body แล้วตามลำดับการตอบกลับ',group:'Libraries & Frameworks',minutes:35,sources:[],
 refs:[['Express · Routing','https://expressjs.com/en/guide/routing/'],['Express · Middleware','https://expressjs.com/en/guide/using-middleware/'],['Express · Error handling','https://expressjs.com/en/guide/error-handling/']],
 goals:['แยก route method/path และ req.params/query/body','วาง JSON parser กับ middleware ตามลำดับ','เขียน response และ error middleware โดยไม่ส่งซ้ำ'],
 sections:[
 S('Express อยู่ตรงไหนในระบบ',`<p>Express เป็น web framework ที่ทำงานบน Node.js ช่วยประกาศ route และ middleware สำหรับ HTTP server ไม่ใช่ frontend UI library และไม่ได้เป็นฐานข้อมูล บทนี้ใช้ API พื้นฐานร่วมของ Express 4/5 และระบุจุดต่างของ Express 5 เมื่อเกี่ยวข้อง</p><pre><code>// server.mjs: ตัวอย่างหลังติดตั้ง express
import express from 'express';
const app = express();
app.use(express.json());
app.get('/health', (req, res) =&gt; {
  res.json({ok:true});
});
app.listen(3000);</code></pre><p>app.listen เปิดรับการเชื่อมต่อ; route จะเลือกจากทั้ง HTTP method และ path ดังนั้น GET /users กับ POST /users เป็นคนละพฤติกรรมได้ แม้ path เดียวกัน</p>`),
 S('params, query และ body',`<pre><code>// GET /users/42?sort=name
app.get('/users/:id', (req, res) =&gt; {
  res.json({id:req.params.id, sort:req.query.sort});
});

// POST /users พร้อม JSON body {"name":"Mali"}
app.post('/users', (req, res) =&gt; {
  const name = req.body?.name;
  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({error:'name required'});
  }
  return res.status(201).json({name:name.trim()});
});</code></pre><p>params มาจาก segment เช่น :id; query มาจาก ? หลัง path; body มาจากเนื้อหาคำขอที่ parser อ่านให้ ข้อมูลเหล่านี้เป็น input ที่ต้อง validate ไม่สมมติว่า query เป็น string เสมอเพราะ parser/configuration มีผล ตัวอย่าง POST สาธิต response เท่านั้น ยังไม่ได้บันทึกลงฐานข้อมูล</p>`),
 S('Middleware และลำดับ',`<pre><code>app.use((req, res, next) =&gt; {
  console.log(req.method, req.path);
  next();
});
app.use(express.json());
// routes ที่ต้องใช้ req.body วางหลัง JSON parser</code></pre><p>Middleware เข้าถึง req/res และ next ใช้ log, parse หรือเช็กสิทธิ์ ลำดับลงทะเบียนสำคัญ ถ้า middleware ไม่จบ response และไม่ next คำขออาจค้าง <code>next()</code> ส่งต่อการควบคุม แต่ไม่ใช่ return ของ JavaScript จึงยังมีโค้ดหลัง next ทำงานได้ ต้องวาง return เมื่อต้องการหยุด function</p><p>JSON parser ไม่ใช่ input validator และไม่ parse ทุก Content-Type ถ้าเป็น form URL encoded ใช้ parser ให้ตรงชนิด</p>`),
 S('Status code และจบ response',`<p><code>res.status(201)</code> ตั้งสถานะ แต่ยังไม่ได้ส่ง body; <code>res.json(data)</code> serialize เป็น JSON และส่ง response; <code>res.send(text)</code> ส่งข้อความหรือข้อมูลที่รองรับ</p><pre><code>app.get('/restricted', (req, res) =&gt; {
  const allowed = false; // ค่าจำลองสำหรับอ่าน control flow
  if (!allowed) return res.status(403).json({error:'forbidden'});
  return res.json({secret:'example only'});
});</code></pre><p>return ป้องกันโค้ดส่วนล่างพยายามส่ง response ซ้ำ ไม่ใช่ตัว return เองที่ส่ง HTTP จุดสอบที่พบบ่อยคือส่งแล้วต่อด้วย res.json อีกครั้ง จนอาจเกิด “headers already sent”</p>`),
 S('404 กับ Error middleware',`<pre><code>// หลัง routes
app.use((req, res) =&gt; {
  res.status(404).json({error:'not found'});
});
app.use((err, req, res, next) =&gt; {
  if (res.headersSent) return next(err);
  res.status(500).json({error:'server error'});
});</code></pre><p>Error middleware มีสี่ parameters ตามลำดับ <code>(err,req,res,next)</code> ต่างจาก middleware ปกติ ใช้ next(err) ส่งต่อเข้าสู่ error flow ส่วน “ไม่มี route ตรง” โดยปกติไม่ใช่ thrown error ที่จะไป error middleware เอง จึงทำ fallback 404 หลัง routes</p>`),
 S('Async handler และขอบเขตเวอร์ชัน',`<p>Express 5 ส่ง rejection/throw จาก Promise ที่ handler คืนไปยัง error handler ให้อัตโนมัติ แต่ Express 4 ไม่ควรพึ่งพฤติกรรมนี้ ใช้ try/catch แล้ว next(error) เพื่อให้ตัวอย่างใช้ได้ทั้งสองบริบท</p><pre><code>// สมมติ loadUsers() เป็นฟังก์ชัน async ที่มีอยู่จริงในโปรเจกต์
app.get('/users', async (req, res, next) =&gt; {
  try {
    const users = await loadUsers();
    return res.json(users);
  } catch (error) {
    return next(error);
  }
});</code></pre><p>การป้องกัน input, authentication, authorization และฐานข้อมูลเป็นงานอีกชั้น Express ไม่สร้างให้ครบโดยเพียงประกาศ route การติดตั้ง CORS ก็ไม่ได้แปลว่ามีระบบสิทธิ์แล้ว</p>`)
 ],tips:[['สามช่องของ request','params ใน path · query หลัง ? · body ใน payload'],['ลำดับ','parser ก่อน route ที่อ่าน body · 404 หลัง routes · error handler ท้าย'],['next','ส่งต่องานแต่ไม่ return function เอง'],['สี่ตัวของ error','err, req, res, next']],
 quiz:[
 ['Express ทำงานบนอะไร','Node.js runtime','CSS engine เท่านั้น','GitHub Pages แบบ static โดยตรง','ฐานข้อมูลเท่านั้น','Express เป็น framework ฝั่ง server บน Node','Node รัน Express'],
 ['app.get("/users",handler) จับคำขอใด','GET /users','POST /users ทุกครั้ง','ทุก method ทุก path','GET /users/42 เสมอ','ต้องตรงทั้ง method และ route path','method + path'],
 ['GET /users/42?sort=name กับ route /users/:id อ่าน 42 จากไหน','req.params.id','req.query.id','req.body.id','res.params.id','ส่วน :id เป็น path parameter','params จาก path'],
 ['จาก GET /users/42?sort=name อ่าน sort ผ่านอะไร','req.query.sort','req.params.sort','res.body.sort','app.sort','query มาจากส่วนหลัง ?','query หลัง ?'],
 ['อ่าน JSON payload หลัง parser ที่เหมาะสมจากไหน','req.body','res.json','req.routeText','app.body','parser เติมข้อมูลที่อ่านได้ให้ req.body','body คือ payload'],
 ['ต้อง parse JSON body ก่อน handler ใช้อะไร','app.use(express.json()) ก่อน route','res.json() ก่อน route','JSON.parse(req) ทุกกรณี','app.listen.json()','express.json เป็น middleware สำหรับ incoming JSON','parser ก่อนใช้'],
 ['Middleware ปกติมีพารามิเตอร์ที่ใช้ส่งต่อชื่ออะไร','next','send','commit','renderOnly','next ให้ Express เดิน pipeline ต่อ','next ส่งต่อ'],
 ['Middleware ไม่ next และไม่ส่ง response อาจเกิดอะไร','request ค้างรอ','ตอบ 200 ทันทีทุกครั้ง','กระโดดไป route สุดท้ายอัตโนมัติ','บันทึกลง DB','ต้องจบ response หรือส่งต่อการควบคุม','จบหรือส่งต่อ'],
 ['next() เท่ากับ return ของ JavaScript หรือไม่','ไม่ โค้ดหลัง next ยังอาจทำงาน','ใช่เสมอ','ใช่เฉพาะ GET','ทำให้ process จบ','next เป็น function call ไม่ใช่ keyword return','next ไม่หยุดฟังก์ชัน'],
 ['res.status(201) โดยยังไม่ send/json ทำอะไร','ตั้งสถานะ response แต่ยังไม่ส่ง body','ส่ง JSON ทันทีเสมอ','เพิ่ม row ใน DB','redirect ไป /201','status เป็น setter; ต้องส่ง response ต่อ','ตั้งก่อนส่ง'],
 ['res.json({ok:true}) ทำอะไร','ส่ง JSON response','parse incoming body','ส่ง Git commit','เปิด browser','res.json เป็นขาออกไม่ใช่ parser ขาเข้า','res ขาออก'],
 ['สร้าง resource สำเร็จมักใช้สถานะใด','201','301','401','500','201 Created สื่อการสร้างสำเร็จ','created 201'],
 ['input ไม่ผ่าน validation มักตอบอะไร','400','200 เสมอ','503 เสมอ','101','400 ระบุคำขอไม่ถูกต้องตามบริบทนี้','bad request'],
 ['รูปแบบ error middleware คือข้อใด','(err, req, res, next)','(req, res)','(next, body)','(res, err, req)','สี่พารามิเตอร์และลำดับทำให้ Express แยก error handler','err นำหน้า'],
 ['ไม่มี route ตรงควรวาง 404 handler ไว้ที่ใด','หลัง routes ปกติ','ก่อนทุก route แล้วส่ง 404 ทันที','ใน package.json','ไม่ต้องเพราะ always throw','fallback ต้องให้ route ปกติลองก่อน','404 ท้าย routes'],
 ['handler คืน rejected Promise ใน Express 5 เป็นอย่างไร','ส่งเข้า error flow ให้อัตโนมัติ','เป็น 200 เสมอ','ต้องเหมือน Express 4 ทุกกรณี','เปลี่ยนเป็น JSON null','Express 5 รองรับ rejection ของ returned Promise ต่างจาก Express 4','ระบุ version'],
 M('แหล่งข้อมูลจาก request ใดต้อง validate',['req.params','req.query','req.body'],['ชื่อฟังก์ชัน res.json ซึ่งไม่ใช่ input field'],'ทุกช่องที่ client ส่งเข้ามาไม่ควรถูกเชื่อถือโดยไม่ตรวจ','input ทั้งสามช่อง'),
 M('ข้อใดเกี่ยวกับ middleware ถูกต้อง',['ลำดับลงทะเบียนมีผล','parser ควรอยู่ก่อน route ที่ใช้ผล parse'],['next() คือการตอบ HTTP 200','express.json ตรวจ business rules ให้ครบ'],'pipeline เดินตามลำดับ ส่วน parser แค่อ่านรูปแบบข้อมูล','parse ไม่ใช่ validate'),
 M('วิธีใดช่วยป้องกันส่ง response ซ้ำ',['return หลังส่งใน early-exit branch','จัด control flow ให้หนึ่งคำขอจบ response ทางเดียว'],['เรียก res.json ทุก middleware โดยไม่ตรวจ','ส่งอีกครั้งเพราะเปลี่ยน status แล้ว'],'ต้องหยุดทางที่ไม่ต้องทำต่อและออกแบบเส้นทาง response','ส่งแล้วออก'),
 M('ข้อใดถูกเกี่ยวกับ errors',['next(error) ส่งเข้า error flow','404 ไม่พบ route ไม่ใช่ thrown error อัตโนมัติ','Express 4 async handler ใช้ catch แล้ว next(error) ได้'],['Express ทำ authorization ทุก route ให้อัตโนมัติ'],'framework จัด routing/error flow แต่ระบบสิทธิ์ต้องออกแบบเอง','framework ไม่แทนกฎแอป')
 ]});
