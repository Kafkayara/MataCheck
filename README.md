# MataCheck v0.9.0 - prototipe interaksi

## Interupsi demo (v0.7.1 lokal)

Jika halaman disembunyikan atau jendela kehilangan fokus saat demo, simbol menghilang dan jawaban mata yang sedang dikerjakan dibersihkan. Pilih **Ulangi mata ini** untuk mulai mata tersebut dari awal; tombol P tidak melewati konfirmasi ini. Mata yang sudah selesai dipertahankan selama kalibrasi tidak berubah. Tombol Jeda biasa tetap mempertahankan progres selama halaman tidak ditinggalkan.

Kalibrasi v0.7.0 sudah terdeploy pada commit 72d248a dan lulus 241 pemeriksaan browser per viewport, ditambah pemeriksaan reload. Catatan belum deploy untuk v0.7.0 di bawah adalah riwayat. Interupsi v0.7.1 baru lulus tes kode; browser versi baru belum diverifikasi.

## Kalibrasi penggaris (v0.7.0 lokal)

Pada Persiapan, pilih **Cocokkan dengan penggaris**. Samakan jarak antartanda dengan 10 cm pada penggaris fisik dua kali, lalu ukur garis horizontal dan vertikal verifikasi dalam milimeter. Setelah berhasil, kembali ke Persiapan untuk menjalankan demo.

Kalibrasi masih opsional untuk demo; tombol **Lanjut demo tanpa kalibrasi** menandai sesi sebagai tidak dikalibrasi. Ukuran yang dicocokkan belum dipakai menghitung kemampuan penglihatan atau mengubah simbol demo. Ambang 2% dan 49–51 mm adalah toleransi uji rekayasa, belum tervalidasi klinis.

Perubahan ukuran jendela, zoom/DPR yang terdeteksi, orientasi, atau fullscreen setelah pencocokan meminta ulang dan membersihkan respons sesi yang sedang berjalan. Pergantian monitor yang tidak terdeteksi dilaporkan lewat tombol perubahan layar pada halaman kalibrasi dan sesi terkalibrasi. Ringkasan sesi yang sudah selesai dipertahankan sebagai catatan historis.

Tiga kegagalan menghentikan percobaan kalibrasi untuk sesi itu. Reset garis atau keluar-masuk melalui jalur demo tidak menghapus hitungannya; **Hapus sesi** memulai sesi baru. Pengujian fisik: samakan 10 cm dengan penggaris, baca kembali kedua garis verifikasi, lalu ubah zoom dan pastikan diminta ulang. Jangan menekan panel dengan penggaris. Jika garis tidak muat, jangan menyusutkan tampilan untuk memaksakan kalibrasi.

Tes kode lulus; eksekusi browser v0.7 dan kecocokan ukuran fisik belum terverifikasi. Perubahan ini belum dipush/deploy. Rancangan lengkap: [protokol dan kalibrasi](docs/protocol-and-calibration.md).

## Menjalankan
1. Buka terminal di folder proyek. Gunakan Node.js (pengujian lokal memakai v24.15.0).
2. Jalankan `npm start`, lalu buka http://127.0.0.1:4173.
3. Alternatif offline: buka `MataCheck-Preview.html` langsung di browser.
4. Edit sumber di `public/`, lalu jalankan `npm run build:preview` untuk memperbarui preview mandiri. Jangan edit preview secara terpisah.
5. Jalankan `npm test`: sintaks, struktur, encoding, prasyarat navigasi, regresi generator preview, kesesuaian preview, dan konfigurasi deployment. Tidak perlu `npm install`.
6. Jalankan `npm run test:browser:prepare`, kemudian buka `tests/artifacts/browser-test.html` di browser. Perintah ini hanya menyiapkan pengujian, bukan menjalankannya. Periksa kelima hasil PASS/FAIL.

