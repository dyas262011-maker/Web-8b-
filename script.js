// ═══════════════════════════════════════════════════
// SCRIPT.JS — LOGIKA HALAMAN UTAMA (index.html)
// Data ada di config.js, helper bersama ada di shared.js.
// Fitur "Kelola Piket" (isi status per anak) HANYA ada di piket.html
// yang cuma bisa diakses lewat scan QR -- lihat komentar di file itu.
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

  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.getAttribute('data-i18n')); });
  document.querySelectorAll('[data-i18n-title]').forEach(el => { el.setAttribute('title', t(el.getAttribute('data-i18n-title'))); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder'))); });
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
  const nglBtn = document.getElementById('link-ngl');
  if (nglBtn) {
    if (CONFIG.nglLink && CONFIG.nglLink.trim()) { nglBtn.href = CONFIG.nglLink.trim(); nglBtn.style.display = ''; }
    else { nglBtn.style.display = 'none'; }
  }
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
    item.innerHTML = `<div class="student-no">${String(i+1).padStart(2,'0')}</div><div class="student-name">${escapeHtml(s.name)}</div><div class="student-tap-hint"><i class="fa-solid fa-comment-dots"></i></div>`;
    item.addEventListener('click', () => openStudentModal(i));
    list.appendChild(item);
  });
  const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }); }, { threshold: 0.04 });
  list.querySelectorAll('.student-item').forEach(el => io.observe(el));
}

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

// ═══════ LIGHTBOX ═══════
function openLightbox(src) { const lb=document.getElementById('lightbox'); const img=document.getElementById('lightbox-img'); if(!lb||!img)return; img.src=src; lb.classList.add('open'); document.body.style.overflow='hidden'; }
function closeLightbox() { const lb=document.getElementById('lightbox'); if(lb)lb.classList.remove('open'); document.body.style.overflow=''; }

// ═══════ CANVAS GRID ═══════
const canvas=document.getElementById('grid-canvas'); const ctx=canvas.getContext('2d'); let gridOffset=0;
function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;} resizeCanvas(); window.addEventListener('resize',resizeCanvas);
function drawGrid(){ctx.clearRect(0,0,canvas.width,canvas.height);const size=38;const isDark=document.documentElement.getAttribute('data-theme')==='dark';ctx.strokeStyle=isDark?'rgba(180,175,168,0.055)':'rgba(30,28,26,0.06)';ctx.lineWidth=1;const offset=gridOffset%size;for(let x=-size+offset;x<canvas.width+size;x+=size){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke();}for(let y=-size+offset;y<canvas.height+size;y+=size){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke();}gridOffset+=0.18;requestAnimationFrame(drawGrid);} drawGrid();

// ═══════ VIDEO / AVATAR FALLBACK ═══════
const heroVideo=document.getElementById('hero-video');const heroImg=document.getElementById('hero-img');
if(heroVideo){heroVideo.addEventListener('error',()=>{heroVideo.style.display='none';if(heroImg)heroImg.style.display='block';});setTimeout(()=>{if(heroVideo.readyState===0){heroVideo.style.display='none';if(heroImg)heroImg.style.display='block';}},3000);}
const avatarImg=document.getElementById('avatar-img');
if(avatarImg){avatarImg.addEventListener('error',()=>{avatarImg.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='110' viewBox='0 0 110 110'%3E%3Crect width='110' height='110' fill='%23e4e2dc'/%3E%3Ccircle cx='55' cy='40' r='18' fill='%23aaa'/%3E%3Cellipse cx='55' cy='86' rx='28' ry='20' fill='%23aaa'/%3E%3C/svg%3E";});}

// ═══════ MUSIC NOTES + TOGGLE ═══════
const notesContainer=document.getElementById('music-notes-container');let noteInterval=null;const noteSymbols=['\u2669','\u266A','\u266B','\u266C'];
function spawnNote(){const note=document.createElement('span');note.className='music-note-fall';note.textContent=noteSymbols[Math.floor(Math.random()*noteSymbols.length)];note.style.left=(Math.random()*92+2)+'vw';note.style.fontSize=(Math.random()*12+10)+'px';note.style.animationDuration=(Math.random()*4+5)+'s';note.style.opacity=(Math.random()*0.2+0.07).toFixed(2);notesContainer.appendChild(note);setTimeout(()=>note.remove(),10000);}
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
const pageNavWrap=document.getElementById('pageNavWrap');let pageNavOpen=false;let currentPage='home';
const PAGE_ORDER=['home','students','announcement','memories','admin'];
function togglePageNav(){pageNavOpen=!pageNavOpen;pageNavWrap.classList.toggle('open',pageNavOpen);}
document.addEventListener('click',e=>{if(pageNavOpen&&!pageNavWrap.contains(e.target)){pageNavOpen=false;pageNavWrap.classList.remove('open');}});

function goPage(pageId, skipHash){
  if(PAGE_ORDER.indexOf(pageId)===-1) pageId='home';
  if(pageId===currentPage){pageNavOpen=false;pageNavWrap.classList.remove('open');return;}
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target=document.getElementById('page-'+pageId);
  if(target){
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
  if(!skipHash) { try { history.replaceState(null, '', '#'+pageId); } catch(e) {} }
  if(pageId==='students')buildStudentList();
  if(pageId==='announcement'){ loadAnnouncements(); loadPiketProblems(); loadKasTunggakanPublic(); }
  if(pageId==='memories')buildPhotoGrid();
  if(pageId==='admin')initAdminPage();
}

function handleInitialHash() {
  const hash = (location.hash || '').replace('#', '');
  if (PAGE_ORDER.indexOf(hash) !== -1) goPage(hash, true);
}

// ═══════ CARD OBSERVER ═══════
function initCardObserver(){const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});},{threshold:0.08});document.querySelectorAll('.card').forEach((c,i)=>{c.style.transitionDelay=`${i*0.07}s`;io.observe(c);});}

