export type PaginaResponseType<T> = {
  data: T[];
  totalPaginasCalculadas: number;
  paginaActual: number;
  tamanoPaginas: number;
};
