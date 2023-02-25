import { ReactNode } from 'react';

interface FormGroupProps {
  children: ReactNode | string;
  className?: string;
}
export default function FormGroup({ children, className }: FormGroupProps) {
  return (
    <div
      className={`flex flex-col mb-4 lg:mb-5 gap-y-2 lg:gap-y-3 ${className} text-left`}
    >
      {children}
    </div>
  );
}
