import { z } from "zod";

export const RegisterDtoSchema = z.object({
  Nombre: z
    .string()
    .trim()
    .min(3, { message: "El Nombre debe tener mínimo 3 caracteres" })
    .max(50, { message: "El Nombre debe tener máximo 50 caracteres" }),

  Apellido: z
    .string()
    .trim()
    .min(3, { message: "El Apellido debe tener mínimo 3 caracteres" })
    .max(50, { message: "El Apellido debe tener máximo 50 caracteres" }),

  Dni: z
    .number()
    .int({ message: "El Dni debe ser un número entero" })
    .min(10000000, { message: "El Dni debe ser mayor o igual a 10000000" })
    .max(99999999, { message: "El Dni debe ser menor o igual a 99999999" }),

  FechaNac: z.coerce
    .date()
    .min(new Date("1900-01-01"), {
      message: "La FechaNac debe estar entre 1900-01-01 y 2200-01-01",
    })
    .max(new Date("2200-01-01"), {
      message: "La FechaNac debe estar entre 1900-01-01 y 2200-01-01",
    }),

  Gmail: z
    .string()
    .email({ message: "El correo no es válido" })
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|gob|com\.[a-z]{2}|gob\.[a-z]{2})$/,
      {
        message:
          "El correo debe ser válido y tener un dominio permitido (.com, .gob, etc.)",
      },
    ),

  Contrasena: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
      message:
        "La contraseña debe ser de minimo 8 caracteres y debe tener al menos una mayúscula, una minúscula, un número y un carácter especial.",
    }),
});
export const ApiRegisterDtoSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  dni: z.number(),
  fechaNac: z.string(),
  gmail: z.string(),
  contrasena: z.string(),
});
export const RegisterDtoApiParser = ApiRegisterDtoSchema.transform((data) => {
  const parsedData: RegisterDtoType = {
    Nombre: data.nombre,
    Apellido: data.apellido,
    Dni: data.dni,
    FechaNac: new Date(data.fechaNac),
    Gmail: data.gmail,
    Contrasena: data.contrasena,
  };
  return parsedData;
});
export type RegisterDtoType = z.infer<typeof RegisterDtoSchema>;
export type ApiRegisterDtoType = z.infer<typeof ApiRegisterDtoSchema>;
