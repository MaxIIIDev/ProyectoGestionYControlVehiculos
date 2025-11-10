import ModalTableEditHandler from "../Functions/TableButtonsHandler";

interface ButtonEditProps {
  id: string;
  endpoint: string;
  method: string;
}

export default function ButtonEdit({ endpoint, method }: ButtonEditProps) {
  return (
    <button onClick={() => ModalTableEditHandler(endpoint, method)}>
      <i className="icon-edit"></i> Edit
    </button>
  );
}
