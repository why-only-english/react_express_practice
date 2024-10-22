import { useState, useEffect } from "react";

function TimerWithInput() {
  const [inputTime, setInputTime] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 0.01;
          return newTime >= 0 ? newTime : 0;
        });
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (timeLeft <= 0 && isActive) {
      setIsActive(false);
      alert("타이머 종료!");
    }
  }, [timeLeft, isActive]);

  const handleStart = () => {
    const parsedTime = parseFloat(inputTime);
    if (parsedTime > 0) {
      setTimeLeft(parsedTime);
      setIsActive(true);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
    setInputTime("");
  };

  const displayTime =
    timeLeft > 10 ? timeLeft.toFixed(0) + "초" : timeLeft.toFixed(2) + "초";

  const timeStyle = {
    color:
      isActive && timeLeft > 0 && timeLeft < 5
        ? Math.floor(timeLeft * 5) % 2 === 0
          ? "red"
          : "black"
        : "black",
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>타이머</h1>

      {/* 사용자가 시간을 입력하는 부분 */}
      <input
        type="number"
        step="0.01"
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

      <h2 style={timeStyle}>
        {timeLeft > 0
          ? `남은 시간: ${displayTime}`
          : "타이머가 준비되었습니다."}
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
