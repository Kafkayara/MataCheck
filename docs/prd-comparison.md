# Perbandingan PRD asli dan implementasi MataCheck

Ditinjau 18 November 2026. Sumber utama: `C:\Users\Kafka\Downloads\PRD.pdf`, judul “PRD – MataCheck”, versi 0.1 draf awal, enam halaman. Seluruh bagian 1–12 dibaca. Nomor halaman berikut mengacu pada PDF asli. Dokumen protokol/progres adalah keputusan implementasi atau usulan lanjutan, bukan pengganti PRD.

SHA-256 sumber: `0393f599cf3110d93541bdafebe4f2116a7f879c1299a49fa1481cac27166131`.

## Tujuan akhir dan tahap saat ini

PRD bagian 1–3 (hlm. 1–2) menargetkan skrining awal yang memandu tes per mata dan menjelaskan hasil serta tindak lanjut. Pengukuran refraksi dari rumah adalah visi jangka panjang dengan metode tervalidasi, mungkin alat tambahan atau tenaga profesional. Resep, diagnosis, SPH/CYL/AXIS dari foto, dan klaim mata sehat berada di luar MVP.

Kode saat ini berada pada tahap prototipe alur (bagian 12, hlm. 6): respons simulasi diberi label, bukan hasil ketajaman terstandar. Kalibrasi/jarak belum menentukan ukuran stimulus. Selesainya dua mata hanya berarti enam respons demo tercatat; itu bukan kelulusan syarat pengukuran. Proyek belum memenuhi MVP terbatas pada bagian 10 karena protokol/teks/tindak lanjut belum ditinjau, ukuran fisik belum tervalidasi, dan alur izin kamera belum ada.

## Pemetaan seluruh bagian

| Bagian PRD | Isi sumber | Kode/dokumentasi aktual dan perbedaannya |
| --- | --- | --- |
| 1–3, hlm. 1–2 | Skrining terstruktur, hasil kedua mata, pemahaman batasan; refraksi sebagai visi jangka panjang | `public/app.js` menyediakan simulasi kedua mata dan batas klaim. Tidak ada mesin pengukuran atau penilaian validitas klinis. Larangan resep bukan larangan selamanya terhadap riset refraksi yang memenuhi bukti. |
| 4, hlm. 2 | Dewasa adalah usulan; usia dan kriteria ditetapkan profesional sebelum peluncuran publik | Tidak ada pertanyaan usia atau rentang kelayakan usia. Cabang keluhan masih umum; bukan daftar pengecualian yang sudah ditinjau. |
| 5, hlm. 2–3 | Pemeriksaan awal menanyakan usia, keluhan, kacamata/lensa kontak; kamera dengan jalur manual | Sebelum perubahan ini, koreksi hanya ditanyakan di Persiapan. Kini tersedia sejak pemeriksaan awal dan dapat diperbarui di Persiapan. Usia dan pilihan kamera tetap belum ada. |
| 6, hlm. 3 | FR-01–07 wajib; FR-08/09 tambahan; FR-10 setelah MVP | Lihat tabel rincian di `prd-status.md`. FR-03 menuntut ukuran fisik simbol, bukan hanya garis kalibrasi. FR-04 memerlukan jarak sesuai protokol. FR-05 memerlukan aturan penilaian konsisten. Ketiganya masih sebagian. |
| 7, hlm. 3–4 | Empat bagian hasil, tidak ada tebakan saat data kurang; ketajaman standar menunggu validasi | Empat bagian tersedia. Catatan parsial menunjukkan respons yang ada tanpa kesimpulan; catatan ini tidak memenuhi pengertian hasil pengukuran FR-07. Teks tindak lanjut saat ini belum ditinjau profesional. |
| 8, hlm. 4 | Usulan pemrosesan kamera lokal, tanpa unggah/simpan foto-video, izin saat dipakai, stream berhenti, tanpa analitik hasil | Tidak ada kamera sama sekali. Guard privasi memeriksa API tertentu pada fixture; bukan bukti kamera lokal sudah bekerja, izin ditolak sudah ditangani, atau audit jaringan produksi. |
| 9, hlm. 4–5 | Next.js/TypeScript dan Vercel adalah rancangan teknis awal; state browser, tanpa DB wajib | Implementasi menggunakan HTML/CSS/JavaScript, state tab, dan konfigurasi Vercel. Perbedaan stack adalah penyimpangan dari usulan, bukan pelanggaran kebutuhan fungsional wajib atau alasan migrasi otomatis. |
| 10, hlm. 5 | Alur dua mata, penolakan kamera, invalidasi tampilan, tanpa kesimpulan parsial, tanpa dioptri, audit jaringan, hapus data, review profesional | Sebagian terbukti otomatis; penolakan kamera belum berlaku karena fitur belum ada. Uji fisik, audit produksi, dan review profesional belum selesai. Kelulusan CI bukan penerimaan MVP lengkap. |
| 11, hlm. 5–6 | Metrik penyelesaian, tahap ditinggalkan, kondisi sesi, pemahaman, repeatability dan pembanding; target setelah uji awal | Panduan observasi manual ada; belum ada data peserta, agregasi metrik atau studi pembanding. Penghitung interupsi bukan persentase kualitas atau akurasi. Jangan menambahkan analitik jawaban untuk mengisi metrik. |
| 12, hlm. 6 | Perancangan profesional, prototipe, MVP terbatas, validasi, lalu riset refraksi | Pekerjaan alur tidak menutup ketergantungan perancangan profesional. Tidak ada dasar merilis angka dioptri. |

