import { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoColorbar from './TodoColorbar';

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [focusInput, setFocusInput] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoText) => {
    if (todoText) {
      setTodos([...todos, { text: todoText, color: selectedColor }]);
      setFocusInput(true);
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const updateTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos); // 수정 후 상태 업데이트
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setFocusInput(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
  };

  const filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));

  const resetSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
  };

  return (
    <div
      style={{
        textAlign: 'center',
        height: 'auto',
        padding: '20px',
        backgroundColor: '#b3d9ff',
      }}
    >
      <h1>Todo App</h1>

      <TodoInput
        addTodo={addTodo}
        selectedColor={selectedColor}
        focusInput={focusInput}
        setFocusInput={setFocusInput}
      />

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Todo 검색"
          style={{
            backgroundColor: '#ffffff',
            padding: '10px',
            width: '200px',
            borderRadius: '10px',
            border: '2px solid black',
            marginRight: '10px',
          }}
        />
      </div>

      <div>
        <p>할 일을 더블 클릭하면 삭제됩니다.</p>
      </div>

      <TodoColorbar handleColorClick={handleColorClick} />

      {isSearching && (
        <button
          onClick={resetSearch}
          style={{
            margin: '10px',
            padding: '10px',
            backgroundColor: '#ff6666',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '10px',
          }}
        >
          Todo 목록으로 돌아가기
        </button>
      )}

      <TodoList
        todos={isSearching ? filteredTodos : todos}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        isSearching={isSearching}
      />
    </div>
  );
}

export default TodoApp;
