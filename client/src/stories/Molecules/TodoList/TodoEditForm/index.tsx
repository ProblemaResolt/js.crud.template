import React, { useState } from "react";
import { Todo } from "../../TodoList";

const apiUrl =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api/todos";

interface TodoEditFormProps {
  todo: Todo;
  onUpdateTodo: (updatedTodo: Todo) => void;
}

export function TodoEditForm({ todo, onUpdateTodo }: TodoEditFormProps) {
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedCompleted, setEditedCompleted] = useState(todo.completed);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCompleted(e.target.checked); // チェックボックスの状態をブーリアン値として設定
  };

  const handleUpdateTodo = async () => {
    try {
      const response = await fetch(`${apiUrl}/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editedTitle,
          completed: editedCompleted,
        }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        onUpdateTodo(updatedTodo);
      } else {
        const errorMessage = await response.text();
        console.error(`Todoの編集に失敗しました: ${errorMessage}`);
      }
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  return (
    <tr className="">
      <td className="">
        <input type="text" value={editedTitle} onChange={handleTitleChange} />
      </td>
      <td className="">
        <input
          type="checkbox"
          checked={editedCompleted}
          onChange={handleCompletedChange}
        />{" "}
      </td>
      <td className="">----</td>
      <td className="">
        <button onClick={handleUpdateTodo}>更新</button>
      </td>
    </tr>
  );
}
