import * as zod from "zod";

export type FormErrors = { [key: string]: string };

export function formatZodErrors(error: zod.ZodError): FormErrors {
  const errord = error.issues;
  const newErrors: FormErrors = {};

  if (errord && errord.length > 0) {
    for (const e of errord) {
      if (e.path && e.path.length > 0) {
        const key: string = e.path[0].toString();
        newErrors[key] = e.message;
      }
    }
  }

  return newErrors;
}
