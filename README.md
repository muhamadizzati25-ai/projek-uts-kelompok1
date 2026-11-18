# Jadwal Sholat Indonesia — REST API

Project UTS berbasis Node.js + Express.js. Data saat ini disimpan sementara dalam array/object literal di memori.

> **Catatan penting:** jam sholat yang disediakan adalah DATA CONTOH untuk pengujian program, bukan jadwal resmi. Data akan kembali ke kondisi awal saat server dimatikan. Untuk penggunaan nyata, gunakan sumber jadwal resmi/layanan API tepercaya dan simpan sumber serta metode perhitungannya.

## 1. Instalasi

Pastikan Node.js dan npm sudah terpasang. Buka terminal pada folder project, lalu jalankan:

```bash
npm install
npm run dev
```

Server berjalan pada `http://localhost:3000`. Jika nodemon tidak diperlukan, gunakan `npm start`.

## 2. Daftar endpoint (8 route)

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/` | Informasi API |
| GET | `/api/jadwal` | Menampilkan semua jadwal |
| GET | `/api/jadwal/:id` | Detail jadwal berdasarkan ID |
| GET | `/api/jadwal/cari/kota?kota=Bandung` | Mencari jadwal berdasarkan kota |
| POST | `/api/jadwal` | Menambahkan jadwal |
| PUT | `/api/jadwal/:id` | Mengubah jadwal |
| DELETE | `/api/jadwal/:id` | Menghapus jadwal |
| GET | `/api/jadwal/:id/berikutnya?jam=13:00` | Menghitung sholat berikutnya |
| GET | `/api/kota` | Daftar kota yang tersedia |

## 3. Contoh pengujian Postman

Pilih method dan URL sesuai tabel. Untuk POST, pilih **Body → raw → JSON**, lalu kirim:

```json
{
  "kota": "Makassar",
  "provinsi": "Sulawesi Selatan",
  "tanggal": "2026-11-18",
  "subuh": "04:35",
  "dzuhur": "12:00",
  "ashar": "15:20",
  "maghrib": "18:05",
  "isya": "19:15"
}
```

Contoh body PUT ke `/api/jadwal/1`:

```json
{
  "maghrib": "17:49"
}
```

Untuk pengujian, lakukan GET semua data, GET detail, pencarian kota, POST, PUT, DELETE, dan hitung sholat berikutnya. Uji juga ID yang tidak ada serta format jam yang salah untuk membuktikan validasi.

## 4. Ketentuan pemrograman yang dipenuhi

- **Array dan object literal:** `src/data/jadwal.js`.
- **Percabangan:** validasi data, pengecekan ID, dan pengecekan selisih waktu.
- **Perulangan:** `for...of` untuk memeriksa waktu sholat dan membuat daftar kota.
- **Operator aritmatika:** konversi jam ke menit dan menghitung selisih waktu.
- **Modules:** `require()` dan `module.exports` untuk memisahkan routes, data, dan utilitas.
- **Packages:** Express.js sebagai dependency dan Nodemon untuk development.

## 5. Struktur folder

```text
jadwal-sholat-indonesia/
├── src/
│   ├── data/
│   │   └── jadwal.js
│   ├── routes/
│   │   ├── jadwalRoutes.js
│   │   └── kotaRoutes.js
│   ├── utils/
│   │   └── waktu.js
│   └── server.js
├── .gitignore
├── package.json
└── README.md
```

## 6. GitHub

Buat repository baru di GitHub, lalu dari terminal project jalankan:

```bash
git init
git add .
git commit -m "Membuat REST API Jadwal Sholat Indonesia"
git branch -M main
git remote add origin https://github.com/USERNAME/jadwal-sholat-indonesia.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub milik kelompok. Jangan mengunggah folder `node_modules`.

## 7. Pembagian tugas kelompok (contoh)

1. Anggota 1: membuat struktur project dan server Express.
2. Anggota 2: membuat route GET, pencarian, dan daftar kota.
3. Anggota 3: membuat route POST, PUT, dan DELETE.
4. Anggota 4: membuat fungsi hitung sholat berikutnya dan validasi.
5. Anggota 5: pengujian Postman, dokumentasi, dan GitHub.

Sesuaikan pembagian ini dengan jumlah anggota kelompok.
