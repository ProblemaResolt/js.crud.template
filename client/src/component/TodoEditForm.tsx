import React, { useState } from 'react';
import { Todo } from '../app/TodoList';

interface TodoEditFormProps {
    todo: Todo; // Todo オブジェクトの型
    onUpdateTodo: (updatedTodo: Todo) => void; // 更新コールバック関数の型
  }

  export function TodoEditForm({ todo, onUpdateTodo }: TodoEditFormProps) {
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleUpdateTodo = async () => {
    try {
      // サーバーに編集を送信
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/todos';
      const response = await fetch(`${apiUrl}/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editedTitle, completed: todo.completed }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        onUpdateTodo(updatedTodo); // 親コンポーネントに更新を通知
      } else {
        const errorMessage = await response.text();
        console.error(`Todoの編集に失敗しました: ${errorMessage}`);
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <div>
      <input type="text" value={editedTitle} onChange={handleTitleChange} />
      <button onClick={handleUpdateTodo}>更新</button>
    </div>
  );
}
