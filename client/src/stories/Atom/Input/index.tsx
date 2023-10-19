import React from "react";

interface InputProps {
  label: string;
}

/**
 * Primary UI component for user interaction
 */
export const Input = ({
  ...props
}: InputProps) => {
  return (
    <input />
  );
};
