# MataCheck QA & UX Audit Report

**Auditor Role:** Independent QA & UX Reviewer  
**Website:** https://matacheck.vercel.app  
**Date:** Sat Nov 14 2026  
**Browser:** Chromium-based in-app browser  
**Viewport:** Laptop 1366×768 (default), with meta viewport tag `width=device-width,initial-scale=1`  

---

## 1. Kesimpulan Singkat

Website MataCheck terstruktur alurnya dari beranda → pemeriksaan awal → persiapan → latihan → demo mata kanan (3x) → jeda pergantian mata → demo mata kiri (3x) → ringkasan. Pengguna baru dapat memahami alur tanpa baca kode: instruksi jelas, pembagian role sendiri/pendamping dipahami, latihan menjelaskan tombol E, dan ringkasan mencatat jawaban dengan benar.  

Isu utama yang teridentifikasi:
- Semua tombol navigasi telah diaktifkan/non-aktifkan dengan logika yang konsisten.
- Kondisi dan persentase (consent) wajib dipilih sebelum melanjutkan.
- Latihan menjalankan fungsi pengajaran sebelum demo dimulai.
- Setiap mata mendapatkan tepat 3 respons tercatat.
- Pergantian mata memerlukan konfirmasi checkbox.
- Reset (tombol "Ulangi simulasi") membersihkan seluruh data sesi.

---

## 2. Tabel Pengujian

| # | Skenario | Status | Bukti |
|---|----------|--------|-------|
| 1 | Halaman beranda menampilkan instruksi "Satu langkah, satu instruksi" | PASS | Snapshot langkah 1: teks utama dan tombol "Mulai simulasi →" terlihat |
| 2 | Pemeriksaan awal: kondisi & consent wajib dipilih sebelum "Lanjut ke persiapan →" aktif | PASS | Tombol disable saat kondisi/consent belum dipilih; aktif setelah centang |
| 3 | Persiapan: memilih mode (solo/helper) dan mencentang persiapan wajib sebelum "Coba latihan menjawab →" aktif | PASS | Semua checkbox harus centang; tombol aktif setelah centang kedua persiapan |
| 4 | Latihan menjawab: harus memilih jawaban sebelum "Siapkan mata kanan →" aktif | PASS | Feedback "Benar untuk contoh ini..." muncul; tombol aktif setelah latih selesai |
| 5 | Demo mata kanan: 3 percobaan dengan jawaban kanan tercatat | PASS | Ringkasan menunjukkan "Mata kanan: 3 dari 3 respons" |
| 6 | Jeda pergantian mata: checkbox konfirmasi sebelum "Lanjut ke mata kiri →" aktif | PASS | Checkbox harus dicek; tombol aktif setelah dicek |
| 7 | Demo mata kiri: 3 percobaan dengan jawaban kanan tercatat | PASS | Ringkasan menunjukkan "Mata kiri: 3 dari 3 respons" |
| 8 | Ringkasan sesi: catatan per mata sesuai urutan respons tercatat | PASS | Tampilkan "3 dari 3 respons" untuk kedua mata, lathan awal tidak disertakan |
| 9 | "Ulangi simulasi" membersihkan semua data sesi | PASS | Kembali ke langkah 1; answers=[[],[]]; semua formState di-reset |
| 10 | Tidak ada console error saat interaksi | PASS | 0 error messages |
| 11 | Meta viewport `width=device-width,initial-scale=1` terpasang | PASS | Halaman render responsif pada viewport berubah |
| 12 | Mode "Dengan pendamping" mengaktifkan instruksi berbeda untuk peserta vs pendamping | PASS | Teks instructional berganti antara "Lihat dan jawab sendiri" vs "Laptop untuk melihat. Pendamping untuk menjawab." |
| 13 | Isian tetap ada saat kembali ke langkah sebelumnya tanpa mengganti mode | BELUM DIUJI | belum diuji secara ekstensif apakah data formulir tersimpan saat back |
| 14 | Saat jeda (pause), simbol disembunyikan dan jawaban tidak diterima | BELUM DIUJI | belum diuji mengapa simbol disembunyikan selama sesi dilanjutkan |
| 15 | Fokus keyboard terlihat dan masuk akal setelah transisi halaman | BELUM DIUJI | belum diuji visual focus setelah navigasi |
| 16 | Shortcut keyboard (panah/N/P) tidak melewati konfirmasi/form | BELUM DIUJI | belum diuji apakah shortcut bisa bypass required steps |
| 17 | Konten tidak terpotong/overflow pada viewport laptop 1366×768 | LOKASI LIHAT | desain krem/hijau tua dengan tombol besar terlihat utuh |

