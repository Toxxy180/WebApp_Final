addChapter({
 title:'เว็บและ HTTP', subtitle:'จาก URL ในเบราว์เซอร์ สู่ข้อมูลที่เซิร์ฟเวอร์ตอบกลับ',group:'พื้นฐานเว็บ',
 sources:[['HTTP for Developer.pdf','1–36']], minutes:30,
 goals:['อธิบายบทบาท Client, Server, URL และ DNS','อ่านโครงสร้าง Request / Response และรหัสสถานะ','เชื่อมโยง HTTP, HTTPS และการแสดงผลหน้าเว็บ'],
 sections:[
 S('ทำความเข้าใจการทำงานของเว็บ',`<p>World Wide Web คือพื้นที่ของทรัพยากรที่เชื่อมโยงกันด้วยลิงก์และระบุตำแหน่งด้วย URL ทรัพยากรอาจเป็น HTML, CSS, JavaScript, ภาพ เสียง หรือวิดีโอ ส่วน Internet คือโครงข่ายที่ช่วยขนส่งข้อมูลเหล่านี้ เว็บเป็นบริการหนึ่งที่ทำงานผ่าน Internet</p><div class="flow"><span>เบราว์เซอร์<br><small>Client</small></span><b>Request →<br>← Response</b><span>Web Server<br><small>ทรัพยากร / ข้อมูล</small></span></div><p>Client เป็นฝ่ายเริ่มขอทรัพยากร Server รับคำขอ ประมวลผล แล้วส่งผลกลับ บทบาทเหล่านี้เป็นบทบาทของซอฟต์แวร์ ไม่จำเป็นต้องเป็นเครื่องคนละประเภท</p><table><tr><th>ส่วนประกอบ</th><th>หน้าที่</th></tr><tr><td>HTML</td><td>โครงสร้างและความหมายของเนื้อหา</td></tr><tr><td>CSS</td><td>รูปแบบ สี และการจัดวาง</td></tr><tr><td>JavaScript</td><td>ตรรกะ พฤติกรรม และการโต้ตอบ</td></tr></table>`),
 S('URL, DNS และลำดับการเปิดเว็บไซต์',`<pre><code>https://learn.example.com:443/lessons?chapter=1#quiz
│       │                 │   │        │         └ fragment
scheme  host              port path     query</code></pre><p>DNS ช่วยหาที่อยู่ IP จากชื่อโฮสต์ ไม่ได้ส่งเนื้อหาเว็บมาให้โดยตรง เบราว์เซอร์อาจใช้ผลจากแคช หรือถาม DNS resolver ซึ่งอาจค้นต่อไปยัง root, TLD และ authoritative server</p><ol><li>อ่าน URL และตรวจแคชที่เกี่ยวข้อง</li><li>ค้น IP ด้วย DNS เมื่อจำเป็น</li><li>สร้างการเชื่อมต่อ; แบบจำลองในสไลด์เน้น HTTP/1.1 ผ่าน TCP และเพิ่ม TLS เมื่อใช้ HTTPS</li><li>ส่ง Request และรับ Response</li><li>แปล HTML สร้าง DOM และอ่าน CSS เพื่อสร้าง CSSOM</li><li>โหลดทรัพยากรอื่น รัน JavaScript และจัดวาง/วาดหน้าเว็บ</li></ol><p class="note">รายละเอียดเสริม: กระบวนการจริงอาจใช้แคชและทำหลายขั้นตอนซ้อนกัน HTTP/2 ใช้เฟรมไบนารี ส่วน HTTP/3 ใช้ QUIC บน UDP จึงไม่ควรจำว่า HTTP ทุกเวอร์ชันเป็นข้อความบน TCP เสมอ</p>`),
 S('Request และ Response',`<p>HTTP อยู่ระดับ Application ในแบบจำลอง OSI สไลด์แสดงข้อความแบบ HTTP/1.1 เพื่ออ่านโครงสร้างได้ง่าย Request เริ่มด้วย method, request target และ version ตามด้วย headers บรรทัดว่าง และ body เมื่อมี</p><pre><code>GET /lessons HTTP/1.1
Host: example.com
Accept-Language: th

</code></pre><p>Response เริ่มด้วย version, status code และข้อความสถานะ แล้วจึงเป็น headers และ body เช่น HTML หรือ JSON</p><pre><code>HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 11

{"ok":true}</code></pre><p>ตัวอย่างนี้ body เป็น JSON ยาว 11 ไบต์ใน UTF-8 เพราะเป็นอักขระ ASCII ทั้งหมด การส่งข้อความภาษาไทยต้องคิดจำนวนไบต์ ไม่ใช่จำนวนตัวอักษร</p>`),
 S('อ่าน Status Code ให้เข้าใจ',`<table><tr><th>กลุ่ม</th><th>ความหมาย</th><th>ตัวอย่าง</th></tr><tr><td>1xx</td><td>แจ้งข้อมูลระหว่างดำเนินการ (เสริม)</td><td>100 Continue</td></tr><tr><td>2xx</td><td>สำเร็จ</td><td>200 OK, 201 Created, 204 No Content</td></tr><tr><td>3xx</td><td>เปลี่ยนทาง / จัดการการใช้แคช</td><td>301 Moved Permanently, 302 Found, 303 See Other, 304 Not Modified</td></tr><tr><td>4xx</td><td>ปัญหาฝั่งคำขอหรือสิทธิ์</td><td>400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict</td></tr><tr><td>5xx</td><td>ปัญหาฝั่งเซิร์ฟเวอร์</td><td>500 Internal Server Error, 503 Service Unavailable</td></tr></table><p>401 สื่อว่าจำเป็นต้องยืนยันตัวตนอย่างถูกต้อง ส่วน 403 คือเซิร์ฟเวอร์ปฏิเสธการเข้าถึง ไม่ใช่กรณีเดียวกันเสมอ 404 คือไม่พบทรัพยากรตามที่ขอ</p><p class="note">ปรับความแม่นยำจากสไลด์หน้า 25–26: ชื่อของ 303 คือ <strong>See Other</strong> และควรแยกชื่อ/ความหมายของ 401 กับ 403 รวมถึง 500 กับ 503 ออกจากกัน</p>`),
 S('Headers, Content-Type และไฟล์ดาวน์โหลด',`<p><code>Content-Type</code> บอกชนิดของ body เช่น <code>text/html</code>, <code>text/css</code>, <code>text/javascript</code>, <code>application/json</code>, <code>image/png</code>, <code>video/mp4</code> และ <code>multipart/form-data</code> สำหรับข้อมูลฟอร์มหลายส่วน</p><pre><code>Content-Type: text/html; charset=utf-8

Content-Type: application/pdf
Content-Disposition: attachment; filename="report.pdf"</code></pre><p><code>Content-Disposition: attachment</code> ระบุให้ปฏิบัติต่อเนื้อหาเป็นไฟล์แนบ พร้อมชื่อไฟล์ ส่วน Content-Type บอกว่าไฟล์นั้นเป็นข้อมูลชนิดใด Headers จึงมีความหมายต่างจาก body ที่เป็นข้อมูลจริง</p>`),
 S('HTTPS, Port และ Stateless',`<p>พอร์ตมาตรฐานของ HTTP คือ 80 และ HTTPS คือ 443 HTTPS ใช้ TLS ปกป้องการสื่อสาร รวมทั้งเข้ารหัส ตรวจความครบถ้วน และตรวจสอบตัวตนเซิร์ฟเวอร์ผ่านใบรับรอง การมี HTTPS ไม่ได้ยืนยันว่าเนื้อหาในเว็บเชื่อถือได้ทุกอย่าง</p><p>HTTP เป็น <strong>stateless</strong>: แต่ละคำขอไม่ได้มีสถานะผู้ใช้ต่อเนื่องให้อัตโนมัติ แม้ใช้การเชื่อมต่อเดิมได้ แอปยังสร้าง session ได้ เช่น ให้เบราว์เซอร์ส่ง cookie ที่ใช้ระบุ session กลับมาในคำขอครั้งถัดไป ดังนั้น stateless ไม่ได้แปลว่าทำระบบล็อกอินไม่ได้</p>`)
 ],
 tips:[['สามเสาหลัก','HTML = โครงสร้าง, CSS = หน้าตา, JavaScript = พฤติกรรม'],['จำลำดับ','ชื่อ → IP → เชื่อมต่อ → ขอ → ตอบ → แสดงผล'],['จำหลักร้อย','2 สำเร็จ · 3 เปลี่ยนทาง · 4 คำขอ/สิทธิ์ · 5 เซิร์ฟเวอร์'],['แยกชนิดกับวิธีรับ','Content-Type = อะไร, Content-Disposition = รับอย่างไร'],['สถานะคนละเรื่อง','การเชื่อมต่อเดิมไม่ได้ทำให้เกิด session ผู้ใช้โดยอัตโนมัติ']],
 quiz:[
 ['บทบาทหลักของ HTTP คืออะไร','สื่อสารเพื่อขอและส่งทรัพยากรระหว่าง Client–Server','กำหนดสีและขนาดตัวอักษร','แปลงชื่อโดเมนเป็น IP โดยตรง','เก็บตัวแปร JavaScript','HTTP เป็นโพรโทคอลระดับแอปพลิเคชัน ส่วน CSS, DNS และ JavaScript มีหน้าที่ต่างกัน','HTTP = ขอและตอบ'],
 ['ใครเป็นฝ่ายเริ่ม HTTP Request ตามแบบจำลองในสไลด์','Client','Server เสมอ','DNS root server เสมอ','CSS parser','Client เริ่มคำขอ Server จึงตอบกลับตามคำขอนั้น','Client ขอ Server ตอบ'],
 ['DNS มีหน้าที่ใดในขั้นตอนเปิดเว็บ','ค้น IP ที่สัมพันธ์กับชื่อโฮสต์','แปล HTML เป็น DOM','สร้าง CSSOM','กำหนด HTTP status code','DNS ช่วยค้นตำแหน่งเชิงเครือข่าย ส่วนเบราว์เซอร์แปลเอกสารภายหลัง','ชื่อ → IP'],
 ['ใน https://example.com/notes ส่วน /notes คืออะไร','Path','Scheme','Port','Host','Path ระบุเส้นทางทรัพยากรภายในโฮสต์','หลัง host คือเส้นทาง'],
 ['พอร์ตมาตรฐานของ HTTPS คือข้อใด','443','80','22','53','HTTPS ใช้พอร์ตมาตรฐาน 443 ส่วน HTTP ใช้ 80','HTTPS → 443'],
 ['บรรทัด GET / HTTP/1.1 ประกอบด้วยอะไร','Method, request target, protocol version','Status code, body, port','Host, cookie, charset','IP, DNS, TLS','Request line แสดงวิธีขอ เป้าหมาย และเวอร์ชัน HTTP','ขอแบบไหน ที่ไหน เวอร์ชันอะไร'],
 ['ส่วนใดของ Response บอกว่าคำขอสำเร็จ','Status code 200','Host header','Path /','Accept-Language','200 OK เป็นรหัสสำเร็จที่พบทั่วไป ส่วน Host และ Accept-Language เป็น request headers','มองเลขสถานะก่อน'],
 ['รหัสใดหมายถึงไม่พบทรัพยากร','404','201','301','503','404 Not Found อยู่กลุ่ม 4xx','404 = หาของไม่เจอ'],
 ['เซิร์ฟเวอร์สร้างทรัพยากรใหม่สำเร็จควรสัมพันธ์กับรหัสใด','201','204','403','500','201 Created ใช้สื่อว่ามีการสร้างทรัพยากรสำเร็จ','201 = Created'],
 ['204 No Content สื่อถึงอะไร','ดำเนินการสำเร็จและไม่มี response body','ทรัพยากรไม่พบ','ต้องล็อกอินใหม่เสมอ','เซิร์ฟเวอร์ล่ม','204 อยู่กลุ่มสำเร็จ แต่ไม่มี body ให้แปลเป็นข้อมูล','No Content = ไม่มี body'],
 ['กลุ่ม 5xx บ่งชี้ปัญหาประเภทใด','เซิร์ฟเวอร์ไม่สามารถทำคำขอให้สำเร็จ','คำขอสำเร็จ','เปลี่ยนหน้าเสมอ','ชื่อโดเมนถูกต้อง','5xx เป็นกลุ่ม server error เช่น 500 หรือ 503','5 = ฝั่งเซิร์ฟเวอร์'],
 ['303 มีชื่อสถานะที่ถูกต้องว่าอะไร','See Other','Not Found','Unauthorized','Internal Server Error','303 See Other ให้ดูทรัพยากรอีกตำแหน่งหนึ่ง โดยทั่วไปติดตามด้วย GET','303 = ดูที่อื่น'],
 ['Header ใดเหมาะกับ body ที่เป็น JSON','Content-Type: application/json','Content-Type: image/jpeg','Content-Disposition: text/html','Host: application/json','ชนิดของ body ระบุผ่าน Content-Type และ media type ของ JSON คือ application/json','Type บอกชนิด'],
 ['ต้องการระบุให้รับ PDF เป็นไฟล์แนบ ใช้ header ใด','Content-Disposition: attachment','Accept-Language: th','Content-Type: text/plain','Connection: keep-alive','Content-Disposition ควบคุมการจัดการเนื้อหาแบบ inline หรือ attachment','Disposition = วิธีจัดการ'],
 ['คำว่า stateless หมายถึงอะไร','HTTP ไม่เชื่อมสถานะผู้ใช้ข้ามคำขอให้อัตโนมัติ','สร้างระบบล็อกอินไม่ได้','ทุกคำขอต้องเปลี่ยน IP','ห้ามใช้ connection เดิม','สถานะแอปต้องมีกลไกเพิ่ม เช่น cookie และ session','Stateless ยังมี session ได้'],
 ['การใช้ TCP connection เดิมกับหลาย Request ทำให้เกิด session ผู้ใช้อัตโนมัติหรือไม่','ไม่ การเชื่อมต่อและ session ผู้ใช้เป็นคนละแนวคิด','ใช่ เพราะ IP เท่ากับบัญชีผู้ใช้','ใช่ เพราะ GET เก็บตัวแปรได้','ไม่ เพราะ HTTP ส่งได้เพียงครั้งเดียว','Connection reuse ช่วยประสิทธิภาพ ไม่ได้ระบุผู้ใช้หรือจัดการ session ให้เอง','Connection ≠ login session'],
 ['HTTPS เพิ่มสิ่งใดจาก HTTP ผ่าน TLS','การปกป้องข้อมูลระหว่างส่งและตรวจสอบตัวตนเซิร์ฟเวอร์','การทำให้ HTML ไม่มีข้อผิดพลาด','การรับประกันว่าผู้ขายสุจริต','การแทนที่ DNS ทั้งหมด','TLS ปกป้องช่องทางการสื่อสาร ไม่ได้ตรวจคุณภาพเนื้อหาทั้งหมด','ล็อกช่องทาง ไม่ได้รับรองทุกเนื้อหา'],
 ['หลังรับ HTML เบราว์เซอร์สร้างโครงสร้างใด','DOM','DNS zone','Git tree','Node package','DOM เป็นแบบจำลองเอกสารที่เบราว์เซอร์ใช้และ JavaScript เข้าถึงได้','HTML → DOM'],
 ['401 ต่างจาก 403 อย่างไรโดยหลัก','401 ต้องยืนยันตัวตนอย่างถูกต้อง; 403 ปฏิเสธการเข้าถึง','401 สำเร็จ; 403 เปลี่ยนทาง','401 ไม่พบ; 403 เซิร์ฟเวอร์ล่ม','ทั้งสองหมายถึงสิ่งเดียวกันทุกกรณี','แม้เกี่ยวกับสิทธิ์เหมือนกัน แต่ใช้สื่อเงื่อนไขต่างกัน','401 ใคร · 403 ไม่ให้'],
 ['ข้อใดอธิบายแบบจำลอง HTTP ในสไลด์ได้แม่นยำที่สุด','ตัวอย่างข้อความเน้น HTTP/1.1; เวอร์ชันอื่นมีรายละเอียดต่างกัน','HTTP ทุกเวอร์ชันเป็นข้อความบน TCP','HTTP/3 ใช้ TCP เท่านั้น','HTTPS ใช้ได้เฉพาะ HTTP/1.1','ตัวอย่างข้อความในสไลด์เหมาะกับ HTTP/1.1; HTTP/2 มีเฟรมไบนารีและ HTTP/3 ใช้ QUIC','แยกแนวคิด HTTP ออกจากเวอร์ชัน']
 ]
});

