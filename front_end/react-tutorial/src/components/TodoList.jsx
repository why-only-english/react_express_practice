import TodoItem from './TodoItem';

function TodoList({ todos }) {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