## Keputusan prototipe yang bukan persyaratan PRD

- PRD secara eksplisit belum menetapkan jenis simbol, jarak, jumlah soal, aturan berhenti, atau ambang hasil (bagian 6). SVG tumbling E 5×5, 120 CSS px dan tiga respons per mata adalah pilihan demo.
- Penggaris sebagai benda acuan, dua pencocokan 100 mm, verifikasi 50 mm dua sumbu, 2%, 49–51 mm, dan tiga kegagalan adalah pilihan rekayasa dalam dokumen protokol/kode. PRD tidak memberikan angka tersebut.
- Jarak kandidat 2.000 mm dalam dokumen protokol bukan target PRD dan tidak boleh menjadi default klinis. Catatan jarak aktual dalam demo belum memenuhi FR-04 secara penuh.
- Mode pendamping, enam langkah UI, jeda klik 300 ms, pengulangan mata aktif setelah interupsi dan reset kedua mata setelah perubahan kondisi adalah kebijakan implementasi; PRD meminta deteksi/pengulangan tanpa merinci semuanya.
- Kalibrasi, jarak dan catatan koreksi yang opsional adalah batas demo. PRD tidak menyatakan bahwa prasyarat pengukuran boleh dilewati pada produk akhir.
- Format TXT serta dialog cetak/PDF adalah pilihan implementasi FR-09. PRD meminta isi ringkasan, bukan format tersebut secara khusus.
- Penundaan kamera sesuai prioritas “Tambahan” FR-08, tetapi PRD bagian 10 tetap menyebut penolakan izin kamera. Ketegangan cakupan ini harus diselesaikan sebelum menyatakan kriteria MVP terpenuhi; jalur manual saja bukan bukti lulus penolakan izin.

## Perubahan yang dapat dilakukan sekarang

Subkebutuhan bagian 5: pertanyaan kacamata/lensa kontak pada pemeriksaan awal. Kontrol yang sudah ada kini ditampilkan pada pemeriksaan awal sebelum persetujuan, dan tetap tersedia di Persiapan untuk perubahan kondisi. Pilihan pertama mode mempertahankan catatan pemeriksaan awal; mengganti mode yang sudah dipilih tetap membersihkan kondisi/respons sesuai kebijakan reset prototipe. Hapus atau mulai sesi baru tetap menghapus catatan.

Perubahan memakai kategori yang sudah ada, tanpa ukuran resep, ambang usia, skor, diagnosis, kamera atau penyimpanan baru. Pilihan tetap opsional untuk demo, bukan penetapan protokol kelayakan. Guard keluhan/persetujuan tetap berlaku. FR-02 tetap sebagian karena pertanyaan usia dan kriteria profesional belum tersedia. Tes state ditambah; fixture browser menguji keberadaan/urutan kontrol, retensi mode pertama dan kembali dari Persiapan. Status eksekusinya dicatat di `verification.md`.
