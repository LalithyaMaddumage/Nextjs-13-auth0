
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
  

  
  export interface CreateTodoPayload {
    title: string;
  }
  
  export interface UpdateTodoPayload {
    title?: string;
    completed?: boolean;
  }
  