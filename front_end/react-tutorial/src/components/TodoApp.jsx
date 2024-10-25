import { useState } from 'react';
import { UseTodo } from './UseTodo';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoColorbar from './TodoColorbar';

function TodoApp() {
  const { todoList, addTodo, removeTodo, editTodo, setColor, selectedColor } = UseTodo();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [focusInput, setFocusInput] = useState(false);

  // 문자열에서 한글 초성만 추출하는 함수
  const getChosung = (str) => {
    const chosung = [
      'ㄱ',
      'ㄲ',
      'ㄴ',
      'ㄷ',
      'ㄸ',
      'ㄹ',
      'ㅁ',
      'ㅂ',
      'ㅃ',
      'ㅅ',
      'ㅆ',
      'ㅇ',
      'ㅈ',
      'ㅉ',
      'ㅊ',
      'ㅋ',
      'ㅌ',
      'ㅍ',
      'ㅎ',
    ];

    return [...str]
      .map((char) => {
        const code = char.charCodeAt(0) - 0xac00;
        if (code >= 0 && code <= 11172) {
          const chosungIndex = Math.floor(code / 588);
          return chosung[chosungIndex];
        }
        return char;
      })
      .join('');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
  };

  // 필터링 로직에 초성과 시작 부분 일치 검사 추가
  const filteredTodos = todoList.filter((todo) => {
    const lowerText = todo.text.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();
    const textChosung = getChosung(lowerText);
    const searchTermChosung = getChosung(lowerSearchTerm);

    // 초성의 시작 부분 일치 검사
    return lowerText.includes(lowerSearchTerm) || textChosung.startsWith(searchTermChosung);
  });

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

      <TodoColorbar handleColorClick={setColor} setFocusInput={setFocusInput} />

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
        todos={isSearching ? filteredTodos : todoList}
        removeTodo={removeTodo}
        updateTodo={editTodo}
        isSearching={isSearching}
      />
    </div>
  );
}

export default TodoApp;
