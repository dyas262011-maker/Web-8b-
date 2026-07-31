// ═══════ KONFIGURASI ═══════
const CONFIG = {
  heroVideo   : "https://l.top4top.io/m_3779fe6uv1.mp4",
  heroPoster  : "",
  heroBanner  : "",
  avatarImg   : "https://img2.pixhost.to/images/7724/723457563_alip-1778154031488.jpg",
  bgMusic     : "https://files.catbox.moe/til5wh.mp3",
  waliImg     : "",
  waGroup     : "https://chat.whatsapp.com/DEX62QPp12nE86mGyS3grg?s=cl&p=a&ilr=0&amv=3",
  igClass     : "https://www.instagram.com/class8bright_star",
  nglLink     : "",
  tiktokClass : "https://www.tiktok.com/@class8brightstar",
  waChannel   : "https://whatsapp.com/channel/0029VbBKBD9F6smwoAydKr3x",
  waliWa      : "https://wa.me/6285159145010",
  memoriesVideo  : "",
  memoriesPhotos : [
    "https://img2.pixhost.to/images/7724/723458876_alip-1778154364652.jpg",
    "https://img2.pixhost.to/images/7725/723470697_alip-1778157365322.jpg",
    "", "", "", ""
  ],
};

// ═══════ DAFTAR SISWA ═══════
const STUDENTS = [
  { name: "PA DIDIN TAHYUDIN", photo: "", msg: "Hanya allah yang tau." },
  { name: "ADHYASTA NARARYA AL JAZALI", photo: "", msg: "Kegagalan adalah proses menuju keberhasilan." },
  { name: "AGUNG MAULANA IBRAHIM", photo: "", msg: "Proses tidak akan pernah mengkhianati hasil." },
  { name: "ARFA HAIDAR RAISSA", photo: "", msg: "Diam bukan berarti kalah, tapi sedang menyimpan tenaga." },
  { name: "DAFIN AZKA", photo: "", msg: "Ilmu adalah cahaya, bawa ia ke mana pun kamu pergi." },
  { name: "DHEVANO ARKA PUTRA PRATAMA", photo: "", msg: "Setiap hari adalah kesempatan untuk jadi lebih baik." },
  { name: "FAHREZA MAULANA", photo: "", msg: "Kerja keras hari ini adalah cerita sukses esok hari." },
  { name: "FAUZAN KHODHI LATIF", photo: "", msg: "Yang penting bukan seberapa cepat, tapi seberapa kuat." },
  { name: "HAFIZ FATIHUL AHZA", photo: "", msg: "Mimpi besar dimulai dari langkah kecil yang konsisten." },
  { name: "HAFIZH MALIK SOPIYAN", photo: "", msg: "Belajar tanpa batas, tumbuh tanpa henti." },
  { name: "HAIDAR ALI RASYIDI", photo: "", msg: "Jadilah versi terbaik dirimu, bukan orang lain." },
  { name: "KENNY JULIAN NAKAJIMA", photo: "", msg: "Hidup terlalu singkat untuk tidak bermimpi besar." },
  { name: "KEVIN FAEYZA GUNAWAN", photo: "", msg: "Sukses bukan tentang tujuan, tapi perjalanannya." },
  { name: "MAHER ADEWAN SUHARTA", photo: "", msg: "Tak ada yang mustahil bagi orang yang mau berusaha." },
  { name: "MUHAMMAD ADNAN GHOFARANA", photo: "", msg: "Kesabaran adalah kunci yang membuka pintu keberhasilan." },
  { name: "MUHAMMAD AKHDAAN NUR'AIMAN", photo: "", msg: "Jangan berhenti ketika lelah, berhentilah ketika selesai." },
  { name: "MUHAMMAD DZAKI PURWANDRA S", photo: "", msg: "Setiap tetes keringat adalah benih kesuksesan." },
  { name: "MUHAMMAD FAKHRI", photo: "", msg: "Rendah hati dalam belajar, tinggi semangat dalam berkarya." },
  { name: "MUHAMMAD FAWWAAZ SAPUTRA", photo: "", msg: "Ilmu tanpa amal seperti pohon tanpa buah." },
  { name: "MUHAMMAD RAFIF ALAUNA", photo: "", msg: "Hari ini lebih baik dari kemarin, besok lebih baik dari hari ini." },
  { name: "MUHAMMAD RIZQY ALFARIDZ", photo: "", msg: "Mengapa aku berubah?" },
  { name: "MUHAMMAD WAFIQ ZIHNI", photo: "", msg: "Pikiran yang positif menghasilkan hidup yang luar biasa." },
  { name: "MUHAMMAD WILDAN ALJINAN", photo: "", msg: "Bersyukur atas yang ada, berusaha untuk yang lebih baik." },
  { name: "NIZAM ABYAN FAEZYA", photo: "", msg: "Fokus pada tujuan, bukan pada rintangan." },
  { name: "QOULAN TSAQIILA RIZALUSYIIFA", photo: "", msg: "Jangan bergerak tanpa sepengetahuan Tuhan." },
  { name: "RADINAL AKBAR RUSDANA", photo: "", msg: "Berani bermimpi, lebih berani lagi mewujudkannya." },
  { name: "RADITYO DZAKWAN EFFENDI", photo: "", msg: "Disiplin adalah jembatan antara tujuan dan pencapaian." },
  { name: "RAFASHA ERLANDIKA", photo: "", msg: "Jadikan setiap momen sebagai pelajaran berharga." },
  { name: "RAKA TSAQIF AZZAMY", photo: "", msg: "Kuat bukan berarti tidak pernah jatuh, tapi selalu bangkit." },
  { name: "RHEKSYA MUHAMAD SYAHROZAQ", photo: "", msg: "Karakter yang baik adalah harta yang paling berharga." },
  { name: "SADAD FAIRUZ YUSUP JAMALUDIN", photo: "", msg: "Kejujuran adalah fondasi dari segala keberhasilan." },
  { name: "SAYID HUSEIN SYAMIL", photo: "", msg: "Teruslah belajar, karena ilmu tidak pernah habis." },
  { name: "SYAKIB ASSAKYA", photo: "", msg: "Akhiri setiap hari dengan rasa syukur dan tekad baru." },
];

