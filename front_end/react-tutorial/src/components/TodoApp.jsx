import { useState } from 'react';
import TodoInput from './TodoInput';
import Colorbar from './Colorbar';
import TodoList from './TodoList';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [focusInput, setFocusInput] = useState(false);

  const addTodo = (text) => {
    if (text) {
      setTodos([...todos, { text, color: selectedColor }]);
    }
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setFocusInput(true);
  };

  return (
    <div
      style={{
        textAlign: 'center',
        height: '100vh',
        padding: '20px',
        backgroundImage: 'url("https://example.com/background-image.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 style={{ color: '#333' }}>Todo App</h1>

      {/* TodoInput 컴포넌트 */}
      <TodoInput
        addTodo={addTodo}
        selectedColor={selectedColor}
        focusInput={focusInput}
        setFocusInput={setFocusInput}
      />

      {/* Colorbar 컴포넌트 */}
      <Colorbar handleColorClick={handleColorClick} />

      {/* TodoList 컴포넌트 */}
      <TodoList todos={todos} />
    </div>
  );
}

export default TodoApp;
