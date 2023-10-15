import React from "react";

import { Button } from "../../Atom/Button";
import { Auth } from "../../Molecules/Auth";
import "./header.scss";

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Header = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount,
}: HeaderProps) => (
  <header>
    <div className="header">
      <h1>Title</h1>
      <div>
        {user ? (
          <>
            <span className="welcome">
              Welcome, <b>{user.name}</b>!
            </span>
            <Button size="medium" onClick={onLogout} label="Log out" />
          </>
        ) : (
          <Auth
            onLogin={function (): void {
              throw new Error("Function not implemented.");
            }}
            onLogout={function (): void {
              throw new Error("Function not implemented.");
            }}
            onCreateAccount={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        )}
      </div>
    </div>
  </header>
);
