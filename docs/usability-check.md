# Uji penggunaan MataCheck v0.6.2

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
