import HelloWorld, { HelloWorld2 } from "./components/HelloWorld";
import CaptionImage from "./components/CaptionImage";
import MyButton from "./components/MyButton";
import BlinkComponent from "./components/BlinkComponent";
import CountComponent from "./components/CountComponent";
import OnChangeInput from "./components/OnChangeInput";
import ForbiddenWords from "./components/ForbiddenWords";

import OnOffToggle from "./components/OnOffToggle";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>토글 버튼</h1>
      <OnOffToggle /> {/* 토글 버튼 렌더링 */}
    </div>
  );
}

export default App;