// ═══════ APPLY CONFIG ═══════
function applyConfig() {
  const set = (id, prop, val) => { if (!val) return; const el = document.getElementById(id); if (el) el[prop] = val; };
  if (CONFIG.heroVideo) {
    set('hero-video-src', 'src', CONFIG.heroVideo);
    const hv = document.getElementById('hero-video');
    if (hv) { hv.poster = CONFIG.heroPoster || ''; hv.load(); }
  }
  set('hero-img', 'src', CONFIG.heroBanner);
  set('avatar-img', 'src', CONFIG.avatarImg);
  if (CONFIG.bgMusic) { set('music-src', 'src', CONFIG.bgMusic); const aud = document.getElementById('bg-music'); if (aud) aud.load(); }
  if (CONFIG.waliImg) { set('wali-img', 'src', CONFIG.waliImg); const ph = document.getElementById('wali-ph'); if (ph) ph.style.display = 'none'; }
  const links = {
    'link-wali-wa': CONFIG.waliWa, 'link-ig': CONFIG.igClass, 'link-tiktok': CONFIG.tiktokClass,
    'link-channel': CONFIG.waChannel, 'link-group': CONFIG.waGroup,
  };
  Object.entries(links).forEach(([id, url]) => { if (url) { const el = document.getElementById(id); if (el) el.href = url; } });
  const wc = document.querySelector('.wali-contact');
  if (wc && CONFIG.waliWa) wc.href = CONFIG.waliWa;
  const mv = document.getElementById('memories-video');
  const mp = document.getElementById('mem-placeholder');
  if (CONFIG.memoriesVideo) { set('memories-video-src', 'src', CONFIG.memoriesVideo); if (mv) { mv.load(); mv.style.display = 'block'; } if (mp) mp.style.display = 'none'; }
  else { if (mv) mv.style.display = 'none'; if (mp) mp.style.display = 'flex'; }
}

// ═══════ BUILD STUDENT LIST ═══════
function buildStudentList() {
  const list = document.getElementById('student-list');
  if (!list || list.children.length > 0) return;
  list.innerHTML = '';
  STUDENTS.forEach((s, i) => {
    const item = document.createElement('div');
    item.className = 'student-item';
    item.style.transitionDelay = `${i * 0.04}s`;
    item.innerHTML = `<div class="student-no">${String(i+1).padStart(2,'0')}</div><div class="student-name">${s.name}</div><div class="student-tap-hint"><i class="fa-solid fa-comment-dots"></i></div>`;
    item.addEventListener('click', () => openStudentModal(i));
    list.appendChild(item);
  });
  const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }); }, { threshold: 0.04 });
  list.querySelectorAll('.student-item').forEach(el => io.observe(el));
}

