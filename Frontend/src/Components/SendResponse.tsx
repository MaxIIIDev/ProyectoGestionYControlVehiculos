import "./css/SendResponse.css";

interface SendResponseProps {
  show: boolean;
  message: string;
  type?: "new" | "error" | "info" | null;
  onAccept?: () => void;
  onAcceptAndContinue?: () => void;
  onUpdate?: () => void;
  onClose?: () => void;
}

export default function SendResponse({
  show,
  message,
  type,
  onAccept,
  onAcceptAndContinue,
}: SendResponseProps) {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div style={{ marginBottom: "1.5rem", fontSize: "1.2rem" }}>
          {message}
        </div>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          {type === "new" || type === "error" || type === "info" || !type}
          {onAccept && (
            <button className="modal-content-button-ok" onClick={onAccept}>
              <i className="bi bi-check-lg"></i>
              ACEPTAR
            </button>
          )}
          {type === "new"}
          {onAcceptAndContinue && (
            <button
              className="modal-content-button-ok"
              onClick={onAcceptAndContinue}
            >
              <i className="bi bi-check-lg"></i>
              ACEPTAR Y CONTINUAR
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
