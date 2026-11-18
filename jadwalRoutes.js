const express = require("express");
const router = express.Router();
const jadwal = require("../data/jadwal");
const { NAMA_SHOLAT, validasiJam, cariSholatBerikutnya } = require("../utils/waktu");

// ROUTE 1: GET /api/jadwal - menampilkan seluruh jadwal
router.get("/", (req, res) => {
  res.json({ success: true, total: jadwal.length, data: jadwal });
});

// ROUTE 2: GET /api/jadwal/:id - menampilkan detail berdasarkan ID
router.get("/:id", (req, res) => {
  const data = jadwal.find(item => item.id === Number(req.params.id));
  if (!data) return res.status(404).json({ success: false, message: "Jadwal tidak ditemukan" });
  res.json({ success: true, data });
});

// ROUTE 3: GET /api/jadwal/cari?kota=Bandung - mencari berdasarkan kota
router.get("/cari/kota", (req, res) => {
  const kataKunci = (req.query.kota || "").toLowerCase();
  if (!kataKunci) return res.status(400).json({ success: false, message: "Parameter kota wajib diisi" });
  const hasil = jadwal.filter(item => item.kota.toLowerCase().includes(kataKunci));
  res.json({ success: true, total: hasil.length, data: hasil });
});

// ROUTE 4: POST /api/jadwal - menambahkan jadwal
router.post("/", (req, res) => {
  const { kota, provinsi, tanggal, ...waktu } = req.body;
  if (!kota || !provinsi || !tanggal) {
    return res.status(400).json({ success: false, message: "kota, provinsi, dan tanggal wajib diisi" });
  }
  for (const nama of NAMA_SHOLAT) {
    if (!validasiJam(waktu[nama])) {
      return res.status(400).json({ success: false, message: `Format ${nama} harus HH:MM` });
    }
  }
  const dataBaru = {
    id: jadwal.length ? Math.max(...jadwal.map(item => item.id)) + 1 : 1,
    kota, provinsi, tanggal,
    subuh: waktu.subuh, dzuhur: waktu.dzuhur, ashar: waktu.ashar,
    maghrib: waktu.maghrib, isya: waktu.isya
  };
  jadwal.push(dataBaru);
  res.status(201).json({ success: true, message: "Jadwal berhasil ditambahkan", data: dataBaru });
});

// ROUTE 5: PUT /api/jadwal/:id - mengubah jadwal
router.put("/:id", (req, res) => {
  const data = jadwal.find(item => item.id === Number(req.params.id));
  if (!data) return res.status(404).json({ success: false, message: "Jadwal tidak ditemukan" });

  const fieldDiizinkan = ["kota", "provinsi", "tanggal", ...NAMA_SHOLAT];
  for (const field of fieldDiizinkan) {
    if (req.body[field] !== undefined) {
      if (NAMA_SHOLAT.includes(field) && !validasiJam(req.body[field])) {
        return res.status(400).json({ success: false, message: `Format ${field} harus HH:MM` });
      }
      data[field] = req.body[field];
    }
  }
  res.json({ success: true, message: "Jadwal berhasil diubah", data });
});

// ROUTE 6: DELETE /api/jadwal/:id - menghapus jadwal
router.delete("/:id", (req, res) => {
  const index = jadwal.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: "Jadwal tidak ditemukan" });
  const terhapus = jadwal.splice(index, 1)[0];
  res.json({ success: true, message: "Jadwal berhasil dihapus", data: terhapus });
});

// ROUTE 7: GET /api/jadwal/:id/berikutnya?jam=13:00
router.get("/:id/berikutnya", (req, res) => {
  const data = jadwal.find(item => item.id === Number(req.params.id));
  if (!data) return res.status(404).json({ success: false, message: "Jadwal tidak ditemukan" });
  const jam = req.query.jam || new Date().toTimeString().slice(0, 5);
  if (!validasiJam(jam)) return res.status(400).json({ success: false, message: "Format jam harus HH:MM" });
  const berikutnya = cariSholatBerikutnya(data, jam);
  res.json({ success: true, kota: data.kota, jamSekarang: jam, sholatBerikutnya: berikutnya });
});

module.exports = router;