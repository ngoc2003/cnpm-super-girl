import React from "react";

export default function FormGroup({ children, className }) {
  return (
    <div className={`flex flex-col mb-4 lg:mb-5 gap-y-2 lg:gap-y-3 ${className} text-left`}>
      {children}
    </div>
  );
}
