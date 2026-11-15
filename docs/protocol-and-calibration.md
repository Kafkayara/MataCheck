# MataCheck — Spesifikasi protokol dan kalibrasi manual

Versi rancangan 0.1 • 15 November 2026

Status: usulan desain untuk implementasi rekayasa dan peninjauan profesional. Bukan protokol klinis tervalidasi. Tidak mengubah aplikasi produksi. Sumber kebutuhan: PRD.pdf v0.1, bagian 4–10. Keputusan di bawah merupakan usulan penyusun, bukan persetujuan klinis pengguna.

## 1. Tujuan dan batas rilis

Menyediakan jalur tanpa kamera yang dapat mengatur ukuran fisik simbol, memandu pengukuran jarak, merekam respons tiap mata, serta menghentikan sesi ketika kondisi tidak terpenuhi. Pertahankan HTML/CSS/JavaScript, Vercel, data dalam memori, tanpa akun dan analitik.

Pisahkan dua profil:

- **Prototipe rekayasa:** kalibrasi fisik dan transisi dapat diuji, keluaran tetap catatan respons. Tidak menampilkan ketajaman terstandar, kategori normal/abnormal, atau rekomendasi berbasis skor.
- **Evaluasi terbatas:** hanya diaktifkan setelah protokol lengkap, populasi, aturan penilaian, teks hasil dan rencana evaluasi ditinjau tenaga profesional. Tinjauan bukan bukti akurasi; validasi tetap pekerjaan berikutnya.

FR-08 kamera ditunda. Jalur manual tidak meminta izin kamera, sehingga penolakan kamera tidak berlaku untuk rilis ini; revisi cakupan tersebut harus dicatat pada PRD. Unduh ringkasan dan riwayat tetap pekerjaan terpisah.

## 2. Alternatif yang dipertimbangkan

| Pilihan | Keuntungan | Kekurangan / keputusan |
| --- | --- | --- |
| Penggaris fisik dengan garis layar yang disesuaikan | Ukuran acuan bisa diperiksa, tanpa data sensitif | Dipilih sebagai usulan awal; pengguna harus memiliki penggaris |
| Benda pribadi yang panjangnya diukur pengguna | Fleksibel | Menambah satu sumber kesalahan; ditunda |
| Ukuran monitor, CSS cm, atau asumsi DPI | Mudah | Tidak cukup untuk menetapkan ukuran fisik; tidak dipakai sebagai kalibrasi |

Ukuran CSS memiliki hubungan internal tetap, tetapi tidak menjamin kesesuaian dengan ukuran fisik layar [S1]. Penggaris menghubungkan ukuran yang dirender dengan ukuran nyata. Jangan meminta foto kartu identitas, kartu bank, atau unggahan gambar.

## 3. Profil protokol yang perlu diputuskan

Kandidat optotipe adalah tumbling E geometris empat arah. Penelitian Peek memakai E grid 5×5, crowding dan aturan adaptif tertentu [S2]; memakai bentuk E saja tidak berarti MataCheck menerapkan atau mewarisi validasi Peek.

| Parameter | Usulan / status | Syarat sebelum evaluasi terbatas |
| --- | --- | --- |
| Konstruk | Kemampuan mengenali orientasi simbol per mata dalam kondisi tertentu | Reviewer menetapkan tujuan pengukuran dan interpretasinya |
| Populasi | Dewasa sebagai kandidat; belum ada batas usia disetujui | Batas usia dan pengecualian tertulis |
| Koreksi optik | Catat tanpa koreksi / kacamata / lensa kontak | Tetapkan presenting atau uncorrected acuity; jangan campur hasil keduanya |
| Simbol | SVG E grid 5×5, empat orientasi, hitam pada bidang putih | Putuskan stimulus tunggal/crowded, geometri dan jarak crowding |
| Jarak kandidat | 2.000 mm untuk studi kelayakan ruang dan input | Reviewer menyetujui jarak dan toleransi; bukan default klinis aktif |
| Tingkat ukuran | Belum ditetapkan | Rentang, urutan dan langkah ukuran beserta alasan |
| Jumlah respons | Belum ditetapkan; tiga respons lama hanya demo | Jumlah per tingkat, pengulangan dan batas durasi |
| Aturan adaptif/berhenti | Belum ditetapkan | Algoritme lengkap, penanganan batas atas/bawah dan Tidak terlihat |
| Penilaian | Belum ditetapkan | Rumus, ambang, peluang menebak empat arah, dan ketidakpastian |
| Pencahayaan/layar | Tidak ada pantulan mengganggu; kondisi dicatat | Kebutuhan luminans, kontras dan pengukuran/penilaian kelayakan perangkat |
| Keluaran dan tindak lanjut | Empat bagian hasil sesuai PRD | Bahasa dan aturan ditinjau; nilai terstandar menunggu validasi metode/kalibrasi |

