import { useState } from 'react';

function TodoItem({ todo, index, removeTodo, updateTodo, isSearching }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isHovered, setIsHovered] = useState(false); // 마우스가 올라왔는지 여부를 저장

  const handleDoubleClick = () => {
    if (!isSearching) {
      removeTodo(index); // 더블 클릭 시 삭제
    }
  };

  const handleEditClick = () => {
    setIsEditing(true); // 수정 모드로 전환
  };

  const handleSaveEdit = () => {
    updateTodo(index, editText); // 수정 완료
    setIsEditing(false); // 수정 모드 종료
  };

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
        position: 'relative', // 수정 버튼 위치를 조정하기 위해 relative 설정
      }}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress} // Enter 키로 저장
            style={{ width: '200px', padding: '5px' }}
            autoFocus
          />
        </div>
      ) : (
        <div>
          {todo.text}
          {isHovered &&
            !isSearching && ( // 마우스가 올라와 있을 때만 수정 버튼 표시
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
