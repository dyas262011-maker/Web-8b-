/* ============================================
   STRUKTUR KELAS – DRAG & DROP + JSONBIN SYNC
   seating.js
   ============================================ */

const MASTER_KEY = "$2a$10$vszwGPeGwo8ZKazw2ax7pOEojIMhAVJ.UpOLjGGLfIDJr5MExYyKG";

// Ambil atau buat Bin ID
async function getOrCreateBinId() {
  let binId = localStorage.getItem('viiib-seating-bin-id');
  if (binId) return binId;
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
    console.log("Bin ID baru:", binId);
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
  const cols = 8, rows = 4, startX = 30, startY = 80, gapX = 82, gapY = 100;
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

// ═══════ STATE ═══════
let seatingData = [];
let isDragging = false;
let dragTarget = null;
let dragStartX, dragStartY, origLeft, origTop;
let binId = null;
let pollingInterval = null;

// ═══════ RENDER ═══════
function renderDesks() {
  const classroom = document.getElementById('classroom');
  if (!classroom) return;
  classroom.querySelectorAll('.desk').forEach(el => el.remove());
  const studentNames = (typeof STUDENTS !== 'undefined') ? STUDENTS.map(s => s.name) : [];
  seatingData.forEach(pos => {
    const desk = document.createElement('div');
    desk.className = 'desk';
    desk.style.left = pos.x + 'px';
    desk.style.top = pos.y + 'px';
    desk.dataset.id = pos.id;
    desk.setAttribute('data-student-name', studentNames[pos.id] || `Meja ${pos.id+1}`);
    desk.innerHTML = `<span class="desk-no">${String(pos.id+1).padStart(2,'0')}</span>`;
    desk.addEventListener('pointerdown', onDragStart);
    classroom.appendChild(desk);
  });
}

// ═══════ FETCH ═══════
async function fetchFromJsonBin() {
  if (!binId) return;
  try {
    const res = await fetch(getBinUrl(binId), { headers });
    if (!res.ok) throw new Error("Gagal fetch");
    const data = (await res.json()).record;
    if (Array.isArray(data) && data.length > 0) {
      if (!isDragging && JSON.stringify(data) !== JSON.stringify(seatingData)) {
        seatingData = data;
        renderDesks();
      } else if (seatingData.length === 0) {
        seatingData = data;
        renderDesks();
      }
    } else if (seatingData.length === 0) {
      seatingData = getDefaultPositions();
      renderDesks();
      uploadToJsonBin();
    }
  } catch (err) {
    console.warn("Fetch gagal:", err);
    const saved = localStorage.getItem('viiib-seating');
    seatingData = saved ? JSON.parse(saved) : getDefaultPositions();
    renderDesks();
  }
}

// ═══════ UPLOAD ═══════
async function uploadToJsonBin() {
  if (!binId) return;
  try {
    await fetch(getBinUrl(binId), { method: 'PUT', headers, body: JSON.stringify(seatingData) });
    localStorage.setItem('viiib-seating', JSON.stringify(seatingData));
  } catch (err) {
    console.warn("Upload gagal:", err);
    localStorage.setItem('viiib-seating', JSON.stringify(seatingData));
  }
}

// ═══════ POLLING ═══════
function startPolling() {
  stopPolling();
  pollingInterval = setInterval(async () => { if (!isDragging) await fetchFromJsonBin(); }, 3000);
}
function stopPolling() { if (pollingInterval) clearInterval(pollingInterval); }

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
  const newX = Math.max(0, Math.min(origLeft + dx, rect.width - 62));
  const newY = Math.max(0, Math.min(origTop + dy, rect.height - 62));
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
  renderDesks();
  await uploadToJsonBin();
}

// ═══════ INIT ═══════
document.addEventListener('DOMContentLoaded', async () => {
  binId = await getOrCreateBinId();
  if (!binId) {
    const saved = localStorage.getItem('viiib-seating');
    seatingData = saved ? JSON.parse(saved) : getDefaultPositions();
    renderDesks();
    return;
  }
  await fetchFromJsonBin();
  startPolling();
  const resetBtn = document.getElementById('reset-seating-btn');
  if (resetBtn) resetBtn.addEventListener('click', resetSeating);
});

window.addEventListener('beforeunload', stopPolling);