Jarak 2 m muncul pada studi Peek [S2], tetapi bukan pembuktian bahwa seluruh laptop, populasi dan skenario mandiri MataCheck cocok pada jarak tersebut. Profil evaluasi wajib gagal diaktifkan bila salah satu parameter wajib masih kosong. Jangan mengisi parameter kosong dengan tebakan saat runtime.

## 4. Alur pengguna yang diusulkan

Beranda → pemeriksaan awal → persiapan (mode, kalibrasi, jarak) → latihan → mata kanan → pergantian dan mata kiri → ringkasan.

Pertahankan enam langkah besar yang sudah disederhanakan. Kalibrasi dan jarak menjadi sublangkah Persiapan, bukan dua halaman konfirmasi mata kiri baru.

1. **Pemeriksaan awal:** persetujuan, usia yang diperlukan protokol, keluhan/ketidakpastian, kondisi koreksi optik. Daftar pengecualian belum boleh dianggap lengkap sebelum peninjauan. Cabang keluhan menggunakan arahan berhenti sesuai PRD, bukan diagnosis.
2. **Persiapan:** laptop stabil, penggaris dan meteran tersedia, pilih mode, lakukan kalibrasi, ukur jarak dan uji alat jawab.
3. **Latihan:** contoh mudah dengan feedback; tidak ikut hasil. Pastikan pemahaman arah, Tidak terlihat, dan jeda.
4. **Mata kanan:** konfirmasi mata kiri tertutup tanpa tekanan. Mulai hanya jika prasyarat valid.
5. **Mata kiri:** jeda dan satu konfirmasi pergantian. Setelah tombol mulai, langsung tampilkan stimulus; tidak mengulang konfirmasi kedua.
6. **Ringkasan:** status tiap mata dan kualitas sesi selalu jelas. Sesi tidak lengkap tidak menghasilkan kesimpulan.

## 5. Rancangan kalibrasi manual

### Perlengkapan dan tampilan

Penggaris fisik dengan skala milimeter, diletakkan sejajar dan dekat layar tanpa menekan panel. Tidak memakai penggaris digital di layar yang sama. Kalibrasi dalam posisi dekat layar; pengguna baru berpindah ke jarak tes setelah selesai.

Tampilkan dua tanda ujung vertikal dengan garis mendatar. Panjang yang dimaksud adalah **jarak antara pusat kedua tanda ujung**, bukan batas luar border. Gunakan SVG dengan endpoint jelas, tanpa transform skala pada ancestor. Panjang referensi usulan 100 mm. Bila tidak muat, hentikan jalur pengukuran pada perangkat tersebut; jangan menyusutkan stimulus diam-diam.

Kontrol: slider, tombol Lebih pendek / Lebih panjang dengan perubahan 1 CSS px, tombol penyesuaian 0,1 CSS px opsional melalui keyboard, serta Reset. Label ukuran target tetap terlihat. Jangan menjadikan tombol +/- sebagai tombol zoom halaman.

### Urutan operasional

