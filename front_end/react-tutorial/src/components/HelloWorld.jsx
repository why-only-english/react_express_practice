// CSS 적용 방법
// 1. Inline으로 적용하기
// 2. CSS 파일로 작성하기

// JS 코드를 사용하겠다 -> 중괄호

/**
 * [inline으로 CSS적용하기]
 * HTML => style='text-align:center; display:flex;'
 * REACT => style태그 적용을 JS객체로 (CamelCase)
 **/

import "./HelloWorld.css";

function HelloWorld() {
  // text-align => textAlign,
  // justify-content => justifyContent,
  // font-size => fontSize
  const styleObj = { display: "flex", justifyContent: "center" };
  return (
    <div style={styleObj}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Hello World</h1>
        <p>This is my first React Component!</p>
      </div>
    </div>
  );
}

export function HelloWorld2() {
  const classes = "hello-world";
  const value = 10;
  return (
    <div className={`${classes} ${value > 5 ? "new-class" : "false-class"}`}>
      HelloWorld2
    </div>
  );
}

export const sampleVar = {
  greeting: "HelloWorld",
};
// export {HelloWorld2};

// export default vs export
//

export default HelloWorld;
