# MataCheck v0.16.0

Simulasi penglihatan terpandu dengan mode sendiri atau pendamping. Bukan pemeriksaan klinis: tidak menghasilkan ketajaman penglihatan, diagnosis, ukuran kacamata, atau resep.

## Menjalankan dan menguji

Gunakan Node.js (pengujian memakai Node 24). Tidak perlu `npm install`.

```sh
npm start
```

Buka http://127.0.0.1:4173 atau buka `MataCheck-Preview.html` untuk preview offline.

Edit sumber di `public/`, lalu jalankan:

```sh
npm run build:preview
npm test
npm run test:browser
```

Preview dihasilkan otomatis; jangan diedit terpisah. Tes browser menggunakan Chrome/Chromium pada lima viewport. Set `MATACHECK_BROWSER` ke executable browser bila diperlukan. Alternatif manual: jalankan `npm run test:browser:prepare`, buka `tests/artifacts/browser-test.html`, dan periksa kelima laporan. Prepare tidak menjalankan browser. Dialog unduh/cetak, layout PDF dan ukuran fisik tetap perlu diuji manual.

## Fitur saat ini

- Pertanyaan usia dalam tahun penuh pada pemeriksaan awal, opsional untuk demo. Format salah perlu diperbaiki atau dikosongkan. Usia yang diisi ikut ringkasan/TXT/cetakan, hanya disimpan dalam memori sesi, dan dihapus saat sesi baru atau Hapus sesi. Tidak ada ambang usia atau keputusan kelayakan klinis.
- Enam langkah: pemeriksaan awal, persiapan, latihan, mata kanan, mata kiri dan ringkasan. Pergantian mata hanya meminta satu konfirmasi.
- Mode sendiri: panah untuk arah, N untuk Tidak terlihat, P untuk jeda/lanjut. Pendamping menggunakan tombol layar. Menahan tombol tidak mengisi jawaban berikutnya.
- SVG E grid 5x5, tetap 120 CSS px. Tiga orientasi acak independen per mata; arah boleh berulang. Jeda manual mempertahankan simbol; ulang setelah interupsi menghasilkan urutan baru.
- Kalibrasi opsional: cocokkan 100 mm dua kali, lalu verifikasi 50 mm horizontal/vertikal. Batas 2%, 49-51 mm dan tiga kegagalan adalah toleransi rekayasa, bukan validasi klinis. Reset garis tidak menghapus jumlah gagal.
- Pembacaan penggaris horizontal/vertikal dari kalibrasi yang masih berlaku ikut ringkasan, TXT dan cetakan. Catatan menyebutnya sebagai masukan pengguna, bukan pengukuran otomatis. Nilai dari kalibrasi gagal, dilewati atau kedaluwarsa tidak ditampilkan.
- Catatan jarak opsional dalam cm, dengan konfirmasi pengukuran fisik, posisi stabil dan alat jawab dapat digunakan tanpa maju. Editor harus disimpan atau dilewati sebelum latihan.
- Catatan kacamata/lensa kontak opsional sejak pemeriksaan awal, tanpa ukuran resep; dapat diubah di Persiapan. Pilihan ikut dalam ringkasan, unduhan dan cetakan.
- Ringkasan: pengamatan, kualitas sesi, makna catatan dan tindak lanjut. Unduh teks UTF-8 atau gunakan dialog cetak/simpan PDF browser.

## Persiapan dan perlindungan input

Pemeriksaan awal menyebut kehilangan penglihatan mendadak, nyeri mata berat, dan cedera mata sesuai contoh PRD. Jawaban Ya/tidak yakin menghentikan sesi, membuang respons sebelumnya, dan mengunci alur berikutnya. Jika salah memilih, gunakan Mulai sesi baru untuk mengisi ulang; mengganti jawaban tidak melanjutkan sesi yang dihentikan. Daftar ini belum menjadi kriteria kelayakan klinis lengkap.

