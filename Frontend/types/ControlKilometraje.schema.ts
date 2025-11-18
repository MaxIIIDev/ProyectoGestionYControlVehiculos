import { z } from "zod";

export const ControlKilometrajeSchema = z.object({
  IdVehiculo: z
    .number()
    .int()
    .min(1, { error: "El ID del vehículo debe ser mayor a 0" })
    .optional(),
  KilometrajeActual: z.coerce
    .number()
    .min(0, { error: "El kilometraje actual debe ser al menos 0" }),
  FechaRegistro: z.date({ error: "La fecha es inválida" }).optional(),
});
export type ControlKilometrajeSchemaType = z.infer<
  typeof ControlKilometrajeSchema
>;
