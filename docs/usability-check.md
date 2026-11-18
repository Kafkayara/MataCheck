# Uji penerimaan dan penggunaan MataCheck v0.16.0

Panduan ini mengikuti [status PRD](prd-status.md), terutama FR-03 sampai FR-07 dan FR-09/10. Semua hasil adalah penerimaan prototipe, bukan pengukuran ketajaman, diagnosis, resep, atau validasi klinis. Angka kalibrasi di bawah sudah ada pada aplikasi dan hanya merupakan toleransi rekayasa.

## Persiapan dan aturan pencatatan

Untuk menguji sumber lokal, jalankan `npm start` dari folder proyek, lalu buka http://127.0.0.1:4173 sendiri. Alternatif: gunakan https://matacheck.vercel.app, tetapi catat commit deployment sebagai “tidak diketahui” bila belum diverifikasi; jangan menyamakan versi produksi dengan HEAD lokal. Gunakan satu target yang sama untuk satu putaran pengujian.

Siapkan keyboard, penggaris fisik berskala mm, meteran, dan pendamping untuk A1b. Pilih zoom yang nyaman sebelum kalibrasi. Jangan memakai penggaris digital di layar. Ikuti pemeriksaan awal secara jujur; bila alur menghentikan sesi karena keluhan/ketidakpastian, jangan memaksakan lanjut untuk memperoleh hasil tes.

Salin tabel hasil untuk setiap putaran. Status yang boleh dipakai: **BELUM DIUJI**, **LULUS**, **GAGAL**, atau **TERHALANG** beserta alasannya. LULUS hanya jika semua hasil yang diharapkan pada baris itu benar-benar diperiksa. Bukti otomatis tidak boleh mengubah status manual. Bila gagal, catat langkah terakhir, hasil aktual, dan cara mengulang; jangan menebak penyebab.

- ID putaran anonim / tanggal / penguji:
- Target URL / versi / commit (atau tidak diketahui):
- OS / browser dan versi / perangkat serta monitor:
- Resolusi / skala OS / zoom browser / ukuran jendela:
- ID sesi sumber untuk TXT/PDF (misalnya S01, tanpa identitas pribadi):
- Folder bukti lokal (jangan otomatis memasukkan TXT/PDF atau foto peserta ke Git):

Jangan mencatat nama atau data kesehatan. Gunakan screenshot aplikasi tanpa identitas pribadi; foto penggaris cukup memperlihatkan garis dan skala. File TXT/PDF tetap tersimpan setelah sesi dihapus.

## Skenario penerimaan manual

Semua baris berikut berstatus **BELUM DIUJI** sampai pemilik proyek memberikan hasil. Baca hasil yang diharapkan sebelum mencoba. Jangan pindah tab saat demo aktif untuk mencatat: perpindahan fokus dapat mengulang mata aktif. Catat di kertas atau minta pengamat; ambil screenshot ringkasan setelah sesi berakhir.

### A1 — Sesi lengkap sendiri dan pendamping

Jalankan dua sesi terpisah: **A1a sendiri** dan **A1b pendamping** (FR-05/06/07).

1. Mulai sesi baru, baca batas simulasi, isi pemeriksaan awal dan persetujuan sesuai keadaan.
2. Pilih mode yang diuji dan centang persiapan. Untuk putaran pertama, biarkan kalibrasi/jarak tidak dicatat; bila sudah membuka editor, selesaikan atau pilih opsi lewati. Kalibrasi fisik diuji terpisah di A5.
3. Selesaikan latihan sesuai petunjuk. Mode sendiri menggunakan keyboard; mode pendamping menggunakan tombol layar dan memasukkan respons peserta tanpa memberi petunjuk arah.
4. Ikuti petunjuk penutupan mata tanpa tekanan, mulai kanan, dan berikan tiga respons. Konfirmasi pergantian satu kali, lalu berikan tiga respons kiri. Panah untuk arah dan N untuk Tidak terlihat pada mode sendiri; lepaskan tombol antarjawaban. Jangan mengarang respons demi memperoleh “hasil baik”.
5. Baca ringkasan. Simpan screenshot seluruh artikel, termasuk bagian bawah, dan biarkan ringkasan terbuka untuk A3/A4.

