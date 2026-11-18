const express = require("express");
const jadwalRoutes = require("./routes/jadwalRoutes");
const kotaRoutes = require("./routes/kotaRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Selamat datang di API Jadwal Sholat Indonesia",
    endpoints: ["/api/jadwal", "/api/jadwal/cari/kota?kota=Bandung", "/api/kota"]
  });
});

app.use("/api/jadwal", jadwalRoutes);
app.use("/api/kota", kotaRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});