const NAMA_SHOLAT = ["subuh", "dzuhur", "ashar", "maghrib", "isya"];

function validasiJam(jam) {
  return typeof jam === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(jam);
}

function menitDariSekarang(jamSekarang, jamTujuan) {
  const [h1, m1] = jamSekarang.split(":").map(Number);
  const [h2, m2] = jamTujuan.split(":").map(Number);
  let selisih = (h2 * 60 + m2) - (h1 * 60 + m1);

  // Jika waktu sholat sudah lewat, hitung menuju hari berikutnya.
  if (selisih < 0) selisih += 24 * 60;
  return selisih;
}

function cariSholatBerikutnya(jadwal, jamSekarang) {
  let hasil = null;
  let menitTerkecil = Infinity;

  // Perulangan untuk memeriksa lima waktu sholat.
  for (const nama of NAMA_SHOLAT) {
    const selisih = menitDariSekarang(jamSekarang, jadwal[nama]);
    if (selisih < menitTerkecil) {
      menitTerkecil = selisih;
      hasil = { nama, waktu: jadwal[nama], sisaMenit: selisih };
    }
  }
  return hasil;
}

module.exports = { NAMA_SHOLAT, validasiJam, cariSholatBerikutnya };