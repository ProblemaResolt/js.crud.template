// client/src/stories/Molecules/Auth/index.tsx

import React, { useState, useEffect } from "react";
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
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Auth = ({ user, onLogin, onLogout, onCreateAccount }: AuthProps) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  // `form`タグの`onSubmit`属性に、モーダルを閉じないようにするコードを追加します。
  const handleResetPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // APIを呼び出します。
    const url = `/api/v1/users/password/reset`;
    const data = { email: event.currentTarget.elements[0].value };
    axios.post(url, data).then((response:any) => {
      // APIから応答が返ってきたら、応答を検証します。
      const result = response.data;
      if (result.success) {
        // 応答が成功の場合、モーダルを閉じて、トーストを表示します。
        setIsLoginModalOpen(false);
        Toast.show(result.message, "success");
      } else {
        // 応答が失敗の場合、エラーメッセージを表示します。
        Toast.show(result.message, "error");
      }
    });
  };

  return (
    <div>
      <Button onClick={handleLogin} size="medium"  label="Login" />      
      <Button primary size="medium" onClick={onCreateAccount} label="Sign up" />
      {isLoginModalOpen && (
        <Modal
          isOpen={isLoginModalOpen}
          onClose={handleLoginModalClose}
        >
          <form onSubmit={handleResetPassword}>
            <input
              type="email"
              placeholder="Email"
              style={{ margin: 0 }}
              onClick={(event) => event.stopPropagation()}
            />
            <input type="password" placeholder="Password" onClick={(event) => event.stopPropagation()}/>
            <button type="submit" onClick={(event) => event.stopPropagation()}>Reset Password</button>
          </form>
        </Modal>
      )}
    </div>
  );
};