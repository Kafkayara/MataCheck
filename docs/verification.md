# Verifikasi MataCheck

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
