const db = require('../models/db');


exports.getAllClass = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pyclass');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '資料庫錯誤' });
  }
};


exports.getProductById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: '缺少 ID 參數' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM pyclass WHERE classid = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: '找不到資料' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '資料庫錯誤' });
  }
};
