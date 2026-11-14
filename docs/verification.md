# Verifikasi MataCheck

## Tambahan skenario reload — belum dieksekusi di browser

- Fixture kini memulai sesi sendiri, memasukkan satu respons, lalu mengganti dokumen iframe dengan aplikasi bersih. Pemeriksaan mengharuskan beranda awal, persetujuan/kondisi kosong, dan tombol Lanjut terkunci.
- Skenario baru berjalan setelah 174 assertions lama pada masing-masing viewport; kegagalan setup atau reload dilaporkan FAIL. Bukti 870 assertions pada commit 8557db9 di bawah tidak mencakup tambahan ini.
- npm test, pembuatan fixture, sintaks JavaScript hasil generator, dan git diff --check lulus. Eksekusi browser skenario reload masih menunggu CI atau percobaan manual; refresh URL produksi, inspeksi visual, dan keyboard fisik belum diuji.
- Panduan usability-check.md disederhanakan menjadi sesi 10 menit dengan satu teman, format catatan anonim, serta daftar pemeriksaan manual. Belum ada peserta atau temuan pengguna yang diklaim.

## Browser CI terverifikasi — 15 November 2026

- Commit 8557db9dc4ea84c3a21dd23f5684de1f9e437fd5: seluruh job berhasil pada https://github.com/Kafkayara/MataCheck/actions/runs/43620238930.
- Log job 132524085159 mengonfirmasi PASS 174 assertions per viewport: 1366 x 768, 768 x 1024, 375 x 812, 320 x 568, dan 812 x 375. Total 870 assertions, mencakup kedua mode, prasyarat, keluhan, isian, kedua mata, jeda, fokus DOM, reset, dan overflow.
- Tes kode serta penyimpanan artefak browser-evidence juga berhasil. Kegagalan Solo practice failed pada run sebelumnya terselesaikan setelah target KeyboardEvent fixture diperbaiki.
- Ini eksekusi Chrome pada fixture preview di GitHub Actions, bukan pengujian interaksi langsung pada domain produksi atau perangkat fisik. Input keyboard fixture tetap sintetis.
- Saat diperiksa, domain produksi masih menunjuk deployment READY commit f3e9ddb. Perbandingan git memastikan public/ dan MataCheck-Preview.html identik dengan 8557db9; perubahan terakhir hanya tes dan dokumentasi.
- Masih perlu inspeksi visual manual, keyboard fisik seluruh alur, refresh di tengah sesi, reduced motion, dan uji pengguna nyata. Tidak ada validasi klinis.

Catatan bertanggal sebelumnya di bawah merupakan riwayat; status browser tertunda di sana telah digantikan hasil CI ini.

## Perbaikan fixture keyboard — 15 November 2026

- GitHub run 43619340822 untuk commit f3e9ddb: pemeriksaan kode PASS, browser FAIL setelah 153 assertions dengan pesan Solo practice failed. Bukti: https://github.com/Kafkayara/MataCheck/actions/runs/43619340822/job/132521232480
- Vercel mengonfirmasi commit yang sama READY pada domain produksi. CI gagal tidak memblokir deployment otomatis.
- Penelusuran kode: fixture mengirim KeyboardEvent langsung ke document. Handler menggunakan e.target.matches untuk melindungi kontrol formulir; document bukan elemen dan tidak mempunyai matches. Ini kesalahan simulasi input, bukan bukti keyboard pengguna gagal.
- Fixture diperbaiki agar keydown/keyup berasal dari document.activeElement, mengikuti perubahan fokus seperti input nyata. Uji regresi browser-input-check.cjs memeriksa target, bubbling, perubahan fokus dan tombol ditahan.
- Perubahan ini hanya menyentuh pengujian dan dokumentasi. Hasil browser lengkap setelah perbaikan masih menunggu eksekusi CI; pemeriksaan Node tidak menggantikannya.


## Lanjutan 15 November 2026 — status terbaru

