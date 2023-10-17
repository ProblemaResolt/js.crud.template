import React, { useState } from "react";
import { Button } from "../Button";

interface ToastProps extends React.HTMLAttributes<HTMLElement> {
  message: string;
  type: string;
  show: (message: string, type: string) => void;
}

const Toast: React.FC<ToastProps> = ( {message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`toast ${type || "info"}`}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div>{message}</div>
      <Button onClick={handleClose} label="閉じる"/>
    </div>
  );
};

// エラーメッセージを表示するメソッドを追加
const show = (message: string, type: string) => {
  // エラーメッセージを表示する
  return (
    <Toast
      message={message}
      type={type}
      show={() => <div>エラーメッセージ</div>}
    />
  );
};

// Toast コンポーネントをレンダリングするメソッドを追加
const renderToast = (message: string, type: string) => {
  return (
    <Toast
      message={message}
      type={type}
      show={() => <div>エラーメッセージ</div>}
    />
  );
};

export { Toast, renderToast, show };
