import type { ReactNode } from "react";

interface FormProps {
  children?: ReactNode;
  name: string;
  method: string;
}
export default function Form({ children, name, method }: FormProps) {
  return (
    <form name={name} method={method}>
      {children}
    </form>
  );
}
