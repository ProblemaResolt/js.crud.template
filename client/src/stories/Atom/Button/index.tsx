import React from "react";
import "./button.scss";

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  type?: "button" | "submit" | "reset"; // type属性を追加
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  type = "button", // type属性をデフォルトで "button" に設定
  ...props
}: ButtonProps) => {
  const mode = primary ? "button-primary" : "";
  return (
    <button
      type={type} // type属性を設定
      className={[mode, `--${size}`].join(" ")}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
