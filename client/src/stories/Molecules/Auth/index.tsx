import React, { useState, useEffect, FormEvent } from "react";
import { Button } from "@/stories/Atom/Button";
import { Modal } from "@/stories/Atom/Modal";

import LoginModal from "@/stories/Molecules/Auth/LoginModal";
import CreateAccountModal from "@/stories/Molecules/Auth/CreateAccountModal";

type ModalProps = {
  onSubmit: () => void;
  show: boolean;
};

type User = {
  name: string;
};

interface AuthProps {
  user: User | undefined;
  onLogin: (user: User) => void;
  onCreateAccount: (user: User) => void;
}

export const Auth = ({ user }: AuthProps) => {
  const [loginModal, setLoginModal] = useState<ModalProps | null>(null);
  const [createAccountModal, setCreateAccountModal] = useState<ModalProps | null>(
    null
  );

  const openLoginModal = () => {
    // Modal コンポーネントをレンダーする
    if (loginModal !== undefined) {
      setLoginModal({
        ...loginModal,
        show: true,
      });
      Modal.show(loginModal);
    }
  };

  const openCreateAccountModal = () => {
    // Modal コンポーネントをレンダーする
    if (createAccountModal !== undefined) {
      setCreateAccountModal({
        ...createAccountModal,
        show: true,
      });
      Modal.show(createAccountModal);
    }
  };

  // user プロパティが undefined の場合は、onLogin() 関数と onCreateAccount() 関数を呼び出さないようにする
  if (user === undefined) {
    return (
      <div>
        <Button onClick={openLoginModal} size="medium" label="Login" />
        <Button onClick={openCreateAccountModal} size="medium" label="Sign up" />
      </div>
    );
  }

  // user プロパティが undefined でない場合は、openLoginModal() 関数と openCreateAccountModal() 関数を呼び出すようにする
  return (
    <div>
      {loginModal && (
        <Modal {...loginModal} />
      )}
      
      {createAccountModal && (
        <Modal {...createAccountModal} />
      )}
    </div>
  );
};
