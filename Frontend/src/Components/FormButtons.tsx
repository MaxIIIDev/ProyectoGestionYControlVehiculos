import NavButton from "./NavButton";
import "./css/FormButtons.css";

interface FormButtonsProps {
  setFormData: (data: any) => void;
  initialState: any;
}

export default function FormButtons({
  setFormData,
  initialState,
}: FormButtonsProps) {
  const formReset = () => {
    setFormData(initialState);
  };

  return (
    <div className="d-flex flex-row justify-content-end gap-5 py-1 mb-3 me-2 px-5">
      <NavButton
        iconClass="bi bi-arrow-left-circle-fill"
        text=" Volver"
      ></NavButton>

      <button type="reset" className="btn-cancel" onClick={formReset}>
        <i className="bi bi-eraser-fill"></i> Limpiar
      </button>
      <button type="submit" className="btn-submit">
        <i className="bi bi-send"></i> Enviar
      </button>
    </div>
  );
}
