/* Contenedor vertical para las tarjetas de gestión */

import type { ReactNode } from "react";

interface CardColContainerProps {
  children?: ReactNode;
}
export default function CardColContainer({ children }: CardColContainerProps) {
  return <div className="col-md-4 w-25">{children}</div>;
}
