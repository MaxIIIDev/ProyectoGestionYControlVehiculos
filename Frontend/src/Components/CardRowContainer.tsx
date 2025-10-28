/* Contenedor horizontal para las tarjetas de gestión */

import type { ReactNode } from "react";

interface CardRowContainerProps {
  children?: ReactNode;
}
export default function CardRowContainer({ children }: CardRowContainerProps) {
  return <div className="row g-4 mt-5 justify-content-center">{children}</div>;
}