1. Pilih zoom browser yang nyaman **sebelum** kalibrasi dan gunakan monitor yang sama. Zoom 100% bukan bukti ukuran benar.
2. Teks: “Samakan jarak antara kedua tanda dengan 10 cm pada penggaris. Ukur dari angka 0, bukan tepi penggaris.”
3. Pengguna mengatur panjang garis, lalu memilih “Sesuai penggaris”. Simpan panjang aktual yang dirender dalam CSS px, bukan sekadar nilai slider.
4. Ulangi pencocokan 100 mm dari panjang awal berbeda untuk menguji keterulangan, tanpa menampilkan hasil penyesuaian pertama.
5. Hitung selisih relatif dua faktor skala. Usulan batas rekayasa awal: **maksimal 2%**. Bila lebih, minta pengulangan; setelah tiga kegagalan tawarkan berhenti atau kembali ke demo, bukan melonggarkan batas.
6. Gunakan rata-rata faktor skala dua pencocokan. Tampilkan garis verifikasi **50 mm horizontal dan vertikal**, satu per satu. Pengguna memasukkan panjang yang terbaca di penggaris. Usulan batas rekayasa: masing-masing 49–51 mm.
7. Bila salah satu verifikasi gagal, kembali ke kalibrasi. Jangan menghitung skala X/Y terpisah untuk memaksa lulus.
8. Setelah lulus, tampilkan “Ukuran layar sudah dicocokkan dengan penggaris” dan lanjut ke jarak.

**Angka 100/50 mm, 2%, 49–51 mm, dan tiga percobaan merupakan usulan QA rekayasa, bukan toleransi klinis yang sudah terbukti.** Dua pencocokan dapat sama-sama salah secara sistematis; verifikasi penggaris tidak mengukur luminans, kontras, atau akurasi klinis. Toleransi akhir harus disepakati dan diuji pada perangkat fisik.

Satu percobaan kalibrasi mencakup dua pencocokan dan kedua verifikasi. Kegagalan konsistensi atau salah satu verifikasi menaikkan penghitung kegagalan yang sama satu kali, lalu mengulang seluruh percobaan. Tombol Reset hanya mengatur kembali garis, tidak menghapus penghitung. Setelah tiga kegagalan dalam sesi, blokir kalibrasi sesi itu dan tawarkan demo/berhenti; penghitung baru dimulai setelah sesi dihapus dan persiapan dimulai ulang. Jangan menyimpan faktor dari percobaan yang gagal.

### Perhitungan dan contoh

Untuk panjang acuan L dalam mm dan panjang terukur P dalam CSS px:

```
pxPerMm = P / L
relativeDifference = abs(scale1 - scale2) / ((scale1 + scale2) / 2)
scale = (scale1 + scale2) / 2
renderedCssPx = requestedPhysicalMm * scale
```

Contoh aritmetika saja: 100 mm cocok pada 380 CSS px dan 384 CSS px. Faktor 3,80 dan 3,84 px/mm; selisih relatif 1,047%; faktor gabungan 3,82 px/mm. Garis verifikasi 50 mm dirender 191 CSS px. Nilai ini bukan asumsi untuk semua layar.

Simpan ukuran desimal. Jangan membulatkan semua simbol ke bilangan CSS px bulat. Jangan memakai devicePixelRatio sebagai pengganti pxPerMm: DPR menghubungkan piksel CSS dan piksel perangkat, bukan milimeter [S3].

### Kapan kalibrasi dianggap berubah

Saat selesai kalibrasi, rekam snapshot DPR, viewport, visualViewport.scale, ukuran layar yang tersedia, orientasi, serta versi renderer. Dengarkan resize, perubahan resolusi melalui matchMedia, visualViewport.resize, fullscreenchange dan orientationchange. Bandingkan snapshot lagi sebelum stimulus dan saat kembali dari jeda.

