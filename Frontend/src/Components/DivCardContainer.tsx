/* Contenedor para las tarjetas de gestión */

import type { ReactNode } from "react";

interface DivCardContainerProps {
  children?: ReactNode;
}
export default function DivCardContainer({ children }: DivCardContainerProps) {
  return <div className="row g-4 justify-content-center">{children}</div>;
}
