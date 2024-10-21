import { useState } from "react";

function InputSum() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleInput1Change = (e) => {
    setInput1(Number(e.target.value));
  };

  const handleInput2Change = (e) => {
    setInput2(Number(e.target.value));
  };

  return (
    <div>
      <input
        type="number"
        value={input1}
        onChange={handleInput1Change}
        placeholder="첫번째 숫자"
      />
      <input
        type="number"
        value={input2}
        onChange={handleInput2Change}
        placeholder="두번째 숫자"
      />
      <h2 style={{ color: "red" }}>{input1 + input2}</h2>
    </div>
  );
}

export default InputSum;