- Perubahan yang terdeteksi: sembunyikan stimulus, hentikan input, tandai kalibrasi kedaluwarsa dan minta ulang. Usulan awal konservatif: resize viewport apa pun mengharuskan ulang, walau mungkin tidak mengubah skala fisik.
- Page zoom dan pinch zoom tidak identik; pantau DPR dan VisualViewport [S3, S4].
- Jangan menjanjikan semua pergantian monitor terdeteksi. Monitor berbeda dengan DPR/resolusi sama dapat lolos. Beri tombol “Saya memindahkan layar/mengubah tampilan” dan konfirmasi monitor yang sama saat melanjutkan.
- Tampilan membesar karena aksesibilitas tetap didukung sebelum kalibrasi; perubahan selama tes memerlukan kalibrasi ulang, bukan larangan aksesibilitas.

## 6. Rancangan jarak dan mode sendiri

Ukur menggunakan meteran dari **bidang layar pada posisi simbol ke posisi mata**, bukan ke tepi meja, keyboard, atau kursi. Layar dan posisi mata diatur agar pandangan mendekati tegak lurus pada pusat stimulus. Tandai posisi duduk; jarak aktual dimasukkan dalam cm dan dikonversi ke mm. Reject nilai kosong, nol, negatif, tidak finite atau di luar batas profil yang disetujui. Jangan menyesuaikan jarak ke target secara tersembunyi.

Tampilkan tiga konfirmasi: jarak diukur fisik; layar stabil; alat jawab dapat digunakan tanpa maju. Label kualitas harus “jarak dikonfirmasi pengguna”, bukan “jarak terverifikasi otomatis”. Browser tanpa sensor tidak mengukur posisi kepala.

| Mode | Cara menjawab dari jarak tes | Perilaku ketika tidak tersedia |
| --- | --- | --- |
| Sendiri | Keyboard nirkabel/alat input yang sudah diuji, berada di posisi duduk | Tawarkan pendamping atau demo; jangan meminta pengguna maju ke laptop setiap jawaban |
| Pendamping | Pendamping mengoperasikan laptop, peserta tetap di posisi ukur | Instruksi tidak memberi petunjuk jawaban; bias karena pendamping dapat melihat simbol dicatat sebagai keterbatasan |

Remote ponsel memerlukan pemasangan antardevice dan evaluasi privasi; bukan bagian implementasi awal. Tombol layar tetap tersedia untuk pendamping, tetapi bukan solusi mode sendiri pada jarak jauh. Latihan harus dilakukan dengan alat jawab yang sama di posisi tes.

Jika pengguna bergerak mendekati layar, mengubah koreksi optik, atau tidak yakin posisi tetap: jeda dan ukur/konfirmasi ulang. Perubahan jarak atau koreksi membatalkan kedua hasil mata untuk percobaan baru agar kondisi tidak tercampur.

Untuk renderer, distanceMm adalah **jarak aktual yang dimasukkan pengguna**, diterima hanya jika berada dalam toleransi target yang disetujui pada profil. Nilai ini dibekukan untuk kedua mata. Jangan memakai target menggantikan nilai aktual atau otomatis mengubah skala stimulus selama trial. Setiap koreksi nilai jarak memulai percobaan kedua mata dari awal.

## 7. Stimulus dan pencatatan respons

Ganti karakter font E dengan SVG geometri eksplisit bila mengembangkan mesin pengukuran. Kandidat grid E 5×5 memiliki tiga batang horizontal dan satu vertikal dengan ketebalan satu unit. Semua orientasi memakai pusat rotasi dan bounding box sama. Kondisi crowding belum diputuskan; jangan menyebut stimulus setara ETDRS sebelum protokol lengkap.

Setiap trial menyimpan eye, trialId, ukuran fisik, ukuran CSS yang diminta/dirender, orientasi, respons, waktu relatif, versi kalibrasi dan status valid. Respons: atas, kanan, bawah, kiri, atau tidak terlihat. Orientasi dipilih acak independen dari empat arah; simpan urutan aktual agar sesi dapat dianalisis. Jangan mengulang urutan tiga arah yang mudah dihafalkan. Jangan menampilkan jawaban benar atau skor saat sesi utama.

Lepaskan tombol sebelum jawaban berikutnya; event repeat ditolak. Jawaban saat paused, invalid, atau di luar trial diabaikan. Setiap trial hanya menerima satu respons. Tidak terlihat bukan data hilang; cara menghitungnya mengikuti profil penilaian. Trial yang terinterupsi tidak boleh dihitung salah atau benar secara otomatis.

