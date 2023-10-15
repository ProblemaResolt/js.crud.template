import React, { useState } from "react";

export const Toast = ({ message, type }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`toast ${type}`}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div>{message}</div>
      <button onClick={handleClose}>閉じる</button>
    </div>
  );
};
