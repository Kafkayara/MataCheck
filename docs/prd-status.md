# Pemetaan implementasi terhadap PRD MataCheck v0.1

Acuan utama: PRD.pdf v0.1, seluruh 6 halaman, dibaca ulang 18 November 2026. Status kode: v0.16.0 dengan perubahan lokal pemeriksaan awal. [Perbandingan lengkap](prd-comparison.md) memisahkan kebutuhan PRD, usulan teknis, dan keputusan prototipe. Status ini bukan persentase kesiapan klinis.

| ID | Status | Sudah ada | Masih diperlukan |
| --- | --- | --- | --- |
| FR-01 | Terimplementasi untuk prototipe | Penjelasan simulasi, perangkat, batas hasil, tanpa resep/diagnosis | Uji pemahaman pengguna dan peninjauan teks sebelum pengukuran |
| FR-02 | Sebagian | Pertanyaan usia dengan validasi format, retensi dan penghapusan; cabang keluhan/ketidakpastian menghentikan alur; persetujuan; catatan kacamata/lensa kontak sejak pemeriksaan awal | Usia masih opsional untuk demo dan tidak menentukan kelayakan; rentang usia, populasi dan daftar pengecualian perlu ditetapkan profesional |
| FR-03 | Sebagian | Penggaris dua pencocokan, verifikasi dua sumbu, batas gagal, invalidasi tampilan | Kalibrasi belum mengatur ukuran fisik simbol demo; uji perangkat fisik dan toleransi final |
| FR-04 | Sebagian | Catatan jarak aktual dengan meteran, konfirmasi posisi dan alat jawab | Target/toleransi protokol belum ditetapkan; jarak belum memengaruhi stimulus |
| FR-05 | Sebagian | Dua mata terpisah, SVG E, arah acak, latihan dan pasangan arah aktual/respons per percobaan | Tingkat ukuran, jumlah respons, adaptasi, aturan berhenti dan penilaian sesuai protokol |
| FR-06 | Sebagian | Gangguan tab/fokus, perubahan tampilan/posisi/koreksi, pengulangan, reset, perlindungan klik ganda dan tombol ditahan | Uji perangkat nyata dan ketidakpastian kondisi; browser tidak mendeteksi semua perubahan monitor/posisi |
| FR-07 | Sebagian | Empat bagian ringkasan dan alasan pengulangan persiapan; sesi parsial ditandai belum lengkap; tidak ada angka tebakan atau kesimpulan klinis | Hasil pengukuran dan tindak lanjut yang ditinjau; aturan kualitas final dan validasi metode |
| FR-08 | Ditunda, fitur tambahan | Jalur manual tersedia; kamera tidak diminta | Kamera pendamping, izin/penolakan, pengujian posisi dan penghentian stream belum diimplementasikan |
| FR-09 | Tambahan menurut PRD; terimplementasi untuk catatan simulasi | Unduh teks dan cetak/PDF berisi tanggal, kondisi, respons dan batasan; label parsial ikut diekspor | Dialog unduh/cetak nyata dan layout PDF masih perlu pemeriksaan manual; bukan hasil pengukuran tervalidasi |
| FR-10 | Ditunda sesuai PRD | Hapus data sesi dalam memori | Riwayat opsional setelah MVP; tidak ada penyimpanan persisten saat ini |

## Kriteria penerimaan MVP

