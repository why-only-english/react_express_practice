import { useState, useEffect } from "react";

function TimerWithInput() {
  const [inputTime, setInputTime] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      clearInterval(interval);
      setIsActive(false);
      alert("타이머 종료!");
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    if (inputTime > 0) {
      setTimeLeft(parseInt(inputTime));
      setIsActive(true);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
    setInputTime("");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>타이머</h1>

      <input
        type="number"
        placeholder="시간(초) 입력"
        value={inputTime}
        onChange={(e) => setInputTime(e.target.value)}
        style={inputStyle}
      />

      <div>
        <button onClick={handleStart} style={buttonStyle}>
          Start
        </button>
        <button onClick={handleReset} style={buttonStyle}>
          Reset
        </button>
      </div>

      <h2>
        {timeLeft > 0 ? `남은 시간: ${timeLeft}초` : "타이머가 준비되었습니다."}
      </h2>
    </div>
  );
}

const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  marginBottom: "20px",
};

export default TimerWithInput;
