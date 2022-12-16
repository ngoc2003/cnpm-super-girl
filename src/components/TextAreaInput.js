import React from "react";

const TextAreaInput = ({
  children,
  onChange = () => {},
  defaultValue,
  ...props
}) => {
  const { error = "", name, placeholder = "Text here", ...rest } = props;

  return (
    <div>
      <div
        className={`items-center flex border rounded-xl overflow-hidden hover:border-blue-400 text-text1  duration-200 ${
          error.length > 0
            ? "border-error"
            : "border-stroke dark:border-darkStroke"
        }`}
      >
        <textarea
          rows="10"
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          className={`outline-none  px-3  bg-transparent w-full py-4  font-medium text-sm dark:placeholder:text-text2 placeholder:text-text4    `}
          {...rest}
        />
      </div>
      {error.length > 0 && (
        <span
          className={" text-sm font-medium pointer-events-none text-error "}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default TextAreaInput;
