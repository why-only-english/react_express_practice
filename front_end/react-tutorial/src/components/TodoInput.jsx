import { useState, useRef, useEffect } from 'react';

function TodoInput({ addTodo, selectedColor, focusInput, setFocusInput }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (focusInput) {
      inputRef.current.focus();
      setFocusInput(false);
    }
  }, [focusInput, setFocusInput]);

  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo(inputValue);
      setInputValue('');
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
          border: '1px solid #ccc',
          borderRadius: '4px',
          color: '#333',
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
          border: 'none',
          backgroundColor: '#78909c',
          color: 'white',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        입력
      </button>
    </div>
  );
}

export default TodoInput;