// ═══════ STUDENT MODAL ═══════
function openStudentModal(idx) {
  const s = STUDENTS[idx];
  document.getElementById('modal-no').textContent = String(idx+1).padStart(2,'0');
  document.getElementById('modal-name').textContent = s.name;
  document.getElementById('modal-msg').textContent = s.msg;
  document.getElementById('student-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeStudentModal(e) {
  if (e && e.target !== document.getElementById('student-modal') && !e.target.classList.contains('student-modal-close') && !e.target.closest('.student-modal-close')) return;
  document.getElementById('student-modal').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') { document.getElementById('student-modal').classList.remove('open'); document.body.style.overflow = ''; } });

// ═══════ BUILD PHOTO GRID ═══════
function buildPhotoGrid() {
  const grid = document.getElementById('photo-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const photos = (CONFIG.memoriesPhotos || []).filter(p => p && p.trim() !== '');
  if (photos.length === 0) { for (let i=0;i<6;i++) { const slot = document.createElement('div'); slot.className='photo-item'; slot.innerHTML='<div class="photo-item-placeholder"><i class="fa-solid fa-image"></i></div>'; grid.appendChild(slot); } return; }
  photos.forEach((url, i) => { const item = document.createElement('div'); item.className='photo-item'; const img = document.createElement('img'); img.src=url; img.alt=`Foto ${i+1}`; img.loading='lazy'; item.appendChild(img); item.addEventListener('click',()=>openLightbox(url)); grid.appendChild(item); });
}

// ═══════ LIGHTBOX ═══════
function openLightbox(src) { const lb=document.getElementById('lightbox'); const img=document.getElementById('lightbox-img'); if(!lb||!img)return; img.src=src; lb.classList.add('open'); document.body.style.overflow='hidden'; }
function closeLightbox() { const lb=document.getElementById('lightbox'); if(lb)lb.classList.remove('open'); document.body.style.overflow=''; }

// ═══════ CANVAS GRID ═══════
const canvas=document.getElementById('grid-canvas'); const ctx=canvas.getContext('2d'); let gridOffset=0;
function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;} resizeCanvas(); window.addEventListener('resize',resizeCanvas);
function drawGrid(){ctx.clearRect(0,0,canvas.width,canvas.height);const size=38;const isDark=document.documentElement.getAttribute('data-theme')==='dark';ctx.strokeStyle=isDark?'rgba(180,175,168,0.055)':'rgba(30,28,26,0.06)';ctx.lineWidth=1;const offset=gridOffset%size;for(let x=-size+offset;x<canvas.width+size;x+=size){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke();}for(let y=-size+offset;y<canvas.height+size;y+=size){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke();}gridOffset+=0.18;requestAnimationFrame(drawGrid);} drawGrid();

// ═══════ VIDEO FALLBACK ═══════
const heroVideo=document.getElementById('hero-video');const heroImg=document.getElementById('hero-img');
if(heroVideo){heroVideo.addEventListener('error',()=>{heroVideo.style.display='none';if(heroImg)heroImg.style.display='block';});setTimeout(()=>{if(heroVideo.readyState===0){heroVideo.style.display='none';if(heroImg)heroImg.style.display='block';}},3000);}

// ═══════ AVATAR FALLBACK ═══════
const avatarImg=document.getElementById('avatar-img');
if(avatarImg){avatarImg.addEventListener('error',()=>{avatarImg.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='110' viewBox='0 0 110 110'%3E%3Crect width='110' height='110' fill='%23e4e2dc'/%3E%3Ccircle cx='55' cy='40' r='18' fill='%23aaa'/%3E%3Cellipse cx='55' cy='86' rx='28' ry='20' fill='%23aaa'/%3E%3C/svg%3E";});}

// ═══════ MUSIC NOTES ═══════
const notesContainer=document.getElementById('music-notes-container');let noteInterval=null;const noteSymbols=['♩','♪','♫','♬'];
function spawnNote(){const note=document.createElement('span');note.className='music-note-fall';note.textContent=noteSymbols[Math.floor(Math.random()*noteSymbols.length)];note.style.left=(Math.random()*92+2)+'vw';note.style.fontSize=(Math.random()*12+10)+'px';note.style.animationDuration=(Math.random()*4+5)+'s';note.style.opacity=(Math.random()*0.2+0.07).toFixed(2);notesContainer.appendChild(note);setTimeout(()=>note.remove(),10000);}

// ═══════ MUSIC TOGGLE ═══════
const audio=document.getElementById('bg-music');const musicBtn=document.getElementById('music-btn');let isPlaying=false;
function toggleMusic(){if(isPlaying){audio.pause();musicBtn.classList.remove('playing');isPlaying=false;clearInterval(noteInterval);noteInterval=null;}else{audio.play().then(()=>{musicBtn.classList.add('playing');isPlaying=true;noteInterval=setInterval(spawnNote,700);}).catch(err=>console.warn('Audio blocked:',err));}}

// ═══════ DARK MODE ═══════
const html=document.documentElement;const themeBtn=document.getElementById('theme-btn');const savedTheme=localStorage.getItem('viiib-theme')||'light';html.setAttribute('data-theme',savedTheme);updateThemeIcon(savedTheme);
function toggleTheme(){const current=html.getAttribute('data-theme');const next=current==='dark'?'light':'dark';html.setAttribute('data-theme',next);localStorage.setItem('viiib-theme',next);updateThemeIcon(next);}
function updateThemeIcon(theme){const icon=themeBtn.querySelector('i');icon.className=theme==='dark'?'fa-solid fa-sun':'fa-solid fa-moon';}

// ═══════ FAB TOGGLE ═══════
const fabWrap=document.getElementById('fab-wrap');let fabOpen=false;
function toggleFab(){fabOpen=!fabOpen;fabWrap.classList.toggle('open',fabOpen);}
document.addEventListener('click',e=>{if(fabOpen&&!fabWrap.contains(e.target)){fabOpen=false;fabWrap.classList.remove('open');}});

// ═══════ PAGE NAVIGATION ═══════
const pageNavWrap=document.getElementById('pageNavWrap');let pageNavOpen=false;let currentPage='home';const PAGE_ORDER=['home','students','memories','reminder'];
function togglePageNav(){pageNavOpen=!pageNavOpen;pageNavWrap.classList.toggle('open',pageNavOpen);}
document.addEventListener('click',e=>{if(pageNavOpen&&!pageNavWrap.contains(e.target)){pageNavOpen=false;pageNavWrap.classList.remove('open');}});
function goPage(pageId){if(pageId===currentPage){pageNavOpen=false;pageNavWrap.classList.remove('open');return;}document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));const target=document.getElementById('page-'+pageId);if(target){target.classList.add('active');window.scrollTo(0,0);}document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));const activeBtn=document.getElementById('nav-btn-'+pageId);if(activeBtn)activeBtn.classList.add('active');const dots=document.querySelectorAll('.dot');dots.forEach((d,i)=>d.classList.toggle('active',PAGE_ORDER[i]===pageId));pageNavOpen=false;pageNavWrap.classList.remove('open');currentPage=pageId;if(pageId==='students')buildStudentList();if(pageId==='memories')buildPhotoGrid();if(pageId==='reminder')initReminderPage();}

// ═══════ CARD OBSERVER ═══════
function initCardObserver(){const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});},{threshold:0.08});document.querySelectorAll('.card').forEach((c,i)=>{c.style.transitionDelay=`${i*0.07}s`;io.observe(c);});}

