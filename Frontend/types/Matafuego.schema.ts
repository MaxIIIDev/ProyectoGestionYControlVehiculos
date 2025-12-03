import { z as zodVariable } from "zod";

export const MatafuegoSchema = zodVariable
  .object({
    IdMatafuego: zodVariable.int32().optional(),
    NroSerie: zodVariable
      .int32({ message: "El número de serie debe ser un número entero" })
      .positive({ message: "El número de serie debe ser un número positivo" }),
    Proveedor: zodVariable
      .string()
      .trim()
      .min(3, { error: "El proveedor debe tener al menos 3 caracteres" })
      .max(50, { error: "El proveedor no puede tener más de 50 caracteres" }),
    FechaCarga: zodVariable.coerce
      .date()
      .min(new Date("1900-01-01"), {
        error: "La fecha de carga no puede ser anterior a 1900-01-01",
      })
      .max(new Date("2100-12-31"), {
        error: "La fecha de carga no puede ser posterior a 2100-12-31",
      }),
    FechaVencimiento: zodVariable.coerce
      .date()
      .min(new Date("1900-01-01"), {
        error: "La fecha de vencimiento no puede ser anterior a 1900-01-01",
      })
      .max(new Date("2100-12-31"), {
        error: "La fecha de vencimiento no puede ser posterior a 2100-12-31",
      }),
    Estado: zodVariable
      .boolean({ error: "El estado debe ser un valor booleano" })
      .optional(),
  })
  .refine((data) => data.FechaCarga < data.FechaVencimiento, {
    message: "La fecha de carga debe ser anterior a la fecha de vencimiento",
    path: ["FechaCarga"],
  })
  .refine((data) => data.FechaVencimiento > data.FechaCarga, {
    message: "La fecha de vencimiento debe ser posterior a la fecha de carga",
    path: ["FechaVencimiento"],
  });

export type MatafuegoType = zodVariable.infer<typeof MatafuegoSchema>;
const ApiMatafuegoSchema = zodVariable.object({
  idMatafuego: zodVariable.number(),
  nroSerie: zodVariable.number(),
  proveedor: zodVariable.string(),
  fechaCarga: zodVariable.string(),
  fechaVencimiento: zodVariable.string(),
  estado: zodVariable.boolean(),
});
export const MatafuegoApiParser = ApiMatafuegoSchema.transform((data) => {
  const parsedData: MatafuegoType = {
    IdMatafuego: data.idMatafuego,
    NroSerie: data.nroSerie,
    Proveedor: data.proveedor,
    FechaCarga: new Date(data.fechaCarga),
    FechaVencimiento: new Date(data.fechaVencimiento),
    Estado: data.estado,
  };
  return parsedData;
});
export type ApiMatafuegoType = zodVariable.infer<typeof ApiMatafuegoSchema>;
