import React, { useState, MouseEventHandler } from "react";
import "./modal.scss";
import { Button } from "@/stories/Atom/Button";

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
        <Button onClick={onsubmit} label="submit" />
        <Button onClick={onClose} label="cancel" />
      </div>
    </div>
  );
};
