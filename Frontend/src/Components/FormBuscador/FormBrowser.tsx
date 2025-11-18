import type { ReactNode } from "react";

interface FormProps {
  children?: ReactNode;
  name: string;
  method: string;
  action: string;
  target?: string;
}

export default function Form({
  children,
  name,
  method,
  action,
  target,
}: FormProps) {
  return (
    <form name={name} method={method} action={action} target={target}>
      {children}
    </form>
  );
}
