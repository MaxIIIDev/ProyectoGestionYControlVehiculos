import { z as zodVariable } from "zod";
import { ParseStringToLocalDateOnly } from "../src/Utils/ParseStringToLocalDateOnly";
export const NeumaticoSchema = zodVariable.object({
  IdNeumatico: zodVariable
    .int32({ error: "IdNeumatico debe ser un numero entero" })
    .positive({ error: "IdNeumtaico debe ser un numero positivo" })
    .optional(),
  NroSerie: zodVariable
    .int32({ error: "NroSerie debe ser un numero entero" })
    .positive({ error: "NroSerie debe ser un numero positivo" }),
  Marca: zodVariable
    .string()
    .trim()
    .min(3, { error: "La marca debe tener al menos 3 caracteres" })
    .max(50, { error: "La marca debe tener al menos 50 caracteres" }),
  Medida: zodVariable
    .string()
    .trim()
    .min(3, { error: "La medida debe tener al menos 3 caracteres" })
    .max(50, { error: "La medida debe tener al menos 50 caracteres" }),
  Estandar: zodVariable
    .boolean({ error: "El estandar debe ser un valor booleano" })
    .optional(),
  KmColocacion: zodVariable
    .int32({ error: "Km colocacion debe ser un numero entero" })
    .min(0, { error: "Km colocacion debe ser un numero positivo" })
    .optional()
    .nullable(),
  KmRodados: zodVariable
    .int32({ error: "Km Rodados debe ser un numero entero" })
    .min(0, { error: "Km Rodados debe ser un numero positivo" }),
  DesgasteIrregular: zodVariable
    .boolean({ error: "El desgaste irregular debe ser un valor booleano" })
    .optional(),
  IdPosicionNeumatico: zodVariable
    .int32({ error: "IdPosicionNeumatico debe ser un numero positivo" })
    .positive()
    .optional()
    .nullable(),
  FechaColocacion: zodVariable.coerce
    .date()
    .min(new Date("1900-01-01"), {
      error: "La fecha de colocacion debe ser posterior a 1900-01-01",
    })
    .max(new Date("2200-01-01"), {
      error: "La fecha de colocacion debe ser posterior a 2200-01-01",
    })
    .optional()
    .nullable(),
  IdVehiculo: zodVariable
    .int32({ error: "El IdVehiculo debe ser un numero entero" })
    .positive({ error: "El IdVehiculo debe ser un numero positivo" })
    .optional()
    .nullable(),
  Estado: zodVariable.boolean().default(true),
});
export const ApiNeumaticoSchema = zodVariable.object({
  idNeumatico: zodVariable.number(),
  nroSerie: zodVariable.number(),
  marca: zodVariable.string(),
  medida: zodVariable.string(),
  estandar: zodVariable.boolean(),
  kmColocacion: zodVariable.number(),
  kmRodados: zodVariable.number(),
  desgasteIrregular: zodVariable.boolean(),
  idPosicionNeumatico: zodVariable.number().optional().nullable(),
  fechaColocacion: zodVariable.string().optional().nullable(),
  idVehiculo: zodVariable.number().optional().nullable(),
  estado: zodVariable.boolean(),
});
export const NeumaticoApiParser = ApiNeumaticoSchema.transform((data) => {
  const parsedData: NeumaticoType = {
    IdNeumatico: data.idNeumatico,
    NroSerie: data.nroSerie,
    Marca: data.marca,
    Medida: data.medida,
    Estandar: data.estandar,
    KmColocacion: data.kmColocacion,
    KmRodados: data.kmRodados,
    DesgasteIrregular: data.desgasteIrregular,
    IdPosicionNeumatico: data.idPosicionNeumatico ?? null,
    FechaColocacion: data.fechaColocacion
      ? ParseStringToLocalDateOnly(data.fechaColocacion)
      : null,
    IdVehiculo: data.idVehiculo ?? null,
    Estado: data.estado,
  };
  return parsedData;
});
export type ApiNeumaticoType = zodVariable.infer<typeof ApiNeumaticoSchema>;
export type NeumaticoType = zodVariable.infer<typeof NeumaticoSchema>;
