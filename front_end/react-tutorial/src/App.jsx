import HelloWorld, { HelloWorld2 } from "./components/HelloWorld";
import CaptionImage from "./components/CaptionImage";
import MyButton from "./components/MyButton";
import BlinkComponent from "./components/BlinkComponent";
import CountComponent from "./components/CountComponent";
import OnChangeInput from "./components/OnChangeInput";

import InputSum from "./components/InputSum";

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
      <h1>두 숫자의 합 계산</h1>
      <InputSum />
    </div>
  );
}

export default App;