**Diharapkan:** kanan dan kiri masing-masing 3 dari 3 respons, enam pasangan simbol/respons, mode sesuai pilihan, latihan tidak masuk catatan. Empat bagian Pengamatan, Kualitas sesi, Makna catatan, dan Tindak lanjut tersedia; waktu mulai/akhir, zona waktu dan versi terlihat. Tidak ada label belum lengkap, tombol berhenti lebih awal, skor ketajaman, diagnosis atau resep. Pergantian kiri tidak meminta konfirmasi kedua. Tanpa kalibrasi/jarak, catatan menyatakan kondisi tersebut belum digunakan/dicatat, bukan terverifikasi.

**Catat:** A1a/A1b pada tabel hasil; ID sesi, jumlah respons tiap mata, bantuan yang diperlukan, screenshot ringkasan, serta kesulitan memakai alat jawab.

### A2 — Berhenti lebih awal

Gunakan sesi baru untuk setiap varian (FR-06/07).

1. **A2a:** selesaikan kanan (3 respons), jawab kiri sekali, lalu pilih **Berhenti & lihat catatan**. Simpan ringkasan sebagai sumber ekspor parsial A3/A4.
2. **A2b:** pada sesi baru lainnya, berhenti dari latihan sebelum masuk demo mata.
3. Pada masing-masing ringkasan, periksa label status dan coba tombol panah/N. Pastikan jumlah respons tetap. Untuk melanjutkan mencoba, gunakan sesi baru; jangan menganggap sesi dihentikan dapat dilanjutkan.

**Diharapkan:** A2a memuat kanan 3, kiri 1, total empat pasangan; A2b memuat nol respons kedua mata. Ada label Sesi dihentikan / Belum lengkap, waktu Dihentikan, dan peringatan parsial. Jawaban yang belum diberikan tidak diisi otomatis sebagai Tidak terlihat. Tidak ada klaim kedua mata selesai atau kesimpulan kondisi mata. Tombol/input jawaban tidak melanjutkan sesi.

**Catat:** A2a/A2b, jumlah respons, teks peringatan, screenshot dan ID sesi. Lakukan A3/A4 sebelum meninggalkan masing-masing ringkasan.

### A3 — Unduhan TXT nyata

Ulangi pada ringkasan A1a, A1b, A2a, dan A2b (FR-09).

1. Klik **Unduh catatan (.txt)**. Temukan file yang benar-benar tersimpan melalui daftar unduhan/folder perangkat, lalu buka dengan editor teks. Jangan menilai sukses hanya dari pesan aplikasi.
2. Cocokkan file dengan screenshot/ringkasan sesi sumber: mode, jumlah dan urutan pasangan simbol/respons, waktu mulai/akhir dan zona waktu, versi, kalibrasi, jarak, kacamata/lensa kontak, interupsi dan alasan pengulangan, serta keempat bagian ringkasan.
3. Periksa awalan “MataCheck - Catatan simulasi” dan “Bukan pemeriksaan mata atau resep.” Pastikan teks Indonesia terbaca tanpa karakter rusak. Perbedaan pembungkusan baris tidak dianggap perbedaan isi.
4. Unduh ulang ringkasan yang sama. Waktu sesi dan isi catatan harus tetap; nama dapat mendapat akhiran otomatis browser untuk duplikat.

**Diharapkan:** file pertama bernama `MataCheck-catatan-simulasi.txt` kecuali browser/pengguna mengubah nama. Semua isi artikel ikut, tanpa tombol/navigasi. Catatan lengkap berisi enam respons; parsial berisi empat atau nol sesuai sumber dan mempertahankan peringatan belum lengkap. Tidak muncul jawaban dari sesi lain. Unduhan ulang tidak mengubah waktu akhir.

**Catat:** satu baris A3 per sesi sumber, nama/path lokal kedua file, editor yang dipakai, hasil perbandingan, serta screenshot bagian yang berbeda jika gagal. Simpan bukti lokal tanpa mengunggah data peserta.

### A4 — Simpan PDF nyata

Ulangi pada ringkasan A1a, A1b, A2a, dan A2b (FR-09).

1. Klik **Cetak / simpan PDF**, lalu batalkan sekali. Periksa ringkasan tetap sama, termasuk respons dan waktu.
2. Buka lagi, pilih tujuan **Simpan sebagai PDF** jika tersedia. Catat ukuran kertas, orientasi, skala, margin, serta pengaturan header/footer. Simpan file, lalu buka PDF yang tersimpan, bukan hanya pratinjau cetak. Jika tujuan PDF tidak tersedia, tandai TERHALANG.
3. Periksa setiap halaman pada tampilan 100%: teks terbaca, tidak bertumpuk, tidak terpotong di tepi atau batas halaman, judul tetap dapat dikaitkan dengan isinya, dan tidak ada bagian hilang. Catat nomor halaman bermasalah.
4. Cocokkan isi dengan sumber seperti A3: kedua mata dan pasangan respons, mode, tanggal/zona waktu/versi, kondisi, pengulangan/interupsi, empat bagian dan batas simulasi. Periksa peringatan parsial pada A2a/A2b.