// ═══════════════════════════════════════════════════
// REMINDER HARIAN — password gate + per-hari + JSONBin sync
// ═══════════════════════════════════════════════════
//
// [PENTING] Ganti kata sandi admin:
//   1. Buka halaman ini di browser, tekan F12 (console).
//   2. Ketik: generatePasswordHash('kata-sandi-baru-kamu').then(h => console.log(h))
//   3. Copy hasil hash yang muncul, tempel ke REMINDER_CONFIG.adminPasswordHash di bawah.
//   Kata sandi default saat ini: viiib-admin-2026  (SEGERA GANTI sebelum dipakai beneran)
//
const REMINDER_CONFIG = {
  adminPasswordHash: "e56c044b95298b8b03323c6765ee31eb546ff0f16ad0624329fec6c17eb3a847",
  jsonbinApiKey: "$2a$10$0XA/Bap/CiGTnq9yVVCVq.gXRScb.ycMrrQ2.2uKaScStP/rtx.Um",
  // Bin ID juga bisa diisi langsung di kode di sini, TAPI cara paling gampang
  // adalah lewat kolom "Bin ID" yang ada di halaman Reminder (tersimpan otomatis
  // di browser). Lihat penjelasan cara cari Bin ID di kolom itu.
  jsonbinBinId: "",
};