## Struktur
- public/index.html: halaman aplikasi.
- public/styles.css: desain yang sudah disetujui.
- public/app.js: alur delapan halaman dan state sesi.
- scripts/build-preview.cjs: menghasilkan preview dari `public/` dan memeriksa sinkronisasinya.
- tests/: pemeriksaan kode dan pengujian alur DOM melalui fixture browser.
- vercel.json: direktori publik dan header keamanan.
- docs/implementation-plan.md: cakupan tahap ini.
- docs/verification.md: hasil yang benar-benar sudah diverifikasi dan batasannya.
- docs/deployment.md: tujuan GitHub, atribusi commit, dan persiapan Vercel.

## Mode sendiri

Pada Persiapan pilih Coba sendiri atau Dengan pendamping. Pilihan wajib; saat mode diganti, kesiapan, latihan, dan respons sebelumnya dibersihkan agar tidak tercampur. Kembali ke halaman sebelumnya tanpa mengganti mode mempertahankan isian.

Mode sendiri: tombol panah untuk arah E, N untuk Tidak terlihat, P untuk jeda/lanjutkan. Tombol layar tetap tersedia. Shortcut aktif hanya di latihan dan demo yang sudah dimulai; tidak melewati konfirmasi mata. Tombol yang ditahan tidak mengisi percobaan berikutnya. Mode pendamping tetap memakai tombol layar.

Pemeriksaan pada sesi sebelumnya mencocokkan lokal, GitHub dan produksi pada commit 953c970 (v0.6.2). Lihat docs/verification.md untuk status dan batasan pengujian.

## Riwayat perubahan v0.5
Persiapan menjelaskan peran peserta/pendamping, latihan arah E wajib sebelum demo, jeda pergantian mata dengan konfirmasi, ilustrasi mata ditutup/terbuka, dan ringkasan enam jawaban sesuai urutan. Slider contoh dihapus. Catatan ini menjelaskan perubahan historis v0.5.

## Deployment
Website produksi: https://matacheck.vercel.app. Deployment commit `93f9148` berstatus READY dan diverifikasi pada 14 November 2026. Repository https://github.com/Kafkayara/MataCheck terhubung ke project Vercel `matacheck`, dengan framework Other, output `public`, serta build/install command kosong. Author dan committer commit tetap Kafkayara.

Workflow `.github/workflows/checks.yml` menjalankan `npm test` pada push ke main, pull request, atau pemicu manual. Run https://github.com/Kafkayara/MataCheck/actions/runs/43566614922 berhasil untuk commit `93f9148`. Workflow hanya menyiapkan fixture browser; hasilnya tidak boleh dianggap sebagai pengujian browser otomatis. Hasil pemeriksaan online dan batasannya tersedia di docs/verification.md.

## Perilaku
Menu peninjau desain dihapus. Prasyarat diperiksa sebelum perpindahan layar. Jawaban disimpan hanya dalam memori tab; refresh atau tutup halaman menghapus sesi. Mulai ulang juga menghapus semua isian. Kamera, mikrofon dan analitik tidak digunakan.

## Batasan
Ini prototipe interaksi, bukan pemeriksaan klinis. Tiga respons per mata adalah demonstrasi; tidak ada kalibrasi fisik dalam versi ini. Tidak menghitung ketajaman, minus, plus, silinder atau resep. Validasi metode dengan profesional tetap tahap terpisah.

## Posisi mata v0.6.1
Panduan mengikuti sisi pengguna: mata kiri di kiri layar, mata kanan di kanan layar. Status ikon berubah sesuai mata yang dipakai. Panduan juga tampil pada jeda pergantian; kedua kartu tetap berdampingan di layar sempit. Perubahan ini termasuk v0.6.2.

## v0.6.2
Tindak lanjut audit: batasan beranda lebih jelas, fokus judul terlihat, bantuan Tidak terlihat, urutan kembali pada ringkasan, dan pemisah catatan per mata. Pemeriksaan kode lulus; pengujian visual browser masih tertunda. Status rilis terbaru dicatat di docs/verification.md.

## Tahap berikutnya dan pengujian browser

