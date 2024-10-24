import TodoItem from './TodoItem';

function TodoList({ todos, removeTodo, isSearching }) {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index} removeTodo={removeTodo} isSearching={isSearching} />
      ))}
    </div>
  );
}

export default TodoList;
