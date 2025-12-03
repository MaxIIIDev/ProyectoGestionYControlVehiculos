import { z } from "zod";

export const ListadoChecklistDiario = z.object({
  idChecklistDiario: z.number(),
  fecha: z.string(),
  faroDelanteroIzquierdo: z.boolean(),
  faroDelanteroDerecho: z.boolean(),
  faroTraseroIzquierdo: z.boolean(),
  faroTraseroDerecho: z.boolean(),
  liquidoFrenos: z.boolean(),
  nivelAceite: z.boolean(),
  presionNeumaticos: z.boolean(),
  nivelRefrigerante: z.boolean(),
  nivelAguaParabrisas: z.boolean(),
  matafuegoVigente: z.boolean(),
  observaciones: z.string(),
});

export type ListadoChecklistDiarioType = {
  IdChecklistDiario: number;
  Fecha: string;
  FaroDelanteroIzquierdo: boolean;
  FaroDelanteroDerecho: boolean;
  FaroTraseroIzquierdo: boolean;
  FaroTraseroDerecho: boolean;
  LiquidoFrenos: boolean;
  NivelAceite: boolean;
  PresionNeumaticos: boolean;
  NivelRefrigerante: boolean;
  NivelAguaParabrisas: boolean;
  MatafuegoVigente: boolean;
  Observaciones: string;
};

export const ListadoChecklistDiarioApiParser = ListadoChecklistDiario.transform(
  (apiData) => ({
    IdChecklistDiario: apiData.idChecklistDiario,
    Fecha: apiData.fecha,
    FaroDelanteroIzquierdo: apiData.faroDelanteroIzquierdo,
    FaroDelanteroDerecho: apiData.faroDelanteroDerecho,
    FaroTraseroIzquierdo: apiData.faroTraseroIzquierdo,
    FaroTraseroDerecho: apiData.faroTraseroDerecho,
    LiquidoFrenos: apiData.liquidoFrenos,
    NivelAceite: apiData.nivelAceite,
    PresionNeumaticos: apiData.presionNeumaticos,
    NivelRefrigerante: apiData.nivelRefrigerante,
    NivelAguaParabrisas: apiData.nivelAguaParabrisas,
    MatafuegoVigente: apiData.matafuegoVigente,
    Observaciones: apiData.observaciones,
  })
);
