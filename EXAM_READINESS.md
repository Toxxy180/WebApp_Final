# ผลตรวจความครอบคลุม Scope_2026A

ตรวจวันที่ 1 พฤศจิกายน 2026 โดยใช้ Scope_2026A.pdf หน้า 1 เป็นขอบเขตหลัก เทียบกับบทเรียนเดิม 10 บทและรายการ PDF ในโครงการ ขอบเขตใหม่มี 24 หัวข้อย่อย เลขลำดับในต้นฉบับซ้ำบางส่วนจึงใช้ชื่อหัวข้อในการเทียบ

**ก่อนปรับยังไม่ครบขอบเขตสอบ**: เนื้อหาเดิมครอบคลุมพื้นฐานเว็บและ JavaScript แต่หัวข้อ runtime/npm, CSS layout, Date/Time, errors, React จริง, Next.js, Express และ project setup ยังไม่มีบทเต็ม บท “เตรียมพร้อม React” เป็นพื้นฐาน JavaScript ก่อนใช้ React ไม่ใช่บทสอน React ทั้งหมด

**หลังปรับมีบทนำและแบบฝึกเชื่อมครบ 24 หัวข้อ** รวม 20 บท 400 ข้อ อย่างไรก็ตาม ความครอบคลุมของสื่อไม่ใช่หลักฐานว่าผู้เรียนพร้อมสอบ และยังยืนยันความลึกหรือเวอร์ชันตาม document ที่อาจารย์ยังไม่ได้ส่งไม่ได้ ตารางเทียบรายหัวข้อและลิงก์อ่านอยู่ในหน้า “ภาพรวมวิชา”

## บทที่เพิ่ม

| บท | เนื้อหา | สิ่งที่ควรตอบได้ |
|---|---|---|
| 11 | Engine, Node.js, npm, SemVer | runtime/API, package/lockfile, scripts, ^/~ และ 0.x |
| 12 | CSS Box Model, Flex, Grid | คำนวณขนาดกล่อง, แกน main/cross, tracks/fr/gap |
| 13 | Data Format, Date/Time | JSON limitations, timestamp ms/seconds, ISO, UTC/offset, Intl |
| 14 | Errors | จำแนก error, try/catch/finally, async rejection |
| 15 | Async และ Fetch | ลำดับคิว, Promise chain/all/allSettled, status/body/CORS/abort |
| 16 | React | JSX, props/state, updater, key, controlled input, Hooks/Effect |
| 17 | Next.js | App Router, page/layout/route, server/client, rendering/hydration |
| 18 | Express | params/query/body, middleware order, status, error flow |
| 19 | Git/GitHub/.gitignore | staging/commit, fetch/pull/push, branches/PR, tracked files |
| 20 | Environment และ Setup | string conversion, .env loading, public/secret, build/runtime |

บทเดิมเพิ่ม HTTP methods, semantic HTML/forms, comments, default parameters, mutation และ modern operators พร้อมปรับ 4 ข้อท้ายของแต่ละบทให้เป็นหลายคำตอบ

Tailwind และ MVC ไม่ปรากฏเป็นหัวข้อใน Scope_2026A ฉบับนี้ จึงไม่เพิ่มเป็นบทบังคับ MVC/Ajax ที่มีอยู่เดิมถูกระบุว่าเป็นบริบทเสริม

## รูปแบบฝึกสอบ

- บทละ 20 ข้อ: เลือกคำตอบเดียว 16 ข้อ และเลือกหลายคำตอบ 4 ข้อ
- รวม 320 ข้อคำตอบเดียว + 80 ข้อหลายคำตอบ ตัวเลือกข้อละ 4 ตัว
- ข้อละ 1 คะแนน เลือกหลายคำตอบต้องถูกครบและไม่เลือกเกิน ไม่มีคะแนนบางส่วนและไม่มีคะแนนติดลบ
- เฉลยพร้อมเหตุผลและเทคนิคจำแสดงหลังตรวจคำตอบ ทำซ้ำเฉพาะข้อผิดได้
- คะแนนสูงสุดและผลรอบเต็มล่าสุดไม่ถูกทับด้วยรอบแก้ตัว
- แบบฝึกแต่งใหม่ ไม่ใช่ข้อสอบจริง ยังไม่มีข้อมูลยืนยันว่าข้อสอบจริงมีหลายคำตอบหรือไม่

## เกณฑ์ประเมินตนเอง

เว็บใช้ 16/20 หรือ 80% ในรอบเต็มล่าสุดเป็นเป้าฝึกเฉพาะของเว็บ ไม่ใช่เกณฑ์ผ่านรายวิชา ควรทำโดยไม่ดูเฉลย อธิบายตัวเลือกที่ผิดได้ และตอบโจทย์ที่เปลี่ยน input ได้ หากทำได้เพราะจำคำตอบ ควรเว้นระยะแล้วทำใหม่ เครื่องหมายอ่านแล้วและคะแนนสูงสุดไม่เพียงพอจะสรุปความพร้อม

ลำดับอ่าน: 1-3 → 12 → 4-9 → 11 → 10 → 13-20 จากนั้นเน้นบทที่ผลรอบเต็มล่าสุดยังต่ำกว่าเป้าฝึก

## ข้อมูลที่ยังรอ

- ลิงก์ document อาจารย์ โดยเฉพาะ library/framework/project setup
- Next.js ใช้ App Router หรือ Pages Router และเวอร์ชันแพ็กเกจที่สอน
- Express 4 หรือ 5 โดยบทนี้ระบุจุดต่างเรื่อง async errors
- สัดส่วนคะแนน ระดับความลึก เวลา และกติกาการเลือกคำตอบจริง

บทเสริมเป็นการเรียบเรียงจากเอกสารทางการ ไม่ได้อ้างว่าเป็นสไลด์หรือข้อเน้นของอาจารย์: [React](https://react.dev/learn), [Next.js](https://nextjs.org/docs/app/getting-started/server-and-client-components), [Express](https://expressjs.com/en/guide/routing/), [Node.js](https://nodejs.org/api/environment_variables.html), [npm](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/), [SemVer](https://semver.org/), [Git](https://git-scm.com/docs/gitignore), [MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) และหน้าหัวข้อเฉพาะที่ลิงก์ไว้ท้ายแต่ละบท

## การเปิดใช้งาน

เปิด `index.html` หรือ `dist/index.html` ได้โดยตรง หรือใช้ static server จากโฟลเดอร์โครงการ ทั้งสองหน้ารวมเนื้อหาชุดเดียวกัน ไม่ต้องติดตั้ง dependencies เพื่ออ่านหรือทำแบบฝึก เอกสารออนไลน์ต้องใช้อินเทอร์เน็ต ส่วน PDF และฟอนต์เก็บในโครงการ