async function sha256Hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
window.generatePasswordHash = (pw) => sha256Hex(pw).then(h => { console.log('Hash baru:', h); return h; });

// ═══════ HARI ═══════
// Mau tambah/kurangi hari? Tinggal edit array ini.
const DAYS = [
  { key: 'senin',  label: 'Senin' },
  { key: 'selasa', label: 'Selasa' },
  { key: 'rabu',   label: 'Rabu' },
  { key: 'kamis',  label: 'Kamis' },
  { key: 'jumat',  label: 'Jumat' },
  { key: 'sabtu',  label: 'Sabtu' },
];
const REMINDER_SECTIONS = ['seragam', 'mapel', 'tugas', 'piket', 'catatan'];

function emptyDayData() {
  return { tanggal: '', seragam: [''], mapel: [''], tugas: [''], piket: [''], catatan: [''] };
}
function emptyAllDaysData() {
  const obj = {};
  DAYS.forEach(d => { obj[d.key] = emptyDayData(); });
  return obj;
}

let reminderData = emptyAllDaysData();
let currentDay = DAYS[0].key;
let reminderInitialized = false;
let reminderSyncTimer = null;

function escapeHtml(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

// ═══════ BIN ID (tersimpan di browser, tidak perlu edit kode) ═══════
function getStoredBinId() {
  return localStorage.getItem('viiib-reminder-binid') || REMINDER_CONFIG.jsonbinBinId || '';
}
function setStoredBinId(id) {
  REMINDER_CONFIG.jsonbinBinId = id || '';
  if (id) localStorage.setItem('viiib-reminder-binid', id);
  else localStorage.removeItem('viiib-reminder-binid');
  const input = document.getElementById('reminder-binid-input');
  if (input) input.value = id || '';
}

// ═══════ GATE PASSWORD ═══════
function initReminderPage() {
  const authed = sessionStorage.getItem('viiib-reminder-auth') === '1';
  document.getElementById('reminder-gate').style.display = authed ? 'none' : 'flex';
  document.getElementById('reminder-app').style.display = authed ? 'block' : 'none';
  if (authed && !reminderInitialized) { reminderInitialized = true; setupReminderApp(); }
}

function setupReminderApp() {
  REMINDER_CONFIG.jsonbinBinId = getStoredBinId();
  const binInput = document.getElementById('reminder-binid-input');
  if (binInput) binInput.value = REMINDER_CONFIG.jsonbinBinId;
  renderDayTabs();
  selectDay(currentDay);
  loadReminderFromBin();
}

// ═══════ TAB HARI ═══════
function renderDayTabs() {
  const wrap = document.getElementById('reminder-day-tabs');
  if (!wrap) return;
  wrap.innerHTML = '';
  DAYS.forEach(d => {
    const btn = document.createElement('button');
    btn.className = 'reminder-day-tab' + (d.key === currentDay ? ' active' : '');
    btn.dataset.day = d.key;
    btn.textContent = d.label;
    wrap.appendChild(btn);
  });
}

function selectDay(dayKey) {
  currentDay = dayKey;
  document.querySelectorAll('.reminder-day-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.day === dayKey);
  });
  const dayLabel = document.getElementById('reminder-day-label');
  const d = DAYS.find(x => x.key === dayKey);
  if (dayLabel && d) dayLabel.textContent = d.label;
  REMINDER_SECTIONS.forEach(renderReminderList);
  document.getElementById('rf-tanggal').value = reminderData[currentDay].tanggal;
  updateReminderPreview();
}

// ═══════ LIST DINAMIS (per hari) ═══════
function renderReminderList(key) {
  const wrap = document.getElementById('list-' + key);
  if (!wrap) return;
  wrap.innerHTML = '';
  reminderData[currentDay][key].forEach((val, idx) => {
    const row = document.createElement('div');
    row.className = 'reminder-row';
    row.innerHTML = `<input type="text" class="reminder-input reminder-row-input" data-key="${key}" data-idx="${idx}" value="${escapeHtml(val)}" placeholder="Isi baris..." /><button class="reminder-row-del" data-key="${key}" data-idx="${idx}" title="Hapus"><i class="fa-solid fa-xmark"></i></button>`;
    wrap.appendChild(row);
  });
}

