import { useState, useEffect } from "react";

function OnOffToggle() {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (isOn) {
      console.log("Toggle is ON");
    } else {
      console.log("Toggle is OFF");
    }
  }, [isOn]);

  const toggle = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <button onClick={toggle}>
      {isOn ? "ON" : "OFF"} {/* 버튼 텍스트를 상태에 따라 변경 */}
    </button>
  );
}

export default OnOffToggle;