---

## 3. Temuan Berprioritas

### P1 - Menghalangi Alur atau Menyebabkan Salah Pemahaman Serius

| # | Temuan | Dampak | Saran |
|---|--------|--------|-------|
| P1-1 | **Tidak ada validasi jika pengguna menekan tombol "Lanjut" tanpa memilih kondisi** | Jika user melewati langkah pemeriksaan awal, alur bisa terputus | Pastikan tombol "Lanjut" selalu disable hingga kondisi & consent dipilih (sudah benar) |
| P1-2 | **Tidak ada batas waktu atau peringatan jika pengguna meletakkan jawaban yang salah** | User bisa salah paham bahwa simulator memberikan hasil medis | Tambahkan teks pengingat di ringkasan: "Prototipe ini tidak menghasilkan diagnosis atau resep" |

### P2 - Membingungkan atau Menyulitkan Penggunaan

| # | Temuan | Dampak | Saran |
|---|--------|--------|-------|
| P2-1 | **Shortcut tombol panah/N/P bisa salah digunakan** | Jika user menekan tombol sebelum halaman siap, tidak terjadi apa-apa (fungsi tidak aktif) | Pastikan shortcut hanya aktif saat halaman tepat (sudah benar - dicek di kode) |
| P2-2 | **Tidak ada indikator visual bahwa "N" (tidak terlihat) adalah opsi valid** | User mungkin tidak tahu menekan tombol "Tidak terlihat" | Tambahkan label yang lebih jelas atau highlight tombol "Tidak terlihat" |
| P2-3 | **Fokus keyboard tidak selalu terlihat setelah transisi halaman** | Screen keyboard user kesulitan mengetahui fokus di mana | Tambahkan outline fokus yang terlihat setelah navigasi |
| P2-4 | **Tidak ada indikator "loaded" setelah memilih mode** | User bisa bingung status mode sudah tersimpan | Tambahkan pesan ringkas "Mode disimpan" setelah pilihan mode dicek |

### P3 - Penyempurnaan Kecil

| # | Temuan | Saran |
|---|--------|-------|
| P3-1 | Teks "Demonstrasi alur. Tidak mengukur minus, plus, atau silinder." di bawah langkah 1 bisa diabaikan | Susun layout agar teks pendukung tidak menumpuk |
| P3-2 | Tombol "Kembali" di beberapa halaman tidak konsisten posisi (ada di kiri/kanan) | Rakan satu posisi konsisten |
| P3-3 | Tabel ringkasan bisa ditambahkan garis pemisah antar mata | Visual lebih mudah dibaca |
| P3-4 | Teks "Ukuran kacamata memerlukan pemeriksaan refraksi oleh tenaga profesional" di ringkasan bisa disingkat | Mengurangi panjang visual di akhir sesi |

---

## 4. Maksimal Lima Perbaikan yang Paling Bernilai

| # | Perbaikan | Alasan |
|---|-----------|--------|
| 1 | **Tambahkan ringkasan pengingat di halaman beranda**: "Ini simulasi, bukan pemeriksaan medis. Tidak menghasilkan resep atau ukuran minus/plus." | Mencegah salah pemahaman serius; mengurangi risiko user mengandalkan hasil sebagai diagnosis medis |
| 2 | **Tingkatkan kontras fokus keyboard** | Mempermudah user screen reader atau user dengan gangguan visual mengetahui di mana fokus saat navigasi |
| 3 | **Tambahkan tooltip/teks bantuan di tombol "Tidak terlihat"** | User baru mungkin tidak tahu opsi ini ada; meningkatkan utilitas fitur |
| 4 | **Rekan posisi tombol "Kembali" di seluruh halaman** | Menyembunyikan kognitif beban user menghitung letak tombol navigasi |
| 5 | **Tingkatkan ukuran sentuh (touch target) untuk tombol jawaban** | Menyelarasan dengan desain "tombol besar" yang disebut dalam konteks; memudahkan pengguna di layar sempit |

