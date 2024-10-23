import { useState, useRef, useEffect } from 'react';
import Colorbar from './Colorbar';
import TodoList from './TodoList';

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    // 브라우저에 저장된 할 일 목록을 불러옴, 없으면 빈 배열 반환
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [selectedColor, setSelectedColor] = useState('#ffffff'); // 기본 색상 설정
  const [inputValue, setInputValue] = useState(''); // 할 일 입력 필드
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [isSearching, setIsSearching] = useState(false); // 검색 상태 확인

  const inputRef = useRef(null); // 입력 필드에 대한 참조 생성

  // 할 일이 추가될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 할 일 추가
  const addTodo = () => {
    if (inputValue) {
      setTodos([...todos, { text: inputValue, color: selectedColor }]);
      setInputValue('');
    }
  };

  // 색상 선택 시 입력 필드 배경색 변경 및 포커스 이동
  const handleColorClick = (color) => {
    setSelectedColor(color);
    inputRef.current.focus(); // 색상 클릭 시 입력 필드에 포커스
  };

  // 검색 수행 (입력 필드에서 바로 검색)
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsSearching(true); // 검색 상태로 전환
  };

  // 검색된 할 일 목록
  const filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));

  // 할 일 목록으로 돌아가는 버튼
  const resetSearch = () => {
    setSearchTerm('');
    setIsSearching(false); // 검색 상태 해제
  };

  // 입력 필드에서 Enter 키로 할 일 추가
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo(); // Enter 누를 때 할 일 추가
    }
  };

  return (
    <div
      style={{
        textAlign: 'center',
        height: '100vh',
        padding: '20px',
        backgroundColor: '#b3d9ff',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 style={{ color: '#333' }}>Todo App</h1>

      {/* 할 일 입력 필드 및 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          ref={inputRef} // 입력 필드에 참조 추가
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress} // Enter로 할 일 추가
          placeholder="Todo 입력"
          style={{
            backgroundColor: selectedColor, // 색상 선택 시 배경색 변경
            padding: '10px',
            width: '200px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            color: '#333',
            marginRight: '10px',
          }}
        />
        <button
          onClick={addTodo}
          style={{
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

      {/* 검색 필드 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch} // 검색어 입력 시 상태 업데이트
          placeholder="Todo 검색"
          style={{
            backgroundColor: '#ffffff', // 검색 필드는 흰색
            padding: '10px',
            width: '200px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            color: '#333',
            marginRight: '10px',
          }}
        />
      </div>

      {/* Colorbar 컴포넌트 */}
      <Colorbar handleColorClick={handleColorClick} />

      {/* 검색 상태일 때 할 일 목록으로 돌아가는 버튼 표시 */}
      {isSearching && (
        <button
          onClick={resetSearch}
          style={{
            margin: '20px',
            padding: '10px',
            border: 'none',
            backgroundColor: '#ff6666',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Todo 목록으로 돌아가기
        </button>
      )}

      {/* 할 일 목록 (필터링된 리스트 또는 전체 리스트) */}
      <TodoList todos={isSearching ? filteredTodos : todos} />
    </div>
  );
}

export default TodoApp;