- Pemeriksaan sesi sebelumnya mencocokkan commit lokal, GitHub, dan produksi pada 953c970, CI lulus dan deployment READY. Ini catatan hasil sesi sebelumnya; akses remote belum diperiksa ulang dalam retry ini.
- Retry lokal: npm test PASS. npm run test:browser berhasil menyiapkan fixture tetapi Chrome keluar dengan kode 2147483651 sebelum laporan tersedia. Tidak ada klaim PASS browser v0.6.2.
- Runner baru mewajibkan lima laporan viewport PASS, menyimpan stdout/stderr, dan menghapus bukti lama sebelum percobaan baru agar laporan PASS lama tidak terbawa setelah crash.
- Workflow lokal menjalankan browser serta mengunggah bukti. Belum dipush/dijalankan di GitHub; CI lama hanya menyiapkan fixture.
- Dokumen arah produk dan panduan uji pengguna diperbarui. Belum ada uji pengguna nyata atau validasi klinis baru.
- Masih tertunda: browser otomatis yang berhasil, inspeksi visual laptop/layar sempit, keyboard manual seluruh alur, refresh, reduced motion, dan pemeriksaan perangkat fisik.

Bagian di bawah adalah riwayat; pernyataan belum dipush/deploy merujuk waktu masing-masing catatan dibuat.


## v0.6.2 lokal - tindak lanjut audit OpenCode

- audit-report.md dibaca dan dipertahankan tanpa perubahan. Laporan eksternal bukan hasil pengujian mandiri asisten.
- Temuan validasi Lanjut bertentangan dengan tabel PASS dan keterangan "sudah benar". Tidak dianggap bug terbukti.
- Fokus kontrol sudah memiliki outline; namun h1:focus sebelumnya outline:none. Kini fokus judul terlihat, outline kontrol ditebalkan dengan pemisah warna latar.
- Tombol arah sudah memiliki min-height 72px dan lebar grid 72px pada aturan akhir; tidak dibesarkan tanpa bukti kebutuhan.
- Batasan simulasi diperjelas di beranda. Bantuan Tidak terlihat selalu tampil dan terhubung melalui aria-describedby. Tombol kembali pada ringkasan dipindah ke urutan pertama seperti halaman lain.
- Catatan per mata diberi batas kartu dan pemisah respons. Teks penutup dipersingkat tanpa klaim medis.
- npm test, sinkronisasi preview, persiapan fixture, dan git diff --check lulus. Pengujian visual laptop/layar sempit v0.6.2 belum dijalankan karena alat browser tidak tersedia; persiapan fixture tidak dihitung sebagai lulus browser.
- Belum dipush/deploy. Prioritas berikutnya: periksa fokus, bantuan, dan kartu ringkasan pada 1366x768, 375x812, 320x568.


## v0.6.1 lokal - posisi ilustrasi mata

- Menindaklanjuti screenshot pengguna: mata kiri selalu di kiri layar dan mata kanan selalu di kanan, dengan status terbuka mengikuti mata yang sedang didemokan.
- Panduan yang sama ditambahkan pada jeda pergantian ke mata kiri. Dua kolom dipertahankan pada layar sempit agar arti posisi tidak berubah menjadi atas/bawah.
- Pengujian fungsi asli memeriksa urutan, status, SVG terbuka/tertutup, dan penggunaan panduan pada tahap pergantian.
- Fixture browser menambahkan pemeriksaan posisi kedua kartu pada lima viewport. Belum ada laporan eksekusi browser untuk perubahan ini; hasil persiapan fixture bukan hasil browser.
- Belum dipush/deploy. Label teks tetap tersedia sebagai pelengkap aksesibilitas.


## v0.6 lokal - mode sendiri

- Mode solo/helper wajib sebelum latihan; pergantian mode membersihkan kesiapan, latihan dan jawaban. Instruksi serta ringkasan mengikuti mode.
- npm test lulus, termasuk pengujian handler keyboard asli dalam VM: pemetaan arah/N/P, tombol ditahan, jeda, konfirmasi, input form dan isolasi mode pendamping. Ini pengujian kode, bukan browser.
- Preview sinkron dari public/. Fixture browser diperluas untuk mode sendiri, reset dan pergantian mode; sintaks/persiapan fixture lulus.
- Pengujian browser v0.6 belum dijalankan; alat kontrol browser tidak tersedia pada sesi ini. Crash browser v0.5 dicatat di bawah dan tidak dianggap hasil v0.6. Belum dipush/deploy.


## v0.5 lokal - 14 November 2026

