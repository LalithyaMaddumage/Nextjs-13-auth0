

import axios from 'axios';
import { Todo, CreateTodoPayload, UpdateTodoPayload } from './todos'; // Import the types

const BASE_URL = 'http://localhost:8000'; //  backend URL

// Function to fetch todos
export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    console.log('Fetching todos...');
    const response = await axios.get<Todo[]>(`${BASE_URL}/todos/`);
    console.log('fetching todos response...', response);

    console.log('Fetching todos...', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to create a todo
export const createTodo = async (payload: CreateTodoPayload): Promise<Todo> => {
  try {
    const response = await axios.post<Todo>(`${BASE_URL}/todos/add`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update a todo
export const updateTodo = async (id: number, payload: UpdateTodoPayload): Promise<Todo> => {
  try {
    const response = await axios.put<Todo>(`${BASE_URL}/todos/${id}`, payload);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a todo
export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/todos/${id}`);
  } catch (error) {
    throw error;
  }
};
