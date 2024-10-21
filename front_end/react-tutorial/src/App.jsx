import HelloWorld, { HelloWorld2 } from "./components/HelloWorld";
import CaptionImage from "./components/CaptionImage";
import MyButton from "./components/MyButton";
import BlinkComponent from "./components/BlinkComponent";
import CountComponent from "./components/CountComponent";
import OnChangeInput from "./components/OnChangeInput";

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
      <h1>카운터 컴포넌트</h1>
      <OnChangeInput />
      {/* <CountComponent /> */}
      {/* <CaptionImage
        imgUrl="https://kkoma.net/web/product/big/201905/4aa48d0ebab9f50f9e3b47fb7b8af386.jpg"
        caption="구름 그림"
      />
      <MyButton
        title="네이버로 이동"
        color="green"
        clickUrl="https://www.naver.com/"
      /> */}
      {/* <BlinkComponent text="이건 깜박입니다." /> */}
      {/* <HelloWorld />
      <HelloWorld2 /> */}
    </div>
  );
}

export default App;
