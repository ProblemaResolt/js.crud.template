// ./src\app\TodoList.tsx
import { useEffect, useState } from 'react';
import { TodoCreateForm } from '../component/TodoCreateForm';
import { fetchTodos  } from '../api';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  }
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    fetchTodos(apiUrl)
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleTodoCreated = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoCreateForm onTodoCreated={handleTodoCreated} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <dl>
            <dt>{todo.title} - {todo.completed ? 'Completed' : 'Not Completed'}</dt>
            <dd>作成日:{todo.createdAt}</dd>
            <dd>更新日:{todo.updatedAt}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
