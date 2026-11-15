# Implementasi kalibrasi penggaris

Tujuan: implementasi bagian 5 spesifikasi protocol-and-calibration.md sebagai uji rekayasa opsional dalam Persiapan. Alur demo tetap tersedia tanpa penggaris dan tidak menjadi tes pengukuran. Tidak mengaktifkan jarak atau hasil klinis.

Arsitektur: fungsi kalibrasi murni dan UI pada public/app.js, tanpa dependensi baru; CSS di public/styles.css, preview dari generator yang ada. State kalibrasi tidak persisten.

- [x] Uji fungsi asli: dua panjang positif, toleransi konsistensi 2%, verifikasi dua sumbu 49–51 mm, gagal tiga kali, reset garis tidak menghapus penghitung.
- [x] Tambah subhalaman kalibrasi, slider dan kontrol +/-; endpoint SVG terukur, pengulangan dari panjang awal berbeda, konfirmasi dua sumbu, jalur kembali ke demo yang jelas.
- [x] Integrasikan status pada persiapan/ringkasan, guard saat kalibrasi belum selesai, hapus sesi dan pergantian mode.
- [x] Invalidasi snapshot saat resize/DPR/visualViewport/fullscreen/orientasi berubah, serta tombol manual perubahan layar; buang respons sesi bila kalibrasi berubah di tengah demo.
- [x] Perluas fixture DOM untuk kalibrasi berhasil/gagal/skip/reset dan perubahan tampilan; perbarui preview, jalankan npm test dan persiapan fixture.

Fokus review: layar sempit tidak memampatkan ukuran; nilai nonfinite ditolak; stale callback/input tidak mengisi sesi; penghitungan kegagalan tidak terhapus oleh Reset; status kalibrasi tidak menyiratkan hasil klinis. Pengukuran dengan penggaris fisik dan eksekusi browser tetap bukti terpisah.

Verifikasi: npm test dan persiapan fixture lulus. Chrome lokal gagal start dengan exit 2147483651. Eksekusi DOM terbaru di CI dan pencocokan penggaris fisik masih tertunda, bukan dianggap PASS. Review kode menemukan tombol perubahan layar belum tersedia saat trial; sudah ditambahkan pada sesi terkalibrasi beserta skenario pemulihan.