- Workspace aktif dan uji tulis/baca/hapus file sementara berhasil. Working tree awal bersih.
- Latihan arah E wajib sebelum mata kanan; jeda pergantian wajib dikonfirmasi sebelum mata kiri. Slider contoh dihapus, peran dijelaskan, panduan mata diberi ilustrasi SVG lokal, ringkasan menampilkan enam jawaban tanpa skor.
- npm test: PASS sintaks, encoding, guard termasuk latihan/pergantian, regresi generator, konfigurasi deployment, dan sinkronisasi preview. git diff --check: PASS.
- npm run test:browser:prepare: PASS persiapan fixture; bukan eksekusi browser. Skenario diperbarui untuk latihan, pergantian mata, rincian respons, dan reset latihan.
- Chrome headless berhenti dengan exit -2147483645; Edge headless berhenti dengan exit -1073741819. Tidak ada laporan assertions yang dihasilkan. Penyebab crash belum teridentifikasi. Pengujian browser/visual v0.5 masih tertunda; hasil v0.4 di bawah tidak membuktikan v0.5 lulus.
- Belum dipush atau dideploy; produksi tetap commit 93f9148 (v0.4).


## Status produksi terbaru - 14 November 2026

- URL: https://matacheck.vercel.app.
- Project: matacheck (`prj_flqjexVQseX0wYZZUlboCwHalq4m`), team `dkydk263-3162s-projects`.
- Deployment `dpl_5JKz6PECKVqnnoqxSeTrmiyjH3LM`: READY, target production, commit `93f9148aa874a7455b72e01853f275b15c439661`, alias tanpa error.
- Deteksi awal framework Node diganti menjadi Other (null), output public, build/install command kosong. Tidak ada perubahan sumber aplikasi atau penambahan dependency.
- GitHub Actions run https://github.com/Kafkayara/MataCheck/actions/runs/43566614922: completed/success untuk commit yang sama. Author dan committer commit adalah Kafkayara.
- Browser pada URL produksi berhasil menjalankan pemeriksaan awal, penghentian cabang keluhan, persiapan, konfirmasi kedua mata, tiga respons per mata, ringkasan 3/3 dan 3/3 tanpa hasil klinis, serta reset ke beranda.
- Saat jeda, seluruh jawaban nonaktif dan simbol disembunyikan. Fokus terlihat pada tombol lanjutkan; setelah respons fokus kembali ke tombol jawaban. Refresh setelah reset tetap menampilkan beranda; ini bukan uji refresh di tengah sesi aktif.
- Pemeriksaan HTTP melalui konektor Vercel: /, /app.js, /styles.css berstatus 200 dengan tipe konten sesuai. /package.json berstatus 404.
- Respons HTML memiliki CSP sesuai vercel.json, Permissions-Policy menonaktifkan kamera/mikrofon/geolokasi, Referrer-Policy no-referrer, dan X-Content-Type-Options nosniff.
- Batasan: uji viewport sempit online, keyboard manual penuh, reduced motion, tutup tab, dan ponsel fisik belum diverifikasi. Hasil 565 pemeriksaan viewport di bawah adalah fixture lokal. Tidak ada validasi klinis.

Bagian berikut menyimpan riwayat pemeriksaan sebelum deployment; status produksi di atas menggantikan catatan lama yang menyatakan belum deploy atau CI belum dijalankan.

Pembaruan: 14 November 2026. Workspace: C:\Users\Kafka\Documents\MataCheck.

## Bukti lokal

- Workspace aktif serta kemampuan membuat, membaca, dan menghapus file sementara telah diverifikasi.
- Versi awal package.json: 0.3.0. Kandidat v0.4 dibandingkan sebelum mengambil perubahan.
- HTML, CSS, server dan vercel.json identik dengan kandidat. Tidak ada penggantian framework atau dependency runtime.
- Uji regresi navigasi sebelum perbaikan gagal: `Invalid screen accepted: -1`. Setelah guard v0.4 diterapkan, uji tersebut lulus.
- `npm run build:preview`: berhasil menghasilkan ulang preview dari public/.
- `npm test`: PASS untuk sintaks/struktur, encoding sumber, prasyarat navigasi, serta sinkronisasi preview.
- `node --check tests/browser-scenario.js`: PASS sintaks.
- `npm run test:browser:prepare`: berhasil membuat fixture, tetapi bukan bukti eksekusi browser.

## Pengujian browser v0.4

Fixture dijalankan di Chrome lokal. Laporan kelima viewport dibaca melalui accessibility tree browser: masing-masing PASS 113 assertions (565 pemeriksaan total).

| Viewport iframe | Hasil |
| --- | --- |
| 1366 x 768 | PASS 113 |
| 768 x 1024 | PASS 113 |
| 375 x 812 | PASS 113 |
| 320 x 568 | PASS 113 |
| 812 x 375 | PASS 113 |

