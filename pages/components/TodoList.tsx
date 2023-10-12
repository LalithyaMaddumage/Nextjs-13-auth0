'use client'
// Import necessary dependencies and components
import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../api/services/todos";

// Define the props interface for TodoList
interface TodoListProps {
  todos: Todo[];       // An array of Todo objects
  setIsChanged: any;  // A function or callback (You may want to specify a more specific type here)
}

// Functional component for rendering a list of Todos
const TodoList: React.FC<TodoListProps> = ({ todos, setIsChanged }) => {
  console.log('Rendered Todos:', todos);

  return (
    <div>
      <ul>
        {todos && todos.length > 0 ? (
          // Map through the 'todos' array and render a TodoItem for each one
          todos.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} setIsChanged={setIsChanged} />
          ))
        ) : (
          <li>No todos available</li> // Display a message if there are no todos
        )}
      </ul>
    </div>
  );
};

export default TodoList;
