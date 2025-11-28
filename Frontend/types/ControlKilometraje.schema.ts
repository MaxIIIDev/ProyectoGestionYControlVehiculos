import { z } from "zod";

export const ControlKilometrajeSchema = z.object({
  IdRegistroKilometraje: z
    .number()
    .int()
    .min(1, { error: "El ID del control de kilometraje debe ser mayor a 0" })
    .optional(),
  IdVehiculo: z
    .number()
    .int()
    .min(1, { error: "El ID del vehículo debe ser mayor a 0" })
    .optional(),
  Kilometraje: z.coerce
    .number()
    .min(0, { error: "El kilometraje actual debe ser al menos 0" }),
  FechaRegistro: z.date({ error: "La fecha es inválida" }).optional(),
});
export type ControlKilometrajeSchemaType = z.infer<
  typeof ControlKilometrajeSchema
>;
const ApiControlKilometrajeSchema = z.object({
  idRegistroKilometraje: z.number(),
  idVehiculo: z.number(),
  kilometraje: z.number(),
  fechaRegistro: z.string(),
});
export const ApiControlKilometrajeParser =
  ApiControlKilometrajeSchema.transform((apiData) => {
    console.log("llego aca");

    const controlKilometrajeFormed: ControlKilometrajeSchemaType = {
      IdRegistroKilometraje: apiData.idRegistroKilometraje,
      IdVehiculo: apiData.idVehiculo,
      Kilometraje: apiData.kilometraje,
      FechaRegistro: new Date(apiData.fechaRegistro),
    };
    return controlKilometrajeFormed;
  });
