import React, { useContext, useState } from "react";
import IconEyeToggle from "../icons/IconEyeToggle";
import IconUpload from "../icons/IconUpload";

export default function Input({
  children,
  icon = false,
  isFile = false,
  onChange = () => {},
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { error = "", name, placeholder, ...rest } = props;
  return (
    <>
      {isFile ? (
        <label
          className={`${
            props.className || ""
          } min-h-[250px] cursor-pointer flex items-center justify-center border border-dashed w-full rounded-lg  relative overflow-hidden group`}
        >
          <input
            type="file"
            className="hidden-input hidden"
            onChange={onChange}
          />

          <div className="flex flex-col items-center text-center pointer-events-none">
            <IconUpload></IconUpload>
            <p className="font-semibold">Choose photo</p>
            {/* <img src={""} className="object-cover w-full h-full" alt="" /> */}
          </div>
        </label>
      ) : (
        <>
          <div
            className={`items-center flex border rounded-xl overflow-hidden hover:border-blue-400 text-text1  duration-200 ${
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
      )}
    </>
  );
}
