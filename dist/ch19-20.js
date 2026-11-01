addChapter({title:'Git, GitHub และ .gitignore',subtitle:'ตามไฟล์จาก working tree สู่ commit แล้วทำงานร่วมกันผ่าน remote',group:'Project Setup',minutes:35,sources:[],
 refs:[['Git · Recording changes','https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository'],['Git · Working with remotes','https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes'],['Git · gitignore','https://git-scm.com/docs/gitignore'],['GitHub · Pull requests','https://docs.github.com/en/pull-requests/reference/pull-requests']],
 goals:['แยก working tree, staging/index, local commit และ remote','เลือก add/commit/fetch/pull/push และอ่าน diff','ใช้ branch, Pull Request และ .gitignore โดยเข้าใจไฟล์ tracked'],
 sections:[
 S('Git ไม่ใช่ GitHub',`<p><strong>Git</strong> เป็นระบบ version control แบบกระจาย ทำ commit และดูประวัติในเครื่องได้โดยไม่ต้องต่อ GitHub ส่วน <strong>GitHub</strong> เป็นบริการโฮสต์ repository และเครื่องมือร่วมงาน เช่น Pull Request และ review</p><table><tr><th>ตำแหน่ง</th><th>ความหมาย</th></tr><tr><td>Working tree</td><td>ไฟล์ที่กำลังแก้บนเครื่อง</td></tr><tr><td>Staging area / index</td><td>snapshot ที่เตรียมเข้า commit ถัดไป</td></tr><tr><td>Local repository</td><td>ประวัติ commits ในเครื่อง</td></tr><tr><td>Remote repository</td><td>repository อีกที่ที่ fetch/push ถึงได้</td></tr></table><p>แก้ไฟล์ไม่ได้แปลว่า commit แล้ว และ commit ไม่ได้แปลว่าส่งถึง GitHub แล้ว</p>`),
 S('จากแก้ไฟล์สู่ commit',`<pre><code>git status
git diff
git add src/app.js
git diff --staged
git commit -m "Fix answer validation"
git log --oneline</code></pre><p>status สรุปสถานะ; diff ปกติเทียบ working tree กับ index สำหรับส่วนที่ยังไม่ stage ของไฟล์ tracked (ไม่แสดงเนื้อหา untracked files); diff --staged เทียบ index กับ commit ปัจจุบัน; commit บันทึก staged snapshot</p><p>ถ้าแก้ไฟล์เป็น A → git add → แก้อีกเป็น B → git commit โดยไม่ add ใหม่: commit จะได้ A ที่เคย stage ส่วน B ยังเป็นการเปลี่ยนแปลงใน working tree ไฟล์เดียวจึงมีทั้ง staged และ unstaged changes ได้</p>`),
 S('init, clone และ remotes',`<p><code>git init</code> เริ่ม repository ในโฟลเดอร์; <code>git clone URL</code> คัด repository พร้อมประวัติมาเป็น local และมักตั้ง remote ชื่อ origin ให้ origin เป็นชื่อที่ตั้งได้ ไม่ใช่คำสั่งพิเศษหรือชื่อ branch</p><pre><code>git remote -v
git fetch origin
git pull --ff-only
git push origin main</code></pre><p>fetch ดาวน์โหลด objects และอัปเดต remote-tracking refs โดยไม่รวมเข้า branch ปัจจุบันเอง; pull fetch แล้ว integrate ตาม option/config เช่น merge หรือ rebase; --ff-only ยอมเฉพาะ fast-forward และปฏิเสธเมื่อประวัติแยกกัน; push ส่ง local commits/refs ไป remote ไม่ใช่อัปโหลด unstaged files</p>`),
 S('Branch และ Pull Request',`<pre><code>git switch -c feature/quiz
# แก้ไฟล์ แล้ว add และ commit
git switch main
git merge feature/quiz</code></pre><p>branch เป็นชื่ออ้างอิง commit ทำให้แยกแนวพัฒนาได้ Pull Request บน GitHub เป็นข้อเสนอให้ review และรวมการเปลี่ยนระหว่าง branches ไม่ใช่คำสั่ง git pull การเปิด PR ไม่ได้รวมเข้า target branch ทันที</p><p>merge conflict เกิดเมื่อ Git รวมบางส่วนเองไม่ได้ ต้องอ่านทั้งสองฝั่งแก้ไฟล์ให้ถูก ลบ conflict markers แล้ว stage/commit ตามขั้นตอน ไม่ใช่เลือกฝั่งใดแบบสุ่ม</p>`),
 S('.gitignore และ tracked files',`<pre><code># ตัวอย่าง .gitignore สำหรับแอป Node
node_modules/
.env
.env.*
!.env.example
*.log</code></pre><p>.gitignore ระบุไฟล์ที่ยังไม่ tracked ให้ Git ข้ามโดยปกติ <code>!</code> เป็นการยกเว้น pattern ก่อนหน้า แต่ถ้าไฟล์ถูก tracked แล้ว การเพิ่มชื่อเข้า ignore ไม่ทำให้หายจาก index หรือประวัติ</p><pre><code># ตัวอย่างแนวทาง: ถ้าตั้งใจเลิกติดตามแต่เก็บไฟล์ในเครื่อง
git rm --cached .env
# จากนั้น commit การเปลี่ยนแปลง index และ .gitignore</code></pre><p>คำสั่งข้างบนไม่ได้ลบรหัสจาก commits เก่า หาก secret เคยถูกส่งออกไป ต้องเพิกถอน/เปลี่ยน secret และจัดการประวัติตามกระบวนการที่เหมาะสม การลบไฟล์ใน commit ใหม่ไม่ทำให้ประวัติเดิมสะอาดเอง</p>`),
 S('ไฟล์ที่ควรเก็บและทางเลือกก่อน commit',`<p>เก็บ source, package.json และ lockfile สำหรับแอป npm เพื่อสร้างงานซ้ำได้; .env.example เก็บเฉพาะชื่อ key และค่าตัวอย่างที่ไม่เป็นความลับ การ ignore build output ขึ้นกับวิธี deploy: โปรเจกต์ static บางแบบตั้งใจ track dist จึงไม่ควรตัดสินว่า dist ต้องถูก ignore ทุก repository</p><p>ถ้า stage ผิดแต่ยังอยากเก็บการแก้ไฟล์ ใช้ <code>git restore --staged path</code> ใน repository ที่มี commit แล้ว หากต้องการย้อน commit ที่เผยแพร่แล้ว <code>git revert</code> สร้าง commit กลับการเปลี่ยนแปลง ไม่เหมือน reset ที่ย้าย refs และอาจกระทบประวัติร่วม ควรเข้าใจผลก่อนเลือกคำสั่ง</p>`)
 ],tips:[['สี่ที่','working → add → staging → commit → local → push → remote'],['fetch/pull','fetch รับ; pull รับแล้ว integrate'],['ignore','กัน untracked ไม่ลบ tracked และไม่ลบประวัติ'],['PR','เสนอ review/merge ไม่ใช่ git pull']],
 quiz:[
 ['Git กับ GitHub ต่างกันอย่างไร','Git คุมเวอร์ชัน; GitHub โฮสต์และช่วยร่วมงาน','GitHub เป็นชื่อคำสั่ง commit','Git ต้องมี GitHub เสมอ','Git คือ cloud storage เท่านั้น','Git ทำงาน local ได้ ส่วน GitHub เป็นบริการหนึ่ง','เครื่องมือกับบริการ'],
 ['git add ทำอะไร','เตรียม snapshot ลง staging/index','ส่งไฟล์ไป GitHub ทันที','สร้าง branch','ลบ commit เก่า','add จัดสิ่งที่จะเข้า commit ถัดไป','add เข้าคิว commit'],
 ['git commit ปกติบันทึกอะไร','staged snapshot','ทุกไฟล์ใน Downloads','เฉพาะไฟล์บน remote','unstaged changes ทุกอย่างเสมอ','commit ใช้สิ่งที่อยู่ใน index','index คือเนื้อ commit'],
 ['stage เนื้อหา A แล้วแก้เป็น B โดยไม่ add ใหม่ ก่อน commit ได้อะไร','commit A และ B ยังเป็นการแก้ใน working tree','commit B เสมอ','commit ทั้ง A/B เป็นสอง commits','ไม่มีอะไร commit ได้','index ไม่อัปเดตเองตาม working tree','stage ถ่าย snapshot'],
 ['ดูภาพรวม staged/unstaged/untracked ใช้อะไร','git status','git push','git init','npm status','status แสดงสถานะ working tree/index','ดูสถานะก่อน'],
 ['git diff --staged เทียบอะไร','index กับ commit ปัจจุบัน','working tree กับ internet','GitHub กับ npm','สอง CSS files เสมอ','แสดงสิ่งที่จะเข้า commit','staged เทียบ HEAD'],
 ['ดาวน์โหลด repo พร้อมประวัติมาเริ่มงานใช้ข้อใด','git clone URL','git add URL','git commit URL','npm clone URL','clone สร้าง local copy ของ repository','clone ทั้ง repo'],
 ['origin โดยทั่วไปคืออะไร','ชื่อ remote ที่ตั้งได้','branch main เสมอ','คำสั่งเข้ารหัส','ชื่อ commit แรกเสมอ','clone มักตั้ง remote origin แต่เปลี่ยนชื่อได้','origin เป็นชื่อ remote'],
 ['git fetch ทำอะไรโดยทั่วไป','รับ objects/remote refs โดยไม่ integrate เข้า branch ปัจจุบันเอง','merge เสมอทันที','push commits','แก้ทุก conflict','fetch รับข้อมูลก่อน ผู้ใช้เลือก integrate','fetch รับอย่างเดียว'],
 ['git pull โดยแนวคิดประกอบด้วยอะไร','fetch แล้ว integrate ตาม option/config','add แล้ว commit','push แล้ว reset','clone ทุกครั้ง','integrate อาจ merge/rebase หรือ fast-forward ตามการตั้งค่า','pull รับแล้วรวม'],
 ['git push ส่งอะไรไป remote','local commits/refs ที่เลือก','ทุก unstaged file ทันที','เฉพาะ node_modules','เฉพาะไฟล์ .env','ต้อง commit ก่อนจึงส่งประวัติที่ต้องการได้','push ส่ง commits'],
 ['git switch -c feature/quiz ทำอะไร','สร้างและสลับไป branch ใหม่','ลบทุก branch','เปิด PR ทันที','เปลี่ยน remote URL','-c create branch แล้ว switch','สร้างแล้วไป'],
 ['Pull Request บน GitHub คืออะไร','ข้อเสนอ review และ merge การเปลี่ยนแปลง','git pull ที่รันอัตโนมัติเสมอ','การลบ branch ทันที','package manager','PR เป็น workflow ร่วมงานบนบริการ','PR เสนอรวม'],
 ['เพิ่มไฟล์ tracked เข้า .gitignore แล้วเกิดอะไร','ไฟล์ยัง tracked จนจัดการ index เพิ่ม','ประวัติถูกลบทันที','ไฟล์หายจากเครื่อง','commit เก่าถูกแก้หมด','ignore ไม่ใช้ยกเลิก tracked files','tracked ไม่หายเอง'],
 ['git rm --cached .env ใช้ทำอะไร','เอาออกจาก index โดยเก็บ working file','ลบ secret ทุก commit ย้อนหลัง','ลบ repository ทั้งหมด','เปลี่ยนรหัสผ่านจริง','cached จัด index ไม่ล้างประวัติ','ออก index ไม่ออกอดีต'],
 ['ต้องยกเลิก staging แต่เก็บการแก้ไฟล์ใน repo ที่มี commit แล้วใช้','git restore --staged path','git push path','git init path','git clone path','restore --staged เปลี่ยน index ไม่ใช่ working tree ตามคำสั่งนี้','unstage ไม่ทิ้งงาน'],
 M('ข้อใดถูกเกี่ยวกับ local/remote',['commit ทำในเครื่องได้','push จึงส่ง commits ไป remote'],['commit ทุกครั้งต้องใช้ internet','git add ส่งไฟล์ไป GitHub'],'Git เก็บประวัติ local และมีคำสั่ง sync แยก','commit ไม่ใช่ push'),
 M('ไฟล์ใดเหมาะกับ .gitignore ของแอป Node ทั่วไป',['node_modules/','.env ที่มีค่าลับ'],['package.json','package-lock.json ของแอปทั่วไป'],'เก็บสูตร dependency กับ lock; ไม่เก็บ generated packages/secrets','สร้างซ้ำได้โดยไม่เผย secret'),
 M('เมื่อ secret เคยถูก commit/push แล้ว ข้อใดถูก',['เพิ่ม ignore อย่างเดียวไม่ลบประวัติ','ควรเพิกถอนหรือหมุนเวียน secret ที่รั่ว'],['ลบไฟล์ใน commit ใหม่แล้วรหัสเดิมปลอดภัยเสมอ','git rm --cached ลบ secret จากทุก clone'],'ประวัติและสำเนาอาจยังมีรหัส จึงต้องจัดการตัว secret ด้วย','แก้รหัส ไม่ใช่แค่ไฟล์'),
 M('ข้อใดถูกเกี่ยวกับการร่วมงาน',['merge conflict ต้องแก้เนื้อหาให้ถูกก่อนจบการรวม','PR เปิดโอกาสให้ review ก่อน merge','pull --ff-only อาจปฏิเสธเมื่อประวัติแยกกัน'],['เปิด PR แล้ว target branch เปลี่ยนทันทีเสมอ'],'แต่ละกลไกมีขั้นตอนและเงื่อนไข ไม่ได้รวมทุกอย่างอัตโนมัติ','review และตรวจประวัติ')
 ]});