function buildReminderMessage() {
  const day = reminderData[currentDay];
  const lines = [];
  lines.push('📢 REMINDER', '');
  lines.push('📅 Hari/Tanggal :');
  lines.push(day.tanggal.trim() || '-', '');
  lines.push('👔 SERAGAM');
  day.seragam.filter(x => x.trim()).forEach(x => lines.push('• ' + x));
  lines.push('', '📚 MAPEL');
  day.mapel.filter(x => x.trim()).forEach(x => lines.push('• ' + x));
  lines.push('', '📝 TUGAS');
  day.tugas.filter(x => x.trim()).forEach(x => lines.push('• ' + x));
  lines.push('', '🧹 PIKET');
  day.piket.filter(x => x.trim()).forEach(x => lines.push('• ' + x));
  lines.push('', '💬 CATATAN');
  day.catatan.filter(x => x.trim()).forEach(x => lines.push('• ' + x));
  return lines.join('\n');
}

function updateReminderPreview() {
  const el = document.getElementById('reminder-preview');
  if (el) el.textContent = buildReminderMessage();
}

function copyReminderMessage() {
  const text = buildReminderMessage();
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('btn-copy-pesan');
    const old = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';
    setTimeout(() => { btn.innerHTML = old; }, 1600);
  }).catch(() => alert('Gagal menyalin otomatis. Silakan salin manual dari kotak preview.'));
}

// ═══════ JSONBIN SYNC (semua hari disimpan dalam satu bin) ═══════
function jsonbinHeaders() {
  return { 'Content-Type': 'application/json', 'X-Master-Key': REMINDER_CONFIG.jsonbinApiKey };
}

function normalizeRecord(record) {
  // Migrasi otomatis kalau bin masih pakai format lama (satu reminder tanpa hari)
  if (record && record.tanggal !== undefined && record.seragam !== undefined && !record.senin) {
    const merged = emptyAllDaysData();
    merged[DAYS[0].key] = Object.assign(emptyDayData(), record);
    return merged;
  }
  const merged = emptyAllDaysData();
  DAYS.forEach(d => { merged[d.key] = Object.assign(emptyDayData(), (record && record[d.key]) || {}); });
  return merged;
}

async function loadReminderFromBin() {
  const statusEl = document.getElementById('reminder-sync-status');
  if (!REMINDER_CONFIG.jsonbinBinId) {
    if (statusEl) statusEl.textContent = 'Status sinkronisasi: belum ada Bin ID (isi kolom Bin ID di atas, atau simpan sekali untuk membuat bin baru otomatis).';
    return;
  }
  try {
    if (statusEl) statusEl.textContent = 'Status sinkronisasi: memuat...';
    const res = await fetch(`https://api.jsonbin.io/v3/b/${REMINDER_CONFIG.jsonbinBinId}/latest`, { headers: jsonbinHeaders() });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    reminderData = normalizeRecord(json && json.record);
    renderDayTabs();
    selectDay(currentDay);
    if (statusEl) statusEl.textContent = 'Status sinkronisasi: tersambung · Bin ID: ' + REMINDER_CONFIG.jsonbinBinId;
  } catch (err) {
    console.warn('JSONBin load error:', err);
    if (statusEl) statusEl.textContent = 'Status sinkronisasi: gagal memuat (cek Bin ID / koneksi).';
  }
}

function scheduleReminderSync() {
  clearTimeout(reminderSyncTimer);
  reminderSyncTimer = setTimeout(saveReminderToBin, 700);
}

