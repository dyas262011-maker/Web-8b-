// ═══════════════════════════════════════════════════
// SHARED.JS — helper yang dipakai bareng index.html & piket.html
// (harus dimuat SETELAH config.js)
// ═══════════════════════════════════════════════════

function escapeHtml(s) { return (s || '').toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

async function sha256Hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
window.generatePasswordHash = (pw) => sha256Hex(pw).then(h => { console.log('Hash baru:', h); return h; });

function isAdminAuthed() { return sessionStorage.getItem('viiib-admin-auth') === '1'; }

// ═══════ SUPABASE — helper REST generik ═══════
function supaHeaders(extra) {
  return Object.assign({
    'apikey': SUPABASE_CONFIG.anonKey,
    'Authorization': 'Bearer ' + SUPABASE_CONFIG.anonKey,
    'Content-Type': 'application/json',
  }, extra || {});
}
async function supaSelect(table, query) {
  const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${table}${query || ''}`, { headers: supaHeaders() });
  if (!res.ok) throw new Error('Supabase select ' + table + ' gagal: HTTP ' + res.status);
  return res.json();
}
async function supaInsert(table, rows) {
  const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${table}`, {
    method: 'POST', headers: supaHeaders({ 'Prefer': 'return=representation' }), body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error('Supabase insert ' + table + ' gagal: HTTP ' + res.status);
  return res.json();
}
async function supaUpsert(table, rows, onConflict) {
  const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${table}?on_conflict=${onConflict}`, {
    method: 'POST', headers: supaHeaders({ 'Prefer': 'resolution=merge-duplicates,return=representation' }), body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error('Supabase upsert ' + table + ' gagal: HTTP ' + res.status);
  return res.json();
}
async function supaUpdate(table, query, patch) {
  const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${table}${query}`, {
    method: 'PATCH', headers: supaHeaders({ 'Prefer': 'return=representation' }), body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error('Supabase update ' + table + ' gagal: HTTP ' + res.status);
  return res.json();
}
async function supaDelete(table, query) {
  const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${table}${query}`, { method: 'DELETE', headers: supaHeaders() });
  if (!res.ok) throw new Error('Supabase delete ' + table + ' gagal: HTTP ' + res.status);
}

// ═══════ PIKET — konstanta & util tanggal bersama ═══════
const PIKET_STATUS_META = {
  piket: { color: '#ffffff', textColor: '#333333', labelKey: 'piket_status_piket', label: 'Piket' },
  kabur: { color: '#e5484d', textColor: '#ffffff', labelKey: 'piket_status_kabur', label: 'Tidak Piket' },
};

function weekdayKeyFromDateStr(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split('-').map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  const map = { 1: 'senin', 2: 'selasa', 3: 'rabu', 4: 'kamis', 5: 'jumat', 6: 'sabtu', 0: null };
  return map[date.getDay()];
}
function todayDateStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

// Link ke halaman Pengumuman -- dipakai di bagian bawah pesan yang dikirim
// ke grup WA, dideteksi otomatis dari domain situs yang sedang dibuka.
function announcementPageUrl() {
  try { return window.location.origin + '/index.html#announcement'; }
  catch (e) { return ''; }
}
