// client/src/stories/Molecules/Auth/index.tsx

import React, { useState, useEffect } from "react";
import { Button } from "../../Atom/Button";
import { Modal } from "../../Atom/Modal";

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

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
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
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </Modal>
      )}
    </div>
  );
};