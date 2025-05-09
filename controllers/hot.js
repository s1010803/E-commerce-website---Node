const db = require('../models/db');

exports.getHot = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT h.h_sort AS hotSort, p.img_file AS pImg
      FROM hot h
      JOIN product_img p on h.p_id = p.p_id
      WHERE  p.sort =1
      ORDER BY h.h_sort ASC
    `);

    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: '資料庫錯誤' });
  }
}