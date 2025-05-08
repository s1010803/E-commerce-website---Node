const db = require('../models/db');

exports.getAllCarousel = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT * FROM carousel
      WHERE caro_online = 1
      ORDER BY caro_sort ASC
    `);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: '資料庫錯誤' });
  }
};