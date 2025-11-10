import { ModalTableEditHandler } from "../Functions/TableButtonsHandler";

interface ButtonEditProps {
  id: string;
  endpoint: string;
  method: string;
}

export function ButtonEdit({ endpoint, method }: ButtonEditProps) {
  return (
    <button onClick={() => ModalTableEditHandler(endpoint, method)}>
      <i className="bi bi-pencil"></i> Edit
    </button>
  );
}
