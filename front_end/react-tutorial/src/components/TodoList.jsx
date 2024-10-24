import TodoItem from './TodoItem';

function TodoList({ todos, removeTodo, updateTodo, isSearching }) {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          index={index}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
          isSearching={isSearching}
        />
      ))}
    </div>
  );
}

export default TodoList;