**Diharapkan:** PDF dapat dibuka, seluruh artikel terbaca dan lengkap, tombol serta navigasi aplikasi tidak tercetak. Header/footer bawaan browser dicatat terpisah, bukan dianggap tombol aplikasi. Pembatalan/pencetakan tidak mengubah catatan sesi. PDF parsial tetap parsial; tidak ada skor atau resep.

**Catat:** satu baris A4 per sesi sumber, path PDF, aplikasi pembaca, jumlah halaman, pengaturan cetak, screenshot tiap halaman atau bagian terpotong, dan hasil pembatalan.

### A5 — Penggaris, meteran, dan perubahan layar

Ini pengujian fisik oleh pengguna (FR-03/04/06); screenshot atau CI tidak membuktikan milimeter sebenarnya.

1. Mulai sesi baru. Pilih mode, buka kalibrasi, dan cocokkan jarak pusat kedua tanda dengan **100 mm (10 cm)** penggaris. Ukur dari angka 0, jangan menekan panel. Pilih **Sesuai penggaris**, lalu lakukan pencocokan kedua secara independen.
2. Ukur garis verifikasi horizontal dan vertikal. Masukkan angka yang benar-benar terbaca dalam mm, lalu **Periksa ukuran**. Catat kedua pembacaan dan galat masing-masing terhadap 50 mm, termasuk jika ditolak. Jangan memasukkan 50 hanya agar lulus.
3. Setelah berhasil, kembali ke Persiapan. Pilih **Tambahkan catatan jarak**. Ukur dari bidang layar pada posisi simbol ke posisi mata memakai meteran. Masukkan hasil aktual dalam cm, tanpa target jarak klinis. Centang ketiga konfirmasi hanya jika benar, lalu simpan. Bila alat jawab tidak dapat digunakan tanpa maju, gunakan pendamping atau tandai TERHALANG.
4. Selesaikan latihan dan kanan (3 respons), tetapi jangan selesaikan kiri. Ubah zoom browser atau ukuran jendela satu kali. Catat jenis perubahan dan nilai sebelum/sesudah; tunggu perubahan terdeteksi.
5. Periksa kalibrasi perlu diulang, jarak dikosongkan, respons kedua mata dibuang, dan kesiapan/latihan perlu diulang. Cocokkan ulang pada tampilan baru, ukur/simpan jarak lagi, ulangi latihan dan kedua mata. Periksa ringkasan hanya memuat respons baru serta alasan pengulangan tampilan/kalibrasi.
6. Ulangi sesi terpisah untuk tombol **Saya memindahkan layar / mengubah tampilan** setelah kanan selesai. Tombol harus membatalkan kondisi/respons lama juga. Pindah monitor dengan karakteristik sama mungkin tidak terdeteksi otomatis; laporkan menggunakan tombol tersebut dan catat keterbatasannya.

**Diharapkan:** aplikasi mengikuti aturan rekayasa yang sudah ada: dua pencocokan berbeda maksimal 2%, verifikasi kedua sumbu 49–51 mm, dan setelah tiga kegagalan kalibrasi diblokir untuk sesi tersebut. Penolakan pembacaan di luar batas adalah perilaku yang benar, bukan alasan mengubah angka. Jangan menandai keberhasilan kalibrasi fisik bila belum memperoleh hasil nyata; catat penolakan dan hambatannya. Garis/tanda harus muat sebelum konfirmasi. Jarak ditandai dikonfirmasi pengguna, bukan diukur browser. Sesudah perubahan layar, data lama tidak boleh masuk ringkasan akhir. Simbol demo tetap 120 CSS px dan tidak menjadi ukuran ketajaman setelah kalibrasi.

**Catat:** A5a untuk perubahan otomatis dan A5b untuk tombol manual; foto garis/penggaris bila memungkinkan, pembacaan horizontal/vertikal sebelum dan sesudah, galat terhadap 50 mm, jarak aktual, alat ukur, tampilan sebelum/sesudah, status invalidasi dan screenshot ringkasan baru. Catat pengulangan yang gagal juga.

### A6 — Hapus sesi dan refresh

Jalankan dua varian dengan sesi baru masing-masing (FR-06/10).

