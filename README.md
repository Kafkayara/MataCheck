# MataCheck v0.12.0

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

- Enam langkah: pemeriksaan awal, persiapan, latihan, mata kanan, mata kiri dan ringkasan. Pergantian mata hanya meminta satu konfirmasi.
- Mode sendiri: panah untuk arah, N untuk Tidak terlihat, P untuk jeda/lanjut. Pendamping menggunakan tombol layar. Menahan tombol tidak mengisi jawaban berikutnya.
- SVG E grid 5x5, tetap 120 CSS px. Tiga orientasi acak independen per mata; arah boleh berulang. Jeda manual mempertahankan simbol; ulang setelah interupsi menghasilkan urutan baru.
- Kalibrasi opsional: cocokkan 100 mm dua kali, lalu verifikasi 50 mm horizontal/vertikal. Batas 2%, 49-51 mm dan tiga kegagalan adalah toleransi rekayasa, bukan validasi klinis. Reset garis tidak menghapus jumlah gagal.
- Catatan jarak opsional dalam cm, dengan konfirmasi pengukuran fisik, posisi stabil dan alat jawab dapat digunakan tanpa maju. Editor harus disimpan atau dilewati sebelum latihan.
- Catatan kacamata/lensa kontak opsional, tanpa ukuran resep. Pilihan ikut dalam ringkasan, unduhan dan cetakan.
- Ringkasan: pengamatan, kualitas sesi, makna catatan dan tindak lanjut. Unduh teks UTF-8 atau gunakan dialog cetak/simpan PDF browser.

## Mengakhiri sesi lebih awal

Pilih **Berhenti & lihat catatan** pada latihan, persiapan mata, demo atau pergantian mata. Respons yang sudah diberikan dipertahankan; ringkasan ditandai belum lengkap dan tidak menganggap jawaban yang belum diberikan sebagai Tidak terlihat. Catatan parsial dapat diunduh/dicetak dengan peringatan yang sama. Sesi yang diakhiri tidak dapat dilanjutkan; mulai sesi baru untuk mencoba lagi. Memilih Mulai simulasi dari beranda membersihkan data sesi sebelumnya.

## Perubahan kondisi dan privasi

Pindah tab/jendela saat demo menyembunyikan simbol dan mengulang mata aktif; mata yang selesai dipertahankan. Pilih Ulangi mata ini; P tidak melewati konfirmasi. Gangguan kalibrasi parsial mengulang pencocokan tanpa penalti. Latihan/pergantian mata perlu dikonfirmasi lagi setelah gangguan.

Perubahan tampilan yang terdeteksi membatalkan kalibrasi, jarak dan respons kedua mata. Pergantian monitor dengan karakteristik sama mungkin tidak terdeteksi; gunakan tombol perubahan layar. Ringkasan selesai tidak diubah setelah tampilan berubah.

Posisi peserta berubah menghapus jarak, respons, latihan dan kesiapan. Kacamata/lensa kontak berubah menghapus respons, latihan dan kesiapan tetapi mempertahankan kalibrasi serta jarak; bila posisi juga berubah gunakan tombol posisi. Mengubah pilihan koreksi di Persiapan membuang respons dan latihan. Hapus sesi, ulangi simulasi atau perubahan mode membersihkan catatan sesi.

Data hanya dalam memori tab; refresh/tutup tab menghapus sesi. Tidak ada akun, unggahan jawaban, kamera, mikrofon atau analitik. File unduhan tetap berada di perangkat setelah sesi dihapus.

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

Baseline v0.11 commit `080ff72` lulus [CI run 43742924420](https://github.com/Kafkayara/MataCheck/actions/runs/43742924420): 350 assertion per viewport, lima viewport (1750 total), ditambah reload setelah sesi parsial. Ini bukan bukti pengujian browser v0.10.0.

Workflow menjalankan tes kode dan browser pada push main, pull request dan pemicu manual. CI belum menghalangi deployment Vercel secara otomatis. Kelulusan CI tidak membuktikan status deployment. Lihat [bukti pengujian](docs/verification.md).

## Kesesuaian PRD

Lihat [pemetaan FR-01 sampai FR-10](docs/prd-status.md) untuk status implementasi dan syarat yang belum terpenuhi. Catatan sesi kini memuat waktu mulai/akhir beserta zona waktu dan versi aplikasi. Waktu mengikuti jam perangkat dan tidak berubah ketika diunduh ulang. Menghapus atau memulai sesi baru membersihkan waktu sesi lama.

## Pekerjaan berikutnya

Kalibrasi dan jarak belum dipakai mengubah ukuran stimulus atau menghitung penglihatan. Metode, rentang ukuran, target/toleransi jarak, penilaian, populasi dan evaluasi perlu ditetapkan serta ditinjau sebelum mode pengukuran diaktifkan. Uji software tidak membuktikan akurasi klinis.

Lihat [protokol](docs/protocol-and-calibration.md), [arah produk](docs/product-direction.md), dan [panduan uji pengguna](docs/usability-check.md).
