import React, { useState, useEffect, FormEvent } from "react";
import { Button } from "../../Atom/Button";
import { Modal } from "../../Atom/Modal";
import { Toast } from "../../Atom/Toast";
import axios from "axios";

type User = {
  name: string;
};

interface AuthProps {
  user?: User;
  onLogin: () => void;
  onCreateAccount: () => void;
}

export const Auth = ({ user, onLogin, onCreateAccount }: AuthProps) => {
  // 2要素認証の画面を表示するためのコンポーネント
  const TwoFactorAuth = ({ onSubmit }) => {
    const [authCode, setAuthCode] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // 2要素認証コードをバックエンドに送信する
      const response = await axios.post(`/api/v1/users/verify-auth-code`, {
        authCode,
      });

      // API からレスポンスを受け取ったら、レスポンスを検証する
      const result = response.data;
      if (result.success) {
        // 検証に成功した場合、ユーザーを新規登録させる
        // オンボード処理を呼び出す
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
          placeholder="2要素認証コード"
          value={authCode}
          onChange={(event) => setAuthCode(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    );
  };

  // create account 画面を表示するためのコンポーネント
  const CreateAccount = ({ onSubmit }) => {
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
        // 検証に成功した場合、2要素認証画面を表示する
        onSubmit(TwoFactorAuth);
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
        <button type="submit">Create Account</button>
      </form>
    );
  };

  // 新規登録処理を実装する
  // onCreateAccount 変数は既に宣言されているため、再宣言しない

  return (
    <div>
      <Button onClick={() => onCreateAccount()} size="medium" label="Sign up" primary />
      <Button onClick={() => onLogin()} size="medium" label="Login" />
    </div>
  );
};