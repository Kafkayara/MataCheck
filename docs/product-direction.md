# Arah MataCheck setelah v0.6.2

Tanggal: 15 November 2026. Dokumen keputusan produk dan rencana riset, bukan metode pemeriksaan atau bukti validasi klinis.

Rancangan lanjutan berdasarkan PRD lengkap: [spesifikasi protokol dan kalibrasi manual](protocol-and-calibration.md). Dokumen tersebut menetapkan alur rekayasa dan mencatat parameter yang masih memerlukan peninjauan profesional; belum merupakan implementasi atau validasi.

## Sasaran terdekat: prototipe yang bisa dipakai tanpa dibimbing

Pengguna dapat memilih mode sendiri atau pendamping, menyelesaikan latihan, mengikuti panduan mata, menjeda sesi, dan memahami ringkasan sebagai catatan respons. Pertahankan desain krem/hijau, delapan tahap, serta data dalam memori. Belum perlu akun, database, kamera, atau AI diagnosis.

Kriteria rilis stabil:
- Pemeriksaan kode dan browser untuk kedua mode lulus pada lima viewport. Simpan commit dan laporan CI yang diuji.
- Periksa visual serta navigasi Tab/Shift+Tab/Enter/Space secara manual pada laptop dan layar sempit; fixture tidak menggantikan inspeksi visual.
- Refresh di tengah sesi kembali ke keadaan awal tanpa respons lama.
- Uji eksploratif dengan 3–5 orang pada mode sendiri dan beberapa percobaan dengan pendamping. Target internal: seluruh peserta menyelesaikan alur tanpa bantuan dan menjelaskan bahwa ringkasan bukan diagnosis. Sampel kecil ini hanya mencari masalah penggunaan.
- Tidak ada masalah yang menghalangi alur atau membuat peserta salah memahami hasil. Perbaiki temuan lalu uji ulang bagian terkait.

## Pelaksanaan berikutnya

1. Push perubahan runner dan workflow, lalu baca artefak browser-evidence dari GitHub Actions. Status gagal atau laporan tidak lengkap berarti belum lolos.
2. Cocokkan commit deployment dengan commit yang diperiksa. Tes fixture memakai preview lokal; lakukan juga pengecekan manual pada URL produksi.
3. Jalankan panduan docs/usability-check.md dan catat temuan tanpa identitas peserta.
4. Perbaiki hanya masalah yang terbukti, kemudian tetapkan versi prototipe stabil.

Workflow pengujian belum menjadi penghalang deployment otomatis Vercel. Jangan menganggap CI gagal otomatis menghentikan publikasi. Pengaturan proteksi branch/deployment merupakan pekerjaan terpisah.

## Riset manfaat hasil: keputusan sebelum implementasi

Pertanyaan awal yang diusulkan: apakah ada metode penilaian ketajaman penglihatan jarak jauh yang sesuai untuk perangkat dan pengguna sasaran? Ini kandidat riset yang perlu ditinjau tenaga profesional, bukan kemampuan MataCheck saat ini. Jangan mengubah enam respons demo menjadi angka minus, plus, silinder, atau skor penglihatan.

| Keputusan | Bukti yang perlu disiapkan | Keluaran |
| --- | --- | --- |
| Apa yang ingin diukur? | Kebutuhan pengguna dan tinjauan tenaga profesional tentang konstruk yang tepat | Satu tujuan ukur dengan batas penggunaan |
| Metode apa yang digunakan? | Publikasi primer, protokol lengkap, batas penerapan, izin penggunaan stimulus bila relevan | Spesifikasi stimulus, urutan, aturan berhenti dan penilaian |
| Perangkat apa yang didukung? | Evaluasi ukuran fisik layar, zoom, resolusi, jarak, pencahayaan, serta kemampuan input mandiri | Daftar kondisi didukung dan cara mendeteksi kondisi tidak layak |
| Bagaimana kalibrasi dilakukan? | Prosedur yang dapat diuji, sumber kesalahan, toleransi yang disepakati reviewer | Protokol kalibrasi dan pemeriksaan keberhasilan |
| Bagaimana hasil dievaluasi? | Rancangan pembandingan dengan pemeriksaan acuan yang dipilih profesional; pengulangan dan analisis kesalahan | Protokol evaluasi dan kriteria penerimaan sebelum pengambilan data |
| Apa yang ditampilkan saat hasil tidak andal? | Review bahasa hasil, kondisi gagal, dan tindakan berikutnya | Spesifikasi keluaran termasuk hasil tidak dapat ditentukan |

Lanjut ke prototipe pengukuran hanya setelah metode, perangkat, prosedur, dan rancangan evaluasi ditinjau bersama tenaga profesional. Pengumpulan data peserta memerlukan rancangan persetujuan, privasi dan peninjauan yang sesuai. Bila bukti belum cukup, pertahankan MataCheck sebagai simulasi edukasi dengan catatan sesi.

## Di luar cakupan saat ini

Tidak menetapkan jarak ukur, ukuran optotipe, ambang kelulusan klinis, atau rumus resep dalam dokumen ini. Tidak ada riset klinis baru atau validasi metode yang telah dilakukan. Penelusuran literatur dan peninjauan profesional adalah tahap berikutnya yang terpisah dari pengujian perangkat lunak.
