function limitCalls(func, n) {
  let count = 0;

  return function () {
    while (count < n) {
      count++;
      func();
      break;
    }
  };
}

const limitedHello = limitCalls(() => console.log("Hello!"), 2);

limitedHello(); // "Hello!"
limitedHello(); // "Hello!"
limitedHello(); // 아무 일도 일어나지 않음
