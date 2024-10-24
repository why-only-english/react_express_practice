import { useState, useRef, useEffect } from 'react';

function TodoInput({ addTodo, selectedColor, focusInput, setFocusInput }) {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (focusInput) {
      inputRef.current.focus();
      setFocusInput(false);
    }
  }, [focusInput, setFocusInput]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo(inputValue);
      setInputValue(''); // 할 일 추가 후 입력창 초기화
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{
          backgroundColor: selectedColor || '#FFFFFF',
          padding: '10px',
          width: '300px',
          marginBottom: '10px',
          borderRadius: '10px',
          border: '2px solid',
          borderColor: 'black',
        }}
        placeholder="할 일 입력"
      />
      <button
        onClick={() => {
          addTodo(inputValue);
          setInputValue('');
        }}
        style={{
          marginLeft: '10px',
          padding: '10px',
          backgroundColor: '#78909c',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '10px',
          border: '2px solid',
          borderColor: 'black',
        }}
      >
        입력
      </button>
    </div>
  );
}

export default TodoInput;
