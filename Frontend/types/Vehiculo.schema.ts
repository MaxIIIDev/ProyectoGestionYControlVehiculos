import { z } from "zod";
export const VehiculoSchema = z.object({
  Marca: z
    .string()
    .trim()
    .min(3, { message: "La marca debe tener al menos 3 caracteres" })
    .max(50, { message: "La marca no puede tener más de 50 caracteres" }),
  Modelo: z
    .string()
    .trim()
    .min(3, { message: "El modelo debe tener al menos 3 caracteres" })
    .max(50, { message: "El modelo no puede tener más de 50 caracteres" }),
  Anio: z.coerce
    .number()
    .min(1900, { message: "El año debe ser mayor o igual a 1900" })
    .max(new Date().getFullYear(), {
      message: `El año no puede ser mayor que ${new Date().getFullYear()}`,
    }),
  Patente: z
    .string()
    .trim()
    .min(3, { message: "La patente debe tener al menos 3 caracteres" })
    .max(20, { message: "La patente no puede tener más de 20 caracteres" }),
  Color: z
    .string()
    .trim()
    .min(3, { message: "El color debe tener al menos 3 caracteres" })
    .max(50, { message: "El color no puede tener más de 50 caracteres" }),
  CantidadNeumaticos: z.coerce
    .number()
    .min(0, { message: "La cantidad de neumáticos debe ser al menos 0" })
    .max(20, { message: "La cantidad de neumáticos no puede ser mayor a 20" }),
  CantidadAuxilios: z.coerce
    .number()
    .min(0, { message: "La cantidad de auxilios debe ser al menos 0" })
    .max(20, { message: "La cantidad de auxilios no puede ser mayor a 20" }),
  NumeroChasis: z
    .string()
    .trim()
    .min(3, { message: "El número de chasis debe tener al menos 3 caracteres" })
    .max(50, {
      message: "El número de chasis no puede tener más de 50 caracteres",
    }),
  NumeroMotor: z
    .string()
    .trim()
    .min(3, { message: "El número de motor debe tener al menos 3 caracteres" })
    .max(50, {
      message: "El número de motor no puede tener más de 50 caracteres",
    }),
});
export type VehiculoSchemaType = z.infer<typeof VehiculoSchema>;
