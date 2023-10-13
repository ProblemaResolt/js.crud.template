import React from 'react';

import { Button } from '../../Atom/Button';
import './header.scss';

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
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
          <>
            <Button size="medium" onClick={onLogin} label="Log in" />
            <Button primary size="medium" onClick={onCreateAccount} label="Sign up" />
          </>
        )}
      </div>
    </div>
  </header>
);
