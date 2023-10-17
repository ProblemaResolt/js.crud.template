import React, { MouseEventHandler, useState } from "react";
import "./modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  show: boolean;
  onSubmit: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isModalVisible, setIsModalVisible] = useState(isOpen);

  const handleModalClick = () => {
    setIsModalVisible(!isModalVisible);
    onClose();
  };

  const onsubmit = () => {};

  return (
    <div
      className={isModalVisible ? "modal" : "modal-hidden"}
      onClick={handleModalClick}
    >
      <div className="modal-content">
        {children}
        <button onClick={onsubmit}>submit</button>
        <button onClick={onClose}>cancel</button>
      </div>
    </div>
  );
};
