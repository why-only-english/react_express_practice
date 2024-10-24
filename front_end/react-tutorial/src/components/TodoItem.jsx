function TodoItem({ todo, index, removeTodo, isSearching }) {
  const handleClick = () => {
    if (!isSearching) {
      removeTodo(index); // 검색 중이 아닐 때만 삭제
    }
  };
  return (
    <div
      onClick={handleClick}
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
      }}
    >
      {todo.text}
    </div>
  );
}

export default TodoItem;
