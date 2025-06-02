import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  // 確保 Authorization 標頭存在，並且以 "Bearer " 開頭
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Missing or invalid token" });
  }

  // 獲取 token
  const token = authHeader.split(" ")[1];

  try {
    // 驗證 JWT token
    const decoded = jwt.verify(token, process.env.DB_SECRET_JWT);

    // 將解碼後的用戶資訊附加到 request 中
    req.user = { id: decoded.id };

    // 呼叫 next()，讓路由處理繼續進行
    next();
  } catch (err) {
    // 如果驗證失敗（例如，token 無效或過期），返回 401 錯誤
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid or expired token" });
  }
}
