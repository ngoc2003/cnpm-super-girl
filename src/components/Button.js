import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  type = "button",
  children,
  to = "",
  className,
  primary = false,
  secondary = false,
  third = false,
  fluid = false,
  isLoading = false,
  transparent = false,
  onClick = () => {},
  ...rest
}) => {
  const child = !!isLoading ? (
    <div className="w-8 h-8 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
  ) : (
    children
  );
  const btn = (
    <button
      type={type}
      onClick={onClick}
      className={`hover:bg-opacity-80 py-3 text-base min-h-[56px] font-semibold px-5 rounded-xl inline-flex items-center justify-center  ${
        primary
          ? "bg-primary text-white"
          : secondary
          ? "bg-secondary text-white"
          : third
          ? "bg-white text-secondary"
          : transparent
          ? "bg-transparent text-primary"
          : ""
      } ${isLoading && "pointer-events-none opacity-50"} ${
        fluid && "w-full"
      } ${className}`}
      {...rest}
    >
      {child}
    </button>
  );
  return to ? <a href={to}>{btn}</a> : btn;
};

export default Button;
