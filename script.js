// ═══════════════════════════════════════════════════
// SCRIPT.JS — LOGIKA SITUS (data ada di config.js, jangan taruh data di sini)
// ═══════════════════════════════════════════════════

// ═══════ BAHASA ═══════
let currentLang = localStorage.getItem('viiib-lang') || 'id';
if (LANG_ORDER.indexOf(currentLang) === -1) currentLang = 'id';

function t(key) {
  return (LANG_STRINGS[currentLang] && LANG_STRINGS[currentLang][key])
      || (LANG_STRINGS.id && LANG_STRINGS.id[key])
      || key;
}

function dayLabel(dayKey) {
  const d = DAYS.find(x => x.key === dayKey);
  if (!d) return dayKey;
  return d[currentLang] || d.id;
}

function applyLang() {
  document.documentElement.setAttribute('lang', currentLang === 'en' ? 'en' : 'id');
  document.documentElement.setAttribute('data-lang', currentLang);
  const indicator = document.getElementById('lang-indicator');
  if (indicator) indicator.textContent = LANG_LABEL[currentLang] || 'ID';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });

  // Re-render bagian yang dibangun lewat JS supaya ikut ganti bahasa
  if (document.getElementById('reminder-day-tabs')) renderDayTabs();
  if (reminderInitialized) {
    document.getElementById('rf-tanggal').placeholder = t('placeholder_tanggal_input');
    REMINDER_SECTIONS.forEach(renderReminderList);
    const statusEl = document.getElementById('reminder-sync-status');
    if (statusEl && statusEl.dataset.raw === 'idle') statusEl.textContent = t('sync_status_prefix') + ' ' + t('sync_idle');
  }
  if (document.getElementById('schedule-day-tabs')) renderScheduleDayTabs();
}

function cycleLang() {
  const idx = LANG_ORDER.indexOf(currentLang);
  currentLang = LANG_ORDER[(idx + 1) % LANG_ORDER.length];
  localStorage.setItem('viiib-lang', currentLang);
  applyLang();
}

// ═══════ APPLY CONFIG (data situs → DOM) ═══════
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
const pageNavWrap=document.getElementById('pageNavWrap');let pageNavOpen=false;let currentPage='home';const PAGE_ORDER=['home','students','schedule','memories','reminder'];
function togglePageNav(){pageNavOpen=!pageNavOpen;pageNavWrap.classList.toggle('open',pageNavOpen);}
document.addEventListener('click',e=>{if(pageNavOpen&&!pageNavWrap.contains(e.target)){pageNavOpen=false;pageNavWrap.classList.remove('open');}});
function goPage(pageId){
  if(pageId===currentPage){pageNavOpen=false;pageNavWrap.classList.remove('open');return;}
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target=document.getElementById('page-'+pageId);
  if(target){
    // re-trigger animasi masuk halaman tiap kali pindah
    target.classList.remove('page-anim');
    void target.offsetWidth;
    target.classList.add('active','page-anim');
    window.scrollTo(0,0);
  }
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
  const activeBtn=document.getElementById('nav-btn-'+pageId);
  if(activeBtn)activeBtn.classList.add('active');
  const dots=document.querySelectorAll('.dot');
  dots.forEach((d,i)=>d.classList.toggle('active',PAGE_ORDER[i]===pageId));
  pageNavOpen=false;pageNavWrap.classList.remove('open');
  currentPage=pageId;
  if(pageId==='students')buildStudentList();
  if(pageId==='schedule')buildSchedulePage();
  if(pageId==='memories')buildPhotoGrid();
  if(pageId==='reminder')initReminderPage();
}

// ═══════ CARD OBSERVER ═══════
function initCardObserver(){const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});},{threshold:0.08});document.querySelectorAll('.card').forEach((c,i)=>{c.style.transitionDelay=`${i*0.07}s`;io.observe(c);});}

// ═══════════════════════════════════════════════════
// JADWAL PELAJARAN — halaman publik, tanpa password
// ═══════════════════════════════════════════════════
let currentScheduleDay = DAYS[0].key;

