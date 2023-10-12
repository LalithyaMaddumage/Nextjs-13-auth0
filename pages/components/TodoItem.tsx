'use client'
// Import necessary dependencies and components
import React, { useState } from "react";
import { updateTodo, deleteTodo } from "../api/services/todoServices";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

// Define the Todo interface
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Define the props for the TodoItem component
interface TodoItemProps {
  todo: Todo; // A single Todo object
  setIsChanged: (value: boolean) => void; // A function to signal changes
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, setIsChanged }) => {
  // Define component state variables
  const [completed, setCompleted] = useState<boolean>(todo.completed);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>(todo.title);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  // Function to handle updating the completion status of the todo
  const handleUpdateTodo = async () => {
    try {
      const updatedCompleted: boolean = !completed;
      await updateTodo(todo.id, { title: updatedTitle, completed: updatedCompleted });
      setCompleted(updatedCompleted);
      setIsEditing(false); // Close the editing modal after updating
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Function to handle updating the title of the todo
  const handleUpdateTitle = async () => {
    try {
      await updateTodo(todo.id, { title: updatedTitle, completed: completed });
      setIsEditing(false); // Close the editing modal after updating
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

  // Function to handle deleting the todo
  const handleDeleteTodo = async () => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (confirmed.isConfirmed) {
      try {
        await deleteTodo(todo.id);
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
        setIsChanged(true); // Signal changes after successful deletion
      } catch (error) {
        console.error("Error deleting todo:", error);
        Swal.fire(
          "Oops...",
          "An error occurred while deleting the task.",
          "error"
        );
      }
    }
  };

  // Function to handle starting the editing of the todo
  const handleEditClick = () => {
    if (editingTaskId !== null) {
      setIsEditing(false);
    }
    setEditingTaskId(todo.id);
    setIsEditing(true);
  };

  // Function to handle cancelling the editing of the todo
  const handleEditCancel = () => {
    setIsEditing(false);
    setEditingTaskId(null);
  };

  return (
    <li className={`todo-item ${completed ? "completed" : ""}`}>
      {isEditing ? (
        // Editing mode with input field
        <div className="edit-modal">
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <button className="update-btn" onClick={handleUpdateTitle}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button className="close-btn" onClick={handleEditCancel}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      ) : (
        // Display mode with task title
        <span onClick={handleEditClick}>{updatedTitle !== '' ? updatedTitle : todo.title}</span>
      )}
      <div className="actions">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleUpdateTodo}
          />
          <span className="custom-checkmark"></span>
        </label>
        <button className="delete-button" onClick={handleDeleteTodo}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
