import HelloWorld, { HelloWorld2 } from "./components/HelloWorld";
import CaptionImage from "./components/CaptionImage";
import MyButton from "./components/MyButton";
import BlinkComponent from "./components/BlinkComponent";
import CountComponent from "./components/CountComponent";
import OnChangeInput from "./components/OnChangeInput";

import ForbiddenWords from "./components/ForbiddenWords"; 

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>금지어 필터링 시스템</h1>
      <ForbiddenWords /> {/* 금지어 컴포넌트 사용 */}
    </div>
  );
}

export default App;