// ═══════════════════════════════════════════════════
// ADMIN — gerbang password (Pengumuman / Kenangan / Tema / QR Piket)
// ═══════════════════════════════════════════════════
let adminInitialized = false;
function initAdminPage() {
  const authed = isAdminAuthed();
  document.getElementById('admin-gate').style.display = authed ? 'none' : 'flex';
  document.getElementById('admin-app').style.display = authed ? 'block' : 'none';
  if (authed && !adminInitialized) { adminInitialized = true; setupAdminApp(); }
}
function setupAdminApp() {
  renderQrAdmin();
  switchAdminTab('pengumuman');
  renderThemeButtons();
  loadMemoriesAdminList();
  loadKasManualEntries();
}
function switchAdminTab(tabKey) {
  document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabKey));
  document.querySelectorAll('.admin-tab-panel').forEach(p => p.style.display = (p.dataset.panel === tabKey) ? 'block' : 'none');
}
function renderQrAdmin() {
  const img = document.getElementById('admin-qr-img');
  const linkEl = document.getElementById('admin-qr-link');
  if (!img) return;
  // Ganti PIKET_PAGE_URL di config.js kalau domain kamu sudah pasti (mis. https://star-area.my.id/piket.html)
  const url = (CONFIG.piketPageUrl && CONFIG.piketPageUrl.trim())
    ? CONFIG.piketPageUrl.trim()
    : (window.location.origin + window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') + '/piket.html');
  img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=480x480&data=' + encodeURIComponent(url);
  if (linkEl) { linkEl.textContent = url; linkEl.href = url; }
}
async function downloadQrImage() {
  const img = document.getElementById('admin-qr-img');
  const btn = document.getElementById('btn-download-qr');
  if (!img || !img.src) return;
  const old = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ...';
  try {
    const res = await fetch(img.src, { mode: 'cors' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'qr-piket-ixb.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 4000);
  } catch (err) {
    console.warn('Gagal unduh langsung, buka di tab baru sebagai cadangan:', err);
    window.open(img.src, '_blank');
  } finally {
    btn.innerHTML = old;
  }
}

// ═══════════════════════════════════════════════════
// PENGUMUMAN (publik) + komposer (admin)
// ═══════════════════════════════════════════════════
async function loadAnnouncements() {
  const listEl = document.getElementById('announcement-list');
  if (!listEl) return;
  listEl.innerHTML = `<p class="schedule-empty">${t('label_memuat')}</p>`;
  try {
    const rows = await supaSelect('announcements', '?select=*&order=created_at.desc&limit=30');
    renderAnnouncements(rows);
  } catch (err) {
    console.warn(err);
    listEl.innerHTML = `<p class="schedule-empty"><i class="fa-solid fa-triangle-exclamation"></i> ${t('label_gagal_memuat')}</p>`;
  }
}
function renderAnnouncements(rows) {
  const listEl = document.getElementById('announcement-list');
  if (!listEl) return;
  listEl.innerHTML = '';
  if (!rows || rows.length === 0) {
    listEl.innerHTML = `<p class="schedule-empty"><i class="fa-solid fa-circle-info"></i> ${t('label_belum_ada_pengumuman')}</p>`;
    return;
  }
  const isAdmin = isAdminAuthed();
  rows.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'announce-card';
    card.style.transitionDelay = `${i * 0.06}s`;
    const dt = r.created_at ? new Date(r.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '';
    card.innerHTML = `
      ${r.image_url ? `<img src="${escapeHtml(r.image_url)}" class="announce-img" alt="${escapeHtml(r.title||'')}" loading="lazy" />` : ''}
      <div class="announce-body">
        ${r.title ? `<div class="announce-title">${escapeHtml(r.title)}</div>` : ''}
        <div class="announce-text">${escapeHtml(r.body||'')}</div>
        <div class="announce-meta">${dt}</div>
      </div>
      ${isAdmin ? `<button class="announce-del-btn" data-id="${r.id}" title="Hapus"><i class="fa-solid fa-trash"></i></button>` : ''}
    `;
    listEl.appendChild(card);
  });
  requestAnimationFrame(() => listEl.querySelectorAll('.announce-card').forEach(el => el.classList.add('visible')));
}
async function postAnnouncement() {
  const titleEl = document.getElementById('ann-title');
  const bodyEl = document.getElementById('ann-body');
  const imgEl = document.getElementById('ann-image');
  const title = titleEl.value.trim(), body = bodyEl.value.trim(), image = imgEl.value.trim();
  if (!body && !title) { alert('Isi judul atau teks pengumuman dulu.'); return; }
  const btn = document.getElementById('btn-post-announcement');
  btn.disabled = true;
  const old = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ...';
  try {
    await supaInsert('announcements', [{ title: title || null, body: body || null, image_url: image || null }]);
    titleEl.value = ''; bodyEl.value = ''; imgEl.value = '';
    loadAnnouncements();
  } catch (err) {
    console.warn(err);
    alert('Gagal mengirim pengumuman. Cek koneksi / Supabase sudah di-setup (lihat supabase_setup.sql).');
  } finally {
    btn.disabled = false; btn.innerHTML = old;
  }
}
async function deleteAnnouncement(id) {
  if (!confirm('Hapus pengumuman ini?')) return;
  try { await supaDelete('announcements', `?id=eq.${id}`); loadAnnouncements(); }
  catch (err) { console.warn(err); alert('Gagal menghapus.'); }
}

// ═══════════════════════════════════════════════════
// PIKET — tampilan publik "yang bermasalah" saja (isi datanya ada di piket.html)
// ═══════════════════════════════════════════════════
async function loadPiketProblems() {
  const wrap = document.getElementById('piket-problem-list');
  if (!wrap) return;
  wrap.innerHTML = `<p class="schedule-empty">${t('label_memuat')}</p>`;
  try {
    // Cuma status "kabur" (Tidak Piket) yang dianggap masalah -- Sakit &
    // Dispen sudah dihapus dari sistem. Kalau masih ada data lama berstatus
    // sakit/dispen di database, otomatis tidak ikut tampil di sini.
    const rows = await supaSelect('piket_status', '?status=eq.kabur&resolved=eq.false&select=*&order=tanggal.desc');
    renderPiketProblems(rows);
  } catch (err) {
    console.warn(err);
    wrap.innerHTML = `<p class="schedule-empty"><i class="fa-solid fa-triangle-exclamation"></i> ${t('label_gagal_memuat')}</p>`;
  }
}
function renderPiketProblems(rows) {
  const wrap = document.getElementById('piket-problem-list');
  if (!wrap) return;
  wrap.innerHTML = '';
  if (!rows || rows.length === 0) {
    wrap.innerHTML = `<p class="schedule-empty"><i class="fa-solid fa-circle-check"></i> ${t('label_piket_aman')}</p>`;
    return;
  }
  const isAdmin = isAdminAuthed();
  rows.forEach((r, i) => {
    const meta = PIKET_STATUS_META[r.status] || PIKET_STATUS_META.piket;
    const card = document.createElement('div');
    card.className = 'piket-problem-card';
    card.style.transitionDelay = `${i * 0.05}s`;
    card.style.setProperty('--pk-color', meta.color);
    card.style.setProperty('--pk-text', meta.textColor);
    let actions = '';
    if (isAdmin) {
      actions += `<button class="piket-resolve-btn" data-id="${r.id}">${t('btn_sudah_terlaksana')}</button>`;
    }
    card.innerHTML = `
      <div class="piket-problem-badge">${t(meta.labelKey)}</div>
      <div class="piket-problem-info">
        <div class="piket-problem-name">${escapeHtml(r.nama)}</div>
        <div class="piket-problem-date">${escapeHtml(r.tanggal)}</div>
      </div>
      ${actions ? `<div class="piket-problem-actions">${actions}</div>` : ''}
    `;
    wrap.appendChild(card);
  });
  requestAnimationFrame(() => wrap.querySelectorAll('.piket-problem-card').forEach(el => el.classList.add('visible')));
}

// Emoji lewat kode Unicode (\u{...}), bukan di-paste langsung dari keyboard.
const EMOJI = {
  megaphone: '\u{1F4E2}',
  broom: '\u{1F9F9}',
  calendar: '\u{1F4C5}',
  money: '\u{1F4B0}',
  warning: '\u{26A0}\u{FE0F}',
  pray: '\u{1F64F}',
  cap: '\u{1F393}',
  check: '\u{2705}',
};
async function resolvePiketIssue(id) {
  try { await supaUpdate('piket_status', `?id=eq.${id}`, { resolved: true }); loadPiketProblems(); }
  catch (err) { console.warn(err); alert('Gagal update status.'); }
}

// ═══════════════════════════════════════════════════
// KAS — komposer manual, TERSIMPAN KE SERVER (bukan cuma di memori).
// Nama+jumlah yang admin tambahkan langsung masuk Supabase, jadi TIDAK
// hilang saat reload/relog, dan otomatis tampil juga di halaman Pengumuman
// (publik) sampai admin menghapusnya (mis. setelah lunas).
// ═══════════════════════════════════════════════════
let kasManualEntries = []; // [{id, nama, jumlah}] -- id dari Supabase

async function loadKasManualEntries() {
  const wrap = document.getElementById('kas-manual-list');
  if (wrap) wrap.innerHTML = `<p class="schedule-empty">${t('label_memuat')}</p>`;
  try {
    const rows = await supaSelect('kas_tunggakan', '?select=*&order=created_at.asc');
    kasManualEntries = (rows || []).map(r => ({ id: r.id, nama: r.nama, jumlah: r.jumlah }));
  } catch (err) {
    console.warn('Gagal memuat data kas tunggakan:', err);
    kasManualEntries = [];
  }
  renderKasManualList();
}

function renderKasManualList() {
  const wrap = document.getElementById('kas-manual-list');
  const totalEl = document.getElementById('kas-manual-total');
  const sendBtn = document.getElementById('btn-kas-manual-send');
  if (!wrap) return;
  wrap.innerHTML = '';
  if (kasManualEntries.length === 0) {
    wrap.innerHTML = `<p class="schedule-empty">${t('label_kas_belum_ada_nama')}</p>`;
    if (totalEl) totalEl.style.display = 'none';
    if (sendBtn) sendBtn.style.display = 'none';
    return;
  }
  let total = 0;
  kasManualEntries.forEach((entry) => {
    total += entry.jumlah;
    const row = document.createElement('div');
    row.className = 'memories-admin-row';
    row.innerHTML = `
      <div style="flex:1;">
        <div class="piket-admin-name" style="font-size:0.8rem;">${escapeHtml(entry.nama)}</div>
        <div class="piket-problem-date">Rp${entry.jumlah.toLocaleString('id-ID')}</div>
      </div>
      <button class="reminder-row-del" data-id="${entry.id}" title="Hapus"><i class="fa-solid fa-xmark"></i></button>`;
    wrap.appendChild(row);
  });
  if (totalEl) {
    totalEl.style.display = 'block';
    totalEl.textContent = 'Total: Rp' + total.toLocaleString('id-ID') + ' (' + kasManualEntries.length + ' siswa)';
  }
  if (sendBtn) sendBtn.style.display = 'flex';
}

async function addKasManualEntry() {
  const namaEl = document.getElementById('kas-manual-nama');
  const jumlahEl = document.getElementById('kas-manual-jumlah');
  const nama = namaEl.value.trim();
  const jumlah = parseInt(jumlahEl.value, 10);
  if (!nama || !jumlah || jumlah <= 0) { alert('Isi nama dan jumlah yang valid dulu.'); return; }
  namaEl.value = ''; jumlahEl.value = '';
  namaEl.focus();
  try {
    await supaInsert('kas_tunggakan', [{ nama, jumlah }]);
    await loadKasManualEntries();
    loadKasTunggakanPublic(); // sinkron ke tampilan publik kalau lagi kebuka
  } catch (err) {
    console.warn('Gagal menyimpan tunggakan:', err);
    alert('Gagal menyimpan ke server. Cek koneksi / setup Supabase (kas_tunggakan).');
  }
}

async function removeKasManualEntry(id) {
  try {
    await supaDelete('kas_tunggakan', `?id=eq.${id}`);
    await loadKasManualEntries();
    loadKasTunggakanPublic();
  } catch (err) {
    console.warn('Gagal menghapus tunggakan:', err);
    alert('Gagal menghapus di server.');
  }
}

function buildKasManualBatchMessage() {
  const lines = [];
  lines.push(EMOJI.megaphone + ' PEMBERITAHUAN KAS KELAS');
  lines.push('');
  lines.push('Yth. Bapak/Ibu Orang Tua/Wali,');
  lines.push('');
  lines.push(EMOJI.calendar + ' Berdasarkan catatan kas kelas IXB SMPIT ALAMY, berikut daftar ananda yang masih memiliki tunggakan kas:');
  lines.push('');
  let total = 0;
  kasManualEntries.forEach((entry, i) => {
    total += entry.jumlah;
    lines.push((i + 1) + '. ' + entry.nama + ' - Rp' + entry.jumlah.toLocaleString('id-ID'));
  });
  lines.push('');
  lines.push(EMOJI.money + ' Total keseluruhan: Rp' + total.toLocaleString('id-ID'));
  lines.push('');
  lines.push(EMOJI.pray + ' Mohon kesediaannya untuk melunasi secepatnya. Terima kasih atas perhatian dan kerja samanya.');
  lines.push('');
  lines.push(EMOJI.cap + ' Wali Kelas IXB - SMPIT ALAMY');
  lines.push('');
  lines.push('Info lengkap: ' + announcementPageUrl());
  return lines.join('\n');
}

async function sendKasManualBatch() {
  if (kasManualEntries.length === 0) return;
  const text = buildKasManualBatchMessage();
  const groupUrl = (CONFIG.waGroupOrtu && CONFIG.waGroupOrtu.trim()) || '';
  try { await navigator.clipboard.writeText(text); }
  catch (err) { console.warn('Gagal menyalin otomatis:', err); alert(text); }
  if (!groupUrl) { alert(t('label_belum_ada_link_grup_ortu')); return; }
  window.open(groupUrl, '_blank');
}

// ═══ Tampilan PUBLIK di halaman Pengumuman ═══
async function loadKasTunggakanPublic() {
  const wrap = document.getElementById('kas-tunggakan-public-list');
  if (!wrap) return;
  wrap.innerHTML = `<p class="schedule-empty">${t('label_memuat')}</p>`;
  try {
    const rows = await supaSelect('kas_tunggakan', '?select=*&order=created_at.asc');
    renderKasTunggakanPublic(rows);
  } catch (err) {
    console.warn(err);
    wrap.innerHTML = `<p class="schedule-empty"><i class="fa-solid fa-triangle-exclamation"></i> ${t('label_gagal_memuat')}</p>`;
  }
}
function renderKasTunggakanPublic(rows) {
  const wrap = document.getElementById('kas-tunggakan-public-list');
  if (!wrap) return;
  wrap.innerHTML = '';
  if (!rows || rows.length === 0) {
    wrap.innerHTML = `<p class="schedule-empty"><i class="fa-solid fa-circle-check"></i> ${t('label_semua_lunas')}</p>`;
    return;
  }
  const isAdmin = isAdminAuthed();
  rows.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'piket-problem-card';
    card.style.transitionDelay = `${i * 0.05}s`;
    card.style.setProperty('--pk-color', '#e5484d');
    card.style.setProperty('--pk-text', '#ffffff');
    card.innerHTML = `
      <div class="piket-problem-badge">${t('kas_status_belum')}</div>
      <div class="piket-problem-info">
        <div class="piket-problem-name">${escapeHtml(r.nama)}</div>
        <div class="piket-problem-date">Rp${Number(r.jumlah||0).toLocaleString('id-ID')}</div>
      </div>
      ${isAdmin ? `<button class="piket-resolve-btn kas-public-resolve-btn" data-id="${r.id}">${t('btn_sudah_lunas')}</button>` : ''}
    `;
    wrap.appendChild(card);
  });
  requestAnimationFrame(() => wrap.querySelectorAll('.piket-problem-card').forEach(el => el.classList.add('visible')));
}
async function resolveKasTunggakan(id) {
  try {
    await supaDelete('kas_tunggakan', `?id=eq.${id}`);
    loadKasTunggakanPublic();
  } catch (err) {
    console.warn(err);
    alert('Gagal menghapus.');
  }
}

