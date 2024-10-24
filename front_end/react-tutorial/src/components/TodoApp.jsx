import { useState, useRef, useEffect } from 'react';
import TodoInput from './TodoInput'; // Todo 입력 부분을 별도 컴포넌트로 분리
import TodoList from './TodoList'; // Todo 리스트 표시 컴포넌트
import TodoColorbar from './TodoColorbar'; // 색상 선택바 컴포넌트

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
      setFocusInput(true); // 할 일을 추가하면 입력 필드로 포커스 이동
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setFocusInput(true); // 색상 클릭 시 입력 필드로 포커스 이동
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsSearching(true); // 검색 상태로 전환
  };

  const filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));

  const resetSearch = () => {
    setSearchTerm('');
    setIsSearching(false); // 검색 상태 해제
  };

  return (
    <div
      style={{
        textAlign: 'center',
        height: '100vh',
        padding: '20px',
        backgroundColor: '#b3d9ff',
      }}
    >
      <h1>Todo App</h1>

      {/* TodoInput 컴포넌트: 할 일 추가하는 입력 필드 */}
      <TodoInput
        addTodo={addTodo}
        selectedColor={selectedColor}
        focusInput={focusInput}
        setFocusInput={setFocusInput}
      />

      {/* 검색 입력 필드 */}
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
            borderRadius: '4px',
            marginRight: '10px',
          }}
        />
      </div>

      {/* 색상 선택바 컴포넌트 */}
      <TodoColorbar handleColorClick={handleColorClick} />

      {/* 검색 중일 때만 검색 취소 버튼 표시 */}
      {isSearching && (
        <button
          onClick={resetSearch}
          style={{
            margin: '10px',
            padding: '10px',
            backgroundColor: '#ff6666',
            color: 'white',
            borderRadius: '4px',
          }}
        >
          Todo 목록으로 돌아가기
        </button>
      )}

      {/* Todo 리스트 컴포넌트 */}
      <TodoList todos={isSearching ? filteredTodos : todos} removeTodo={removeTodo} isSearching={isSearching} />
    </div>
  );
}

export default TodoApp;
