import React, { useState } from "react";
import "./modal.scss"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isModalVisible, setIsModalVisible] = useState(isOpen);

  const handleModalClick = () => {
    setIsModalVisible(!isModalVisible);
    onClose();
  };

  return (
    <div
      className={isModalVisible ? "modal" : "modal-hidden"}
      onClick={handleModalClick}
    >
      <div className="modal-content">
      <h1>Login</h1>
        {children}
        <button onClick={onClose}>cancel</button>
      </div>
    </div>
  );
};