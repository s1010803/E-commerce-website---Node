const db = require('../models/db');

exports.getProductDetail = async (req, res) => {
  try {
    const productId = req.params.id;

    const [rows] = await db.execute(`
      SELECT 
        p.p_name AS pName,
        p.p_intro AS pIntro,
        p.p_price AS pPrice,
        pi.img_file AS pImg,
        pi.img_id AS id,
        p.p_id AS pid,
        pi.sort AS sort
      FROM product p
      JOIN product_img pi ON p.p_id = pi.p_id
      WHERE p.p_open = 1 AND p.p_id = ?
    `, [productId]);

    if (rows.length > 0) {
      const { pid, pName, pIntro, pPrice } = rows[0];
      const images = rows.map(row => ({
        id: row.id,
        pImg: row.pImg,
        sort: row.sort
      }));

      res.status(200).json({
        success: true,
        data: {
          pid,
          pName,
          pIntro,
          pPrice,
          images
        }
      });
    } else {
      res.status(404).json({ success: false, message: '找不到商品' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: '資料庫錯誤' });
  }
};
