import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span className={todo.completed ? 'completed' : ''}>{todo.title}</span> 
      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button> 
    </div>
  );
}

export default TodoItem;