Untuk perhitungan sudut geometris kandidat:

```
heightMm = 2 * distanceMm * tan(angleRadians / 2)
heightCssPx = heightMm * pxPerMm
```

Sudut dan levelnya harus berasal dari protokol, bukan ditetapkan oleh UI. Formula ini hanya geometri; tidak otomatis menghasilkan ketajaman, logMAR atau resep.

Periksa kecukupan viewport untuk seluruh stimulus dan crowding pada setiap level. Jangan memakai max-width atau fit-to-container yang mengubah ukuran. Batas resolusi garis minimum, efek antialias dan rounding perlu diuji; jika profil perangkat/ukuran belum lolos QA, jangan memaksakan level tersebut. Catat “batas tampilan perangkat”, bukan “batas kemampuan mata”.

## 8. State dan penanganan gangguan

State konseptual: INTRO, SCREENING, CALIBRATION, DISTANCE, PRACTICE, RIGHT_READY, RIGHT_TEST, SWITCH_LEFT, LEFT_TEST, SUMMARY; PAUSED dan INVALID menjadi status sesi. Banyak state internal dapat berbagi satu langkah visual.

Syarat masuk trial: pemeriksaan awal diterima AND profil lengkap/diizinkan untuk jenis sesi AND kalibrasi masih berlaku AND jarak dikonfirmasi AND alat jawab siap AND latihan selesai AND konfirmasi mata benar.

| Peristiwa | Tindakan segera | Cara melanjutkan |
| --- | --- | --- |
| Jeda, tab tersembunyi, kehilangan fokus window | Sembunyikan simbol, tutup input, tandai trial aktif dibatalkan | Konfirmasi jarak/posisi sama; ulangi mata aktif dari awal dengan urutan baru |
| Zoom/resize/orientasi/fullscreen/sinyal monitor berubah | Kalibrasi kedaluwarsa, kedua mata invalid | Kalibrasi dan jarak ulang; mulai kanan dari awal |
| Pengguna melaporkan pindah posisi/koreksi berubah | Kedua mata invalid | Persiapan ulang dan sesi baru |
| Pergantian mata normal | Simbol disembunyikan, respons kanan tetap | Satu konfirmasi, langsung tes kiri |
| Keluhan atau ingin berhenti | Sesi dihentikan | Tidak ada kesimpulan; arahan yang disetujui |
| Refresh, kembali melalui bfcache, hapus sesi | Bersihkan sesi | Mulai beranda; pageshow.persisted perlu ditangani agar state lama tidak pulih |

Kebijakan mengulang mata aktif setelah jeda adalah usulan konservatif untuk mencegah pemakaian ulang stimulus yang telah terlihat; perlu review dampak beban pengguna. Jika mata kanan sudah selesai, hasil kanannya hanya boleh dipertahankan setelah jeda biasa dengan kalibrasi, jarak dan koreksi tetap sama. Perubahan kalibrasi/jarak/koreksi selalu mengulang kedua mata.

Aturan mengulang mata aktif hanya berlaku ketika RIGHT_TEST atau LEFT_TEST sedang berjalan. Gangguan pada kalibrasi mempertahankan kontrol tetapi mengharuskan pengguna memulai ulang percobaan kalibrasi yang belum selesai; gangguan pada jarak/latihan meminta pemeriksaan kesiapan lagi. Gangguan pada RIGHT_READY atau SWITCH_LEFT mempertahankan respons yang sudah selesai jika skala/jarak/koreksi tidak berubah, tetapi mengosongkan konfirmasi kesiapan mata. Gangguan pada ringkasan tidak mengubah catatan yang telah selesai. Perubahan kondisi terukur tetap mengikuti aturan invalidasi yang lebih ketat pada tabel.

Visibility API mendukung deteksi dokumen tersembunyi [S5], tetapi tidak mendeteksi semua gangguan peserta. Checkbox bukan bukti objektif kondisi lingkungan.

