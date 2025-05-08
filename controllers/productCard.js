const db = require('../models/db');

exports.getProducts = async (req, res) => {
  try {
    const category = req.query.category;
    let condition = '';

    if (category === 'clothes') {
      condition = 'AND pi.p_id <= 13';
    } else if (category === 'accessories') {
      condition = 'AND pi.p_id > 13';
    }

    const [rows] = await db.execute(`
      SELECT p.p_name AS pName, p.p_intro AS pIntro, p.p_price AS pPrice, pi.img_file AS pImg, pi.img_id AS id
      FROM product p
      JOIN product_img pi ON p.p_id = pi.p_id
      WHERE p.p_open = 1 AND pi.sort = 1
      ${condition}
    `);

    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: '資料庫錯誤' });
  }
};