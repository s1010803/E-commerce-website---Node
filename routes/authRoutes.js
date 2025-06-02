const express = require("express");
const router = express.Router();
const db = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [existingUser] = await db.execute(
      "SELECT * FROM member WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const [userResult] = await db.execute(
      "INSERT INTO member (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    const emailId = userResult.insertId;
    const token = jwt.sign({ id: emailId }, process.env.DB_SECRET_JWT, {
      expiresIn: "8h",
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        emailId: emailId,
        email,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(503).json({ message: "Server Unavailable" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [getUser] = await db.execute("SELECT * FROM member WHERE email = ?", [
      email,
    ]);

    const user = getUser[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = await jwt.sign(
      { id: user.emailId },
      process.env.DB_SECRET_JWT,
      { expiresIn: "8h" }
    );

    res.json({
      success: true,
      token,
      user: {
        emailId: user.emailId,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(503).json({ message: "Server Unavailable" });
  }
});

module.exports = router;
