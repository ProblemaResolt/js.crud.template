import React, { useState, useEffect } from 'react';
import { TodoCreateForm } from '../component/TodoCreateForm';
import { fetchTodos } from '../api';
import { TodoEditForm } from '../component/TodoEditForm';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/todos';

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);

  useEffect(() => {
    fetchTodos(apiUrl)
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleTodoCreated = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleEditClick = (id: number) => {
    setEditTodoId(id);
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
    setEditTodoId(null);
  };
  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // 削除成功の場合、Todoリストから削除
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      } else {
        const errorMessage = await response.text();
        console.error(`Todoの削除に失敗しました: ${errorMessage}`);
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };  

  return (
    <div>
      <h1>Todo List</h1>
      <TodoCreateForm onTodoCreated={handleTodoCreated} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editTodoId === todo.id ? (
              <TodoEditForm todo={todo} onUpdateTodo={handleUpdateTodo} />
            ) : (
              <>
                {todo.title} - {todo.completed ? 'Completed' : 'Not Completed'}
                <button onClick={() => handleEditClick(todo.id)}>編集</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>削除</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
