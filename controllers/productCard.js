const db = require('../models/db');

exports.getProducts = async (req, res) => {
  try {
    const category = req.query.category || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    let condition = '';
    if (category === 'clothes') {
      condition = 'AND classid IN (3, 4, 5, 6)';
    } else if (category === 'accessories') {
      condition = 'AND classid IN (7, 8, 9, 10)';
    } else {
      condition = ''; 
    }

    // 取得總數（for 分頁）
    const [countRows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM product p
      JOIN product_img pi ON p.p_id = pi.p_id
      WHERE p.p_open = 1 AND pi.sort = 1
      ${condition}
    `);
    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit);

    // 取得該頁資料
    const [rows] = await db.execute(`
      SELECT p.p_name AS pName, p.p_intro AS pIntro, p.p_price AS pPrice, pi.img_file AS pImg, pi.img_id AS id, p.p_id AS pid, pi.sort AS sort
      FROM product p
      JOIN product_img pi ON p.p_id = pi.p_id
      WHERE p.p_open = 1 AND pi.sort = 1
      ${condition}
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    res.status(200).json({
      success: true,
      data: rows,
      total,
      totalPages,
      page
    });
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: '資料庫錯誤' });
  }
};