// ═══════════════════════════════════════════════════
// KENANGAN — foto dari Supabase (+ seed dari config.js kalau kosong)
// ═══════════════════════════════════════════════════
async function fetchMemoriesPhotos() {
  try {
    const rows = await supaSelect('memories_photos', '?select=*&order=created_at.desc');
    if (rows && rows.length > 0) return rows;
    return (CONFIG.memoriesPhotosSeed || []).map((url, i) => ({ id: 'seed-' + i, url }));
  } catch (err) {
    console.warn('Gagal ambil foto dari server, pakai foto cadangan:', err);
    return (CONFIG.memoriesPhotosSeed || []).map((url, i) => ({ id: 'seed-' + i, url }));
  }
}
async function buildPhotoGrid() {
  const grid = document.getElementById('photo-grid');
  if (!grid) return;
  grid.innerHTML = `<p class="schedule-empty">${t('label_memuat')}</p>`;
  const photos = await fetchMemoriesPhotos();
  grid.innerHTML = '';
  if (photos.length === 0) {
    for (let i = 0; i < 6; i++) { const slot = document.createElement('div'); slot.className = 'photo-item'; slot.innerHTML = '<div class="photo-item-placeholder"><i class="fa-solid fa-image"></i></div>'; grid.appendChild(slot); }
    return;
  }
  photos.forEach((p) => {
    const item = document.createElement('div'); item.className = 'photo-item';
    const img = document.createElement('img'); img.src = p.url; img.alt = 'Foto kenangan'; img.loading = 'lazy';
    item.appendChild(img);
    item.addEventListener('click', () => openLightbox(p.url));
    grid.appendChild(item);
  });
}
async function loadMemoriesAdminList() {
  const wrap = document.getElementById('memories-admin-list');
  if (!wrap) return;
  wrap.innerHTML = `<p class="schedule-empty">${t('label_memuat')}</p>`;
  try {
    const rows = await supaSelect('memories_photos', '?select=*&order=created_at.desc');
    wrap.innerHTML = '';
    if (!rows || rows.length === 0) { wrap.innerHTML = '<p class="schedule-empty">Belum ada foto tersimpan di server (masih pakai foto cadangan di config.js).</p>'; return; }
    rows.forEach(r => {
      const row = document.createElement('div');
      row.className = 'memories-admin-row';
      row.innerHTML = `<img src="${escapeHtml(r.url)}" class="memories-admin-thumb" alt="" loading="lazy" /><button class="reminder-row-del" data-id="${r.id}" title="Hapus"><i class="fa-solid fa-xmark"></i></button>`;
      wrap.appendChild(row);
    });
  } catch (err) {
    console.warn(err);
    wrap.innerHTML = `<p class="schedule-empty">${t('label_gagal_memuat')}</p>`;
  }
}
async function addMemoryPhoto() {
  const input = document.getElementById('memories-photo-input');
  const url = input.value.trim();
  if (!url) return;
  const btn = document.getElementById('btn-tambah-foto');
  btn.disabled = true;
  try {
    await supaInsert('memories_photos', [{ url }]);
    input.value = '';
    loadMemoriesAdminList();
  } catch (err) {
    console.warn(err);
    alert('Gagal menambah foto. Cek koneksi / setup Supabase.');
  } finally { btn.disabled = false; }
}
async function deleteMemoryPhoto(id) {
  try { await supaDelete('memories_photos', `?id=eq.${id}`); loadMemoriesAdminList(); }
  catch (err) { console.warn(err); alert('Gagal menghapus foto.'); }
}

