import React from 'react';
import TodoItem from './TodoItem_temp'; 

function TodoList({ todos, toggleTodo, deleteTodo }) { 
  return (
    <ul> 
      {todos.map((todo) => (
        <li key={todo.id}> 
          <TodoItem 
            todo={todo} 
            toggleTodo={toggleTodo} 
            deleteTodo={deleteTodo} 
          />
        </li>
      ))} 
    </ul>
  );
}

export default TodoList;
