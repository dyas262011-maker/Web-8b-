/* ============================================
   STRUKTUR KELAS – DRAG & DROP + JSONBIN SYNC
   seating.js
   ============================================ */

const MASTER_KEY = "$2a$10$vszwGPeGwo8ZKazw2ax7pOEojIMhAVJ.UpOLjGGLfIDJr5MExYyKG";

// ═══════ SVG IKON MEJA SISWA ═══════
function getDeskSVG(color = "#1a6fcf") {
  return `
    <svg viewBox="0 0 64 36" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="60" height="28" rx="3" fill="${color}" stroke="#1a3a5c" stroke-width="2"/>
      <rect x="10" y="6" width="44" height="4" rx="1" fill="#fff" opacity="0.6"/>
      <rect x="4" y="14" width="12" height="14" rx="1" fill="#fff" opacity="0.3"/>
      <rect x="48" y="14" width="12" height="14" rx="1" fill="#fff" opacity="0.3"/>
      <rect x="20" y="14" width="24" height="14" rx="1" fill="#fff" opacity="0.2"/>
    </svg>
  `;
}

// ═══════ SVG IKON MEJA GURU ═══════
function getTeacherDeskSVG() {
  return `
    <svg viewBox="0 0 80 44" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="76" height="32" rx="4" fill="#fbbf24" stroke="#1a3a5c" stroke-width="2.5"/>
      <rect x="12" y="8" width="56" height="5" rx="1.5" fill="#fff" opacity="0.7"/>
      <rect x="6" y="18" width="18" height="16" rx="2" fill="#fff" opacity="0.35"/>
      <rect x="56" y="18" width="18" height="16" rx="2" fill="#fff" opacity="0.35"/>
      <rect x="28" y="18" width="24" height="16" rx="2" fill="#fff" opacity="0.25"/>
      <text x="40" y="40" text-anchor="middle" font-size="6" fill="#1a3a5c" font-family="monospace" font-weight="bold">GURU</text>
    </svg>
  `;
}

// ═══════ BIN ID ═══════
async function getOrCreateBinId() {
  let binId = localStorage.getItem('viiib-seating-bin-id');
  if (binId) {
    console.log("Bin ID dari localStorage:", binId);
    return binId;
  }
  try {
    const res = await fetch("https://api.jsonbin.io/v3/b", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Master-Key": MASTER_KEY },
      body: JSON.stringify([])
    });
    if (!res.ok) throw new Error("Gagal membuat bin");
    const data = await res.json();
    binId = data.metadata.id;
    localStorage.setItem('viiib-seating-bin-id', binId);
    console.log("Bin ID baru dibuat:", binId);
    return binId;
  } catch (err) {
    console.error("Gagal membuat bin:", err);
    return null;
  }
}

function getBinUrl(binId) {
  return `https://api.jsonbin.io/v3/b/${binId}`;
}

const headers = { "Content-Type": "application/json", "X-Master-Key": MASTER_KEY };

// ═══════ DEFAULT POSISI ═══════
function getDefaultPositions() {
  const cols = 8, rows = 4;
  const startX = 28, startY = 105;
  const gapX = 82, gapY = 92;
  const positions = [];
  for (let i = 0; i < 32; i++) {
    positions.push({
      id: i,
      x: startX + (i % cols) * gapX,
      y: startY + Math.floor(i / cols) * gapY
    });
  }
  return positions;
}

// ═══════ POSISI MEJA GURU ═══════
function getTeacherPosition() {
  return { x: 310, y: 22 };
}

// ═══════ STATE ═══════
let seatingData = [];
let isDragging = false;
let dragTarget = null;
let dragStartX, dragStartY, origLeft, origTop;
let binId = null;
let pollingInterval = null;

// ═══════ RENDER MEJA GURU ═══════
function renderTeacherDesk() {
  const classroom = document.getElementById('classroom');
  if (!classroom) return;

  // Hapus meja guru lama
  const old = classroom.querySelector('.teacher-desk');
  if (old) old.remove();

  const pos = getTeacherPosition();
  const teacher = document.createElement('div');
  teacher.className = 'teacher-desk';
  teacher.style.left = pos.x + 'px';
  teacher.style.top = pos.y + 'px';
  teacher.innerHTML = `
    <div class="teacher-desk-icon">${getTeacherDeskSVG()}</div>
    <div class="teacher-desk-label">GURU</div>
  `;
  classroom.appendChild(teacher);
}

// ═══════ RENDER MEJA SISWA ═══════
function renderDesks() {
  const classroom = document.getElementById('classroom');
  if (!classroom) return;

  // Hapus semua meja siswa (bukan meja guru)
  const existing = classroom.querySelectorAll('.desk');
  existing.forEach(el => el.remove());

  const studentNames = (typeof STUDENTS !== 'undefined') ? STUDENTS.map(s => s.name) : [];

  // Array warna untuk variasi meja (biru dengan variasi)
  const colors = [
    "#1a6fcf", "#1e78d4", "#2281d9", "#268ade",
    "#1a6fcf", "#1e78d4", "#2281d9", "#268ade"
  ];

  seatingData.forEach(pos => {
    const color = colors[pos.id % colors.length];
    const desk = document.createElement('div');
    desk.className = 'desk';
    desk.style.left = pos.x + 'px';
    desk.style.top = pos.y + 'px';
    desk.dataset.id = pos.id;
    desk.innerHTML = `
      <div class="desk-icon">${getDeskSVG(color)}</div>
      <div class="desk-no">${String(pos.id + 1).padStart(2, '0')}</div>
      <div class="desk-name">${studentNames[pos.id] ? studentNames[pos.id].split(' ')[0] : 'Meja ' + (pos.id + 1)}</div>
    `;
    desk.addEventListener('pointerdown', onDragStart);
    classroom.appendChild(desk);
  });
}

