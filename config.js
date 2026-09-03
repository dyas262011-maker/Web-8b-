// ═══════════════════════════════════════════════════
// CONFIG.JS — SEMUA DATA YANG BOLEH DIEDIT ADA DI SINI
// (script.js berisi LOGIKA, jangan diedit kalau cuma mau ganti data)
// ═══════════════════════════════════════════════════

// ═══════ SPLASH SCREEN (halaman selamat datang) ═══════
// Gambar & teksnya sekarang ikut tema aktif -- lihat THEME_CONFIG.splash
// di bawah. Ini cuma durasinya, berlaku untuk semua tema.
const SPLASH_CONFIG = {
  durationMs: 3200, // lama splash tampil sebelum hilang (dalam milidetik)
};

// ═══════ KONFIGURASI UMUM ═══════
const CONFIG = {
  heroVideo   : "https://l.top4top.io/m_3779fe6uv1.mp4",
  heroPoster  : "",
  heroBanner  : "",
  avatarImg   : "https://i.ibb.co.com/RTMrHn3C/The-Nine-B-20260807-183100.jpg",
  bgMusic     : "https://files.catbox.moe/til5wh.mp3", // musik tema "Kemerdekaan" (default)
  waliImg     : "",
  waGroup     : "https://chat.whatsapp.com/DEX62QPp12nE86mGyS3grg?s=cl&p=a&ilr=0&amv=3",
  // [PENTING] Isi link grup WA ORANG TUA di sini (beda dari grup murid di
  // atas). Dipakai fitur Kas untuk kirim pemberitahuan tunggakan.
  waGroupOrtu : "https://chat.whatsapp.com/DEX62QPp12nE86mGyS3grg?s=cl&p=a&mlu=4",
  igClass     : "https://www.instagram.com/class8bright_star",
  nglLink     : "https://ngl.link/brightstar41884",
  tiktokClass : "https://www.tiktok.com/@class8brightstar",
  waChannel   : "https://whatsapp.com/channel/0029VbBKBD9F6smwoAydKr3x",
  waliWa      : "https://wa.me/6285159145010",
  // [PENTING] Isi ini dengan URL asli piket.html setelah situs di-deploy,
  // contoh: "https://star-area.my.id/piket.html" -- dipakai untuk generate
  // QR code di halaman Admin. Kalau dikosongkan, otomatis dideteksi dari
  // URL situs yang sedang dibuka (biasanya sudah benar juga).
  piketPageUrl : "https://www.star-area.my.id/piket.html",
  memoriesVideo  : "",
  // Ini cuma FOTO CADANGAN/AWAL. Untuk nambah foto sehari-hari, pakai
  // menu "Kenangan" di halaman Admin -- lebih gampang, tanpa edit file ini.
  memoriesPhotosSeed : [
    "https://img2.pixhost.to/images/7724/723458876_alip-1778154364652.jpg",
    "https://img2.pixhost.to/images/7725/723470697_alip-1778157365322.jpg",
  ],
};

// ═══════ KAS KELAS ═══════
const KAS_CONFIG = {
  monthlyAmount: 10000, // jumlah kas per bulan (Rupiah) -- dipakai buat teks pemberitahuan
  tunggakThreshold: 2,  // berapa bulan belum bayar (total) sampai dianggap "menunggak"
};

