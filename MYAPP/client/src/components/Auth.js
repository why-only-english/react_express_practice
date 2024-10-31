import { useState } from "react";
import axios from "axios";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/signup";
    try {
      const res = await axios.post(`http://localhost:5000/users${endpoint}`, { email, password });
      localStorage.setItem("token", res.data.token);
      alert("로그인 성공!");
    } catch (err) {
      alert("로그인 실패: " + err.response?.data?.error || "알 수 없는 오류");
    }
  };

  return (
    <form onSubmit={handleAuth}>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">{isLogin ? "로그인" : "회원가입"}</button>
      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "회원가입 페이지로" : "로그인 페이지로"}
      </button>
    </form>
  );
}

export default Auth;
