import { ZodError } from "zod";

// 1. Define un tipo reutilizable para tu objeto de errores
export type FormErrors = { [key: string]: string };

export function formatZodErrors(error: ZodError): FormErrors {
  const zodErrors: Record<string, string[] | undefined> =
    error.flatten().fieldErrors;

  const newErrors: FormErrors = {};

  Object.entries(zodErrors).forEach(([key, errorMessages]) => {
    if (errorMessages) {
      newErrors[key] = errorMessages[0];
    }
  });

  return newErrors;
}
