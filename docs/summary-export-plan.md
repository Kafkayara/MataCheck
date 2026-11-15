# Ringkasan portabel dan pemulihan kesiapan

Lingkup v0.8: implementasi FR-09 sebagai unduh teks UTF-8 dan cetak melalui dialog browser (termasuk simpan PDF bila tersedia). Gunakan isi ringkasan yang sama dengan layar; tidak menambah backend, identitas, skor, atau diagnosis. Ekspor hanya di ringkasan lengkap. File menyertakan batasan simulasi dan tidak ikut terhapus ketika sesi dihapus.

Perbaikan interupsi: pencocokan kalibrasi yang belum selesai harus diulang dari awal tanpa menaikkan hitungan gagal; latihan dan konfirmasi pergantian mata harus dikonfirmasi lagi setelah gangguan. Kalibrasi yang sudah selesai dan jawaban mata yang sudah selesai tetap dipertahankan. Saat kembali ke trial terputus, fokus ke tombol ulang tanpa otomatis melanjutkan.

Validasi: tes handler ekspor dengan Blob dan URL tiruan (isi, guard, cleanup, kegagalan), tes state interupsi, skenario DOM untuk kedua mode dan lima viewport. Layout cetak/PDF dan unduhan nyata perlu browser/manual; jangan menyatakan terverifikasi berdasarkan mock.

Tambahan demo: SVG E 5x5 pada ukuran tetap 120 CSS px, orientasi acak independen per trial. Jeda manual mempertahankan urutan; ulang setelah interupsi menghasilkan urutan baru (bisa kebetulan sama). Tidak ada penilaian benar/salah, perubahan ukuran adaptif atau klaim ketajaman.