Pengujian meliputi halaman tidak valid, prasyarat, cabang keluhan, isian saat kembali, kedua mata, jeda, pemulihan fokus DOM, reset, dan overflow pada setiap tahap. Ini pengujian viewport browser, bukan perangkat ponsel fisik.

Preview SHA-256 yang diuji: `20527d2e9c7d24fcf15702d81c7d917149577d169d61641da5bb5ed3a201ca05`. Hash diperiksa kembali pada 14 November dan tidak berubah. `npm test` juga dijalankan ulang dan lulus pada 14 November.

Uji manual tambahan: Tab menempatkan fokus di tombol Mulai simulasi dengan outline terlihat pada screenshot; Enter membuka pemeriksaan awal. Tampilan beranda desktop diperiksa secara visual.

Hambatan awal: browser bawaan gagal membuka localhost (ERR_CONNECTION_TIMED_OUT), dan akses Chrome sempat terhenti. Setelah Chrome dapat diakses, pengujian di atas berhasil dilakukan memakai file lokal. Hasil ini tidak didasarkan pada pengujian v0.3.

Masih perlu: pengujian keyboard manual seluruh alur, refresh/tutup tab, reduced motion pada browser, inspeksi visual seluruh layar, perangkat mobile fisik, CSP dan halaman yang benar-benar dihosting.

## GitHub dan deployment

- Repository tujuan diberikan pengguna: https://github.com/Kafkayara/MataCheck.
- `git ls-remote` gagal: getaddrinfo() thread failed to start. Percobaan HTTPS Node juga gagal: ENOTFOUND github.com.
- `git credential-manager github list` gagal: Access is denied. Tidak ada credential/token yang ditampilkan atau diminta.
- `git init -b main` berhasil, tetapi `git remote add origin` ditolak karena .git/config tidak dapat ditulis oleh lingkungan ini.
- Git juga menolak pembuatan `.git/index.lock`, sehingga staging/commit lokal terblokir.
- Plugin GitHub telah tersambung ke Kafkayara dan metadata repository menunjukkan pengguna memiliki izin push/admin. Namun percobaan membuat file melalui integrasi ditolak 403 `Resource not accessible by integration`. Izin akun pengguna dan izin integrasi berbeda.
- Pengguna kemudian melakukan push manual. Commit lokal dan GitHub main sama: `8b0d472e1645fb0c2c934c4b6e781ca42e4a7f98`, pesan `commit pertama`. Working tree bersih saat pemeriksaan awal lanjutan.
- Commit pertama tidak memiliki parent. Author dan committer GitHub sama-sama terhubung ke Kafkayara; tidak ada trailer Co-authored-by.
- Struktur remote berisi 19 file sumber/dokumentasi/config yang sama dengan commit lokal; tests/artifacts dan credential tidak ikut terlacak.
- Akun/tim dan project Vercel belum diverifikasi. Belum ada URL deployment yang diklaim online.

## Pemeriksaan pra-deployment tambahan (14 November)

- Uji regresi generator pada direktori sementara mula-mula gagal: hilangnya tag stylesheet masih menghasilkan exit 0. Generator kini menolak anchor CSS/JS/body yang hilang atau berulang sebelum menulis preview.
- `npm test` setelah perbaikan: PASS seluruh pemeriksaan, termasuk preview mandiri, sumber berubah membuat --check gagal tanpa menulis file, template tidak lengkap ditolak, serta outputDirectory dan header keamanan Vercel.
- `npm run test:browser:prepare`: PASS pembuatan fixture dan pemeriksaan sintaks skenario. Perintah ini tidak menjalankan browser.
- `git diff --check`: PASS. Tidak ada perubahan public/ atau preview aplikasi, sehingga hasil browser di atas masih merujuk artefak yang sama.
- Workflow GitHub checks ditambahkan secara lokal. Belum dipush atau dijalankan di GitHub; tidak ada klaim CI lulus.
- Pemeriksaan konfigurasi header tidak menggantikan pemeriksaan header HTTP setelah deployment.

## Riwayat

Dokumentasi v0.3 menyebut uji browser desktop pada lebar 1070 lulus. Itu catatan versi lama, bukan bukti untuk versi saat ini. Tidak ada validasi klinis dalam seluruh pengujian perangkat lunak ini.