// ═══════ RENDER SEMUA ═══════
function renderAll() {
  renderTeacherDesk();
  renderDesks();
}

// ═══════ FETCH ═══════
async function fetchFromJsonBin() {
  if (!binId) return;
  try {
    console.log("Fetching dari JSONBin...");
    const res = await fetch(getBinUrl(binId), { headers });
    if (!res.ok) throw new Error("Gagal fetch: " + res.status);
    const json = await res.json();
    const data = json.record;
    console.log("Data dari server:", data);
    if (Array.isArray(data) && data.length > 0) {
      if (JSON.stringify(data) !== JSON.stringify(seatingData)) {
        console.log("Data berbeda, update lokal...");
        seatingData = data;
        renderDesks();
      }
    } else if (seatingData.length === 0) {
      // Data kosong di server & lokal -> isi default
      seatingData = getDefaultPositions();
      renderDesks();
      await uploadToJsonBin();
    }
  } catch (err) {
    console.warn("Fetch gagal:", err);
    if (seatingData.length === 0) {
      const saved = localStorage.getItem('viiib-seating');
      seatingData = saved ? JSON.parse(saved) : getDefaultPositions();
      renderDesks();
    }
  }
}

// ═══════ UPLOAD ═══════
async function uploadToJsonBin() {
  if (!binId) return;
  try {
    console.log("Upload ke JSONBin:", seatingData);
    const res = await fetch(getBinUrl(binId), {
      method: 'PUT',
      headers,
      body: JSON.stringify(seatingData)
    });
    if (!res.ok) throw new Error("Upload gagal: " + res.status);
    console.log("Upload berhasil");
    localStorage.setItem('viiib-seating', JSON.stringify(seatingData));
  } catch (err) {
    console.warn("Upload gagal:", err);
    localStorage.setItem('viiib-seating', JSON.stringify(seatingData));
  }
}

// ═══════ POLLING ═══════
function startPolling() {
  stopPolling();
  console.log("Polling dimulai (setiap 3 detik)");
  pollingInterval = setInterval(async () => {
    if (!isDragging) await fetchFromJsonBin();
  }, 3000);
}

function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}

// ═══════ DRAG HANDLERS ═══════
function onDragStart(e) {
  e.preventDefault();
  e.stopPropagation();
  const desk = e.currentTarget;
  const id = parseInt(desk.dataset.id, 10);
  const pos = seatingData.find(p => p.id === id);
  if (!pos) return;

  dragTarget = { desk, id };
  isDragging = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  origLeft = pos.x;
  origTop = pos.y;
  desk.classList.add('dragging');
  desk.setPointerCapture(e.pointerId);
  desk.addEventListener('pointermove', onDragMove);
  desk.addEventListener('pointerup', onDragEnd);
  desk.addEventListener('pointercancel', onDragEnd);
}

function onDragMove(e) {
  if (!isDragging || !dragTarget) return;
  e.preventDefault();
  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;
  const classroom = document.getElementById('classroom');
  const rect = classroom.getBoundingClientRect();
  const newX = Math.max(0, Math.min(origLeft + dx, rect.width - 66));
  const newY = Math.max(80, Math.min(origTop + dy, rect.height - 60));
  dragTarget.desk.style.left = newX + 'px';
  dragTarget.desk.style.top = newY + 'px';
}

function onDragEnd(e) {
  if (!isDragging || !dragTarget) return;
  const desk = dragTarget.desk;
  const id = dragTarget.id;
  const pos = seatingData.find(p => p.id === id);
  if (pos) {
    pos.x = parseInt(desk.style.left, 10);
    pos.y = parseInt(desk.style.top, 10);
  }
  console.log("Meja " + (id + 1) + " dipindah ke:", pos.x, pos.y);
  uploadToJsonBin();
  desk.classList.remove('dragging');
  desk.removeEventListener('pointermove', onDragMove);
  desk.removeEventListener('pointerup', onDragEnd);
  desk.removeEventListener('pointercancel', onDragEnd);
  isDragging = false;
  dragTarget = null;
}

// ═══════ RESET ═══════
async function resetSeating() {
  seatingData = getDefaultPositions();
  renderAll();
  await uploadToJsonBin();
}

// ═══════ INIT ═══════
document.addEventListener('DOMContentLoaded', async () => {
  console.log("Seating JS loaded");

  binId = await getOrCreateBinId();
  if (!binId) {
    console.warn("Tidak bisa terhubung ke JSONBin, pakai localStorage");
    const saved = localStorage.getItem('viiib-seating');
    seatingData = saved ? JSON.parse(saved) : getDefaultPositions();
    renderAll();
    return;
  }

  // Render dulu dengan data default sebelum fetch
  const savedLocal = localStorage.getItem('viiib-seating');
  if (savedLocal) {
    seatingData = JSON.parse(savedLocal);
    renderAll();
  } else {
    seatingData = getDefaultPositions();
    renderAll();
    await uploadToJsonBin();
  }

  // Fetch data terbaru dari server
  await fetchFromJsonBin();
  
  // Mulai polling
  startPolling();

  // Reset button
  const resetBtn = document.getElementById('reset-seating-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetSeating);
  }
});

window.addEventListener('beforeunload', stopPolling);