// TodoCreateForm.tsx
import React, { useState } from 'react';
import { Todo } from '../../TodoList';
import { fetchTodos } from '../../../../api';

interface TodoCreateFormProps {
  onTodoCreated: (newTodo: Todo) => void;
}

export function TodoCreateForm({ onTodoCreated }: TodoCreateFormProps) {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleCreateTodo = async () => {
    try {
      // フォームから取得したtitleを含むJSONオブジェクトを作成
      const todoData = { title, completed: false };
  
      // Todoの作成リクエストの処理
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/todos';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData), // フォームから取得したtitleを含むJSONオブジェクトを送信
      });
  
      if (response.ok) {
        const newTodo = await response.json();
        onTodoCreated(newTodo); // 新しいTodoを親コンポーネントに通知
        setTitle(''); // フォームをクリア
  
        // 新しいTodoを作成後、Todoリストを再取得する
        const updatedTodos = await fetchTodos(apiUrl); // Todoリストを再取得
        setTodos(updatedTodos); // 取得したTodoリストでステートを更新
      } else {
        const errorMessage = await response.text();
        console.error(`Todoの作成に失敗しました: ${errorMessage}`); // エラーメッセージをコンソールに表示
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <div className='row'>
      <input
        className='two-thirds column'
        type="text"
        placeholder="新しいTodoを入力"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className='one-third column' onClick={handleCreateTodo}>作成</button>
    </div>
  );
}