// ═══════════════════════════════════════════════════
// TEMA / MUSIM (Kemerdekaan / Ramadhan / Biasa) — sinkron semua pengunjung
// ═══════════════════════════════════════════════════
let currentSeason = THEME_CONFIG.default;
let musicFallbackTried = false;
function applyThemeLocal(season) {
  currentSeason = season;
  document.documentElement.setAttribute('data-season', season);
  localStorage.setItem('viiib-season-cache', season);
  const musicUrl = (THEME_CONFIG.musics && THEME_CONFIG.musics[season]) || CONFIG.bgMusic;
  const src = document.getElementById('music-src');
  if (src && musicUrl && src.src !== musicUrl) {
    const wasPlaying = isPlaying;
    musicFallbackTried = false; // tema baru dipilih, kasih kesempatan fallback baru kalau linknya mati
    src.src = musicUrl;
    const aud = document.getElementById('bg-music');
    if (aud) {
      aud.load();
      if (wasPlaying) aud.play().catch(() => {});
    }
  }
  renderThemeButtons();
  const countdownWrap = document.getElementById('ramadhan-countdown');
  if (countdownWrap) countdownWrap.style.display = (season === 'ramadhan') ? 'flex' : 'none';
  if (season === 'ramadhan') updateRamadhanCountdown();
}
// Kalau file musik tema (mis. hosting sementara yang kadaluwarsa) gagal
// dimuat, otomatis balik ke musik "biasa" yang stabil supaya tidak diam
// tanpa suara sama sekali. Cukup dipasang sekali saja.
(function setupMusicFallback() {
  const aud = document.getElementById('bg-music');
  const src = document.getElementById('music-src');
  if (!aud || !src) return;
  aud.addEventListener('error', () => {
    const normalUrl = (THEME_CONFIG.musics && THEME_CONFIG.musics.normal) || CONFIG.bgMusic;
    if (musicFallbackTried || !normalUrl || src.src === normalUrl) return;
    musicFallbackTried = true;
    console.warn('Musik tema gagal dimuat (link mungkin sudah kadaluwarsa), pakai musik biasa sebagai cadangan.');
    src.src = normalUrl;
    aud.load();
  }, true);
})();
function renderThemeButtons() {
  document.querySelectorAll('.theme-choice-btn').forEach(b => b.classList.toggle('active', b.dataset.season === currentSeason));
}
function updateRamadhanCountdown() {
  const el = document.getElementById('ramadhan-countdown-value');
  if (!el) return;
  if (!THEME_CONFIG.idulFitriDate) { el.textContent = '—'; return; }
  const target = new Date(THEME_CONFIG.idulFitriDate + 'T00:00:00');
  const now = new Date();
  const days = Math.max(0, Math.ceil((target - now) / 86400000));
  el.textContent = days;
}
async function loadThemeFromServer() {
  try {
    const rows = await supaSelect('site_settings', '?key=eq.theme&select=value');
    const season = (rows && rows[0] && rows[0].value) || localStorage.getItem('viiib-season-cache') || THEME_CONFIG.default;
    applyThemeLocal(season);
  } catch (err) {
    console.warn('Gagal ambil tema dari server, pakai cache lokal:', err);
    applyThemeLocal(localStorage.getItem('viiib-season-cache') || THEME_CONFIG.default);
  }
}
async function setThemeGlobal(season) {
  applyThemeLocal(season);
  try { await supaUpsert('site_settings', [{ key: 'theme', value: season }], 'key'); }
  catch (err) { console.warn('Gagal simpan tema ke server (tema tetap berubah di device ini):', err); }
}