Tombol lanjut berada setelah seluruh pengaturan Persiapan. Pesan status menyebut pilihan mode, checklist, editor jarak atau kalibrasi yang masih perlu diselesaikan. Pilihan opsional tetap opsional untuk demo.

Klik jawaban berulang dalam 300 ms dan klik lanjutan dalam rangkaian multi-click diabaikan. Input dari tombol yang sudah tidak berada di layar, nilai tidak dikenal, atau sesi dijeda ditolak. Pengulangan Enter/Spasi saat tombol jawaban fokus dicegah; pintasan panah/N tetap memakai aturan lepas tombol. Jeda klik adalah perlindungan antarmuka, bukan ambang respons klinis.

## Catatan simbol dan respons

Ringkasan menampilkan arah simbol dan respons pengguna untuk setiap percobaan yang sudah dijawab. Orientasi berasal dari urutan aktual yang ditampilkan, bukan ditebak dari jawaban. Arah benar tidak dibocorkan selama demo berlangsung. Percobaan yang belum dijawab tidak menghasilkan baris, dan percobaan yang dibuang saat ulang mata tidak ikut dalam catatan akhir. Unduhan/cetakan memakai pasangan yang sama. Tidak ada skor benar/salah atau nilai ketajaman.

## Pengulangan persiapan dalam catatan

Bagian kualitas sesi mencatat jumlah perubahan tampilan/kalibrasi, posisi/jarak, serta kacamata/lensa kontak yang membuang respons sebelumnya. Perubahan sebelum ada respons tidak dihitung. Pengulangan ini terpisah dari interupsi tab/fokus; bukan skor kualitas klinis. Respons yang dibuang tidak disertakan. Ringkasan, teks dan cetakan menampilkan catatan yang sama. Sesi baru atau perubahan mode membersihkan penghitung.

## Mengakhiri sesi lebih awal

Pilih **Berhenti & lihat catatan** pada latihan, persiapan mata, demo atau pergantian mata. Respons yang sudah diberikan dipertahankan; ringkasan ditandai belum lengkap dan tidak menganggap jawaban yang belum diberikan sebagai Tidak terlihat. Catatan parsial dapat diunduh/dicetak dengan peringatan yang sama. Sesi yang diakhiri tidak dapat dilanjutkan; mulai sesi baru untuk mencoba lagi. Memilih Mulai simulasi dari beranda membersihkan data sesi sebelumnya.

## Perubahan kondisi dan privasi

Meninggalkan tab/jendela saat editor jarak terbuka membatalkan ketiga konfirmasinya. Angka yang diketik tetap ada; periksa ulang pengukuran, posisi dan alat jawab sebelum menyimpan. Interupsi biasa di luar editor tidak menghapus catatan jarak yang sudah disimpan.

Jika latihan yang selesai dibatalkan karena meninggalkan halaman/jendela, pesan menjelaskan penyebabnya dan meminta latihan Kanan diulang. Saat kembali, fokus menuju tombol Kanan; jawaban benar membuka lanjut kembali.

Pindah tab/jendela saat demo menyembunyikan simbol dan mengulang mata aktif; mata yang selesai dipertahankan. Pilih Ulangi mata ini; P tidak melewati konfirmasi. Gangguan kalibrasi parsial mengulang pencocokan tanpa penalti. Latihan/pergantian mata perlu dikonfirmasi lagi setelah gangguan.

Perubahan tampilan yang terdeteksi membatalkan kalibrasi, jarak dan respons kedua mata. Pergantian monitor dengan karakteristik sama mungkin tidak terdeteksi; gunakan tombol perubahan layar. Ringkasan selesai tidak diubah setelah tampilan berubah.

Posisi peserta berubah menghapus jarak, respons, latihan dan kesiapan. Kacamata/lensa kontak berubah menghapus respons, latihan dan kesiapan tetapi mempertahankan kalibrasi serta jarak; bila posisi juga berubah gunakan tombol posisi. Mengubah pilihan koreksi di pemeriksaan awal atau Persiapan membuang respons dan latihan. Pilihan mode pertama mempertahankan catatan koreksi dari pemeriksaan awal. Hapus sesi, ulangi simulasi atau pergantian mode yang sudah dipilih membersihkan catatan sesi.