function buildSchedulePage() {
  renderScheduleDayTabs();
  renderScheduleList(currentScheduleDay);
}

function renderScheduleDayTabs() {
  const wrap = document.getElementById('schedule-day-tabs');
  if (!wrap) return;
  wrap.innerHTML = '';
  DAYS.forEach(d => {
    const btn = document.createElement('button');
    btn.className = 'reminder-day-tab' + (d.key === currentScheduleDay ? ' active' : '');
    btn.dataset.day = d.key;
    btn.dataset.role = 'schedule';
    btn.textContent = dayLabel(d.key);
    wrap.appendChild(btn);
  });
}

function renderScheduleList(dayKey) {
  currentScheduleDay = dayKey;
  document.querySelectorAll('#schedule-day-tabs .reminder-day-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.day === dayKey);
  });
  const listEl = document.getElementById('schedule-list');
  if (!listEl) return;
  const items = (SCHEDULE && SCHEDULE[dayKey]) || [];
  listEl.innerHTML = '';
  if (items.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'schedule-empty';
    empty.innerHTML = '<i class="fa-solid fa-circle-info"></i> ' + t('label_jadwal_kosong');
    listEl.appendChild(empty);
    return;
  }
  items.forEach((it, i) => {
    const row = document.createElement('div');
    row.className = 'schedule-row';
    row.style.transitionDelay = `${i * 0.05}s`;
    row.innerHTML = `<div class="schedule-jam">${it.jam || ''}</div><div class="schedule-mapel">${it.mapel || ''}</div>`;
    listEl.appendChild(row);
  });
  const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }); }, { threshold: 0.05 });
  listEl.querySelectorAll('.schedule-row').forEach(el => io.observe(el));
}

// ═══════════════════════════════════════════════════
// REMINDER HARIAN — password gate + per-hari + JSONBin sync
// ═══════════════════════════════════════════════════
async function sha256Hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
window.generatePasswordHash = (pw) => sha256Hex(pw).then(h => { console.log('Hash baru:', h); return h; });

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

// ═══════ BIN ID (config.js SELALU jadi sumber utama) ═══════
// Kalau admin sudah isi jsonbinBinId di config.js, itu yang dipakai SEMUA
// device — localStorage lama (misal dari percobaan auto-buat bin
// sebelumnya) tidak akan menimpa lagi. localStorage hanya dipakai sebagai
// fallback kalau config.js masih kosong.
const CONFIG_BIN_ID = (REMINDER_CONFIG.jsonbinBinId || '').trim();
if (CONFIG_BIN_ID) localStorage.removeItem('viiib-reminder-binid'); // bersihkan sisa localStorage lama yang bisa bikin device beda bin
function getStoredBinId() {
  if (CONFIG_BIN_ID) return CONFIG_BIN_ID;
  return localStorage.getItem('viiib-reminder-binid') || '';
}
function setStoredBinId(id) {
  REMINDER_CONFIG.jsonbinBinId = id || '';
  if (!CONFIG_BIN_ID) {
    if (id) localStorage.setItem('viiib-reminder-binid', id);
    else localStorage.removeItem('viiib-reminder-binid');
  }
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

// ═══════ TAB HARI (reminder) ═══════
function renderDayTabs() {
  const wrap = document.getElementById('reminder-day-tabs');
  if (!wrap) return;
  wrap.innerHTML = '';
  DAYS.forEach(d => {
    const btn = document.createElement('button');
    btn.className = 'reminder-day-tab' + (d.key === currentDay ? ' active' : '');
    btn.dataset.day = d.key;
    btn.dataset.role = 'reminder';
    btn.textContent = dayLabel(d.key);
    wrap.appendChild(btn);
  });
}

function selectDay(dayKey) {
  currentDay = dayKey;
  document.querySelectorAll('#reminder-day-tabs .reminder-day-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.day === dayKey);
  });
  const dayLabelEl = document.getElementById('reminder-day-label');
  if (dayLabelEl) dayLabelEl.textContent = dayLabel(dayKey);
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
    row.innerHTML = `<input type="text" class="reminder-input reminder-row-input" data-key="${key}" data-idx="${idx}" value="${escapeHtml(val)}" placeholder="${t('placeholder_isi_baris')}" /><button class="reminder-row-del" data-key="${key}" data-idx="${idx}" title="Hapus"><i class="fa-solid fa-xmark"></i></button>`;
    wrap.appendChild(row);
  });
}

