import { useState, useEffect } from 'react';

export default function CountComponent() {
  let [count, setCount] = useState(0);
  const addCount = () => {
    setCount(count + 1);
  };
  useEffect(() => {
    // State변경에 대한 SideEffect처리
    // Dependency가 변경될 때마다, 첫번째인자인 effectCallback 함수를 실행시킨다.
    console.log(`카운트가 증가할때마다 실행! \n -count: ${count}`);

    const intervalId = setInterval(() => {
      setCount(count + 1);
    }, 10000);
    // return ()
  }, [count]);

  return (
    <div>
      <div>{count}</div>
      <button onClick={addCount}>1 증가</button>
    </div>
  );
}