1. **A6a:** masukkan satu respons kanan, lalu pilih **Hapus sesi**. Periksa beranda; buka sesi baru dan pastikan persetujuan/kondisi kosong serta Lanjut terkunci. Isi persiapan kembali dan hentikan saat latihan untuk memeriksa kedua mata nol respons.
2. **A6b:** mulai sesi lain, masukkan satu respons kanan, lalu tekan refresh browser. Ulangi pemeriksaan beranda, pemeriksaan awal kosong, Lanjut terkunci, dan ringkasan nol respons setelah berhenti di latihan.
3. Pada kedua varian, pastikan mode, jarak, koreksi, kalibrasi, kesiapan, latihan, penghitung interupsi/pengulangan dan waktu sesi lama tidak terbawa. Waktu baru muncul untuk sesi baru; tidak harus berbeda bila tindakan dilakukan pada detik yang sama.

**Diharapkan:** respons lama tidak pulih. File TXT/PDF yang sudah disimpan tetap ada di perangkat; Hapus sesi tidak menghapus file tersebut. Refresh nyata diperiksa terpisah dari reload iframe pada fixture otomatis.

**Catat:** A6a/A6b, keadaan sebelum reset, screenshot pemeriksaan awal dan ringkasan baru, serta data lama apa pun yang masih terlihat.

## Lembar hasil manual

Isi status dan bukti untuk setiap baris, bukan satu PASS untuk seluruh panduan. Gandakan tabel bila target/perangkat berubah.

| ID | Sumber/varian | Status | Hasil aktual / alasan gagal atau terhalang | Bukti lokal / halaman PDF |
| --- | --- | --- | --- | --- |
| A1a | Lengkap sendiri | BELUM DIUJI | — | — |
| A1b | Lengkap pendamping | BELUM DIUJI | — | — |
| A2a | Berhenti: kanan 3, kiri 1 | BELUM DIUJI | — | — |
| A2b | Berhenti saat latihan: 0 respons | BELUM DIUJI | — | — |
| A3 | TXT A1a | BELUM DIUJI | — | — |
| A3 | TXT A1b | BELUM DIUJI | — | — |
| A3 | TXT A2a | BELUM DIUJI | — | — |
| A3 | TXT A2b | BELUM DIUJI | — | — |
| A4 | PDF A1a | BELUM DIUJI | — | — |
| A4 | PDF A1b | BELUM DIUJI | — | — |
| A4 | PDF A2a | BELUM DIUJI | — | — |
| A4 | PDF A2b | BELUM DIUJI | — | — |
| A5a | Penggaris/meteran; zoom atau resize | BELUM DIUJI | — | — |
| A5b | Penggaris/meteran; tombol perubahan layar | BELUM DIUJI | — | — |
| A6a | Hapus sesi | BELUM DIUJI | — | — |
| A6b | Refresh nyata | BELUM DIUJI | — | — |

## Batas bukti otomatis dan manual

| Pemeriksaan | Yang dapat dibuktikan otomatis | Yang harus dilakukan pengguna |
| --- | --- | --- |
| Alur sesi dan parsial | State, guard input, jumlah respons dan label pada fixture | Keyboard/tombol fisik, pemahaman instruksi, mode pendamping |
| TXT | Isi Blob cocok dengan artikel pada skenario | File benar-benar tersimpan, dibuka dan terbaca |
| PDF | Wiring pemanggilan cetak dan aturan sumber | Dialog nyata, pembatalan, penyimpanan, semua halaman PDF |
| Kalibrasi/jarak | Formula, validasi input dan invalidasi kondisi | Penggaris, meteran, panjang dua sumbu, posisi dan perangkat nyata |
| Reset/privasi | Reset state, dokumen fixture baru, API terpantau | Refresh URL nyata, inspeksi Network/storage pada target produksi |

Perintah tanpa mengambil alih mouse/keyboard: `npm test`, `npm run test:browser:prepare`, dan `git diff --check`. `npm run test:browser` menggunakan Chrome headless bila tersedia; hasil CI yang SHA-nya cocok dapat dipakai sebagai bukti eksekusi fixture. Prepare **tidak menjalankan browser**. Catat hasil otomatis tersendiri di [verification.md](verification.md); jangan menyalinnya sebagai status LULUS tabel manual.

Bagian berikut mempertahankan sesi observasi pengguna dan pemeriksaan tambahan. Untuk peserta baru, lakukan observasi tanpa pengarahan sebelum daftar penerimaan terstruktur agar petunjuk tes tidak memengaruhi penilaian kemudahan penggunaan.

