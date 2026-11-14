# Persiapan GitHub dan Vercel

## Tujuan dan atribusi

Repository yang ditentukan pengguna: https://github.com/Kafkayara/MataCheck.
Identitas Git yang teramati: Kafkaa <167883485+Kafkayara@users.noreply.github.com>.
Gunakan identitas pengguna untuk author dan committer. Jangan menambahkan Co-authored-by, bot, atau akun kontributor lain. Jangan mengubah sejarah remote atau memakai force push.

## Status dan hambatan lingkungan

Terminal asisten tidak dapat menjangkau github.com, membaca daftar akun Credential Manager, atau menulis .git/config maupun .git/index.lock. Inisialisasi .git lokal berhasil; pemasangan origin dan commit belum berhasil.

Plugin GitHub sudah terhubung ke akun Kafkayara. Pengguna memiliki izin push/admin, tetapi operasi tulis melalui integrasi ditolak 403 `Resource not accessible by integration`. Pengguna sudah berhasil push manual: main pada commit `8b0d472e1645fb0c2c934c4b6e781ca42e4a7f98`, author dan committer Kafkayara, diverifikasi 14 November 2026. Hambatan integrasi tidak berarti akun pengguna kehilangan izin.

## Mengirim perubahan lanjutan

Repository dan origin sudah disiapkan oleh pengguna. Setelah pemeriksaan perubahan lokal:

```powershell
cd C:\Users\Kafka\Documents\MataCheck
npm test
git diff
git add README.md docs/deployment.md docs/verification.md package.json scripts/build-preview.cjs tests/preview-build-check.cjs tests/deployment-check.cjs .github/workflows/checks.yml
git commit -m "Validate preview generation and deployment readiness"
git push origin main
```

Hentikan jika tes atau perintah Git gagal. Identitas lokal tetap Kafkaa dengan email noreply Kafkayara yang tercantum di atas. Tidak menambahkan co-author. Workflow checks baru berjalan setelah push; persiapan fixture tidak sama dengan eksekusi browser.

## Referensi inisialisasi untuk salinan baru

Perintah berikut dijalankan di PowerShell biasa milik pengguna, bukan terminal terbatas asisten. Login melalui Git Credential Manager jika diminta; jangan kirim password atau token ke percakapan.

```powershell
cd C:\Users\Kafka\Documents\MataCheck
npm test
git config user.name "Kafkaa"
git config user.email "167883485+Kafkayara@users.noreply.github.com"
git remote add origin https://github.com/Kafkayara/MataCheck.git
git ls-remote --heads origin
```

Jika origin sudah ada, periksa `git remote -v`; pastikan URL tepat sebelum meneruskan. Jika `npm test` gagal, hentikan dan perbaiki dahulu.

Jika `git ls-remote --heads origin` berhasil tanpa output, repository belum memiliki branch; jalankan:

```powershell
git add .gitattributes .gitignore README.md package.json server.cjs vercel.json public scripts tests docs MataCheck-Preview.html
git commit -m "Apply MataCheck v0.4 prototype updates"
git push -u origin main
```

Jika remote sudah memiliki branch/commit, ambil dan tinjau dulu dengan `git fetch origin` serta `git log --oneline --all --graph`. Gabungkan perubahan secara sadar; jangan menimpa file remote atau memakai `--force`. Kirim output non-rahasia bila membutuhkan bantuan integrasi.

Setelah push, periksa commit di GitHub dan pastikan author terhubung ke Kafkayara. Jangan mengulang langkah inisialisasi pada repository lokal yang sudah memiliki origin.

## Vercel

Setelah push berhasil dan akun/tim tujuan diverifikasi, impor repository di Vercel dengan pengaturan:

- Framework Preset: Other.
- Root Directory: akar repository.
- Output Directory: public.
- Build Command: kosong (situs statis).
- Tidak memerlukan environment variable atau database.

Jangan unggah tests/artifacts, credential, atau .env. Hanya public/ yang menjadi keluaran situs. Sebelum menyatakan online, buka URL deployment, jalankan alur kedua mata, periksa viewport sempit dan header keamanan. Status saat ini: belum deploy.
