# Pemetaan implementasi terhadap PRD MataCheck v0.1

Acuan: PRD yang diberikan pengguna, bagian 6, 7, 8 dan 10. Status kode: v0.13.0. Status ini memisahkan prototipe yang berfungsi dari persyaratan pengukuran yang belum terpenuhi; bukan persentase kesiapan klinis.

| ID | Status | Sudah ada | Masih diperlukan |
| --- | --- | --- | --- |
| FR-01 | Terimplementasi untuk prototipe | Penjelasan simulasi, perangkat, batas hasil, tanpa resep/diagnosis | Uji pemahaman pengguna dan peninjauan teks sebelum pengukuran |
| FR-02 | Sebagian | Cabang keluhan/ketidakpastian menghentikan alur; persetujuan; catatan kacamata/lensa kontak | Usia, populasi dan daftar pengecualian yang ditetapkan profesional; pilihan koreksi saat ini di Persiapan |
| FR-03 | Sebagian | Penggaris dua pencocokan, verifikasi dua sumbu, batas gagal, invalidasi tampilan | Kalibrasi belum mengatur ukuran fisik simbol demo; uji perangkat fisik dan toleransi final |
| FR-04 | Sebagian | Catatan jarak aktual dengan meteran, konfirmasi posisi dan alat jawab | Target/toleransi protokol belum ditetapkan; jarak belum memengaruhi stimulus |
| FR-05 | Sebagian | Dua mata terpisah, SVG E, arah acak, latihan dan pencatatan respons | Tingkat ukuran, jumlah respons, adaptasi, aturan berhenti dan penilaian sesuai protokol |
| FR-06 | Sebagian | Gangguan tab/fokus, perubahan tampilan/posisi/koreksi, pengulangan, reset, perlindungan klik ganda dan tombol ditahan | Uji perangkat nyata dan ketidakpastian kondisi; browser tidak mendeteksi semua perubahan monitor/posisi |
| FR-07 | Sebagian | Empat bagian ringkasan; sesi parsial ditandai belum lengkap; tidak ada angka tebakan atau kesimpulan klinis | Hasil pengukuran dan tindak lanjut yang ditinjau; aturan kualitas final dan validasi metode |
| FR-08 | Ditunda, fitur tambahan | Jalur manual tersedia; kamera tidak diminta | Kamera pendamping, izin/penolakan, pengujian posisi dan penghentian stream belum diimplementasikan |
| FR-09 | Terimplementasi untuk catatan simulasi | Unduh teks dan cetak/PDF berisi tanggal, kondisi, respons dan batasan; label parsial ikut diekspor | Dialog unduh/cetak nyata dan layout PDF masih perlu pemeriksaan manual; bukan hasil pengukuran tervalidasi |
| FR-10 | Ditunda sesuai PRD | Hapus data sesi dalam memori | Riwayat opsional setelah MVP; tidak ada penyimpanan persisten saat ini |

## Kriteria penerimaan MVP

- Alur kedua mata, reset dan penguncian ringkasan parsial mempunyai tes kode serta skenario browser. Bukti tiap commit dicatat di [verification.md](verification.md).
- Penolakan izin kamera belum dapat diuji karena fitur kamera belum tersedia; jangan menandainya selesai hanya karena jalur manual berjalan.
- Invalidasi tampilan berjalan, tetapi kesesuaian milimeter memerlukan penggaris dan perangkat nyata.
- Ringkasan parsial tidak memberi kesimpulan. Seluruh keluaran tetap simulasi; nilai SPH/CYL/AXIS tidak dihitung.
- Kode tidak meminta kamera atau mengunggah respons; pemeriksaan jaringan browser nyata tetap bagian penerimaan privasi.
- Protokol, teks hasil dan tindak lanjut belum memperoleh peninjauan profesional. MVP pengukuran belum dinyatakan siap.

## Urutan berikutnya

1. Selesaikan pengujian browser versi terbaru dan uji pengguna memakai [usability-check.md](usability-check.md).
2. Uji ukuran fisik kalibrasi pada perangkat nyata dan catat galat dua sumbu.
3. Tetapkan parameter yang masih terbuka dalam [protocol-and-calibration.md](protocol-and-calibration.md), termasuk populasi, jarak, ukuran, aturan penilaian dan tindak lanjut, melalui peninjauan profesional.
4. Setelah profil ditetapkan, sambungkan kalibrasi/jarak ke renderer dan mesin trial, lalu evaluasi terhadap pembanding. Jangan mengubah tiga respons demo menjadi nilai ketajaman atau resep.

Tanggal laporan v0.12.0 berasal dari jam perangkat: waktu mulai dicatat ketika sesi baru dibuka, waktu akhir saat selesai atau dihentikan. Unduh ulang tidak memperbarui kedua waktu itu. Tidak ada klaim sinkronisasi waktu server.
