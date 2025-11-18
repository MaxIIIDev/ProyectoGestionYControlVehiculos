export const getErrorMessage = (error: unknown, context?: string) => {
  if (error instanceof Error) {
    if (error.message.includes("404")) {
      return `El ${context} no se encuentra registrado.`;
    }
    return error.message;
  }
  return String(error);
};
