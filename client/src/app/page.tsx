"use client";
import React from "react";
import { TodoList } from "@/stories/Molecules/TodoList";
import { Header } from "@/stories/Organisms/Header";

type User = {
  name: string;
};

export default function Home() {
  const [user, setUser] = React.useState<User>();

  return (
    <main>
      <Header
        user={user}
        onLogin={() => setUser({ name: "Jane Doe" })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: "Jane Doe" })}
      />
      <TodoList />
    </main>
  );
}