// ═══════ DAFTAR SISWA ═══════
const STUDENTS = [
  { name: "PA DWIKI APRIANTO", photo: "", msg: "Hanya allah yang tau." },
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

// ═══════ HARI (dipakai untuk jadwal piket) ═══════
const DAYS = [
  { key: 'senin',  id: 'Senin',  betawi: 'Senén',  en: 'Monday',    su: 'Senén'  },
  { key: 'selasa', id: 'Selasa', betawi: 'Selasa', en: 'Tuesday',   su: 'Salasa' },
  { key: 'rabu',   id: 'Rabu',   betawi: 'Rebo',   en: 'Wednesday', su: 'Rebo'   },
  { key: 'kamis',  id: 'Kamis',  betawi: 'Kemis',  en: 'Thursday',  su: 'Kemis'  },
  { key: 'jumat',  id: 'Jumat',  betawi: 'Jumat',  en: 'Friday',    su: 'Jumaah' },
  { key: 'sabtu',  id: 'Sabtu',  betawi: 'Sabtu',  en: 'Saturday',  su: 'Saptu'  },
];

// ═══════ ADMIN (password) ═══════
// [PENTING] Ganti kata sandi admin:
//   1. Buka halaman Admin di browser, tekan F12 (console).
//   2. Ketik: generatePasswordHash('kata-sandi-baru-kamu').then(h => console.log(h))
//   3. Copy hasil hash yang muncul, tempel ke ADMIN_CONFIG.adminPasswordHash.
const ADMIN_CONFIG = {
  adminPasswordHash: "25ac88ffce648561c6fd1fa23eb0c3eee4e3103b4499c310e033adfc19bb55d6",
};

// ═══════ SUPABASE (server penyimpanan data) ═══════
// [PENTING] Sebelum fitur Pengumuman/Piket/Kenangan/Tema jalan, kamu WAJIB
// jalankan file supabase_setup.sql SEKALI di Supabase SQL Editor project ini
// untuk membuat tabel yang dipakai (announcements, piket_status,
// memories_photos, site_settings).
//
// Catatan jujur: anonKey di bawah di-obfuscate (disamarkan lewat XOR +
// array kode karakter) supaya tidak langsung kebaca mentah kalau ada yang
// buka file ini sekilas. TAPI ini BUKAN enkripsi sungguhan -- siapapun yang
// paham JS tetap bisa decode-nya (tinggal jalankan fungsi _dk di bawah).
// Untuk kunci publik/anon Supabase seperti ini sebenarnya wajar terekspos
// ke browser (memang begitu cara kerja REST API publik), keamanan
// sesungguhnya ada di kebijakan RLS di Supabase, bukan di menyembunyikan
// key ini.
function _dk(codes, xorKey) {
  return codes.map(c => String.fromCharCode(c ^ xorKey)).join('');
}
const SUPABASE_CONFIG = {
  url: "https://kisctdvhzdixakdbgvdd.supabase.co",
  anonKey: _dk([89,72,117,90,95,72,70,67,89,66,75,72,70,79,117,94,101,68,69,94,126,97,100,92,29,105,104,29,89,18,105,97,95,111,72,80,123,117,67,78,91,7,104,114,108,104], 0x2A),
};

// ═══════ PIKET KELAS ═══════
// Isi nama-nama yang piket di tiap hari (harus SAMA PERSIS dengan nama di
// STUDENTS supaya rapi, tapi boleh beda kalau perlu). Kosongkan array kalau
// hari itu tidak ada piket (mis. hari libur sekolah).
const PIKET_CONFIG = {
  roster: {
    senin: [
      "Fauzan Khodhi Latif",
      "Sadad Fairuz Yusup Jamaludin",
      "Dafin Azka",
      "Sayid Husein Syamil",
      "Muhammad Fawwaaz Saputra",
      "Syakib Assakya",
      "Rheksya Muhamad Syahrozaq",
    ],
    selasa: [
      "Muhammad Wafiq Zihni",
      "Raka Tsaqif Azzamy",
      "Adhyasta Nararya Al Jazali",
      "Muhammad Rafif Alauna",
      "Haidar Ali Rasyidi",
      "Muhammad Adnan Ghofarana",
      "Maher Adewan Suharta",
    ],
    rabu: [
      "Kenny Julian Nakajima",
      "Muhammad Wildan Aljinan",
      "Muhammad Fakhri",
      "Hafiz Fatihul Ahza",
      "Rafasha Erlandika",
      "Muhammad Akhdaan Nur'aiman",
    ],
    kamis: [
      "Kevin Faeyza Gunawan",
      "Nizam Abyan Faezya",
      "Agung Maulana Ibrahim",
      "Muhammad Rizqy Alfaridz",
      "Muhammad Dzaki Purwandra Saripudin",
      "Arfa Haidar Raissa",
    ],
    jumat: [
      "Radityo Dzakwan Effendi",
      "Fahreza Maulana",
      "Radinal Akbar Rusdana",
      "Qoulan Tsaqiila Rizalusyiifa",
      "Dhevano Arka Putra Pratama",
      "Hafizh Malik Sopiyan",
    ],
    sabtu: [], // belum dikasih tim Sabtu -- isi di sini kalau ada
  },
};

// ═══════ TEMA / MUSIM ═══════
// Admin bisa ganti tema aktif dari halaman Admin (tersimpan untuk SEMUA
// pengunjung lewat Supabase). Tiap tema punya musik DAN halaman selamat
// datang (splash) sendiri -- ganti tema = ganti semuanya sekaligus.
const THEME_CONFIG = {
  default: 'kemerdekaan', // dipakai kalau belum ada setting di server
  idulFitriDate: "", // isi tanggal Idul Fitri tahun ini, format "YYYY-MM-DD", untuk hitung mundur di tema Ramadhan
  // [PENTING] Sudah ada 3 SLOT musik terpisah -- satu per tema. Sekarang
  // ketiganya masih menunjuk ke file yang SAMA (placeholder) karena saya
  // tidak punya lagu asli untuk "lagu 17-an" / "lagu Marhaban Ramadhan".
  // Tinggal ganti 3 link di bawah dengan link lagu asli kamu (upload dulu
  // ke catbox.moe atau hosting lain, sama seperti musik yang sudah ada):
  musics: {
    kemerdekaan: "https://g.top4top.io/m_3880b8rag0.mp3", // lagu 17 Agustus / lagu nasional
    ramadhan: "https://h.top4top.io/m_38808igma1.mp3",    // lagu Marhaban / Ramadhan
    normal: "https://files.catbox.moe/til5wh.mp3",      // musik biasa -- JANGAN diubah kalau tidak perlu
  },
  // Isi splash (halaman selamat datang) per tema. "image" boleh dikosongkan
  // -- otomatis pakai ikon fallback (fa-solid class dari Font Awesome).
  splash: {
    kemerdekaan: {
      image: "https://i.ibb.co.com/dwyxbYkC/pngtree-garuda-indonesia-illustration-with-red-and-white-wavy-flag-png-image-8388212.jpg",
      fallbackIcon: "fa-solid fa-star",
      line1: "Dirgahayu",
      line2: "Republik Indonesia",
    },
    ramadhan: {
      image: "", // isi link gambar bulan sabit/masjid kalau punya, kalau kosong pakai ikon fallback
      fallbackIcon: "fa-solid fa-mosque",
      line1: "Marhaban Ya",
      line2: "Ramadhan",
    },
    normal: {
      image: "", // isi link logo/foto kelas kalau mau, kalau kosong pakai ikon fallback
      fallbackIcon: "fa-solid fa-graduation-cap",
      line1: "Selamat Datang",
      line2: "Kelas IXB SMPIT ALAMY",
    },
  },
};

// ═══════ BAHASA (Indonesia / Betawi / English / Sunda) ═══════
// Catatan: untuk fitur BARU (Admin, Pengumuman, Piket, Tema) teks yang
// tersedia baru Bahasa Indonesia dulu -- kalau bahasa lain dipilih, teks
// fitur baru ini otomatis jatuh ke Bahasa Indonesia (tidak error, cuma
// belum diterjemahkan). Bisa menyusul kalau kamu mau.
const LANG_ORDER = ['id', 'betawi', 'en', 'su'];
const LANG_LABEL = { id: 'ID', betawi: 'BE', en: 'EN', su: 'SU' };

const LANG_STRINGS = {
  id: {
    btn_change_lang: "Ganti Bahasa",
    btn_toggle_music: "Putar / Jeda Musik",
    btn_toggle_theme: "Mode Gelap",
    label_menu: "Menu",
    label_page_nav: "Navigasi Halaman",
    nav_home: "Beranda", nav_students: "Absensi", nav_announcement: "Pengumuman",
    nav_memories: "Kenangan", nav_admin: "Admin",
    label_info: "Info",
    label_quotes: "Quotes",
    label_info_kelas: "Informasi Kelas",
    label_kelas_word: "Kelas", label_angkatan_word: "Angkatan", label_siswa_word: "Siswa",
    label_wali_kelas: "Wali Kelas",
    label_hubungi_walas: "Hubungi Walas",
    label_walas: "Walas",
    label_keseharian: "Keseharian",
    skill_kompak: "Kompak", skill_belajar: "Belajar", skill_olahraga: "Olahraga", skill_musik: "Musik", skill_gaming: "Gaming",
    label_developer: "developer",
    label_daftar_absensi: "Daftar Absensi",
    label_tap_untuk_pesan: "Ketuk untuk lihat pesan",
    label_kenangan_indah: "Kenangan Indah",
    label_galeri_foto: "Galeri Foto",
    label_video_kenangan: "Video Kenangan",
    label_momen_berharga: "Momen Berharga",
    reminder_gate_title: "Akses Terbatas",
    reminder_gate_text: "Halaman ini hanya untuk admin kelas. Masukkan kata sandi untuk melanjutkan.",
    reminder_pw_placeholder: "KATA SANDI",
    reminder_pw_submit: "Masuk",
    reminder_pw_error: "Kata sandi salah.",
    btn_keluar: "Keluar",
    sync_status_prefix: "Status:",
    // Pengumuman
    label_pengumuman: "Pengumuman",
    label_pengumuman_subtitle: "Info terbaru dari kelas",
    label_belum_ada_pengumuman: "Belum ada pengumuman.",
    label_piket_bermasalah: "Piket Bermasalah",
    label_piket_aman: "Semua piket aman, tidak ada masalah.",
    btn_sudah_terlaksana: "Sudah Terlaksana",
    piket_status_piket: "Piket",
    piket_status_kabur: "Tidak Piket",
    btn_kirim_grup: "Kirim ke Grup",
    label_terpilih: "terpilih",
    // Admin
    label_admin_panel: "Panel Admin",
    admin_tab_pengumuman: "Pengumuman",
    admin_tab_piket: "Piket",
    admin_tab_kenangan: "Kenangan",
    admin_tab_tema: "Tema & Musik",
    label_buat_pengumuman: "Buat Pengumuman",
    placeholder_judul_pengumuman: "Judul (opsional)",
    placeholder_isi_pengumuman: "Tulis pengumuman di sini...",
    placeholder_gambar_pengumuman: "Link gambar (opsional)",
    btn_kirim_pengumuman: "Kirim Pengumuman",
    btn_hapus: "Hapus",
    label_kelola_piket: "Kelola Piket",
    label_pilih_tanggal: "Pilih Tanggal",
    label_belum_ada_nama_piket: 'Belum ada nama piket untuk hari ini. Isi dulu di config.js bagian PIKET_CONFIG.roster.',
    label_qr_piket: "QR Akses Cepat Admin",
    label_qr_piket_hint: "Tempel/print QR ini di kelas. Scan pakai kamera HP biasa untuk langsung masuk ke halaman Admin.",
    btn_download_qr: "Unduh QR",
    label_tambah_foto_kenangan: "Tambah Foto Kenangan",
    placeholder_link_foto: "Tempel link foto di sini",
    btn_tambah_foto: "Tambah Foto",
    label_ganti_tema: "Pilih Tema Situs",
    label_ganti_tema_hint: "Tema ini berlaku untuk SEMUA pengunjung situs, tersimpan otomatis.",
    theme_kemerdekaan: "\u{1F1EE}\u{1F1E9} Kemerdekaan",
    theme_ramadhan: "\u{1F319} Ramadhan",
    theme_normal: "\u{1F3A8} Biasa",
    label_countdown_lebaran: "Menuju Hari Raya",
    label_hari: "hari",
    label_memuat: "Memuat...",
    label_gagal_memuat: "Gagal memuat data.",
    // Kas
    admin_tab_kas: "Kas",
    label_kas_belum_ada_nama: "Belum ada tunggakan tercatat.",
    kas_status_belum: "Belum Bayar",
    label_kas_menunggak: "Kas Menunggak",
    nav_kasmember: "Member Kas",
    label_kelola_member_kas: "Kelola Member Kas",
    label_kas_member_hint: "Nama di sini bebas bayar kas untuk beberapa hari ke depan. Tinggal isi berapa hari, sistem otomatis hitung tanggalnya dan otomatis hilang dari daftar begitu waktunya habis.",
    placeholder_jumlah_hari: "Berapa hari bebas kas",
    btn_tambah_member: "Tambah Member",
    label_member_kas: "Member Kas",
    label_member_kas_subtitle: "Bebas kas untuk sementara waktu",
    label_kas_member_kosong: "Belum ada member kas.",
    label_sisa_hari: "hari lagi",
    label_hari_terakhir: "Hari terakhir",
    label_semua_lunas: "Semua kas sudah lunas, tidak ada tunggakan.",
    btn_sudah_lunas: "Sudah Lunas",
    btn_kirim_grup_ortu: "Kirim ke Grup Ortu",
    btn_tersalin: "Tersalin, buka grup...",
    label_belum_ada_link_grup_ortu: "Link grup WA orang tua belum diisi di config.js (CONFIG.waGroupOrtu).",
    label_buat_pemberitahuan_manual: "Buat Pemberitahuan Tunggakan (Manual)",
    label_kas_manual_hint: "Ketik nama & jumlah yang belum dibayar satu-satu, tambahkan ke daftar. Setelah semua terkumpul, kirim jadi SATU pesan ke grup orang tua sekaligus.",
    placeholder_nama_siswa: "Nama siswa",
    placeholder_jumlah_rp: "Jumlah belum dibayar (Rp)",
    btn_tambah_ke_daftar: "Tambah ke Daftar",
  },
  betawi: {
    btn_change_lang: "Ganti Bahasa",
    btn_toggle_music: "Puter / Stop Musik",
    btn_toggle_theme: "Mode Gelap",
    label_menu: "Menu",
    label_page_nav: "Navigasi Ané",
    nav_home: "Beranda", nav_students: "Absen", nav_announcement: "Pengumuman",
    nav_kasmember: "Member Kas",
    nav_memories: "Kenangan", nav_admin: "Admin",
    label_info: "Info",
    label_quotes: "Kate-Kate",
    label_info_kelas: "Info Kelas",
    label_kelas_word: "Kelas", label_angkatan_word: "Angkatan", label_siswa_word: "Murid",
    label_wali_kelas: "Wali Kelas",
    label_hubungi_walas: "Kontak Walas",
    label_walas: "Walas",
    label_keseharian: "Keseharian",
    skill_kompak: "Kompak", skill_belajar: "Belajar", skill_olahraga: "Olahraga", skill_musik: "Musik", skill_gaming: "Maen Game",
    label_developer: "developer",
    label_daftar_absensi: "Daptar Absen",
    label_tap_untuk_pesan: "Pencet buat liat pesen",
    label_kenangan_indah: "Kenangan Indah",
    label_galeri_foto: "Galeri Foto",
    label_video_kenangan: "Video Kenangan",
    label_momen_berharga: "Momen Berharga",
    reminder_gate_title: "Ga Bisa Masuk Sembarangan",
    reminder_gate_text: "Ini halaman cuma buat admin kelas. Masukin kate sandi dulu ye.",
    reminder_pw_placeholder: "KATE SANDI",
    reminder_pw_submit: "Masuk",
    reminder_pw_error: "Kate sandinye salah tuh.",
    btn_keluar: "Keluar",
    sync_status_prefix: "Status:",
  },
  en: {
    btn_change_lang: "Change Language",
    btn_toggle_music: "Play / Pause Music",
    btn_toggle_theme: "Dark Mode",
    label_menu: "Menu",
    label_page_nav: "Page Navigation",
    nav_home: "Home", nav_students: "Roll Call", nav_announcement: "Announcements",
    nav_kasmember: "Kas Members",
    nav_memories: "Memories", nav_admin: "Admin",
    label_info: "Info",
    label_quotes: "Quotes",
    label_info_kelas: "Class Info",
    label_kelas_word: "Class", label_angkatan_word: "Batch", label_siswa_word: "Students",
    label_wali_kelas: "Homeroom Teacher",
    label_hubungi_walas: "Contact Teacher",
    label_walas: "Homeroom",
    label_keseharian: "Daily Life",
    skill_kompak: "United", skill_belajar: "Studious", skill_olahraga: "Sporty", skill_musik: "Music", skill_gaming: "Gaming",
    label_developer: "developer",
    label_daftar_absensi: "Roll Call List",
    label_tap_untuk_pesan: "Tap to see message",
    label_kenangan_indah: "Sweet Memories",
    label_galeri_foto: "Photo Gallery",
    label_video_kenangan: "Memory Video",
    label_momen_berharga: "Precious Moments",
    reminder_gate_title: "Restricted Access",
    reminder_gate_text: "This page is for class admins only. Enter the password to continue.",
    reminder_pw_placeholder: "PASSWORD",
    reminder_pw_submit: "Enter",
    reminder_pw_error: "Wrong password.",
    btn_keluar: "Log Out",
    sync_status_prefix: "Status:",
  },
  su: {
    btn_change_lang: "Ganti Basa",
    btn_toggle_music: "Puter / Eureunkeun Musik",
    btn_toggle_theme: "Mode Poek",
    label_menu: "Menu",
    label_page_nav: "Navigasi Halaman",
    nav_home: "Bumi", nav_students: "Absén", nav_announcement: "Pengumuman",
    nav_kasmember: "Member Kas",
    nav_memories: "Kenangan", nav_admin: "Admin",
    label_info: "Info",
    label_quotes: "Kekecapan",
    label_info_kelas: "Inpormasi Kelas",
    label_kelas_word: "Kelas", label_angkatan_word: "Angkatan", label_siswa_word: "Siswa",
    label_wali_kelas: "Wali Kelas",
    label_hubungi_walas: "Hubungan Walas",
    label_walas: "Walas",
    label_keseharian: "Sapopoé",
    skill_kompak: "Kompak", skill_belajar: "Diajar", skill_olahraga: "Olahraga", skill_musik: "Musik", skill_gaming: "Gaming",
    label_developer: "developer",
    label_daftar_absensi: "Daptar Absén",
    label_tap_untuk_pesan: "Pencét pikeun ningali pesen",
    label_kenangan_indah: "Kenangan Éndah",
    label_galeri_foto: "Galeri Poto",
    label_video_kenangan: "Video Kenangan",
    label_momen_berharga: "Momén Berharga",
    reminder_gate_title: "Aksés Kawates",
    reminder_gate_text: "Halaman ieu khusus admin kelas. Asupkeun kecap sandi heula.",
    reminder_pw_placeholder: "KECAP SANDI",
    reminder_pw_submit: "Asup",
    reminder_pw_error: "Kecap sandina salah.",
    btn_keluar: "Kaluar",
    sync_status_prefix: "Status:",
  },
};