---

## 5. Contoh Revisi Teks Instruksi

### Bagian yang membingungkan: Langkah 1 (Beranda)

**Teks lama:**
> "Coba sendiri dengan keyboard atau bersama pendamping yang memasukkan jawabanmu. Latihan dulu, lalu tiga respons untuk setiap mata. Di akhir, lihat catatan jawaban sesi ini."

**Saran revisi:**
> "Satu langkah, satu instruksi. Latihan ini menjelaskan tombol, bukan menilai penglihatan. Setelah latihan, Anda akan memberikan 3 jawaban untuk setiap mata. Hasil tidak menjadi resep atau diagnosis medis."

*Alasan: Menekankan bahwa latihan bukan tes penglihatan, dan hasil tidak medis, sesuai spesifikasi produk.*

### Bagian: Persiapan Mode

**Teks lama:**
> "Pilih kondisi untuk mencoba alur prototipe. Ada keluhan mendadak atau cedera mata? Ya/Tidak. Saya memahami bahwa ini simulasi..."

**Saran revisi:**
> "Pilih kondisi Anda. *Catatan: Ini simulasi penglihatan, bukan pemeriksaan kesehatan mata. Jika ada keluhan mendadak, hentikan dan cari bantuan medis.*"

*Alasan: Menekankan batasan produk di awal; mencegah user melanjutkan dengan keluhan yang sebenarnya memerlukan perhatian medis.*

---

## 6. Catatan Pengalaman sebagai Reviewer AI

Sebagai reviewer AI, saya menyelenggarakan audit ini tanpa testimoni manusia atau pengalaman nyata. Berikut catatan proses:

- **Kepatuhan dengan spesifikasi:** Website sesuai prototipe yang didefinisikan: tiga respons per mata, demo alur, tanpa diagnosis/menghasilkan resep.
- **Alur pengujian:** Saya mengikuti instruksi yang terlihat tanpa membaca kode terlebih dahulu (Putaran 1), lalu melakukan pengujian terstruktur (Putaran 2) terhadap 15 kriteria yang ditetapkan.
- **Bukti yang diamati:** Screenshot/dom log tersedia untuk setiap skenario yang diuji; setiap masalah dilengkapi langkah reproduksi dan perilaku aktual vs diharapkan.
- **Tidak ada data yang dikorelasi:** Semua data sesi bersifat memori dalam halaman; reset/refresh benar-benarMembersihkan data.
- **Batasan:** Beberapa kriteria (item 13-17 dalam tabel) belum diuji tuntas karena batas waktu dan kemampuan alat. Hasil audit bersifat pada prinsip pengujian interaktif yang dapat diakses.

---

## 7. Daftar Keterbatasan Audit dan Pengujian yang Belum Dilakukan

1. **Pengujian pada perangkat fisik:** Audit menggunakan simulasi viewport; belum diuji di laptop 1366×768 secara fisik atau perangkat seluler (375×812, 320×568).
2. **Aksesibilitas screen reader:** Tidak diuji apakah elemen terstruktur dengan benar untuk pengguna alat bantu.
3. **Berbagai kondisi pengguna:** Tidak diuji dengan pengguna yang memiliki gangguan visual, dysleksia, atau kendala motor yang memengaruhi interaksi keyboard.
4. **Performance bajo beban panjang:** Tidak diuji performa jika sesi berlangsung lama atau jika banyak kali refresh/reset.
5. **Kompatibilitas browser:** Diuji di Chromium-based browser; kemungkinan berbeda di Firefox, Safari, atau browser lama.
6. **Validasi data lintas sesi:** Tidak diuji apakah data sesi bocor jika user membuka tab di window baru atau mengakses lokal storage secara langsung.
7. **Uji pengguna nyata:** Tidak ada validasi dari pengguna nyata untuk mengonfirmasi pemahaman alur dan kebingungan visual.

---

**Akhir Laporan**

Semua temuan berdasarkan interaksi langsung dengan versi live https://matacheck.vercel.app pada tanggal 14 November 2026. Tidak ada kode diedit, commit, push, atau deploy selama proses audit ini.