// ═══════════════════════════════════════════════════
// EVENT DELEGATION
// ═══════════════════════════════════════════════════
document.addEventListener('click', async (e) => {
  if (e.target && e.target.id === 'admin-pw-submit') {
    const input = document.getElementById('admin-pw-input');
    const errEl = document.getElementById('admin-pw-error');
    const hash = await sha256Hex(input.value);
    if (hash === ADMIN_CONFIG.adminPasswordHash) {
      sessionStorage.setItem('viiib-admin-auth', '1');
      errEl.textContent = ''; input.value = '';
      initAdminPage();
    } else { errEl.textContent = t('reminder_pw_error'); }
    return;
  }
  const logoutBtn = e.target.closest && e.target.closest('#admin-logout-btn');
  if (logoutBtn) { sessionStorage.removeItem('viiib-admin-auth'); adminInitialized = false; initAdminPage(); return; }

  const tabBtn = e.target.closest && e.target.closest('.admin-tab-btn');
  if (tabBtn) { switchAdminTab(tabBtn.dataset.tab); return; }

  if (e.target && e.target.id === 'btn-post-announcement') { postAnnouncement(); return; }
  const delAnnBtn = e.target.closest && e.target.closest('.announce-del-btn');
  if (delAnnBtn) { deleteAnnouncement(delAnnBtn.dataset.id); return; }

  const resolveBtn = e.target.closest && e.target.closest('.piket-resolve-btn');
  if (resolveBtn) { resolvePiketIssue(resolveBtn.dataset.id); return; }

  const kasResolveBtn = e.target.closest && e.target.closest('.kas-public-resolve-btn');
  if (kasResolveBtn) { resolveKasTunggakan(kasResolveBtn.dataset.id); return; }

  if (e.target && e.target.id === 'btn-kas-manual-add') { addKasManualEntry(); return; }
  const kasManualDelBtn = e.target.closest && e.target.closest('#kas-manual-list .reminder-row-del');
  if (kasManualDelBtn) { removeKasManualEntry(kasManualDelBtn.dataset.id); return; }
  if (e.target && e.target.id === 'btn-kas-manual-send') { sendKasManualBatch(); return; }

  if (e.target && e.target.id === 'btn-download-qr') { downloadQrImage(); return; }

  if (e.target && e.target.id === 'btn-tambah-foto') { addMemoryPhoto(); return; }
  const delMemBtn = e.target.closest && e.target.closest('#memories-admin-list .reminder-row-del');
  if (delMemBtn) { deleteMemoryPhoto(delMemBtn.dataset.id); return; }

  const themeBtnEl = e.target.closest && e.target.closest('.theme-choice-btn');
  if (themeBtnEl) { setThemeGlobal(themeBtnEl.dataset.season); return; }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target && e.target.id === 'admin-pw-input') {
    document.getElementById('admin-pw-submit').click();
  }
});

