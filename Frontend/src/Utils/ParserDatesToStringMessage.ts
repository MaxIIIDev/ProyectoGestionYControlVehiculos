export const ParserDatesToStringMessage = (Fecha: Date): string => {
  const day = Fecha.getDate().toString().padStart(2, "0");
  const month = (Fecha.getMonth() + 1).toString().padStart(2, "0");
  const year = Fecha.getFullYear().toString();
  const hour = Fecha.getHours().toString().padStart(2, "0");
  const minutes = Fecha.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hour}:${minutes}hs`;
};

export const ParserDatesToStringDateOnly = (Fecha: Date): string => {
  const day = Fecha.getDate().toString().padStart(2, "0");
  const month = (Fecha.getMonth() + 1).toString().padStart(2, "0");
  const year = Fecha.getFullYear().toString();

  return `${day}/${month}/${year}`;
};