- FR-04/06: interupsi tab/jendela saat editor jarak terbuka kini membatalkan ketiga konfirmasi. Angka yang diketik dipertahankan, tetapi simpan dan lanjut tetap memerlukan konfirmasi ulang. Catatan jarak yang sudah disimpan tidak dibatalkan oleh interupsi biasa. Ini kebijakan kesiapan prototipe, bukan verifikasi posisi otomatis.
- FR-03: pembacaan verifikasi penggaris kini menolak notasi eksponen/hex/biner/oktal dan teks bersatuan; hanya desimal biasa dengan koma/titik diterima. Perbaikan validasi format ini tidak mengubah toleransi rekayasa atau memenuhi kebutuhan ukuran fisik stimulus yang masih terbuka. CI baseline `25cc689` [lulus](https://github.com/Kafkayara/MataCheck/actions/runs/44261019560); perubahan format terbaru belum tercakup.
- FR-06: interupsi setelah latihan selesai kini menjelaskan alasan tombol lanjut terkunci dan mengarahkan fokus ke pengulangan latihan. [Evaluasi temuan OpenCode](opencode-review.md) memisahkan bug UX, keterbatasan alat dan sisa kebutuhan PRD. CI baseline `11ccd7e` lulus; skenario perubahan lokal masih menunggu CI.
- FR-09 kini mencatat pembacaan verifikasi penggaris dua sumbu sebagai detail kondisi sesi pada ringkasan dan ekspor. Ini penambahan rekayasa untuk keterlacakan kondisi; PRD tidak menentukan format atau toleransi angkanya. FR-03 tetap sebagian karena kalibrasi belum mengatur ukuran fisik simbol demo.
- FR-02 kini mengunci sesi setelah jawaban keluhan Ya/tidak yakin, membuang respons lama dan memerlukan sesi baru. Pertanyaan menyebut ketiga contoh pada PRD bagian 4. Penguncian sampai sesi baru adalah keputusan rekayasa; daftar pengecualian lengkap tetap memerlukan peninjauan profesional.
- Alur kedua mata, reset dan penguncian ringkasan parsial mempunyai tes kode serta skenario browser. Bukti tiap commit dicatat di [verification.md](verification.md).
- Penolakan izin kamera belum dapat diuji karena fitur kamera belum tersedia; jangan menandainya selesai hanya karena jalur manual berjalan.
- Invalidasi tampilan berjalan, tetapi kesesuaian milimeter memerlukan penggaris dan perangkat nyata.
- Ringkasan parsial tidak memberi kesimpulan. Seluruh keluaran tetap simulasi; nilai SPH/CYL/AXIS tidak dihitung.
- Kode tidak meminta kamera atau mengunggah respons. Fixture memantau API jaringan, media dan penyimpanan sebelum aplikasi berjalan; pemeriksa privasi v0.16 lulus pada commit `354499c`, bersama skenario ekspor lengkap/parsial dan reload. Lihat [bukti CI](verification.md#konfirmasi-ci-v0160-dan-ekspor--18-november-2026). Ini bukan bukti audit trafik produksi; pemeriksaan jaringan browser nyata tetap bagian penerimaan privasi.
- Protokol, teks hasil dan tindak lanjut belum memperoleh peninjauan profesional. MVP pengukuran belum dinyatakan siap.

## Urutan berikutnya

1. CI commit `94e1b6b` telah dikonfirmasi lulus melalui [run 44223022584](https://github.com/Kafkayara/MataCheck/actions/runs/44223022584). Bukti ini mencakup perubahan pemeriksaan awal sebelumnya, bukan penambahan lokal pembacaan penggaris. Jalankan CI untuk perubahan terbaru. Lanjutkan uji pengguna memakai [usability-check.md](usability-check.md), termasuk unduhan aktual, dialog cetak/PDF, keyboard fisik dan inspeksi jaringan/penyimpanan.
2. Uji ukuran fisik kalibrasi pada perangkat nyata dan catat galat dua sumbu.
3. Tetapkan parameter yang masih terbuka dalam [protocol-and-calibration.md](protocol-and-calibration.md), termasuk populasi, jarak, ukuran, aturan penilaian dan tindak lanjut, melalui peninjauan profesional.
4. Setelah profil ditetapkan, sambungkan kalibrasi/jarak ke renderer dan mesin trial, lalu evaluasi terhadap pembanding. Jangan mengubah tiga respons demo menjadi nilai ketajaman atau resep.

Tanggal laporan v0.12.0 berasal dari jam perangkat: waktu mulai dicatat ketika sesi baru dibuka, waktu akhir saat selesai atau dihentikan. Unduh ulang tidak memperbarui kedua waktu itu. Tidak ada klaim sinkronisasi waktu server.
