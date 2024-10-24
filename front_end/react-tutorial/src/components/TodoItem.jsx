import { useState, useEffect, useRef } from 'react';

function TodoItem({ todo, index, removeTodo, updateTodo, isSearching }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text); // 수정할 텍스트 상태
  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태
  const inputRef = useRef(null); // Input 필드를 참조할 Ref

  const handleDoubleClick = () => {
    if (!isSearching) {
      removeTodo(index); // 더블 클릭 시 삭제
    }
  };

  const handleEditClick = () => {
    setIsEditing(true); // 수정 모드로 전환
  };

  const handleSaveEdit = () => {
    updateTodo(index, editText); // 수정 완료 (수정된 텍스트 저장)
    setIsEditing(false); // 수정 모드 종료
  };

  const handleCancelEdit = () => {
    setEditText(todo.text); // 수정 전 상태로 복원
    setIsEditing(false); // 수정 모드 종료
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      handleCancelEdit(); // 수정 사항에 관계없이 무조건 수정 취소
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit(); // Enter 키로 수정 저장
    }
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)} // 마우스가 올라오면 수정 버튼 표시
      onMouseLeave={() => setIsHovered(false)} // 마우스가 나가면 수정 버튼 숨기기
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
        cursor: isSearching ? 'not-allowed' : 'pointer',
        position: 'relative',
      }}
    >
      {isEditing ? (
        <input
          ref={inputRef} // Input 필드에 ref 추가
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyPress={handleKeyPress} // Enter 키로 저장
          style={{ width: '200px', padding: '5px' }}
          autoFocus
        />
      ) : (
        <div>
          {todo.text}
          {isHovered && !isSearching && (
            <button
              onClick={handleEditClick}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '5px',
                cursor: 'pointer',
              }}
            >
              수정
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TodoItem;