// ═══════ SPLASH SCREEN (ikut tema aktif) ═══════
function splitLettersWithDelay(el, baseDelay, step) {
  if (!el) return;
  const text = el.textContent;
  el.textContent = '';
  [...text].forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    span.style.animationDelay = (baseDelay + i * step) + 's';
    el.appendChild(span);
  });
}
function getCachedSeason() {
  try {
    const s = localStorage.getItem('viiib-season-cache');
    if (s && THEME_CONFIG.splash && THEME_CONFIG.splash[s]) return s;
  } catch (e) {}
  return THEME_CONFIG.default;
}
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;
  document.body.classList.add('splash-active');

  const season = getCachedSeason();
  document.documentElement.setAttribute('data-season', season); // jaga-jaga kalau script di <head> belum sempat jalan
  const conf = (THEME_CONFIG.splash && THEME_CONFIG.splash[season]) || THEME_CONFIG.splash.kemerdekaan;

  const line1El = document.getElementById('splash-line1-word');
  const line2El = document.getElementById('splash-line2');
  if (line1El) line1El.textContent = conf.line1;
  if (line2El) line2El.textContent = conf.line2;
  splitLettersWithDelay(line1El, 0.1, 0.03);
  splitLettersWithDelay(line2El, 0.55, 0.02);

  const img = document.getElementById('splash-garuda-img');
  const fallback = document.getElementById('splash-garuda-fallback');
  fallback.innerHTML = `<i class="${conf.fallbackIcon || 'fa-solid fa-star'}"></i>`;
  fallback.classList.remove('show');
  img.style.display = '';
  const link = (conf.image || '').trim();
  if (link) {
    img.addEventListener('error', () => { img.style.display = 'none'; fallback.classList.add('show'); });
    img.src = link;
  } else {
    img.style.display = 'none';
    fallback.classList.add('show');
  }

  const duration = (SPLASH_CONFIG && SPLASH_CONFIG.durationMs) || 3200;
  setTimeout(() => {
    splash.classList.add('hide');
    document.body.classList.remove('splash-active');
    setTimeout(() => { splash.style.display = 'none'; }, 550);
  }, duration);
}

// ═══════ INIT ═══════
document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  applyConfig();
  applyLang();
  initCardObserver();
  buildStudentList();
  loadThemeFromServer();
  handleInitialHash();
});
