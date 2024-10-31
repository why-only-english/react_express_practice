import { useState } from "react";
import axios from "axios";

function TodoList() {
  const [task, setTask] = useState("");

  const handlePostTask = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/users/todolist",
        { task },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
    } catch (err) {
      alert("로그인 후 사용 가능합니다.");
    }
  };

  return (
    <div>
      <input type="text" placeholder="할 일" value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={handlePostTask}>게시글 작성</button>
    </div>
  );
}

export default TodoList;
