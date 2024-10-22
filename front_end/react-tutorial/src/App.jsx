import HelloWorld, { HelloWorld2 } from './components/HelloWorld';
import CaptionImage from './components/CaptionImage';
import MyButton from './components/MyButton';
import BlinkComponent from './components/BlinkComponent';
import CountComponent from './components/CountComponent';
import OnChangeInput from './components/OnChangeInput';
import ForbiddenWords from './components/ForbiddenWords';

import TimerWithInput from './components/TimerWithInput';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <TimerWithInput /> {/* 타이머 컴포넌트 렌더링 */}
    </div>
  );
}

export default App;