addChapter({title:'HTML และสื่อ',subtitle:'สร้างตาราง รายการ สื่อ และเชื่อม JavaScript เข้าหน้าเว็บ',group:'พื้นฐานเว็บ',minutes:30,sources:[['HTML Table _ List.pdf','1–23'],['HTML JavaScript.pdf','1–10']],
 goals:['เลือกแท็กสำหรับตาราง รายการ ภาพ เสียงและวิดีโอ','อธิบาย alt, lazy loading และพื้นที่เหนือ/ใต้จอแรก','เชื่อมไฟล์ JavaScript และเข้าใจจังหวะการทำงานของ defer'],
 sections:[
 S('ตาราง: แถว คอลัมน์ และหัวตาราง',`<p>ใช้ตารางเมื่อข้อมูลมีความสัมพันธ์เป็นแถวและคอลัมน์ เช่น รายวิชาและหน่วยกิต <code>table</code> ครอบตาราง, <code>tr</code> คือแถว, <code>th</code> คือเซลล์หัวข้อ และ <code>td</code> คือเซลล์ข้อมูล</p><pre><code>&lt;table&gt;
  &lt;tr&gt;&lt;th&gt;วิชา&lt;/th&gt;&lt;th&gt;คะแนน&lt;/th&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Web&lt;/td&gt;&lt;td&gt;85&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;</code></pre><p>สีพื้นหลัง เส้นขอบ และระยะภายในเซลล์ปรับด้วย CSS ได้ เช่น <code>background-color</code>, <code>border</code> และ <code>padding</code> สไลด์มีตัวอย่าง <code>border="1"</code> แต่การเขียนเว็บใหม่ควรใช้ CSS จัดรูปแบบ</p>`),
 S('รายการและรายการซ้อน',`<p><code>ol</code> ใช้กับรายการที่ลำดับมีความหมาย <code>ul</code> ใช้เมื่อไม่มีลำดับ สมาชิกแต่ละรายการใช้ <code>li</code> รายการย่อยต้องวางไว้ในสมาชิกของรายการหลัก</p><pre><code>&lt;ol type="A"&gt;
  &lt;li&gt;พื้นฐานเว็บ&lt;/li&gt;
  &lt;li&gt;JavaScript
    &lt;ul&gt;&lt;li&gt;Arrays&lt;/li&gt;&lt;li&gt;Objects&lt;/li&gt;&lt;/ul&gt;
  &lt;/li&gt;
&lt;/ol&gt;</code></pre><p><code>ol type</code> ใช้ค่า <code>1</code>, <code>A</code>, <code>a</code>, <code>I</code>, <code>i</code> ได้ ส่วนรูปสัญลักษณ์ของ ul ควรใช้ <code>list-style-type: disc | circle | square</code> ใน CSS คำสะกดที่ถูกคือ <code>disc</code> ไม่ใช่ disk</p>`),
 S('ภาพ: src, alt และขนาด',`<pre><code>&lt;img src="campus.webp" alt="อาคารเรียนวิศวกรรม"
     width="800" height="450" loading="lazy"&gt;</code></pre><p><code>src</code> ระบุแหล่งภาพ <code>alt</code> อธิบายสาระของภาพให้เทคโนโลยีช่วยการเข้าถึงและใช้เมื่อภาพแสดงไม่ได้ ภาพตกแต่งล้วนใช้ <code>alt=""</code> ได้ ขนาดไฟล์และชนิดภาพมีผลต่อความเร็ว: JPEG เหมาะกับภาพถ่าย, PNG รองรับความโปร่งใส และ WebP เป็นตัวเลือกบีบอัดสำหรับเว็บ</p><p>ย่อ/บีบอัดภาพก่อนใช้ และให้ CSS รองรับหน้าจอ เช่น <code>max-width:100%; height:auto</code> รายละเอียดเสริมเพื่อความแม่นยำ: ยังใส่ width/height เพื่อสงวนอัตราส่วนและลดการขยับของหน้าได้ ไม่ต้องลบ attributes สองตัวนี้เพียงเพื่อให้ responsive</p>`),
 S('Lazy loading และจอแรก',`<p><strong>Above the fold</strong> คือเนื้อหาที่มองเห็นก่อนเลื่อนหน้า ส่วน <strong>Below the fold</strong> ต้องเลื่อนจึงเห็น ขึ้นกับขนาดหน้าจอ ไม่ใช่จำนวนพิกเซลตายตัว</p><p><code>loading="lazy"</code> เลื่อนการโหลดภาพไปใกล้เวลาที่จำเป็น เหมาะกับภาพด้านล่าง ภาพหลักในจอแรกควรโหลดตามปกติ เพื่อไม่เพิ่มเวลารอภาพสำคัญ ไม่จำเป็นต้อง lazy load ทุกภาพ</p>`),
 S('วิดีโอและเสียง',`<pre><code>&lt;video controls width="640"&gt;
  &lt;source src="lesson.mp4" type="video/mp4"&gt;
  เบราว์เซอร์นี้ไม่รองรับวิดีโอ
&lt;/video&gt;
&lt;audio controls&gt;
  &lt;source src="lesson.mp3" type="audio/mpeg"&gt;
  เบราว์เซอร์นี้ไม่รองรับเสียง
&lt;/audio&gt;</code></pre><p><code>controls</code> เพิ่มปุ่มเล่น/หยุด/ปรับเสียง <code>autoplay</code> ขอให้เล่นเอง และ <code>muted</code> ปิดเสียง วิดีโอ autoplay มักต้อง muted และยังขึ้นกับนโยบายเบราว์เซอร์ ข้อความภายในแท็กใช้เป็น fallback เมื่อไม่รองรับ</p><p class="note">ตัวอย่าง audio หน้า 22 ขาดเครื่องหมาย &lt; หน้า source; โค้ดด้านบนแก้รูปแบบให้ใช้ได้แล้ว</p>`),
 S('สามวิธีเชื่อม JavaScript',`<pre><code>&lt;!-- 1. Inline event ตามตัวอย่างในสไลด์ --&gt;
&lt;button onclick="alert('Hello')"&gt;ทักทาย&lt;/button&gt;

&lt;!-- 2. เขียนในเอกสาร --&gt;
&lt;script&gt;console.log('Hi');&lt;/script&gt;

&lt;!-- 3. เชื่อมไฟล์ภายนอก --&gt;
&lt;script src="js/app.js" defer&gt;&lt;/script&gt;</code></pre><p>ไฟล์ภายนอกช่วยใช้โค้ดซ้ำและแยกหน้าที่ HTML กับ JavaScript ได้ ตัวอย่าง onclick สามารถเปลี่ยนข้อความของ element ด้วย <code>document.getElementById('demo').innerText = Date()</code> ได้ แต่ต้องมี element ที่ id ตรงกันด้วย</p><p>Classic script ที่ไม่มี defer จะหยุดการ parse HTML ระหว่างโหลดและรัน การใส่ <code>defer</code> กับ classic script ภายนอกทำให้โหลดพร้อมการ parse แล้วรันหลัง parse เสร็จและก่อน DOMContentLoaded โดยรักษาลำดับของ deferred scripts อีกทางคือวาง script ก่อนปิด body เพื่อให้ element ที่อยู่ก่อนหน้าถูก parse แล้ว</p><p class="note">ใช้เครื่องหมาย quote ตรง <code>"</code> หรือ <code>'</code> ในโค้ด แทน smart quotes ที่ปรากฏในสไลด์บางหน้า และ defer ไม่ได้รอให้ภาพทุกภาพโหลดเสร็จ</p>`)
 ],tips:[['จำแท็กตาราง','table ครอบ → tr แถว → th หัว / td ข้อมูล'],['ลำดับสำคัญไหม','สำคัญใช้ ol; ไม่สำคัญใช้ ul; สมาชิกใช้ li'],['ภาพที่ช้าไม่ควรมาก่อน','Lazy เหมาะกับภาพที่ยังไม่เห็น; ภาพจอแรกให้โหลดทันที'],['defer','ดาวน์โหลดพร้อมอ่าน HTML → รันหลัง parse เสร็จ'],['สื่อจำเป็นคู่','video + video/mp4; audio + audio/mpeg']],
 quiz:[
 ['แท็กใดสร้างหนึ่งแถวของตาราง','tr','td','th','li','tr คือ table row ส่วน td/th เป็นเซลล์ภายในแถว','r = row'],
 ['เซลล์หัวตารางควรใช้แท็กใด','th','td','ol','source','th ระบุความหมายว่าเป็นหัวข้อของตาราง','h = header'],
 ['รายการขั้นตอนติดตั้งที่ต้องทำตามลำดับควรใช้','ol','ul','table เสมอ','video','ol คือ ordered list เหมาะเมื่อการเรียงลำดับมีสาระ','ordered = มีลำดับ'],
 ['สมาชิกของ ol หรือ ul ใช้แท็กอะไร','li','tr','p เท่านั้น','item','li คือ list item','li = list item'],
 ['รายการย่อยควรวางตำแหน่งใด','ภายใน li ของรายการหลัก','ภายนอก html','ภายใน attribute type','ภายใน source','รายการย่อยสัมพันธ์กับสมาชิกหลัก จึงซ้อนอยู่ใน li นั้น','ย่อยอยู่ในสมาชิก'],
 ['ol type="I" แสดงรูปแบบใด','เลขโรมันตัวใหญ่','ตัวอักษรอังกฤษตัวเล็ก','จุดวงกลม','เลขอารบิกเริ่มศูนย์','I ใช้เลขโรมันตัวใหญ่ เช่น I, II, III','I → I II III'],
 ['คุณสมบัติใดเพิ่มระยะระหว่างเนื้อหาและขอบเซลล์','padding','color','src','type','padding เป็นพื้นที่ภายในขอบของ element','padding = ระยะใน'],
 ['alt ของภาพมีไว้เพื่ออะไร','ให้ข้อความทดแทนที่สื่อสารสาระของภาพ','กำหนด URL ของไฟล์','บังคับภาพโหลดช้าลง','กำหนดจำนวนเฟรม','alt ช่วยสื่อความหมายเมื่อมองภาพไม่ได้หรือใช้ screen reader','alt = alternative text'],
 ['ภาพตกแต่งล้วนที่ไม่มีสาระเพิ่มเติมเหมาะกับ alt แบบใด','alt=""','ลบ src','alt="image" ทุกภาพ','alt="null"','alt ว่างบอกให้เทคโนโลยีช่วยการเข้าถึงข้ามภาพตกแต่ง','ตกแต่ง → alt ว่าง'],
 ['ภาพด้านล่างที่ต้องเลื่อนจึงเห็นเหมาะกับอะไร','loading="lazy"','autoplay','defer ใน img','controls','lazy loading เลื่อนโหลดภาพที่ยังไม่จำเป็นทันที','ยังไม่เห็น ยังไม่ต้องรีบ'],
 ['Above the fold หมายถึงอะไร','ส่วนที่เห็นก่อนเลื่อนหน้า','ส่วนท้ายเอกสารเสมอ','ภาพที่มีความโปร่งใส','ส่วนใน head','fold อ้างถึงขอบเขตจอแรก จึงเปลี่ยนตาม viewport','เห็นทันที = above'],
 ['ควรใช้ lazy loading กับภาพหลักจอแรกทุกครั้งหรือไม่','ไม่ เพราะอาจทำให้ภาพสำคัญแสดงช้า','ควร เพราะทำให้ทุกภาพโหลดก่อน','ควร เพราะ alt ต้องใช้ร่วมกัน','ไม่ เพราะ img ไม่มี loading','ภาพจอแรกควรโหลดได้ทันทีตามปกติ','ภาพสำคัญอย่าเลื่อนโหลด'],
 ['แท็กใดใช้ระบุไฟล์ MP3 ภายใน audio','source','link','track เท่านั้น','script','source ใช้ระบุ src และ media type ของไฟล์สื่อ','source = แหล่งสื่อ'],
 ['ต้องการปุ่มเล่นและหยุดวิดีโอ ใช้ attribute ใด','controls','defer','lazy','alt','controls ให้เบราว์เซอร์แสดงเครื่องมือควบคุมสื่อ','ควบคุม = controls'],
 ['เหตุใด autoplay มักใช้คู่ muted','เบราว์เซอร์มักจำกัดการเล่นอัตโนมัติที่มีเสียง','muted ช่วยแปลง MP4 เป็น MP3','autoplay ใช้ได้เฉพาะเสียง','muted ทำให้เล่นวนตลอด','การปิดเสียงช่วยให้เข้าเงื่อนไข autoplay ของหลายเบราว์เซอร์ แต่ไม่ได้รับประกันทุกกรณี','เล่นเองต้องคำนึงเสียง'],
 ['เชื่อมไฟล์ app.js จากภายนอกด้วยข้อใด','<script src="app.js"></script>','<link rel="script" href="app.js">','<style src="app.js"></style>','<js href="app.js">','ใช้ script และ src เพื่อโหลด JavaScript','JS → script src'],
 ['defer กับ classic script ภายนอกมีผลอย่างไร','โหลดพร้อม parse HTML แล้วรันหลัง parse เสร็จ','รันก่อนเริ่ม parse HTML ทุกครั้ง','รอภาพทั้งหมดโหลดเสร็จเสมอ','ป้องกัน syntax error','defer ช่วยไม่บล็อกการ parse ระหว่างดาวน์โหลดและรันหลังเอกสารถูก parse','defer = เลื่อนการรัน'],
 ['เหตุผลสำคัญของการวาง script ก่อนปิด body คืออะไร','element ที่อยู่ก่อนหน้าถูก parse แล้ว','เปลี่ยน script ให้เป็น CSS','ทำให้ไม่ต้องโหลดไฟล์ JS','ยกเลิก HTTP Request','โค้ดที่เลือก DOM ก่อนหน้ามีโอกาสพบ element ตามที่คาด','มี element ก่อนเลือกมัน'],
 ['width/height กับ CSS responsive อยู่ร่วมกันได้หรือไม่','ได้ attributes ช่วยสงวนอัตราส่วน ส่วน CSS ปรับขนาดแสดงผล','ไม่ได้ ต้องลบ attributes ทุกกรณี','ได้เฉพาะ PNG','ไม่ได้เพราะ height ต้องเท่ากับ width','ใช้ขนาดต้นฉบับร่วมกับ max-width:100% และ height:auto ได้','สงวนสัดส่วน + ยืดหยุ่น'],
 ['ตัวอย่าง onclick="alert(\'Hello\')" ทำอะไร','แสดงกล่องแจ้งเตือนเมื่อคลิก','รันเฉพาะตอน DNS lookup','สร้างตารางอัตโนมัติ','โหลด CSS จากภายนอก','onclick เป็นตัวจัดการเหตุการณ์ click ของ element','on + click = เมื่อคลิก']
 ]});

