// api.ts
const defaultApiUrl = 'http://localhost:3001/api/todos';
// Todo型をエクスポート
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
export async function fetchTodos(apiUrl: string = defaultApiUrl): Promise<Todo[]> {
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data as Todo[];
    } else {
      console.error('APIの呼び出しに失敗しました');
      return [];
    }
  } catch (error) {
    console.error('エラー:', error);
    return [];
  }
}
