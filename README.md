# Web Notes · 01076119

เว็บภาษาไทยทบทวน Web Application Development ตาม Scope_2026A: **20 บท 400 ข้อ** เชื่อมครบ 24 หัวข้อย่อย พร้อมตารางเทียบความครอบคลุม เฉลย และการประเมินตนเอง

บท 1-10 อิง PDF เดิมพร้อมคำอธิบายเสริม บท 11-20 เป็นบทเสริมจากเอกสารทางการ โดยแยกที่มาชัดเจน อ่านข้อค้นพบและข้อจำกัดใน [EXAM_READINESS.md](EXAM_READINESS.md)

## เปิดใช้งาน

เปิด `index.html` หรือ `dist/index.html` ใน browser ได้โดยตรง หรือใช้ static HTTP server เช่น `python -m http.server 8765` จากโฟลเดอร์นี้ ไม่ต้องติดตั้ง dependencies หรือ build บทเรียน ข้อสอบ ฟอนต์ และ PDF อยู่ในโครงการ ส่วนลิงก์เอกสารทางการต้องใช้อินเทอร์เน็ต

หน้าแรกเป็นภาพรวมขอบเขตสอบ ปุ่มอ่านต่อใช้บทล่าสุด ข้อมูลการอ่านและคำตอบอยู่เฉพาะ localStorage ของ browser ไม่ส่งไป server

## ข้อสอบและคะแนน

ทุกบทมีข้อคำตอบเดียว 16 ข้อและข้อเลือกหลายคำตอบ 4 ข้อ รวม 320+80 ข้อ ตัวเลือกข้อละ 4 ตัว เลือกหลายคำตอบต้องถูกครบและไม่เลือกเกินจึงได้ 1 คะแนน ไม่มีคะแนนบางส่วนหรือคะแนนติดลบ

เฉลยพร้อมเหตุผลแสดงหลังตรวจคำตอบ รองรับทำใหม่ทั้งบทและเฉพาะข้อผิด คะแนนสูงสุดกับผลรอบเต็มล่าสุดบันทึกเฉพาะรอบเต็ม 20 ข้อ ตัวประเมินใช้รอบเต็มล่าสุดที่ได้อย่างน้อย 16/20 เป็นเป้าฝึกของเว็บ ไม่ใช่เกณฑ์ผ่านวิชาหรือคำรับประกันสอบผ่าน

ลำดับตัวเลือกใช้ seed คงที่เพื่อให้คำตอบที่บันทึกสอดคล้องเมื่อรีเฟรช ชุด Scope_2026A ปรับข้อ 17-20 ของบทเดิมให้เป็นหลายคำตอบ จึงเก็บข้อมูลข้อสอบเก่าใน `previousQuiz` และเริ่มคะแนนชุดใหม่ โดยรักษาเครื่องหมายอ่านแล้ว คำตอบข้อ 1-16 ของบทเดิมมีลำดับตัวเลือกเดิมแต่ต้องทำรอบใหม่เพื่อให้คะแนนเปรียบเทียบกันได้

## โครงสร้าง

- `dist/content.js`: รายการ PDF, ตัวช่วยสร้างข้อสอบ, normalization และ shuffle
- `dist/ch01-03.js`: HTTP, HTML/สื่อ, CSS
- `dist/ch04-05.js`: JavaScript และ Functions
- `dist/ch06-07.js`: Arrays, Objects/JSON
- `dist/ch08-10.js`: DOM/Events, Modules, พื้นฐานก่อน React
- `dist/ch11-13.js`: Engine/Node/npm/SemVer, CSS layout, Date/Time
- `dist/ch14-15.js`: Errors, Async/Fetch
- `dist/ch16-18.js`: React, Next.js, Express
- `dist/ch19-20.js`: Git/GitHub/.gitignore, Environment/Setup
- `dist/exam-scope.js`: ตาราง Scope, เนื้อหาเติมในบทเดิม, ข้อหลายคำตอบของบท 1-10
- `dist/app.js`: navigation, search, storage, คะแนนและความพร้อม
- `dist/styles.css`: หน้าจอคอมพิวเตอร์/มือถือ/พิมพ์
- `dist/sources`: PDF เดิม 15 ไฟล์ 116 หน้า + Scope_2026A 1 หน้า รวม 16 ไฟล์ 117 หน้า
- `dist/fonts`: Noto Sans Thai และ SIL Open Font License
- `design`: ภาพแนวทาง UI เดิม

## ขอบเขตและแหล่งข้อมูล

ตรวจเทียบ Scope_2026A หน้า 1 วันที่ 1 พฤศจิกายน 2026 เลขหัวข้อในต้นฉบับซ้ำบางส่วน จึงเทียบตามชื่อหัวข้อ ไม่ยึดเลขลำดับเป็น ID บท Next.js ระบุ App Router และอธิบายสิ่งที่ไม่ควรเหมารวมข้ามรุ่น ส่วน Express ระบุข้อแตกต่าง 4/5

เนื้อหาเสริมอ้าง MDN, Node.js, npm, SemVer, React, Next.js, Express, Git และ GitHub พร้อมลิงก์ท้ายบท ยังต้องตรวจเทียบ document อาจารย์เมื่อได้รับ Tailwind/MVC ไม่ได้ระบุใน Scope_2026A ฉบับนี้ จึงไม่จัดเป็นบทบังคับ แบบฝึกทั้งหมดไม่ใช่ข้อสอบจริง

## GitHub Pages / Sites

ที่อยู่ GitHub Pages เดิม: https://toxxy180.github.io/WebApp_Final/

GitHub Pages ใช้ branch `main` และโฟลเดอร์ `/(root)` ได้ หน้า root โหลด CSS/JS จาก `dist/` และมี `dist/index.html` สำหรับเปิดโฟลเดอร์ dist หรือ offline เก็บทั้งสอง entry points ไว้ Asset URLs คำนวณจากตำแหน่ง `dist/app.js` ไฟล์ `.nojekyll` ช่วยให้ static files ที่ชื่อขึ้นต้น underscore ถูกเผยแพร่

`.openai/hosting.json` เก็บ Site identity และ static directory เดิม การแก้ไฟล์ใน checkout ไม่ได้เปลี่ยนเว็บออนไลน์จนกว่าจะเผยแพร่ผ่าน workflow ของ hosting นั้น