addChapter({title:'CSS และการจัดสไตล์',subtitle:'เลือกวิธีใส่ CSS และเปลี่ยนหน้าตาผ่าน JavaScript',group:'พื้นฐานเว็บ',minutes:25,sources:[['Methods for Applying Style to Elements.pdf','1–2']],
 goals:['เปรียบเทียบ Inline, Internal และ External CSS','เลือกใช้ style และ classList ตามสถานการณ์','เข้าใจว่าที่อยู่ของ CSS ไม่ใช่ตัวตัดสิน specificity เพียงอย่างเดียว'],
 sections:[
 S('CSS ประกอบด้วยอะไร',`<p>CSS แยกรูปแบบออกจากเนื้อหา กฎทั่วไปมี selector เพื่อเลือก element และ declarations ที่ประกอบด้วย property กับ value</p><pre><code>p {
  color: darkgreen;
  line-height: 1.7;
}</code></pre><p><code>p</code> คือ selector, <code>color</code> เป็น property และ <code>darkgreen</code> เป็น value หลายกฎสามารถมีผลต่อ element เดียวกัน เบราว์เซอร์จึงต้องใช้ cascade เพื่อเลือกค่าที่ใช้จริง</p>`),
 S('Inline styles: ใส่บน element',`<pre><code>&lt;h1 style="color: blue; font-size: 24px;"&gt;Hello&lt;/h1&gt;</code></pre><p>อยู่ใน attribute <code>style</code> และมีผลกับ element นั้น เหมาะกับทดลอง แก้เฉพาะจุด หรือค่าที่คำนวณขึ้นเฉพาะ element ข้อเสียคือทำซ้ำง่าย อ่าน HTML ยาก และดูแลหลายหน้าได้ลำบาก Inline declarations ปกติมีน้ำหนักเหนือกฎ author ปกติจาก stylesheet แต่ไม่ได้ชนะทุกกลไกของ cascade เช่น important declarations</p>`),
 S('Internal stylesheets: ภายในเอกสาร',`<pre><code>&lt;head&gt;
  &lt;style&gt;
    .intro { color: darkgreen; }
  &lt;/style&gt;
&lt;/head&gt;</code></pre><p>เขียนกฎใน style ภายใน HTML เหมาะกับเอกสารเดี่ยวหรือรูปแบบเฉพาะหน้า แต่แชร์กฎให้หลายไฟล์ได้ยากกว่าการเชื่อมไฟล์ CSS ภายนอก กฎยังต้องมี selector เพื่อระบุ element เป้าหมาย</p>`),
 S('External stylesheets: ใช้ซ้ำทั้งเว็บ',`<pre><code>&lt;!-- index.html --&gt;
&lt;link rel="stylesheet" href="styles.css"&gt;

/* styles.css */
body { background-color: #f0f0f0; }
.active-state { background-color: red; }</code></pre><p>หลายหน้าเชื่อมไฟล์เดียวกันได้ ทำให้แก้รูปแบบที่เดียวแล้วทุกหน้าที่เชื่อมได้รับผล มี request เพิ่มเพื่อรับ CSS แต่เบราว์เซอร์แคชไฟล์ไว้ใช้ซ้ำได้ เหมาะกับเว็บหลายหน้าและการดูแลระยะยาว</p><table><tr><th>วิธี</th><th>ตำแหน่ง</th><th>การใช้ซ้ำ</th></tr><tr><td>Inline</td><td>style attribute</td><td>เฉพาะ element</td></tr><tr><td>Internal</td><td>style ในเอกสาร</td><td>ภายในหน้านั้น</td></tr><tr><td>External</td><td>ไฟล์ .css ผ่าน link</td><td>ทุกหน้าที่เชื่อมไฟล์</td></tr></table>`),
 S('Cascade และ Specificity ที่ต้องระวัง',`<p class="note">ปรับความแม่นยำจากตารางในสไลด์: <strong>Internal ไม่ได้มี specificity สูงกว่า External โดยตัวมันเอง</strong> Selector แบบเดียวกันมี specificity เท่ากัน ไม่ว่าจะอยู่ใน style หรือไฟล์ .css</p><p>คำอธิบายเสริมแบบย่อ: cascade พิจารณาแหล่งที่มา ความสำคัญ และ cascade layers ก่อนเปรียบเทียบ specificity เมื่ออยู่เงื่อนไขเดียวกัน ถ้าเท่ากันอีกจึงพิจารณาลำดับ ตัวอย่างกฎปกติในเงื่อนไขเดียวกัน: selector แบบ id มีน้ำหนักเหนือ class และ class เหนือ type selector</p><pre><code>/* หากอยู่ origin/layer เดียวกัน ไม่มี !important */
p { color: blue; }
.intro { color: green; } /* ชนะ p สำหรับ element ที่มี class นี้ */
.intro { color: red; }   /* เท่ากัน กฎหลังชนะ */</code></pre>`),
 S('เปลี่ยนสไตล์ด้วย JavaScript',`<pre><code>const button = document.getElementById('myButton');
button.style.backgroundColor = 'red';

button.classList.add('active-state');
button.classList.remove('active-state');
button.classList.toggle('active-state');</code></pre><p>การแก้ <code>style</code> สร้าง/เปลี่ยน inline declaration ชื่อ property แบบหลายคำเปลี่ยนเป็น camelCase เช่น background-color → backgroundColor ส่วน classList เปลี่ยนชื่อ class และให้ CSS เป็นผู้กำหนดภาพรวม เหมาะเมื่อมีหลาย properties หรือหลายสถานะ ทำให้แยกตรรกะจากหน้าตาได้ชัด</p><p>toggle จะเพิ่มเมื่อยังไม่มีและลบเมื่อมีอยู่ การเปลี่ยน class ไม่ได้ลบกฎ CSS ออกจากไฟล์ เพียงเปลี่ยนว่า element ใดตรงกับ selector</p>`)
 ],tips:[['สามที่อยู่','Inline อยู่แท็ก · Internal อยู่หน้า · External อยู่ไฟล์'],['แยกหน้าที่','JavaScript เลือกสถานะ → classList เปลี่ยน class → CSS วาดหน้าตา'],['จำ camelCase','background-color ใน CSS → backgroundColor ใน JS'],['อย่าจำลำดับผิด','Internal/External เป็นตำแหน่งเก็บ ไม่ใช่ระดับ specificity'],['toggle เป็นสวิตช์','มีอยู่เอาออก ยังไม่มีใส่เข้า']],
 quiz:[
 ['ข้อใดคือ Inline CSS','<p style="color:red">Hi</p>','<link href="main.css" rel="stylesheet">','<style>p{color:red}</style>','<script>p.color="red"</script>','Inline CSS อยู่บน style attribute ของ element','Inline = ในแท็ก'],
 ['Internal stylesheet มักเขียนไว้ที่ใด','ในแท็ก style ของเอกสาร HTML','ใน attribute src ของ img','ในไฟล์ JSON เสมอ','ใน HTTP status line','style ใช้รวมกฎ CSS ภายในเอกสาร','Internal = ในหน้า'],
 ['เชื่อมไฟล์ CSS ภายนอกด้วยข้อใด','<link rel="stylesheet" href="styles.css">','<script src="styles.css"></script>','<css src="styles.css">','<style href="styles.css">','link ระบุความสัมพันธ์ stylesheet และ href เป็น URL ของ CSS','CSS → link href'],
 ['เว็บหลายหน้าที่ต้องการรูปแบบสอดคล้องกันเหมาะกับวิธีใด','External stylesheet','Inline ทุก element','คัดลอก style ซ้ำทุกหน้า','ใช้ onclick แทน CSS','ไฟล์เดียวถูกแชร์และดูแลได้จากจุดเดียว','หลายหน้า ไฟล์เดียว'],
 ['ใน p { color: red; } ส่วน p คืออะไร','Selector','Value','Property','Attribute','Selector ระบุ element ที่กฎจะมีผล','เลือกใคร = selector'],
 ['ใน color: red ส่วน red คืออะไร','Value','Selector','Tag','Event','red คือค่าของ property color','property: value'],
 ['ข้อเสียเด่นของ Inline CSS คืออะไร','ดูแลยากเมื่อมีรูปแบบซ้ำหลาย element','ทำงานไม่ได้ใน HTML','ต้องมีไฟล์ .css เสมอ','ใช้ได้เฉพาะ img','การผูกรูปแบบกับแต่ละแท็กทำให้แก้หลายจุดและ HTML รก','ซ้ำมาก แก้หลายที่'],
 ['External CSS เพิ่มการขอทรัพยากร แต่ลดการโหลดซ้ำได้ด้วยอะไร','Browser cache','Math.random','Array.filter','DNS ลบไฟล์ CSS','เบราว์เซอร์แคชทรัพยากรตามนโยบายเพื่อใช้ซ้ำได้','โหลดแล้วใช้ซ้ำ'],
 ['Internal CSS ชนะ External CSS เสมอหรือไม่','ไม่ ต้องพิจารณา cascade และ selector','ใช่ เพราะอยู่ใน HTML','ใช่ เพราะ style มาก่อน link','ไม่ เพราะ External ชนะเสมอ','ที่อยู่ของกฎไม่ได้กำหนด specificity โดยตัวเอง','ดู selector ไม่ใช่แค่ที่อยู่'],
 ['กฎปกติ specificity เท่ากันใน origin/layer เดียวกัน โดยไม่มีเงื่อนไขอื่นต่างกัน กฎใดชนะ','กฎที่มาทีหลัง','กฎที่ไฟล์เล็กกว่า','กฎที่เขียนเป็นภาษาอังกฤษ','กฎที่ใช้สีเข้มกว่า','เมื่อปัจจัยก่อนหน้าเท่ากัน source order จึงเป็นตัวตัดสิน','เสมอกัน ดูลำดับ'],
 ['เมื่อเทียบกฎปกติ origin/layer เดียวกัน selector ใดมี specificity สูงกว่า p',' .intro','#? ใช้ไม่ได้','ไม่มี selector สูงกว่า p','ทุก selector เท่ากัน','class selector มี specificity สูงกว่า type selector ในเงื่อนไขเดียวกัน','class เหนือ tag'],
 ['JavaScript เปลี่ยน background-color ผ่าน style ใช้ชื่อใด','backgroundColor','background-color แบบ dot','background_color','Backgroundcolor','ชื่อ property แบบขีดกลางมักแปลงเป็น camelCase เมื่อใช้ dot notation','ขีดหาย ตัวถัดไปใหญ่'],
 ['button.style.color = "red" มีผลกับอะไร','Inline style ของ button','ลบไฟล์ CSS ทั้งไฟล์','แก้ทุกปุ่มอัตโนมัติ','เปลี่ยน id เป็น red','style property อ้างถึง inline styles ของ element นั้น','style = บน element'],
 ['เพิ่ม class โดยรักษา class อื่นไว้ใช้ข้อใด','el.classList.add("active")','el.id = "active"','el.textContent = "active"','el.remove()','classList.add เพิ่ม token โดยไม่แทนที่ class ทั้งชุด','add = เพิ่ม'],
 ['classList.remove("active") ทำอะไร','นำ class active ออกจาก element','ลบ element จาก DOM','ลบ active จากไฟล์ CSS','ปิด JavaScript','remove ของ classList เปลี่ยนสมาชิกของชุด class เท่านั้น','ลบ class ไม่ใช่ element'],
 ['หากยังไม่มี active การ toggle("active") จะเกิดอะไร','เพิ่ม class active','ลบ element','ไม่เปลี่ยนอะไรเสมอ','เปลี่ยนข้อความเป็น active','toggle สลับจากไม่มีเป็นมี','toggle = สวิตช์'],
 ['หากมี active แล้ว การ toggle("active") จะเกิดอะไร','นำ class active ออก','เพิ่ม class ซ้ำ','ลบ CSS stylesheet','โหลดหน้าใหม่','classList เก็บ class แบบไม่ซ้ำและ toggle สลับการมีอยู่','มี → เอาออก'],
 ['ต้องเปลี่ยนสี ขอบ และพื้นหลังพร้อมกันตามสถานะ ควรเริ่มจากวิธีใด','นิยาม class ใน CSS แล้วสลับ class','เปลี่ยน innerHTML เป็นชื่อสี','ลบ link stylesheet','เปลี่ยน HTTP header','class รวมกฎหลาย property และแยกการจัดรูปแบบจากตรรกะ','หนึ่งสถานะ หนึ่ง class'],
 ['ข้อใดอธิบาย Inline CSS ได้แม่นยำ','กฎปกติบน style attribute มีน้ำหนักมาก แต่ไม่ชนะทุกกรณีของ cascade','Inline ชนะ !important ทุกกรณี','Inline ใช้ selector id เสมอ','Inline ใช้ได้เฉพาะ head','ไม่ควรจำว่า inline ชนะทุกอย่าง เพราะ cascade ยังพิจารณา origin/importance และกลไกอื่น','Inline แรงแต่ไม่ไร้เงื่อนไข'],
 ['ต้องการแก้รูปแบบเดียวกันในทุกหน้าที่ใช้ไฟล์ร่วมกัน ควรแก้ที่ใด','ไฟล์ CSS ภายนอกที่ทุกหน้าเชื่อม','alt ของภาพ','HTTP request body','เฉพาะ console.log','ข้อดีของ external คือเปลี่ยนกฎที่เดียวแล้วหน้าที่เชื่อมใช้ร่วมกัน','แชร์กฎ แก้จุดเดียว']
 ]});
