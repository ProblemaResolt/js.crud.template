import React, { useState, useEffect, FormEvent } from "react";
import { Button } from "@/stories/Atom/Button";
import { Modal } from "@/stories/Atom/Modal";
import { Toast } from "@/stories/Atom/Toast";
import axios from "axios";

const CreateAccountModal = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // メールアドレスとパスワードをバックエンドに送信する
    const response = await axios.post(`/api/v1/users`, {
      email,
      password,
    });

    // API からレスポンスを受け取ったら、レスポンスを検証する
    const result = response.data;
    if (result.success) {
      // 検証に成功した場合、新規登録処理を完了する
      onSubmit();
    } else {
      // 検証に失敗した場合、エラーメッセージを表示する
      Toast.show(result.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="submit" label="Create Account" />
    </form>
  );
};

export default CreateAccountModal;