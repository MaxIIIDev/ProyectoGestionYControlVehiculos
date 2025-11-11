import { z } from "zod";
export const VehiculoSchema = z.object({
  idVehiculo: z.int32().optional(),
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
  Estado: z.boolean().optional(),
});
const ApiVehiculoSchema = z.object({
  idVehiculo: z.number(),
  marca: z.string(),
  modelo: z.string(),
  anio: z.number(),
  patente: z.string(),
  color: z.string(),
  cantidadNeumaticos: z.number(),
  cantidadAuxilios: z.number(),
  numeroChasis: z.string(),
  numeroMotor: z.string(),
  estado: z.boolean(),

  idMatafuego: z.number().nullable().optional(),
  matafuego: z.any().nullable().optional(),
  documentos: z.array(z.any()).nullable().optional(),
  checklistsDiarios: z.array(z.any()).nullable().optional(),
  registrosKilometraje: z.array(z.any()).nullable().optional(),
  services: z.array(z.any()).nullable().optional(),
});
export const VehiculoApiParser = ApiVehiculoSchema.transform((apiData) => {
  const vehiculoFormed: VehiculoSchemaType = {
    idVehiculo: apiData.idVehiculo,
    Marca: apiData.marca,
    Modelo: apiData.modelo,
    Anio: apiData.anio,
    Patente: apiData.patente,
    Color: apiData.color,
    NumeroChasis: apiData.numeroChasis,
    NumeroMotor: apiData.numeroMotor,
    CantidadNeumaticos: apiData.cantidadNeumaticos,
    CantidadAuxilios: apiData.cantidadAuxilios,
    Estado: apiData.estado,
  };
  return vehiculoFormed;
});
export type VehiculoSchemaType = z.infer<typeof VehiculoSchema>;
