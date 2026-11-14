# Verifikasi MataCheck v0.4

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