## Sesi pertama: 10 menit, satu teman

Buka https://matacheck.vercel.app di laptop. Catat tanggal, browser, dan commit produksi jika diketahui; tulis tidak diketahui jika belum diperiksa. Pengamat mencatat, peserta mengoperasikan sendiri. Jangan menjelaskan letak tombol terlebih dahulu.

Bacakan hanya: "Coba simulasi ini sampai selesai menggunakan petunjuk di layar. Ceritakan apa yang sedang kamu pikirkan. Kita menguji kemudahan websitenya, bukan penglihatanmu. Kamu boleh berhenti kapan saja."

| Waktu perkiraan | Tugas peserta | Yang diamati |
| --- | --- | --- |
| 0–2 menit | Baca beranda dan mulai | Apakah tujuan simulasi dipahami? |
| 2–4 menit | Pilih Coba sendiri, siapkan tempat, selesaikan latihan | Apakah arah E dan cara menjawab jelas? |
| 4–7 menit | Ikuti kedua mata sampai ringkasan | Mata yang ditutup, kebutuhan melihat keyboard, jeda, pergantian mata |
| 7–10 menit | Jelaskan ringkasan dan pengalaman | Apa arti hasil menurut peserta? Bagian mana yang membingungkan? |

Jika peserta meminta bantuan, catat pertanyaan dan bantuan yang diberikan. Jangan menyimpulkan kesalahan penglihatan dari jawaban. Setelah sesi pertama, ulangi dengan 2–4 orang lain. Coba mode pendamping pada sesi terpisah; catat bila peserta sudah mengenal alurnya.

## Catatan yang bisa langsung diisi

- ID anonim: P01
- Tanggal / URL / versi atau commit:
- Browser / perangkat / ukuran layar:
- Mode: sendiri / pendamping
- Sudah pernah mencoba: ya / tidak
- Selesai tanpa bantuan: ya / tidak / berhenti
- Tahap yang membingungkan:
- Tindakan dan kejadian aktual:
- Bantuan pengamat:
- Jawaban peserta untuk "Menurutmu ringkasan ini menunjukkan apa?":
- Jawaban peserta untuk "Bagaimana kamu tahu mata mana yang ditutup?":
- Saran peserta:

Jangan catat nama atau data kesehatan. Catat ucapan sebenarnya, bukan testimoni buatan. Pisahkan bug yang bisa diulang, penilaian subjektif, dan dugaan. Masalah yang menghalangi alur, salah mata, atau salah memahami ringkasan diprioritaskan untuk diperbaiki.

## Pemeriksaan manual oleh pemilik proyek

Lakukan setelah sesi pengguna agar tidak memengaruhi percobaan pertama.

1. Navigasi dengan Tab, Shift+Tab, Enter, dan Space. Fokus terlihat dan tidak terjebak.
2. Mode sendiri: latihan panah kanan; pada demo gunakan panah, N, P. Menahan tombol tidak mengisi beberapa jawaban; saat jeda tidak ada jawaban tercatat.
3. Mode pendamping: tombol layar bekerja, panah/N/P tidak memasukkan jawaban.
4. Setelah satu jawaban, refresh. Harus kembali ke beranda; pemeriksaan awal kosong dan Lanjut terkunci.
5. Ulangi sesi dan Hapus sesi mengosongkan jawaban, pilihan mode, kesiapan, serta latihan.
6. Periksa beranda, persiapan, latihan, kedua panduan mata, demo, jeda, dan ringkasan pada 1366×768, 375×812, serta 320×568. Teks/tombol terbaca dan tidak terpotong. Simulasi viewport bukan bukti perangkat fisik.
7. Aktifkan pengurangan animasi pada perangkat jika tersedia; catat apa yang benar-benar diperiksa. Jangan memberi PASS jika belum dicoba.

## Pengujian otomatis

Jalankan npm test dan npm run test:browser. Alternatif jika Chrome otomatis gagal diluncurkan: npm run test:browser:prepare, lalu buka tests/artifacts/browser-test.html di browser. Tunggu lima laporan selesai. Versi fixture terbaru juga harus menampilkan "reload after partial session PASS" pada setiap viewport.

Fixture memuat ulang dokumen iframe setelah satu respons; ini menguji inisialisasi aplikasi baru. Pengujian tombol refresh pada URL produksi tetap pemeriksaan manual terpisah. Hasil DOM otomatis tidak menggantikan inspeksi screenshot, keyboard fisik, atau pendapat peserta.
