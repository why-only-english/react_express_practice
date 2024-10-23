function TodoItem({ todo }) {
  return (
    <div
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
  );
}

export default TodoItem;
