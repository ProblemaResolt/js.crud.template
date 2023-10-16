import React, { useState } from "react";
import { Button } from "@/stories/Atom//Button";

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
      <Button onClick={handleClose} label="閉じる"/>
    </div>
  );
};