Data hanya dalam memori tab; refresh/tutup tab menghapus sesi. Tidak ada akun, unggahan jawaban, kamera, mikrofon atau analitik. File unduhan tetap berada di perangkat setelah sesi dihapus.

## Pemeriksaan privasi otomatis

Fixture browser memasang pemeriksa sebelum kode aplikasi untuk mendeteksi pemakaian fetch, XHR, WebSocket/EventSource, beacon, media kamera/layar, penulisan Storage/cookie, IndexedDB, CacheStorage, dan pendaftaran service worker pada alur yang diuji. Panggilan API terpantau membuat tes gagal, termasuk bila aplikasi menangkap error-nya. Pemeriksa ini hanya ada dalam fixture pengujian, tidak diterbitkan bersama aplikasi. Catatan pemeriksa hanya berisi nama API, bukan URL, payload atau respons pengguna.

Tes unit membuktikan pemeriksa memblokir panggilan contoh. Kelulusan fixture browser hanya membuktikan API terpantau tidak dipanggil dalam skenario tersebut; bukan audit seluruh jaringan, seluruh kemungkinan penyimpanan, atau website produksi. Resource HTML/CSS, jalur yang tidak diuji dan kondisi browser nyata tetap perlu diperiksa.

## Struktur repo

| Lokasi | Fungsi |
| --- | --- |
| `public/` | Kode website yang diterbitkan |
| `tests/` | Tes state, input, ekspor dan browser |
| `scripts/` | Generator preview offline |
| `docs/` | Spesifikasi, keputusan dan bukti pengujian |
| `.github/workflows/checks.yml` | CI kode/browser dan artefak tujuh hari |
| `MataCheck-Preview.html` | Hasil generator, sengaja dilacak Git |
| `server.cjs`, `package.json` | Server lokal dan perintah pengembangan |
| `vercel.json` | Output public dan header keamanan |

## Bukti pengujian dan deployment

Repository: https://github.com/Kafkayara/MataCheck. Website: https://matacheck.vercel.app.

Commit `354499c` (v0.16.0, termasuk pengujian ekspor sesi lengkap dan parsial) lulus [CI run 43917525148](https://github.com/Kafkayara/MataCheck/actions/runs/43917525148): 438 assertion per viewport pada lima viewport, termasuk pemeriksa privasi dan reload setelah sesi parsial. Bukti ini berasal dari fixture Chrome, bukan dialog unduh/cetak nyata atau validasi fisik.

Workflow menjalankan tes kode dan browser pada push main, pull request dan pemicu manual. CI belum menghalangi deployment Vercel secara otomatis. Kelulusan CI tidak membuktikan status deployment. Lihat [bukti pengujian](docs/verification.md).

Perubahan lokal catatan koreksi pada pemeriksaan awal belum tercakup CI tersebut. Tes kode dan persiapan fixture lulus; Chrome lokal gagal diluncurkan, sehingga skenario browser baru menunggu CI.

## Kesesuaian PRD

Lihat [pemetaan FR-01 sampai FR-10](docs/prd-status.md) untuk status implementasi dan syarat yang belum terpenuhi. Catatan sesi kini memuat waktu mulai/akhir beserta zona waktu dan versi aplikasi. Waktu mengikuti jam perangkat dan tidak berubah ketika diunduh ulang. Menghapus atau memulai sesi baru membersihkan waktu sesi lama.

## Pekerjaan berikutnya

Kalibrasi dan jarak belum dipakai mengubah ukuran stimulus atau menghitung penglihatan. Metode, rentang ukuran, target/toleransi jarak, penilaian, populasi dan evaluasi perlu ditetapkan serta ditinjau sebelum mode pengukuran diaktifkan. Uji software tidak membuktikan akurasi klinis.

Lihat [protokol](docs/protocol-and-calibration.md), [arah produk](docs/product-direction.md), dan [panduan uji pengguna](docs/usability-check.md).