Jalankan `npm run test:browser` untuk menyiapkan fixture dan menjalankan Chrome/Chromium. Jika executable tidak ditemukan, set `MATACHECK_BROWSER` ke path browser. Lima laporan harus PASS; crash atau hasil tidak lengkap membuat perintah gagal. Alternatif manual tetap tersedia pada langkah 6.

Workflow lokal kini menjalankan tes browser dan menyimpan browser-evidence selama tujuh hari; belum ada hasil CI untuk perubahan workflow ini. Keterangan workflow/deployment lama di atas adalah riwayat. CI belum menghalangi auto-deploy Vercel.

Rencana berikutnya: [arah produk](docs/product-direction.md) dan [panduan uji pengguna](docs/usability-check.md).

## Ringkasan sesi v0.7.2

Ringkasan dibagi menjadi pengamatan, kualitas sesi, makna catatan, dan tindak lanjut. Kualitas menampilkan status pencocokan layar, batasan jarak demo, serta jumlah interupsi otomatis per mata. Sinyal blur/hidden berulang selama satu interupsi dihitung sekali. Jeda manual tidak dihitung. Penghitung mencakup sesi berjalan, termasuk percobaan sebelum kalibrasi ulang; hapus sesi, ulangi simulasi, atau perubahan mode membersihkannya. Catatan respons hanya memuat percobaan terakhir yang diselesaikan.

## v0.8.0: catatan portabel dan kesiapan sesi

- Ringkasan selesai dapat diunduh sebagai teks UTF-8 atau dicetak/disimpan sebagai PDF melalui dialog browser. Isi teks berasal dari ringkasan yang tampil, termasuk seluruh batasannya. Tidak ada unggahan atau penyimpanan server. File yang sudah disimpan tidak ikut terhapus dengan Hapus sesi.
- Bentuk E demo menggunakan SVG grid 5x5, berukuran tetap 120 CSS px. Tiga orientasi dipilih acak independen untuk setiap mata; orientasi boleh berulang. Urutan baru dibuat saat mata dimulai atau diulang setelah interupsi. Jeda manual mempertahankan simbol. Ini masih demo, bukan stimulus dengan ukuran fisik terkalibrasi atau penilaian ketajaman.
- Gangguan saat pencocokan penggaris belum selesai mengulang pencocokan tanpa menambah jumlah gagal. Latihan dan konfirmasi pergantian mata harus diulang/dikonfirmasi kembali jika terinterupsi. Fokus kembali ke tombol ulang pada trial yang terputus.
- `npm test` mencakup ekspor, geometri, pengacakan, dan perubahan state. `npm run test:browser` tetap diperlukan untuk pengujian DOM. Dialog unduh/cetak nyata dan layout PDF memerlukan pemeriksaan manual.

## v0.9.0: catatan jarak manual

Persiapan menyediakan editor jarak opsional setelah mode dipilih. Masukkan jarak aktual dari bidang layar ke mata dalam cm (koma/titik desimal didukung), lalu konfirmasi pengukuran fisik, posisi stabil, dan alat jawab dapat digunakan tanpa maju. Selama editor terbuka latihan tidak dapat dimulai; simpan atau pilih lanjut tanpa catatan jarak. Membuka Ubah catatan jarak langsung membuang catatan lama serta progres kedua mata/latihan agar tidak mencampur kondisi.

Ringkasan dan unduhan menyebut jarak sebagai konfirmasi pengguna. Tidak ada target jarak klinis, verifikasi otomatis, atau penyesuaian ukuran simbol berdasarkan jarak. Tombol Posisi peserta berubah tersedia selama latihan, demo dan pergantian mata: respons kedua mata, latihan, catatan jarak dan checklist persiapan dibersihkan. Kalibrasi layar yang masih sesuai dipertahankan. Perubahan tampilan yang membatalkan kalibrasi juga membuang catatan jarak. Hapus sesi, ulangi simulasi dan perubahan mode membersihkannya.
