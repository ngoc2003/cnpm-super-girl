import React, { useContext, useState } from "react";
import IconEyeToggle from "../icons/IconEyeToggle";

export default function Input({
  children,
  icon = false,
  isFile = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { error = "", name, placeholder, ...rest } = props;
  return (
    <>
      <div
        className={`items-center flex border rounded-xl overflow-hidden hover:border-blue-400  ${
          isFile ? "dark:text-text4" : "dark:text-white"
        }   text-text1  duration-200 ${
          error.length > 0
            ? "border-error"
            : "border-stroke dark:border-darkStroke"
        }`}
      >
        <input
          type={!showPassword && icon ? "password" : "text"}
          placeholder={placeholder}
          className={`outline-none  px-3  bg-transparent w-full py-4  font-medium text-sm dark:placeholder:text-text2 placeholder:text-text4    `}
          {...rest}
        />
        {icon && (
          <IconEyeToggle
            toggle={showPassword}
            onClick={() => setShowPassword(!showPassword)}
          ></IconEyeToggle>
        )}
      </div>
      {error.length > 0 && (
        <span
          className={" text-sm font-medium pointer-events-none text-error "}
        >
          {error}
        </span>
      )}
    </>
  );
}