## 9. Data sesi dan aturan hasil

Dalam memori saja:

| Bagian | Data minimal |
| --- | --- |
| Identitas sesi | protocolVersion, appVersion, sessionMode, timestamp; tanpa identitas orang |
| Screening | keputusan eligibility, consent, kategori usia yang dibutuhkan, correctionMode |
| Kalibrasi | dua panjang CSS, acuan mm, faktor, pengukuran verifikasi, status, snapshot tampilan, versi |
| Jarak | target dan aktual mm, cara ukur, waktu konfirmasi, status deklarasi pengguna |
| Trial | parameter stimulus, respons, mata, status, alasan batal |
| Sesi | completeRight/Left, invalidReasons, interruptionCount, review/validation status profil |

Hapus sesi membersihkan seluruh data di atas, timer, input yang tertahan, dan referensi callback sesi lama. Tidak memakai localStorage, cookie hasil, telemetry jawaban, atau log konsol berisi kondisi kesehatan.

Ringkasan empat bagian:

1. **Pengamatan:** respons yang dicatat per mata, status selesai/tidak selesai. Pada prototipe rekayasa tetap tanpa nilai ketajaman terstandar.
2. **Kualitas:** kalibrasi dicocokkan manual; jarak dikonfirmasi pengguna; ada/tidaknya interupsi dan kondisi invalid. Hindari label “valid secara klinis”.
3. **Makna:** catatan mengenali simbol dalam kondisi sesi, bukan ukuran kacamata atau diagnosis.
4. **Tindak lanjut:** teks profesional yang sudah disetujui. Tidak ada keputusan berdasarkan skor sebelum aturan ditetapkan.

Jika gagal: “Sesi belum memenuhi persyaratan: [alasan konkret]. Ulangi [tahap]. Catatan ini belum dapat disimpulkan sebagai hasil pengukuran.” Jangan menyembunyikan kegagalan satu mata dengan menggabungkan skor kedua mata. Keluaran terstandar membutuhkan profil lengkap, review, validasi metode dan kalibrasi, kelengkapan kedua mata serta kondisi sesi yang memenuhi aturan.

## 10. Kriteria penerimaan untuk implementer

| ID | Pengujian | Hasil yang diwajibkan |
| --- | --- | --- |
| C01 | 380 dan 384 CSS px untuk 100 mm | Faktor gabungan 3,82; verifikasi 50 mm = 191 CSS px |
| C02 | Dua skala berbeda lebih dari 2%, atau verifikasi di luar 49–51 mm | Tidak boleh melanjutkan profil pengukuran |
| C03 | Horizontal benar tetapi vertikal salah | Kalibrasi ditolak, tidak diregangkan per sumbu |
| C04 | Zoom, pinch zoom, resize, fullscreen, rotasi, pindah monitor | Deteksi yang didukung memblokir trial; blind spot didokumentasikan dan diuji manual |
| D01 | Jarak kosong/nol/negatif/tidak finite/di luar profil | Ditolak dengan alasan dan satuan jelas |
| D02 | Solo tanpa alat jawab dari posisi ukur | Pengukuran diblokir; demo/pendamping tersedia |
| T01 | Menahan tombol, event ganda, input saat jeda | Tidak menambah respons/trial |
| T02 | Kanan selesai lalu ganti mata | Hanya satu konfirmasi; respons kanan tetap |
| V01 | Tab disembunyikan lalu kembali | Tidak menerima jawaban; mata aktif diulang setelah konfirmasi |
| V02 | Kalibrasi/jarak/koreksi berubah setelah kanan selesai | Kanan dan kiri harus diulang |
| R01 | Salah satu mata tidak lengkap atau kondisi invalid | Tidak ada kesimpulan pengukuran |
| R02 | Profil klinis belum lengkap atau belum divalidasi | Keluaran rekayasa saja; tidak ada angka standar atau resep |
| P01 | Refresh, bfcache, hapus sesi | Sesi lama tidak pulih |
| P02 | Inspeksi Network dan storage pada browser nyata | Tidak ada unggah kamera/hasil atau penyimpanan sesi persisten |