addChapter({title:'Environment Variables และ Project Setup',subtitle:'แยก config/secret ตรวจค่าจาก environment และเชื่อมภาพรวมทั้งระบบ',group:'Project Setup',minutes:30,sources:[],
 refs:[['Node.js · Environment variables','https://nodejs.org/api/environment_variables.html'],['Next.js · Environment variables','https://nextjs.org/docs/app/guides/environment-variables'],['Git · gitignore','https://git-scm.com/docs/gitignore'],['npm · package.json','https://docs.npmjs.com/cli/v11/configuring-npm/package-json/']],
 goals:['อ่าน process.env และแปลง string อย่างถูกต้อง','แยก runtime/build-time และ public/secret','อธิบายลำดับ clone/install/config/run และ request flow'],
 sections:[
 S('Environment variable คืออะไร',`<p>Environment variables คือค่าที่สภาพแวดล้อมส่งให้ process เช่น PORT หรือ API_URL ช่วยให้ source เดียวกันใช้ config ต่างกันใน development/test/production ได้ ไม่ใช่ตัวแปร const/let ในไฟล์ JS และไม่ต้อง commit ค่าจริงทุก environment ลง source</p><pre><code>const rawPort = process.env.PORT ?? '3000';
const port = Number(rawPort);
if (!Number.isInteger(port) || port &lt; 1 || port &gt; 65535) {
  throw new Error('Invalid PORT');
}</code></pre><p>process.env เป็น API ฝั่ง Node ไม่ใช่ DOM API ของ browser ค่าที่อ่านจาก environment โดยทั่วไปเป็น string; key ที่ไม่มีได้ undefined การนำไปเป็น number/boolean ต้อง parse และ validate</p>`),
 S('กับดัก string และ default value',`<pre><code>// สมมติค่าจาก environment
const rawFlag = 'false';
Boolean(rawFlag);             // true เพราะเป็น string ไม่ว่าง
rawFlag === 'true';           // false
Number('3000');              // 3000
Number('not-a-number');      // NaN
const limit = Number(process.env.LIMIT ?? '20');</code></pre><p><code>??</code> ใช้ default เมื่อ null/undefined แต่ไม่แทน '' หรือ 0 ต่างจาก || ที่แทนทุก falsy value การใช้ default ไม่แทน validation: empty string ผ่าน ?? แล้ว Number('') ได้ 0 ต้องตัดสินว่าอนุญาตหรือไม่ตามกฎของงาน</p>`),
 S('.env ไม่ได้โหลดเองทุก runtime',`<pre><code># .env ตัวอย่าง ไม่ใช่ JSON
PORT=3000
API_URL=https://api.example.test
FEATURE_ENABLED=false</code></pre><p>ไฟล์ .env เป็นรูปแบบเก็บคู่ key/value แต่การอ่านเข้า process ต้องมีตัวโหลด เช่น Node รุ่นที่รองรับ <code>node --env-file=.env server.mjs</code>, library dotenv หรือ framework ที่มีระบบโหลดให้ ตรวจเวอร์ชัน/เครื่องมือที่อาจารย์ใช้ ไม่จำว่า Node ทุกเวอร์ชันโหลด .env เอง</p><p>เมื่อแก้ environment ที่ใช้ตอนเริ่ม process มักต้อง restart process ส่วนค่าที่ถูกฝังตอน build ต้อง build ใหม่ ไม่ใช่แก้ .env แล้ว browser bundle เก่าเปลี่ยนเอง</p>`),
 S('Secret ฝั่ง server และ public config',`<table><tr><th>ค่า</th><th>แนวทาง</th></tr><tr><td>database password / private API token</td><td>ใช้ฝั่ง server ไม่ส่งใน bundle/HTML/response</td></tr><tr><td>public base URL</td><td>อาจเปิดให้ client รู้ถ้าตั้งใจ</td></tr><tr><td>.env.example</td><td>เก็บชื่อ key และค่าตัวอย่างปลอดความลับ</td></tr></table><p>ชื่อไฟล์ .env ไม่ได้เข้ารหัสหรือป้องกันการรั่วด้วยตัวเอง ใน Next.js ตัวแปร NEXT_PUBLIC_ ที่อ้างแบบรองรับจะถูก inline เข้า bundle ฝั่ง client ตอน build จึงถือว่าเปิดเผย ห้ามใช้กับ secret; prefix ของเครื่องมืออื่นอาจต่างกัน</p><p>ให้ server อ่าน secret เพื่อเรียกบริการ แล้วตอบกลับเฉพาะข้อมูลที่ผู้ใช้มีสิทธิ์ การใช้ server ไม่ได้ทำให้ response ที่ส่ง secret ออกไปปลอดภัย</p>`),
 S('ขั้นตอนเริ่มทำโปรเจกต์ที่อ่านสอบได้',`<ol><li>อ่าน README และเวอร์ชัน runtime ที่กำหนด แล้ว clone repository</li><li>ตรวจ package.json/scripts และ lockfile; ใช้ package manager ที่โปรเจกต์กำหนด</li><li>สำหรับโปรเจกต์ npm ที่มี lockfile ตรงกัน ใช้ npm ci เพื่อทำซ้ำ dependencies</li><li>เตรียม environment จากรายการ .env.example ใส่ค่าจริงเฉพาะเครื่อง/ระบบที่ใช้งาน</li><li>รัน script เช่น npm run dev แล้วตรวจ URL/port ที่แสดง</li><li>ก่อน commit ตรวจ git diff และไม่ stage secrets หรือ node_modules</li></ol><p>ตัวอย่างนี้เป็นแนวทางโปรเจกต์ Node ทั่วไป เว็บสรุปที่กำลังอ่านเป็น static HTML/JS จึงเปิดใช้ได้โดยไม่ต้องติดตั้ง npm dependencies เพิ่ม</p>`),
 S('เชื่อมทุกชั้นของแอป',`<p>กรณีผู้ใช้กดปุ่มใน React: event handler → fetch → HTTP request → Express route/middleware หรือ Next route handler → server ใช้ config/secret ติดต่อบริการ → response JSON → client อ่าน JSON แล้วอัปเดต state → React render UI โดย CSS คุม layout</p><p>Git เก็บประวัติ source; npm จัด dependencies; Node รันฝั่ง server; engine ประมวลผล JS แต่ละชั้นมีหน้าที่ต่างกัน ข้อสอบแบบสถานการณ์มักถามว่า “ควรแก้ที่ชั้นใด” เช่น CORS/config server, key ของ React list, parser ก่อน Express route หรือ token ที่หลุดเข้า client bundle</p>`)
 ],tips:[['env เป็นข้อความ','"false" ยัง truthy; แปลงตามความหมาย'],['.env ไม่ใช่ตู้เซฟ','ต้องโหลดให้ถูกและไม่เผย secret'],['build กับ runtime','ค่าฝัง bundle ต้อง build ใหม่'],['เริ่มงาน','อ่าน → ติดตั้งตาม lock → ตั้ง config → รัน → ตรวจ']],
 quiz:[
 ['Environment variables ช่วยเรื่องใด','แยก config ตามสภาพแวดล้อมจาก source','ทำให้ JS ไม่ต้องมี engine','แทน Git commits','ทำให้ทุกค่าเป็น secret อัตโนมัติ','source เดียวใช้ค่าต่างกันระหว่าง environment ได้','config แยกจากโค้ด'],
 ['Node อ่าน PORT ผ่านอะไร','process.env.PORT','document.env.PORT','window.PORT เสมอ','npm.PORT','process.env เป็นช่องอ่าน environment ของ Node','process ฝั่ง Node'],
 ['PORT=3000 จาก environment โดยทั่วไปอ่านเป็นชนิดใด','string','number เสมอ','boolean','Date','ต้องแปลงเองก่อนคำนวณ','env เป็น string'],
 ['key ใน process.env ที่ไม่มีอยู่ให้ค่าใด','undefined','null เสมอ','0','false','property ที่ไม่มีโดยทั่วไป undefined','ไม่มีค่า undefined'],
 ['Boolean("false") ได้อะไร','true','false','undefined','SyntaxError','string ไม่ว่างเป็น truthy ไม่ได้อ่านความหมายภาษา','ข้อความ false ยังจริง'],
 ['ต้องเปิด feature เฉพาะ env เท่ากับข้อความ true ใช้ข้อใด','process.env.FEATURE === "true"','Boolean(process.env.FEATURE) ทุกกรณี','process.env.FEATURE === true','Number("true")','เทียบ string ให้ตรงสัญญาที่กำหนด','parse ตามสัญญา'],
 ['Number("abc") จาก env ควรรับมืออย่างไร','ตรวจ NaN และปฏิเสธหรือใช้กฎ fallback','ถือเป็น 0 อัตโนมัติ','ถือเป็น true','ส่งเป็น port ได้เลย','การแปลงล้มเหลวต้อง validate','แปลงแล้วตรวจ'],
 ['x ?? "fallback" ใช้ default เมื่อใด','x เป็น null หรือ undefined','x เป็นทุก falsy value','x เป็น "false"','x เป็น 0 เสมอ','nullish coalescing แคบกว่า ||','nullish ไม่ใช่ falsy'],
 ['สร้าง .env ไว้แล้ว Node ทุกเวอร์ชันโหลดเองหรือไม่','ไม่ ต้องมีตัวโหลดหรือเครื่องมือที่รองรับ','ใช่เสมอ','ใช่เฉพาะชื่อ PORT','ไม่เพราะ .env ใช้กับ JS ไม่ได้เลย','ต้องดู runtime flag/library/framework','ไฟล์ไม่เท่ากับโหลด'],
 ['ตัวอย่าง flag โหลด .env ใน Node รุ่นที่รองรับคืออะไร','node --env-file=.env server.mjs','node --gitignore=.env server.mjs','npm --css=.env','git env server.mjs','--env-file เป็นความสามารถที่ต้องตรวจรุ่น Node','ตรวจรุ่นและ flag'],
 ['ข้อใดควรอยู่ฝั่ง server โดยไม่ส่งให้ client','database password','ชื่อสีธีมทั่วไป','public URL ที่ตั้งใจเปิดเผย','ข้อความหัวเว็บ','รหัสฐานข้อมูลเป็น secret','secret ไม่ลง bundle'],
 ['.env.example ควรมีอะไร','ชื่อ key กับค่าตัวอย่างที่ไม่เป็นความลับ','password จริงทุกระบบ','private token ของ production','node_modules ทั้งชุด','example บอกสิ่งที่ต้องตั้งค่าโดยไม่เผยค่าจริง','example ไม่ใช่ secret'],
 ['NEXT_PUBLIC_ ใน Next.js โดยทั่วไปหมายถึงอะไร','ตั้งใจให้ค่าถูกใช้ใน client bundle ได้','เข้ารหัสเป็น private เสมอ','ส่งเฉพาะ GitHub','ปิด cache ทั้งระบบ','ค่าที่ inline ใน bundle เปิดเผยแก่ผู้รับ bundle','PUBLIC เปิดเผย'],
 ['เปลี่ยน env ที่ถูก inline ตอน build แล้วต้องทำอะไรเพื่อให้ bundle ใหม่ใช้ค่าใหม่','build และเผยแพร่ bundle ใหม่ตาม workflow','แก้ .env แล้ว bundle เดิมเปลี่ยนทันที','แก้ Git username','ลบ browser history อย่างเดียว','bundle เก่ามีค่าที่ฝังไว้แล้ว','build-time ต้อง rebuild'],
 ['npm project มี lockfile ที่ตรงกันและต้องติดตั้งซ้ำแน่นอนควรใช้','npm ci','git pull dependencies','node install','npm init ทุกครั้ง','ci ติดตั้งตาม lockfile ของ npm','ตาม lock ใช้ ci'],
 ['React กดปุ่มแล้ว fetch ไป Express สิ่งใดอยู่ขา server','middleware และ route handler','onClick ของปุ่มใน browser','CSS layout ของปุ่ม','client state setter','handler บน server รับ HTTP request','แยก client/server'],
 M('ข้อใดถูกเกี่ยวกับ env values',['มักต้องแปลง string ก่อนคำนวณ','ต้อง validate หลังแปลง','key ที่ไม่มีอาจใช้ default ตามกฎของงาน'],['Number แปลงทุกข้อความเป็นเลขใช้งานได้'],'conversion อาจได้ NaN/ค่าที่ผิดช่วง จึงต้องตรวจ','parse validate default'),
 M('ข้อใดช่วยจัดการ secret เหมาะสม',['ignore ไฟล์ค่าจริงที่ไม่ควร commit','ใช้ .env.example ที่ไม่มีรหัสจริง'],['เติม NEXT_PUBLIC_ ให้ secret เพื่อให้อ่านง่าย','ส่ง secret กลับใน JSON ทุกครั้ง'],'ignore และ example ลดโอกาสเผยไฟล์ ส่วน prefix public/response ทำให้ข้อมูลออกสู่ client','เก็บ server ไม่ส่งออก'),
 M('ข้อใดถูกเกี่ยวกับ build/runtime',['ค่าที่อ่านตอนเริ่ม process อาจต้อง restart หลังเปลี่ยน','ค่าที่ฝังใน bundle ต้องสร้าง bundle ใหม่เพื่อเปลี่ยน'],['แก้ .env บน server แล้วทุก browser bundle เก่าเปลี่ยน','runtime กับ build-time คือเวลาเดียวกันเสมอ'],'เวลาที่อ่านค่าเป็นตัวกำหนดว่าต้อง restart หรือ rebuild','ดูว่าค่าถูกอ่านเมื่อใด'),
 M('ในการเตรียมโปรเจกต์ ข้อใดเหมาะสม',['อ่าน README และ scripts','ใช้ lockfile/package manager ให้ตรงโปรเจกต์','ตรวจ diff ก่อน commit'],['commit node_modules และรหัสจริงทุกครั้ง'],'ขั้นตอนเริ่มงานต้องสร้างซ้ำได้และรักษาค่าที่ไม่ควรเผย','อ่าน ตั้งค่า ตรวจ')
 ]});
