export const ParseStringToLocalDateOnly = (Fecha: string): Date | null => {
  if (!Fecha) return null;
  const cleanDate = Fecha.split("T")[0];
  const [day, month, year] = cleanDate.split("-").map(Number);
  return new Date(year, month - 1, day);
};
