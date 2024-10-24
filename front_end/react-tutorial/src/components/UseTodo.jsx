import { useState, useEffect } from 'react';

export function UseTodo() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoText) => {
    if (todoText) {
      setTodos([...todos, { text: todoText, color: selectedColor }]);
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const setColor = (color) => {
    setSelectedColor(color);
  };

  return {
    todoList: todos,
    addTodo,
    removeTodo,
    editTodo,
    setColor,
    selectedColor,
  };
}
