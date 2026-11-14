# MataCheck v0.6.2 - prototipe interaksi

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
