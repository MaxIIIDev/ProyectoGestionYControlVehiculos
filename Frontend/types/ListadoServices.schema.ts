import { z } from "zod";

export const ListadoService = z.object({
  idService: z.number(),
  aceite: z.boolean(),
  filtroDeAceite: z.boolean(),
  filtroDeAire: z.boolean(),
  filtroDeCombustible: z.boolean(),
  bombaCombustible: z.boolean(),
  correaPolyV: z.boolean(),
  correaDentada: z.boolean(),
  alineoBalanceo: z.boolean(),
  bombaAgua: z.boolean(),
  bombaAceite: z.boolean(),
  bujias: z.boolean(),
  kmService: z.number(),
  excepcional: z.boolean(),
  servicioExcepcional: z.string().nullable(),
  proveedor: z.string(),
  detalle: z.string().nullable(),
  fecha: z.string().nullable(),
  realizado: z.boolean(),
  estado: z.boolean(),
});

export type ListadoServiceType = {
  IdService: number;
  Aceite: boolean;
  FiltroDeAceite: boolean;
  FiltroDeAire: boolean;
  FiltroDeCombustible: boolean;
  BombaCombustible: boolean;
  CorreaPolyV: boolean;
  CorreaDentada: boolean;
  AlineoBalanceo: boolean;
  BombaAgua: boolean;
  BombaAceite: boolean;
  Bujias: boolean;
  KmService: number;
  Excepcional: boolean;
  ServicioExcepcional: string | null;
  Proveedor: string;
  Detalle: string | null;
  Fecha: string | null;
  Realizado: boolean;
  Estado: boolean;
};

export const ListadoServiceApiParser = ListadoService.transform((apiData) => ({
  IdService: apiData.idService,
  Aceite: apiData.aceite,
  FiltroDeAceite: apiData.filtroDeAceite,
  FiltroDeAire: apiData.filtroDeAire,
  FiltroDeCombustible: apiData.filtroDeCombustible,
  BombaCombustible: apiData.bombaCombustible,
  CorreaPolyV: apiData.correaPolyV,
  CorreaDentada: apiData.correaDentada,
  AlineoBalanceo: apiData.alineoBalanceo,
  BombaAgua: apiData.filtroDeAire,
  BombaAceite: apiData.filtroDeAire,
  Bujias: apiData.filtroDeAire,
  KmService: apiData.kmService,
  Excepcional: apiData.excepcional,
  ServicioExcepcional: apiData.servicioExcepcional,
  Proveedor: apiData.proveedor,
  Detalle: apiData.detalle,
  Fecha: apiData.fecha,
  Realizado: apiData.realizado,
  Estado: apiData.estado,
}));

export const PagedResponseSchema = z.object({
  items: z.array(ListadoService),
  paginaActual: z.number(),
  tamanoPaginas: z.number(),
  totalRegistrosBd: z.number(),
  totalPaginasCalculadas: z.number(),
});
