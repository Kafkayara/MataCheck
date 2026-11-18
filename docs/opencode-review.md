# Verifikasi laporan OpenCode — 18 November 2026

Baseline laporan dan HEAD lokal sama: `11ccd7e689ff5b5c73b2c2de51616b6aeeb3eaa6`. Working tree bersih sebelum pekerjaan ini. Pemeriksaan menggunakan kode aktual, bukan menerima label severity laporan sebagai bukti.

## Temuan dan klasifikasi

| Temuan laporan | Hasil pemeriksaan | Klasifikasi / tindakan |
| --- | --- | --- |
| `UnknownVizError` atau referensi elemen stale setelah navigasi | Error tersebut bukan error yang dibuat aplikasi. `render()` mengganti isi halaman; referensi DOM lama memang tidak menunjuk tombol baru. Handler aplikasi tidak menggunakan ID snapshot alat. | Keterbatasan alat/referensi usang; belum membuktikan bug navigasi pengguna. Tidak mengubah renderer hanya untuk mempertahankan snapshot lama. |
| Kanan pada latihan tidak membuka lanjut | Handler `data-practice="kanan"` mengatur `practiced=true` dan `#next.disabled=false`. Tes handler aktual membuktikannya. `data-answer` memang tidak dipakai pada halaman latihan, dan guard menolaknya di luar demo mata. | Klaim kegagalan klik normal tidak terkonfirmasi. Tidak menghapus guard input. |
| Latihan kembali terkunci | `interruptSession()` membatalkan latihan selesai setelah blur/visibilitychange. Sebelumnya, render menampilkan pesan latihan awal tanpa menyebut interupsi. | Celah UX terkonfirmasi melalui reproduksi klik Kanan lalu interupsi. Bisa menjelaskan gejala laporan, tetapi urutan event OpenCode tidak tersedia untuk memastikan penyebab sesi mereka. Diperbaiki dengan alasan yang bertahan sampai latihan diulang atau persiapan/sesi direset, serta pemulihan fokus. |
| Dialog cetak menunggu | `exportSummary('print')` memanggil `window.print()`; pemilihan tujuan/file dilakukan pengguna pada dialog browser. Penanganan selesai/error sudah tersedia. | Perilaku browser yang diharapkan, bukan bukti ekspor gagal. PDF tersimpan dan layout setiap halaman tetap BELUM DIUJI. |
| Snapshot kadang string, kadang objek nested | Bentuk snapshot berasal dari alat penguji, bukan kontrak data aplikasi MataCheck. | Keterbatasan alat; perlu penanganan format pada alat penguji, bukan aplikasi. |
| Model evaluator tidak membaca PDF | Laporan hanya memakai dokumen turunan. PRD asli sudah dibaca pada pengerjaan sebelumnya dan dibandingkan per bagian dalam `prd-comparison.md`. | Keterbatasan evaluator; kebutuhan tidak ditetapkan ulang dari laporan. |
| Kalibrasi fisik belum diuji | Kode memiliki dua pencocokan dan verifikasi dua sumbu; CI menguji simulasi input, bukan penggaris fisik. | Uji fisik BELUM DIUJI. FR-03 masih sebagian: kalibrasi belum mengatur ukuran fisik simbol. |
| Jarak belum diuji dengan meteran | Input dan tiga konfirmasi ada. Tidak ada target/toleransi protokol yang disetujui atau hubungan ke stimulus. | Uji fisik BELUM DIUJI; sisa FR-04 memerlukan protokol, bukan angka tebakan. |
| Pendamping belum diuji menyeluruh | Fixture baseline menyelesaikan kedua mode; log CI memuat hasil lulus. Hal itu tidak membuktikan sesi dengan dua orang nyata. | Cakupan otomatis tersedia; uji pengguna pendamping BELUM DIUJI. |
| Catatan parsial dan kesesuaian TXT belum diperiksa evaluator | Fixture membandingkan teks Blob dengan artikel lengkap/parsial, termasuk 6/4/0 respons. Dialog PDF tidak diperlukan untuk pemeriksaan TXT tersebut. | Bukan fitur hilang. File nyata di disk dan PDF tetap membutuhkan pemeriksaan terpisah, BELUM DIUJI. |
| Interupsi tab/jendela belum diuji formal evaluator | Fixture baseline memicu blur/visibilitychange, mengulang mata aktif, memeriksa hitungan dan retensi mata selesai. | Bukti otomatis tersedia; interaksi nyata alat penguji/perangkat belum dibuktikan. Perbaikan UX latihan ditambahkan pada pekerjaan ini. |
| Usia pemeriksaan awal | Kode menerima integer nonnegatif yang dapat direpresentasikan tepat, dengan pilihan kosong, ekspor dan reset. Usia tidak menentukan kelayakan klinis. | Sudah diimplementasikan untuk demo; kriteria usia profesional tetap belum ditetapkan. |
| Angka 496 assertion per viewport | [Log job 134561182669](https://github.com/Kafkayara/MataCheck/actions/runs/44232655254/job/134561182669) mengonfirmasi 496 pada lima viewport (2.480 total), privacy guards dan reload PASS untuk SHA baseline. | Klaim CI terkonfirmasi untuk baseline saja; bukan bukti klinis atau kelulusan perubahan lokal baru. Jumlah assertion bukan ukuran akurasi. |

## Perubahan kode dan bukti baru

FR-06: latihan yang selesai lalu terinterupsi kini menyimpan alasan penguncian. Pesan menyebut perpindahan halaman/jendela dan meminta latihan Kanan diulang. Saat fokus kembali, tombol Kanan menerima fokus. Jawaban latihan benar menghapus alasan dan membuka lanjut; jawaban salah tetap tidak membuka lanjut. Reset kondisi/persiapan/sesi membersihkan alasan lama. Aturan interupsi, respons demo, dan parameter pengukuran tidak berubah.

Tes regresi gagal sebelum perbaikan karena alasan interupsi tidak disimpan. Tes menggunakan handler klik aktual untuk membuktikan klik normal berhasil, blur membatalkan kesiapan, alasan tetap ada, fokus pulih, jawaban salah tidak lolos, dan pengulangan/reset membersihkan alasan. `npm test` lulus. Preview dibangun ulang; prepare dan pemeriksaan diff lulus. Percobaan browser lokal gagal sebelum laporan DOM dengan `Browser exit 2147483651; signal null`. Fixture baru perlu CI setelah pengguna push.

## Kebutuhan PRD yang tetap terbuka

FR-02 memerlukan populasi, batas usia dan kriteria pengecualian yang ditinjau. FR-03/04/05/07 memerlukan profil stimulus, ukuran, jarak, jumlah respons, aturan berhenti/penilaian, kualitas, teks hasil dan tindak lanjut yang disetujui. Nilai terstandar juga memerlukan validasi metode/kalibrasi. FR-08 kamera pendamping belum diimplementasikan; fungsi posisi perlu diuji dan izin/lifecycle/privasi memerlukan pengujian tersendiri. FR-10 memang setelah MVP. Tidak satu pun digantikan oleh klaim PASS software. Pekerjaan ini menyelesaikan masalah latihan yang dapat dibuktikan tanpa menunggu uji fisik.
