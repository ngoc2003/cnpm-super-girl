import React from 'react';

function Label(props) {
  const { children, htmlFor = '', className = '' } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={`inline-block text-sm font-medium cursor-pointer text-text2 dark:text-text3 ${className}`}
    >
      {children}
    </label>
  );
}
export default Label;
