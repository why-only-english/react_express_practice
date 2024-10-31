const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "이메일을 입력하여 주세요."],
    unique: true,
    lowercase: true,
    validate: [isEmail, "올바른 이메일 형식이 아닙니다."],
  },
  password: {
    type: String,
    required: [true, "비밀번호가 입력되어야 합니다."],
  },
});

userSchema.statics.signUp = async function (email, password) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return this.create({ email, password: hashedPassword });
};

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  throw Error("잘못된 로그인 정보입니다.");
};

const User = mongoose.model("User", userSchema);
module.exports = User;
