const express = require("express");
const User = require("../models/User");
const { createToken, verifyToken } = require("../utils/auth");
const router = express.Router();

// 회원가입
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signUp(email, password);
    const token = createToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: "이메일 혹은 비밀번호가 올바르지 않습니다." });
  }
});

// 인증 미들웨어
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token || !verifyToken(token)) {
    return res.status(403).json({ error: "인증이 필요합니다." });
  }
  req.user = verifyToken(token);
  next();
};

// 할 일 작성 (인증 필요)
router.post("/todolist", requireAuth, (req, res) => {
  res.json({ message: "게시글 작성 완료!" });
});

module.exports = router;
