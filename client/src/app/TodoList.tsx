// ./src\app\TodoList.tsx
import { useEffect, useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt:string;
  updatedAt:string;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/todos';

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
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
