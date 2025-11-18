import { useModalTableEditHandler } from "../Functions/TableButtonsHandler";

interface ButtonEditProps {
  id: string;
  endpoint: string;
}

export function ButtonEdit({ endpoint }: ButtonEditProps) {
  const handleEdit = useModalTableEditHandler();
  console.log();

  return (
    <>
      <button onClick={() => handleEdit(endpoint)}>
        <i className="bi bi-pencil"></i> Edit
      </button>
    </>
  );
}
