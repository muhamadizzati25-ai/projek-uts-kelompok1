const express = require("express");
const router = express.Router();
const jadwal = require("../data/jadwal");

// ROUTE 8: GET /api/kota - daftar kota unik yang tersedia
router.get("/", (req, res) => {
  const daftarKota = [];
  for (const item of jadwal) {
    if (!daftarKota.includes(item.kota)) daftarKota.push(item.kota);
  }
  res.json({ success: true, total: daftarKota.length, data: daftarKota });
});

module.exports = router;