// Catatan: format pesan REMINDER di bawah SENGAJA tetap Bahasa Indonesia baku
// (📢 REMINDER / SERAGAM / MAPEL / dst) berapa pun bahasa UI yang dipilih,
// karena ini format pesan tetap untuk dikirim ke grup WA, bukan teks UI situs.
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
    btn.innerHTML = '<i class="fa-solid fa-check"></i> ' + t('btn_tersalin');
    setTimeout(() => { btn.innerHTML = old; }, 1600);
  }).catch(() => alert('Gagal menyalin otomatis. Silakan salin manual dari kotak preview.'));
}

// ═══════ JSONBIN SYNC (semua hari disimpan dalam satu bin) ═══════
function jsonbinHeaders() {
  return { 'Content-Type': 'application/json', 'X-Master-Key': REMINDER_CONFIG.jsonbinApiKey };
}

function setSyncStatus(text, isIdle) {
  const statusEl = document.getElementById('reminder-sync-status');
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.dataset.raw = isIdle ? 'idle' : 'busy';
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
  if (!REMINDER_CONFIG.jsonbinBinId) {
    setSyncStatus(t('sync_status_prefix') + ' belum ada Bin ID (isi kolom Bin ID di bawah, atau klik "Cari Bin ID Otomatis").', true);
    return;
  }
  try {
    setSyncStatus(t('sync_status_prefix') + ' memuat...', false);
    const res = await fetch(`https://api.jsonbin.io/v3/b/${REMINDER_CONFIG.jsonbinBinId}/latest`, { headers: jsonbinHeaders() });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    reminderData = normalizeRecord(json && json.record);
    renderDayTabs();
    selectDay(currentDay);
    setSyncStatus(t('sync_status_prefix') + ' tersambung · Bin ID: ' + REMINDER_CONFIG.jsonbinBinId, true);
  } catch (err) {
    console.warn('JSONBin load error:', err);
    setSyncStatus(t('sync_status_prefix') + ' gagal memuat (cek Bin ID / koneksi).', true);
  }
}

function scheduleReminderSync() {
  clearTimeout(reminderSyncTimer);
  reminderSyncTimer = setTimeout(saveReminderToBin, 700);
}

async function saveReminderToBin() {
  try {
    setSyncStatus(t('sync_status_prefix') + ' menyimpan...', false);
    if (!REMINDER_CONFIG.jsonbinBinId) {
      const res = await fetch('https://api.jsonbin.io/v3/b', {
        method: 'POST',
        headers: Object.assign(jsonbinHeaders(), { 'X-Bin-Name': 'viiib-reminder' }),
        body: JSON.stringify(reminderData),
      });
      const json = await res.json();
      const newId = (json && json.metadata && json.metadata.id) || '';
      setStoredBinId(newId);
      console.log('%cBIN BARU DIBUAT — Bin ID:', 'font-weight:bold;color:#1a6fcf;', newId, '\nUntuk semua device otomatis nyambung tanpa isi manual, taruh ID ini di REMINDER_CONFIG.jsonbinBinId pada config.js lalu upload ulang.');
      setSyncStatus(t('sync_status_prefix') + ' bin baru dibuat · Bin ID: ' + newId, true);
      return;
    }
    await fetch(`https://api.jsonbin.io/v3/b/${REMINDER_CONFIG.jsonbinBinId}`, {
      method: 'PUT',
      headers: jsonbinHeaders(),
      body: JSON.stringify(reminderData),
    });
    setSyncStatus(t('sync_status_prefix') + ' tersimpan · ' + new Date().toLocaleTimeString('id-ID') + ' · Bin ID: ' + REMINDER_CONFIG.jsonbinBinId, true);
  } catch (err) {
    console.warn('JSONBin save error:', err);
    setSyncStatus(t('sync_status_prefix') + ' gagal menyimpan.', true);
  }
}

