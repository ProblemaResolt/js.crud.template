import React from "react";
import { Input } from "@/stories/Atom/Input";
import "@/stories/Molecules/Login/login.scss"


interface LoginProps {
  label: string;
}

/**
 * Primary UI component for user interaction
 */
export const Login = ({label = "aa", ...props }: LoginProps) => {
  return (
    <>
      <h2>Login</h2>
      <form>
        <Input label={label} />
      </form>
    </>
  );
};
