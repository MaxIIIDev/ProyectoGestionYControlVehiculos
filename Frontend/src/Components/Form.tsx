import type { ReactNode } from "react";
import { onSubmit } from "./Functions/FormFunctions";

interface FormProps {
  children?: ReactNode;
  name: string;
  method: string;
  action: string;
  target?: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  validateForm: () => boolean;
}

/** 
 * action y method deben coincidir con los definidos en Enrouters.tsx
 * Ejemplo:
 * <Form
      name="vehiculoForm"
      method={Enrouters.VehiculosAgregar.method}
      action={Enrouters.VehiculosAgregar.action}
      ... resto de las props que sean necesarias
   >
   </Form>
 */

export default function Form({
  children,
  name,
  method,
  action,
  target,
  onSuccess,
  onError,
  validateForm,
}: FormProps) {
  return (
    <form
      name={name}
      method={method}
      action={action}
      target={target}
      onSubmit={onSubmit(onSuccess!, onError!, validateForm)}
    >
      {children}
    </form>
  );
}