// ═══════ CARI BIN ID OTOMATIS (via daftar bin "uncategorized" milik API key ini) ═══════
async function findBinIdAutomatically() {
  try {
    setSyncStatus(t('sync_status_prefix') + ' mencari Bin ID...', false);
    const res = await fetch('https://api.jsonbin.io/v3/c/uncategorized/bins', { headers: jsonbinHeaders() });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const list = await res.json();
    const arr = Array.isArray(list) ? list : (list && list.records) || [];
    // cari yang namanya "viiib-reminder", kalau tidak ada ambil yang paling baru
    let found = arr.find(b => (b.record || b).snippetMeta?.name === 'viiib-reminder')
             || arr.find(b => (b.record || b).name === 'viiib-reminder')
             || arr[0];
    const foundId = found && ((found.record && found.record.id) || found.id || found._id);
    if (foundId) {
      setStoredBinId(foundId);
      setSyncStatus(t('sync_status_prefix') + ' Bin ID ditemukan · ' + foundId, true);
      loadReminderFromBin();
    } else {
      setSyncStatus(t('sync_status_prefix') + ' belum ada bin ditemukan. Simpan satu reminder dulu untuk membuat bin baru.', true);
    }
  } catch (err) {
    console.warn('JSONBin find-bin error:', err);
    setSyncStatus(t('sync_status_prefix') + ' gagal mencari otomatis. Cek console (F12) atau cari manual lewat jsonbin.io/app/bins.', true);
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
      errEl.textContent = t('reminder_pw_error');
    }
    return;
  }

  const logoutBtn = e.target.closest && e.target.closest('#reminder-logout-btn');
  if (logoutBtn) { sessionStorage.removeItem('viiib-reminder-auth'); reminderInitialized = false; initReminderPage(); return; }

  const dayTab = e.target.closest && e.target.closest('.reminder-day-tab');
  if (dayTab) {
    if (dayTab.dataset.role === 'schedule') { renderScheduleList(dayTab.dataset.day); }
    else { selectDay(dayTab.dataset.day); }
    return;
  }

  const addBtn = e.target.closest && e.target.closest('.reminder-add-btn');
  if (addBtn && addBtn.dataset.target) {
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

  const saveBtn = e.target.closest && e.target.closest('#btn-simpan-perubahan');
  if (saveBtn) {
    clearTimeout(reminderSyncTimer);
    saveBtn.classList.add('is-saving');
    saveReminderToBin().finally(() => {
      saveBtn.classList.remove('is-saving');
      saveBtn.classList.add('is-saved');
      const old = saveBtn.innerHTML;
      saveBtn.innerHTML = '<i class="fa-solid fa-check"></i> ' + t('btn_tersimpan_ok');
      setTimeout(() => { saveBtn.innerHTML = old; saveBtn.classList.remove('is-saved'); }, 1400);
    });
    return;
  }

  const openGroupBtn = e.target.closest && e.target.closest('#btn-open-group');
  if (openGroupBtn) { window.open(CONFIG.waGroup, '_blank'); return; }

  const binSaveBtn = e.target.closest && e.target.closest('#reminder-binid-save');
  if (binSaveBtn) {
    const val = document.getElementById('reminder-binid-input').value.trim();
    setStoredBinId(val);
    loadReminderFromBin();
    return;
  }

  const binFindBtn = e.target.closest && e.target.closest('#reminder-binid-find');
  if (binFindBtn) { findBinIdAutomatically(); return; }
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
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  applyLang();
  initCardObserver();
  buildStudentList();
});
