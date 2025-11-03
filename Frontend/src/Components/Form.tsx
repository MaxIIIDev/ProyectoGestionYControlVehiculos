import type { ReactNode } from "react";

interface FormProps {
  children?: ReactNode;
}
export default function Form({ children }: FormProps) {
  return <form>{children}</form>;
}
