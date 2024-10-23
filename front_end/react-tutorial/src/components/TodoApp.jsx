import { useState, useRef } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const inputRef = useRef(null);

  const addTodo = () => {
    if (inputValue) {
      setTodos([...todos, { text: inputValue, color: selectedColor }]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    inputRef.current.focus();
  };

  return (
    <div
      style={{
        textAlign: 'center',
        height: '100vh',
        padding: '20px',
        backgroundImage: 'url("https://example.com/background-image.jpg")',
        backgroundPosition: 'center',
      }}
    >
      <h1 style={{ color: '#333' }}>Todo App</h1>

      {/* 입력 필드 */}
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
        onClick={addTodo}
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

      {/* 색상 선택 */}
      <div style={{ margin: '20px 0' }}>
        {['#ffffff', '#ef9a9a', '#fff59d', '#a5d6a7'].map((color) => (
          <span
            key={color}
            onClick={() => handleColorClick(color)}
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              backgroundColor: color,
              borderRadius: '50%',
              margin: '0 10px',
              cursor: 'pointer',
              border: '1px solid #ccc',
            }}
          ></span>
        ))}
      </div>

      {/* Todo 목록 */}
      <div>
        <h2 style={{ color: '#333' }}>Todo Items</h2>
        {todos.map((todo, index) => (
          <div
            key={index}
            style={{
              backgroundColor: todo.color || '#FFFFFF',
              padding: '10px',
              margin: '5px',
              borderRadius: '5px',
              color: '#333',
              width: '300px',
              marginLeft: 'auto',
              marginRight: 'auto',
              border: '1px solid #ccc',
            }}
          >
            {todo.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
