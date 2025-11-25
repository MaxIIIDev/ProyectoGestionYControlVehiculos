import { Button } from "react-bootstrap";
import Enrouters from "../Routes/Enrouters";

interface Documento {
  idDocumento?: number;
  tipo?: string;
  fechaVencimiento?: string;
  urlDocumento?: string;
}

interface DocumentosVehiculosHandlerProps {
  docs: Documento[];
  onCargar?: (tipo: string) => void;
}

export default function DocumentosVehiculosHandler({
  docs,
  onCargar,
}: DocumentosVehiculosHandlerProps) {
  // Tipos requeridos
  const tiposRequeridos = [
    { tipo: "Tarjeta Verde", label: "Tarjeta Verde" },
    { tipo: "Frente Poliza", label: "Frente PPoliza" },
    { tipo: "Titulo", label: "Titulo" },
  ];
  console.log("DOCS: " + docs.forEach((doc) => console.log(doc)));

  // Verifica si existen los documentos requeridos
  const tieneTipo = (tipo: string) =>
    docs.some(
      (doc: Documento) => doc.tipo?.toLowerCase() === tipo.toLowerCase()
    );
  // Funcion para cargar el documento y abrirlo en una nueva pestaña
  const openDocument = async (idDocumento: number) => {
    const response = await fetch(
      Enrouters.documentos.cargarDocumento.action(idDocumento),
      { method: Enrouters.documentos.cargarDocumento.method }
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="d-flex flex-column gap-2">
      {/* Documentos existentes */}
      {docs.length !== 0 &&
        docs.map((doc: Documento, idx: number) => {
          let vencido = false;
          if (doc.fechaVencimiento) {
            const fechaVenc = new Date(doc.fechaVencimiento);
            const hoy = new Date();
            vencido = fechaVenc < hoy;
          }
          return (
            <div
              key={doc.idDocumento ?? idx}
              className="d-flex align-items-center border rounded p-2 gap-3 justify-content-between">
              <div className="d-flex flex-column">
                <span>
                  <strong>{doc.tipo}</strong>
                </span>
                <span>
                  <strong>Vencimiento:</strong> {doc.fechaVencimiento}
                </span>
              </div>
              <div>
                {vencido && (
                  <span className="text-danger">
                    Documento vencido:
                    <Button
                      variant="success"
                      size="sm"
                      className="ms-2"
                      onClick={() => onCargar && onCargar(doc.tipo!)}>
                      Cargar Nuevo
                    </Button>
                  </span>
                )}
              </div>
              <div className="d-flex gap-3">
                <Button
                  as="a"
                  variant="primary"
                  onClick={() => {
                    if (doc.idDocumento) {
                      openDocument(doc.idDocumento);
                    }
                  }}>
                  Abrir
                </Button>
                <Button
                  variant="primary"
                  href={doc.urlDocumento}
                  target="_blank"
                  size="sm">
                  Ir a Ubicación
                </Button>
              </div>
            </div>
          );
        })}

      {/* Documentos requeridos no presentes */}
      {docs.length > 0
        ? tiposRequeridos.map((req) =>
            !tieneTipo(req.tipo) ? (
              <div
                key={req.tipo}
                className="d-flex align-items-center border rounded p-2 gap-3 bg-light text-secondary justify-content-between">
                <span>
                  <strong>{req.label}:</strong> No cargada
                </span>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => onCargar && onCargar(req.tipo)}>
                  Cargar
                </Button>
              </div>
            ) : null
          )
        : tiposRequeridos.map((req) => (
            <div
              key={req.tipo}
              className="d-flex align-items-center border rounded p-2 gap-3 bg-light text-secondary justify-content-between">
              <span>
                <strong>{req.label}:</strong> No cargada
              </span>
              <Button
                variant="success"
                size="sm"
                onClick={() => onCargar && onCargar(req.tipo)}>
                Cargar
              </Button>
            </div>
          ))}

      {/* Agregar documentación adicional */}
      <div className="d-flex align-items-center border rounded p-2 gap-3 bg-light text-secondary justify-content-between">
        <span>
          <strong>Agregar documentación adicional</strong>
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onCargar && onCargar("")}>
          Agregar
        </Button>
      </div>
    </div>
  );
}
