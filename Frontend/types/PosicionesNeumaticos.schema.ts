import { z } from "zod";

export const PosicionesNeumaticosSchema = z.object({
  IdPosicionNeumatico: z.number().min(1).optional(),
  Nombre: z.string().min(1).optional(),
});

export type PosicionesNeumaticosType = z.infer<
  typeof PosicionesNeumaticosSchema
>;
export const ApiPosicionesNeumaticosSchema = z.object({
  idPosicionNeumatico: z.number(),
  nombre: z.string(),
});
export const PosicionesNeumaticosApiParser =
  ApiPosicionesNeumaticosSchema.transform((data) => {
    const parsedData: PosicionesNeumaticosType = {
      IdPosicionNeumatico: data.idPosicionNeumatico,
      Nombre: data.nombre,
    };
    return parsedData;
  });
export type ApiPosicionesNeumaticosType = z.infer<
  typeof ApiPosicionesNeumaticosSchema
>;
