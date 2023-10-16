import React, { useState, useEffect, FormEvent } from "react";
import { Button } from "@/stories/Atom/Button";
import { Modal } from "@/stories/Atom/Modal";

import LoginModal from "@/stories/Molecules/Auth/LoginModal";
import CreateAccountModal from "@/stories/Molecules/Auth/CreateAccountModal";

type User = {
  name: string;
};

interface AuthProps {
  user?: User;
  onLogin: () => void;
  onCreateAccount: () => void;
}

export const Auth = ({ user, onLogin, onCreateAccount }: AuthProps) => {
  type ModalProps = {
    onSubmit: () => void;
  };

  type Modal = React.FC<ModalProps>;

  const [loginModal, setLoginModal] = useState<Modal | null>(null);
  const [createAccountModal, setCreateAccountModal] = useState<Modal | null>(
    null
  );

  const openLoginModal = () => {
    const modal = new Modal({
      props: {
        onSubmit: onLogin,
      },
    });
    modal.setContent(<LoginModal onSubmit={onLogin} />).open();
    setLoginModal(modal);
  };

  const openCreateAccountModal = () => {
    const modal = new Modal({
      props: {
        onSubmit: onCreateAccount,
      },
    });
    modal.setContent(<CreateAccountModal onSubmit={onCreateAccount} />).open();
    setCreateAccountModal(modal);
  };

  return (
    <div>
      <Button onClick={openLoginModal} size="medium" label="Login" />
      <Button onClick={openCreateAccountModal} size="medium" label="Sign up" />
    </div>
  );
};
