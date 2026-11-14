# MataCheck v0.4 - prototipe interaksi

## Menjalankan
1. Buka terminal di folder proyek. Gunakan Node.js (pengujian lokal memakai v24.15.0).
2. Jalankan `npm start`, lalu buka http://127.0.0.1:4173.
3. Alternatif offline: buka `MataCheck-Preview.html` langsung di browser.
4. Edit sumber di `public/`, lalu jalankan `npm run build:preview` untuk memperbarui preview mandiri. Jangan edit preview secara terpisah.
5. Jalankan `npm test`: sintaks, struktur, encoding, prasyarat navigasi, dan kesesuaian preview. Tidak perlu `npm install`.
6. Jalankan `npm run test:browser:prepare`, kemudian buka `tests/artifacts/browser-test.html` di browser. Perintah ini hanya menyiapkan pengujian, bukan menjalankannya. Periksa kelima hasil PASS/FAIL.

## Struktur
- public/index.html: halaman aplikasi.
- public/styles.css: desain yang sudah disetujui.
- public/app.js: alur enam halaman dan state sesi.
- scripts/build-preview.cjs: menghasilkan preview dari `public/` dan memeriksa sinkronisasinya.
- tests/: pemeriksaan kode dan pengujian alur DOM melalui fixture browser.
- vercel.json: direktori publik dan header keamanan.
- docs/implementation-plan.md: cakupan tahap ini.
- docs/verification.md: hasil yang benar-benar sudah diverifikasi dan batasannya.
- docs/deployment.md: tujuan GitHub, atribusi commit, dan persiapan Vercel.

## Deploy yang disiapkan
Tujuan yang diberikan pemilik: https://github.com/Kafkayara/MataCheck. Push belum terverifikasi. Setelah sumber ada di repository, hubungkan ke akun/tim Vercel milikmu yang sudah diverifikasi. Gunakan framework Other, output directory `public`, tanpa build command. Deployment belum dilakukan.

## Perilaku
Menu peninjau desain dihapus. Prasyarat diperiksa sebelum perpindahan layar. Jawaban disimpan hanya dalam memori tab; refresh atau tutup halaman menghapus sesi. Mulai ulang juga menghapus semua isian. Kamera, mikrofon dan analitik tidak digunakan.

## Batasan
Ini prototipe interaksi, bukan pemeriksaan klinis. Tiga respons per mata dan kontrol kalibrasi adalah demonstrasi. Tidak menghitung ketajaman, minus, plus, silinder atau resep. Validasi metode dengan profesional tetap tahap terpisah.
