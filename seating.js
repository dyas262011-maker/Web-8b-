/* ============================================
   STRUKTUR KELAS – DRAG & DROP + JSONBIN SYNC
   seating.js
   ============================================ */

// Master Key JSONBin (sudah diberikan)
const MASTER_KEY = "$2a$10$vszwGPeGwo8ZKazw2ax7pOEojIMhAVJ.UpOLjGGLfIDJr5MExYyKG";

// Fungsi untuk mendapatkan Bin ID (dari localStorage atau buat baru)
async function getOrCreateBinId() {
  let binId = localStorage.getItem('viiib-seating-bin-id');
  if (binId) return binId;

  // Buat bin baru dengan data awal (array kosong)
  try {
    const response = await fetch("https://api.jsonbin.io/v3/b", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY
      },
      body: JSON.stringify([]) // data awal
    });
    if (!response.ok) throw new Error("Gagal membuat bin");
    const data = await response.json();
    binId = data.metadata.id;
    localStorage.setItem('viiib-seating-bin-id', binId);
    console.log("Bin ID baru dibuat:", binId);
    return binId;
  } catch (err) {
    console.error("Tidak bisa membuat bin:", err);
    alert("Gagal terhubung ke JSONBin. Periksa koneksi internet & Master Key.");
    return null;
  }
}

// URL API berdasarkan bin ID
function getBinUrl(binId) {
  return `https://api.jsonbin.io/v3/b/${binId}`;
}

// Header standar
const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": MASTER_KEY
};

// ═══════════════════════════════════════════
//  DATA AWAL POSISI MEJA (default)
// ═══════════════════════════════════════════
function getDefaultPositions() {
  const cols = 8;
  const rows = 4;
  const startX = 50;
  const startY = 80;
  const gapX = 80;
  const gapY = 100;
  const positions = [];
  for (let i = 0; i < 32; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    positions.push({
      id: i,
      x: startX + col * gapX,
      y: startY + row * gapY
    });
  }
  return positions;
}

// ═══════════════════════════════════════════
//  STATE LOKAL
// ═══════════════════════════════════════════
let seatingData = [];
let isDragging = false;
let dragTarget = null;
let dragStartX, dragStartY;
let origLeft, origTop;
let binId = null;
let pollingInterval = null;

// ═══════════════════════════════════════════
//  FUNGSI GAMBAR ULANG SEMUA MEJA
// ═══════════════════════════════════════════
function renderDesks() {
  const classroom = document.getElementById('classroom');
  if (!classroom) return;

  const existing = classroom.querySelectorAll('.desk');
  existing.forEach(el => el.remove());

  const studentNames = (typeof STUDENTS !== 'undefined') ? STUDENTS.map(s => s.name) : [];

  seatingData.forEach(pos => {
    const desk = document.createElement('div');
    desk.className = 'desk';
    desk.style.left = pos.x + 'px';
    desk.style.top  = pos.y + 'px';
    desk.dataset.id = pos.id;
    desk.setAttribute('data-student-name', studentNames[pos.id] || `Meja ${pos.id+1}`);
    desk.innerHTML = `<span class="desk-no">${String(pos.id+1).padStart(2,'0')}</span>`;

    desk.addEventListener('mousedown', onDragStart);
    desk.addEventListener('touchstart', onDragStart, { passive: false });
    classroom.appendChild(desk);
  });
}

// ═══════════════════════════════════════════
//  AMBIL DATA DARI JSONBIN
// ═══════════════════════════════════════════
async function fetchFromJsonBin() {
  if (!binId) return;
  try {
    const res = await fetch(getBinUrl(binId), { headers });
    if (!res.ok) throw new Error("Gagal fetch");
    const json = await res.json();
    const data = json.record;
    if (Array.isArray(data) && data.length > 0) {
      if (!isDragging && JSON.stringify(data) !== JSON.stringify(seatingData)) {
        seatingData = data;
        renderDesks();
      } else if (seatingData.length === 0) {
        seatingData = data;
        renderDesks();
      }
    } else if (seatingData.length === 0) {
      // Bin kosong, isi default
      seatingData = getDefaultPositions();
      renderDesks();
      uploadToJsonBin();
    }
  } catch (err) {
    console.warn("Gagal fetch dari JSONBin, pakai localStorage", err);
    const saved = localStorage.getItem('viiib-seating');
    seatingData = saved ? JSON.parse(saved) : getDefaultPositions();
    renderDesks();
  }
}

