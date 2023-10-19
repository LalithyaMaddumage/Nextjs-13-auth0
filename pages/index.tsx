"use client";
// Import statements for necessary dependencies and components
import Image from "next/image";
import { useState, useEffect } from "react";

import AddTodo from "../pages/components/AddTodo";
import TodoList from "../pages/components/TodoList";
import { Todo } from "../pages/api/services/todos";
import { fetchTodos } from "../pages/api/services/todoServices";
import { useUser } from "@auth0/nextjs-auth0/client";
const Index: React.FC = () => {
  const { user, error, isLoading } = useUser();
  // Define state variables for todos and changes
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  // Use an effect to fetch data when 'isChanged' changes
  useEffect(() => {
    fetchData(); // Fetch data when 'isChanged' changes
  }, [isChanged]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      const data: Todo[] = await fetchTodos(); // Fetch todos
      console.log("Fetched data:", data);
      setTodos(data); // Update the todos state with the fetched data
      if (data) {
        setIsChanged(false); // Reset 'isChanged' if data is successfully fetched
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return (
    <div className="bg-[#232358] h-[100vh] p-20">
      {/* Display AddTodo and TodoList components only if the user is authenticated */}
      {user ? (
        <div className="App">
          <div className="list-wrapper">
            <div className="list">
              <h1>My To-Do List</h1>
              <AddTodo setIsChanged={setIsChanged} />
              <TodoList todos={todos} setIsChanged={setIsChanged} />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-[white] text-xl">Please log in to manage your to-do list.</p>
      )}

      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error.message}</div>
        ) : user ? (
          <div className="mt-[-50px]">
            {/* Welcome {user.name}!  */}
          <div className="w-[80px] h-[35px] rounded-md mt-[-50px] bg-[#202b4e] flex row items-center justify-center">
            <a href="/api/auth/logout">Logout</a>
          </div>
          </div>
        ) : (
          <div className="w-[80px] h-[35px] rounded-md mt-10 bg-white flex row items-center justify-center">
             <a  href="/api/auth/login">Login</a>
          </div>
         
        )}
      </div>
    </div>
  );
};

export default Index;
