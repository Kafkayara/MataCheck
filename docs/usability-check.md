# Uji penggunaan MataCheck v0.6

Gunakan preview lokal atau npm start; untuk versi online gunakan https://matacheck.vercel.app dan catat commit deployment yang diuji. Jangan menganggap versi lokal dan online selalu sama.

## Pemeriksaan sebelum push

1. Jalankan npm test dan npm run test:browser:prepare.
2. Buka tests/artifacts/browser-test.html di Chrome/Edge. Pastikan lima laporan PASS, bukan RUNNING atau FAIL.
3. Buka MataCheck-Preview.html. Coba seluruh alur dengan keyboard Tab, Shift+Tab, Enter dan Space. Fokus harus terlihat dan urutannya masuk akal.
4. Periksa ilustrasi, teks, dan tombol pada lebar 1366, 768, 375 dan 320 piksel. Pastikan tidak terpotong atau bergeser horizontal.
5. Refresh saat sudah memasukkan respons; sesi harus kembali kosong di beranda.
6. Coba jeda, lanjutkan, ulangi sesi, dan hapus sesi. Latihan wajib diulang setelah reset.

## Uji dengan 3-5 pasangan

Satu orang sebagai peserta, satu sebagai pendamping. Jelaskan hanya bahwa mereka diminta mencoba simulasi; biarkan instruksi website membantu mereka. Jangan memakai hasilnya untuk menilai penglihatan.

Amati secara manual:
- Apakah pembagian peran dipahami?
- Apakah arti arah kaki E dipahami setelah latihan?
- Apakah mata yang ditutup sesuai instruksi?
- Apakah mereka menemukan jeda dan tahu cara melanjutkan?
- Apakah mereka memahami ringkasan sebagai catatan jawaban, bukan hasil pemeriksaan?

Catat tahap yang membingungkan, ucapan peserta, serta bantuan yang terpaksa diberikan. Jangan mengumpulkan nama atau data kesehatan. Prioritaskan perbaikan jika beberapa pasangan mengalami kebingungan yang sama.

## Mode sendiri

Coba tanpa pendamping. Pastikan panah kanan menyelesaikan latihan, menahan tombol tidak mencatat beberapa respons, N mencatat Tidak terlihat, dan P menjeda/melanjutkan. Saat jeda, tombol arah/N tidak boleh menambah respons. Pergantian mata tetap memerlukan konfirmasi layar. Ulangi dengan mode pendamping; shortcut huruf/panah tidak boleh memasukkan jawaban. Kembali ke persiapan dan ganti mode: konfirmasi kesiapan dan latihan harus dilakukan ulang.

## Sesi pengguna tanpa panduan

Mulai dengan 3–5 orang mencoba mode sendiri; lakukan beberapa sesi tambahan dengan pendamping. Katakan: "Coba simulasi ini sampai selesai menggunakan instruksi di layar." Jangan memberi tutorial terlebih dahulu. Jika peserta meminta bantuan, catat tahap dan bantuan yang diberikan.

Setelah selesai tanyakan: "Menurutmu ringkasan ini menunjukkan apa?", "Bagian mana yang membingungkan?", dan "Bagaimana kamu tahu mata mana yang perlu ditutup?" Catat ucapan aktual, bukan kesimpulan yang diasumsikan pengamat. Ini uji kemudahan penggunaan, bukan pengujian kemampuan penglihatan.

| ID anonim | Tanggal/commit/URL | Mode/perangkat/viewport | Tahap dan tindakan | Yang terjadi | Bantuan diberikan | Pemahaman ringkasan | Prioritas |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P01 | | | | | | | |

Jangan mencatat nama atau data kesehatan. Kelompokkan temuan menjadi bug yang dapat direproduksi, kebingungan penggunaan, dan dugaan yang perlu diuji. Prioritaskan alur yang terhenti, salah mata, dan salah memahami hasil. Setelah perbaikan, ulangi skenario yang bermasalah.
