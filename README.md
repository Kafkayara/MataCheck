# MataCheck v0.6 - prototipe interaksi

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

## Mode sendiri (v0.6 lokal)

Pada Persiapan pilih Coba sendiri atau Dengan pendamping. Pilihan wajib; saat mode diganti, kesiapan, latihan, dan respons sebelumnya dibersihkan agar tidak tercampur. Kembali ke halaman sebelumnya tanpa mengganti mode mempertahankan isian.

Mode sendiri: tombol panah untuk arah E, N untuk Tidak terlihat, P untuk jeda/lanjutkan. Tombol layar tetap tersedia. Shortcut aktif hanya di latihan dan demo yang sudah dimulai; tidak melewati konfirmasi mata. Tombol yang ditahan tidak mengisi percobaan berikutnya. Mode pendamping tetap memakai tombol layar.

Sumber v0.6 dan preview telah diperbarui lokal, belum dipush/deploy. Produksi terakhir terverifikasi pada commit 255891d (v0.5).

## Riwayat perubahan v0.5
Persiapan menjelaskan peran peserta/pendamping, latihan arah E wajib sebelum demo, jeda pergantian mata dengan konfirmasi, ilustrasi mata ditutup/terbuka, dan ringkasan enam jawaban sesuai urutan. Slider contoh dihapus. Versi ini belum dipush atau dideploy; alamat produksi di bawah masih merujuk versi sebelumnya.

## Deployment
Website produksi: https://matacheck.vercel.app. Deployment commit `93f9148` berstatus READY dan diverifikasi pada 14 November 2026. Repository https://github.com/Kafkayara/MataCheck terhubung ke project Vercel `matacheck`, dengan framework Other, output `public`, serta build/install command kosong. Author dan committer commit tetap Kafkayara.

Workflow `.github/workflows/checks.yml` menjalankan `npm test` pada push ke main, pull request, atau pemicu manual. Run https://github.com/Kafkayara/MataCheck/actions/runs/43566614922 berhasil untuk commit `93f9148`. Workflow hanya menyiapkan fixture browser; hasilnya tidak boleh dianggap sebagai pengujian browser otomatis. Hasil pemeriksaan online dan batasannya tersedia di docs/verification.md.

## Perilaku
Menu peninjau desain dihapus. Prasyarat diperiksa sebelum perpindahan layar. Jawaban disimpan hanya dalam memori tab; refresh atau tutup halaman menghapus sesi. Mulai ulang juga menghapus semua isian. Kamera, mikrofon dan analitik tidak digunakan.

## Batasan
Ini prototipe interaksi, bukan pemeriksaan klinis. Tiga respons per mata adalah demonstrasi; tidak ada kalibrasi fisik dalam versi ini. Tidak menghitung ketajaman, minus, plus, silinder atau resep. Validasi metode dengan profesional tetap tahap terpisah.
