import type { ReactNode } from "react";

interface FormProps {
  children?: ReactNode;
  name: string;
  method: string;
  action: string;
  target?: string;
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  fetch(e.currentTarget.action, {
    method: e.currentTarget.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
export default function Form({
  children,
  name,
  method,
  action,
  target,
}: FormProps) {
  return (
    <form
      name={name}
      method={method}
      action={action}
      target={target}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}
