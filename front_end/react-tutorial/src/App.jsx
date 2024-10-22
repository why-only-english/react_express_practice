import HelloWorld, { HelloWorld2 } from "./components/HelloWorld";
import CaptionImage from "./components/CaptionImage";
import MyButton from "./components/MyButton";
import BlinkComponent from "./components/BlinkComponent";
import CountComponent from "./components/CountComponent";
import OnChangeInput from "./components/OnChangeInput";
import ForbiddenWords from "./components/ForbiddenWords";

import StopWatch from './components/StopWatch'; 

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <StopWatch /> {/* 스탑워치 컴포넌트 렌더링 */}
    </div>
  );
}

export default App;