// ═══════════════════════════════════════════
//  UPLOAD DATA KE JSONBIN
// ═══════════════════════════════════════════
async function uploadToJsonBin() {
  if (!binId) return;
  try {
    await fetch(getBinUrl(binId), {
      method: 'PUT',
      headers,
      body: JSON.stringify(seatingData)
    });
    localStorage.setItem('viiib-seating', JSON.stringify(seatingData));
  } catch (err) {
    console.warn("Gagal upload, simpan ke localStorage", err);
    localStorage.setItem('viiib-seating', JSON.stringify(seatingData));
  }
}

// ═══════════════════════════════════════════
//  POLLING
// ═══════════════════════════════════════════
function startPolling() {
  stopPolling();
  pollingInterval = setInterval(async () => {
    if (!isDragging) await fetchFromJsonBin();
  }, 3000);
}

function stopPolling() {
  if (pollingInterval) clearInterval(pollingInterval);
}

// ═══════════════════════════════════════════
//  DRAG HANDLERS (sama seperti sebelumnya)
// ═══════════════════════════════════════════
function onDragStart(e) {
  e.preventDefault();
  const desk = e.currentTarget;
  const id = parseInt(desk.dataset.id, 10);
  const pos = seatingData.find(p => p.id === id);
  if (!pos) return;

  dragTarget = { desk, id };
  isDragging = true;

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  dragStartX = clientX;
  dragStartY = clientY;
  origLeft = pos.x;
  origTop  = pos.y;

  desk.classList.add('dragging');

  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('touchmove', onDragMove, { passive: false });
  document.addEventListener('mouseup', onDragEnd);
  document.addEventListener('touchend', onDragEnd);
}

function onDragMove(e) {
  if (!isDragging || !dragTarget) return;
  e.preventDefault();

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  const dx = clientX - dragStartX;
  const dy = clientY - dragStartY;

  let newX = origLeft + dx;
  let newY = origTop + dy;

  const classroom = document.getElementById('classroom');
  const rect = classroom.getBoundingClientRect();
  const maxX = rect.width - 60;
  const maxY = rect.height - 60;

  newX = Math.max(0, Math.min(newX, maxX));
  newY = Math.max(0, Math.min(newY, maxY));

  dragTarget.desk.style.left = newX + 'px';
  dragTarget.desk.style.top  = newY + 'px';
}

function onDragEnd(e) {
  if (!isDragging || !dragTarget) return;
  isDragging = false;

  const desk = dragTarget.desk;
  const id = dragTarget.id;
  const left = parseInt(desk.style.left, 10);
  const top = parseInt(desk.style.top, 10);

  const pos = seatingData.find(p => p.id === id);
  if (pos) {
    pos.x = left;
    pos.y = top;
  }

  uploadToJsonBin();

  desk.classList.remove('dragging');
  dragTarget = null;

  document.removeEventListener('mousemove', onDragMove);
  document.removeEventListener('touchmove', onDragMove);
  document.removeEventListener('mouseup', onDragEnd);
  document.removeEventListener('touchend', onDragEnd);
}

// ═══════════════════════════════════════════
//  RESET
// ═══════════════════════════════════════════
async function resetSeating() {
  seatingData = getDefaultPositions();
  renderDesks();
  await uploadToJsonBin();
}

// ═══════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', async () => {
  binId = await getOrCreateBinId();
  if (!binId) return; // Berhenti jika gagal

  await fetchFromJsonBin();
  startPolling();

  const resetBtn = document.getElementById('reset-seating-btn');
  if (resetBtn) resetBtn.addEventListener('click', resetSeating);
});

window.addEventListener('beforeunload', stopPolling);