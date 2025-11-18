import { useModalTableEditHandler } from "../Functions/TableButtonsHandler";

interface ButtonEditProps {
  id: string;
  endpoint: string;
}

export function ButtonEdit({ endpoint }: ButtonEditProps) {
  // 1. Llama al hook en el nivel superior del componente para obtener la función de navegación.
  const handleEdit = useModalTableEditHandler();
  console.log();

  return (
    <>
      {/* 2. Usa la función obtenida en el evento onClick. */}
      <button onClick={() => handleEdit(endpoint)}>
        <i className="bi bi-pencil"></i> Edit
      </button>
    </>
  );
}