async function saveReminderToBin() {
  const statusEl = document.getElementById('reminder-sync-status');
  try {
    if (statusEl) statusEl.textContent = 'Status sinkronisasi: menyimpan...';
    if (!REMINDER_CONFIG.jsonbinBinId) {
      const res = await fetch('https://api.jsonbin.io/v3/b', {
        method: 'POST',
        headers: Object.assign(jsonbinHeaders(), { 'X-Bin-Name': 'viiib-reminder' }),
        body: JSON.stringify(reminderData),
      });
      const json = await res.json();
      const newId = (json && json.metadata && json.metadata.id) || '';
      setStoredBinId(newId);
      console.log('%cBIN BARU DIBUAT — Bin ID:', 'font-weight:bold;color:#1a6fcf;', newId, '\nID ini sudah otomatis tersimpan di browser ini. Untuk device lain, paste ID ini ke kolom "Bin ID" di halaman Reminder.');
      if (statusEl) statusEl.textContent = 'Status sinkronisasi: bin baru dibuat · Bin ID: ' + newId;
      return;
    }
    await fetch(`https://api.jsonbin.io/v3/b/${REMINDER_CONFIG.jsonbinBinId}`, {
      method: 'PUT',
      headers: jsonbinHeaders(),
      body: JSON.stringify(reminderData),
    });
    if (statusEl) statusEl.textContent = 'Status sinkronisasi: tersimpan · ' + new Date().toLocaleTimeString('id-ID') + ' · Bin ID: ' + REMINDER_CONFIG.jsonbinBinId;
  } catch (err) {
    console.warn('JSONBin save error:', err);
    if (statusEl) statusEl.textContent = 'Status sinkronisasi: gagal menyimpan.';
  }
}

// ─── Event delegation: klik ───
document.addEventListener('click', async (e) => {
  if (e.target && e.target.id === 'reminder-pw-submit') {
    const input = document.getElementById('reminder-pw-input');
    const errEl = document.getElementById('reminder-pw-error');
    const hash = await sha256Hex(input.value);
    if (hash === REMINDER_CONFIG.adminPasswordHash) {
      sessionStorage.setItem('viiib-reminder-auth', '1');
      errEl.textContent = '';
      input.value = '';
      document.getElementById('reminder-gate').style.display = 'none';
      document.getElementById('reminder-app').style.display = 'block';
      if (!reminderInitialized) { reminderInitialized = true; setupReminderApp(); }
    } else {
      errEl.textContent = 'Kata sandi salah.';
    }
    return;
  }

  const logoutBtn = e.target.closest && e.target.closest('#reminder-logout-btn');
  if (logoutBtn) { sessionStorage.removeItem('viiib-reminder-auth'); reminderInitialized = false; initReminderPage(); return; }

  const dayTab = e.target.closest && e.target.closest('.reminder-day-tab');
  if (dayTab) { selectDay(dayTab.dataset.day); return; }

  const addBtn = e.target.closest && e.target.closest('.reminder-add-btn');
  if (addBtn) {
    const key = addBtn.dataset.target;
    reminderData[currentDay][key].push('');
    renderReminderList(key);
    updateReminderPreview();
    scheduleReminderSync();
    return;
  }

  const delBtn = e.target.closest && e.target.closest('.reminder-row-del');
  if (delBtn) {
    const key = delBtn.dataset.key, idx = +delBtn.dataset.idx;
    reminderData[currentDay][key].splice(idx, 1);
    if (reminderData[currentDay][key].length === 0) reminderData[currentDay][key].push('');
    renderReminderList(key);
    updateReminderPreview();
    scheduleReminderSync();
    return;
  }

  if (e.target && e.target.id === 'btn-copy-pesan') { copyReminderMessage(); return; }

  const openGroupBtn = e.target.closest && e.target.closest('#btn-open-group');
  if (openGroupBtn) { window.open(CONFIG.waGroup, '_blank'); return; }

  const binSaveBtn = e.target.closest && e.target.closest('#reminder-binid-save');
  if (binSaveBtn) {
    const val = document.getElementById('reminder-binid-input').value.trim();
    setStoredBinId(val);
    loadReminderFromBin();
    return;
  }
});

// ─── Event delegation: input (ketik) ───
document.addEventListener('input', (e) => {
  if (e.target && e.target.id === 'rf-tanggal') {
    reminderData[currentDay].tanggal = e.target.value;
    updateReminderPreview();
    scheduleReminderSync();
  }
  if (e.target && e.target.classList.contains('reminder-row-input')) {
    const key = e.target.dataset.key, idx = +e.target.dataset.idx;
    reminderData[currentDay][key][idx] = e.target.value;
    updateReminderPreview();
    scheduleReminderSync();
  }
});

// izinkan tekan Enter di kolom password
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target && e.target.id === 'reminder-pw-input') {
    document.getElementById('reminder-pw-submit').click();
  }
});

// ═══════ INIT ═══════
document.addEventListener('DOMContentLoaded',()=>{applyConfig();initCardObserver();buildStudentList();});