Uji fisik: sekurangnya beberapa laptop/monitor dengan skala OS dan zoom berbeda, pengukuran dua sumbu oleh orang kedua, ulang kalibrasi, serta uji ukuran stimulus pada batas rentang. Catat perangkat, browser, skala, panjang diminta, panjang terukur dan galat. Screenshot/CI tidak dapat membuktikan ukuran milimeter atau luminans layar. Jangan menyebut kalibrasi tervalidasi hanya karena formula/unit test lulus.

## 11. Peninjauan profesional dan evaluasi

Paket review harus memuat parameter pada bagian 3, stimulus contoh, alur solo/pendamping, kebijakan interupsi, aturan hasil, dan batas perangkat. Reviewer mencatat nama/peran, tanggal, versi protokol, keputusan, dan perubahan yang diminta. Tidak ada tanda persetujuan yang diisi otomatis.

Sebelum studi, sepakati metode pembanding, ukuran sampel berdasarkan tujuan, rentang kemampuan peserta, kondisi koreksi, pengacakan urutan tes, pembutaan pemeriksa bila mungkin, prosedur pengulangan, dan analisis. Evaluasi kesalahan ukuran fisik, repeatability, bias dan limits of agreement; korelasi saja tidak membuktikan kesesuaian. Ambang penerimaan harus ditetapkan sebelum melihat hasil. Evaluasi terpisah untuk mode sendiri dan pendamping; hasil penelitian alat lain tidak boleh dipindahkan ke MataCheck.

## 12. Urutan pengerjaan dan dependensi

1. Bangun kalibrasi penggaris sebagai fitur prototipe rekayasa, termasuk verifikasi dan invalidasi tampilan. Ini pekerjaan berikutnya yang paling konkret (FR-03 dan sebagian FR-06).
2. Uji akurasi ukuran fisik pada perangkat nyata; perbaiki toleransi berdasarkan bukti dan review.
3. Selesaikan profil protokol serta rancangan input jarak jauh. Jalur jarak pengukuran tidak aktif bila profil belum ditinjau (FR-02/04).
4. Implementasikan renderer dan mesin trial sesuai profil, tanpa mengganti validasi dengan disclaimer (FR-05).
5. Implementasikan kualitas sesi, hasil empat bagian, dan pengujian penerimaan (FR-06/07).
6. Evaluasi terbatas sesuai persetujuan dan rancangan penelitian; keluaran standar tetap menunggu validasi. Kamera, unduhan dan riwayat di luar paket ini.

## Referensi dan batas penggunaan sumber

Diakses 15 November 2026. Sumber mendukung dasar desain; toleransi dan pilihan implementasi MataCheck di atas adalah usulan, bukan hasil penelitian sumber tersebut.

- **[S1] W3C, CSS Values and Units Level 3, absolute lengths:** https://www.w3.org/TR/css-values-3/#absolute-lengths — alasan tidak mengandalkan CSS cm sebagai ukuran fisik layar.
- **[S2] Bastawrous et al., Development and Validation of a Smartphone-Based Visual Acuity Test (Peek Acuity), JAMA Ophthalmology (2015):** https://jamanetwork.com/journals/jamaophthalmology/fullarticle/2296911 — contoh penelitian primer dengan optotipe geometris, jarak, perangkat dan protokol tertentu. Tidak mengesahkan MataCheck atau penggunaan mandiri.
- **[S3] MDN, Window.devicePixelRatio:** https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio — rasio CSS/perangkat dan perilaku zoom.
- **[S4] MDN, VisualViewport:** https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport — sinyal visual viewport untuk perubahan tampilan.
- **[S5] MDN, Page Visibility API:** https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API — deteksi dokumen tersembunyi.

PRD acuan: PRD.pdf v0.1 yang diberikan pengguna. Tidak ada protokol klinis lengkap, validasi fisik atau persetujuan profesional yang telah selesai dalam penyusunan dokumen ini.
