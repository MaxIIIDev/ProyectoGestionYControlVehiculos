import type { ReactNode } from "react";

interface FormProps {
  children?: ReactNode;
  name: string;
  method: string;
  action: string;
  target?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

const handleSubmit =
  (onSuccess?: () => void, onError?: (error: any) => void) =>
  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(e.currentTarget.action, {
      method: e.currentTarget.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        if (onSuccess) onSuccess();
      })
      .catch((error) => {
        console.error("Error:", error);
        if (onError) onError(error);
      });
  };
export default function Form({
  children,
  name,
  method,
  action,
  target,
  onSuccess,
  onError,
}: FormProps) {
  return (
    <form
      name={name}
      method={method}
      action={action}
      target={target}
      onSubmit={handleSubmit(onSuccess, onError)}
    >
      {children}
    </form>
  );
}
