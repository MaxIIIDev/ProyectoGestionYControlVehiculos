import { Button } from "react-bootstrap";
import Enrouters from "../Routes/Enrouters";
import { useState } from "react";

import Switch from "../Styled/StyledSwitch";

interface Documento {
  idDocumento?: number;
  tipo?: string;
  fechaVencimiento?: string;
  urlDocumento?: string;
  estado?: boolean;
}

interface DocumentosMatafuegoHandlerProps {
  docs: Documento[];
  onCargar?: (tipo: string, idDocumentoViejo?: number) => void;
}

export default function DocumentosMatafuegoHandler({
  docs,
  onCargar,
}: DocumentosMatafuegoHandlerProps) {
  const [mostrarActivos, setMostrarActivos] = useState(true);
  const tiposRequeridos = [{ tipo: "Oblea", label: "Oblea" }];
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
      <div className="d-flex flex-row gap-2 mb-2">
        <div style={{ width: "15%" }}>
          <span
            className={
              mostrarActivos ? "fw-bold text-success" : "fw-bold text-danger"
            }
          >
            {mostrarActivos ? "Mostrar Activos" : "Mostrar Inactivos"}
          </span>
        </div>
        <Switch
          checked={mostrarActivos}
          onChange={() => setMostrarActivos((prev) => !prev)}
        />
      </div>
      {/* Documentos existentes */}
      {docs.length !== 0 &&
        docs
          .filter((doc) =>
            mostrarActivos ? doc.estado !== false : doc.estado === false
          )
          .map((doc: Documento, idx: number) => {
            let vencido = false;
            if (doc.fechaVencimiento) {
              const fechaVenc = new Date(doc.fechaVencimiento);
              const hoy = new Date();
              vencido = fechaVenc <= hoy;
            }
            return (
              <div
                key={doc.idDocumento ?? idx}
                className="d-flex align-items-center border rounded p-2 gap-3 justify-content-between"
              >
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
                      DOCUMENTO VENCIDO
                      {doc.estado !== false && (
                        <Button
                          variant="success"
                          size="sm"
                          className="ms-2"
                          onClick={() =>
                            onCargar && onCargar(doc.tipo!, doc.idDocumento)
                          }
                        >
                          Cargar Nuevo
                        </Button>
                      )}
                    </span>
                  )}
                </div>
                <div className="d-flex gap-3">
                  <Button
                    style={{ marginRight: "5px" }}
                    as="a"
                    variant="primary"
                    onClick={() => {
                      if (doc.idDocumento) {
                        openDocument(doc.idDocumento);
                      }
                    }}
                  >
                    Abrir
                  </Button>
                  {/* <Button
                    variant="primary"
                    href={doc.urlDocumento}
                    target="_blank"
                    size="sm"
                  >
                    Ir a Ubicación
                  </Button> */}
                </div>
              </div>
            );
          })}

      {/* Documentos requeridos no presentes */}
      {mostrarActivos && docs.length > 0
        ? tiposRequeridos.map((req) =>
            !tieneTipo(req.tipo) ? (
              <div
                key={req.tipo}
                className="d-flex align-items-center border rounded p-2 gap-3 bg-light text-secondary justify-content-between"
              >
                <span>
                  <strong>{req.label}:</strong> No cargada
                </span>
                <Button
                  style={{ marginRight: "5px" }}
                  variant="success"
                  size="sm"
                  onClick={() => onCargar && onCargar(req.tipo)}
                >
                  Cargar
                </Button>
              </div>
            ) : null
          )
        : mostrarActivos &&
          tiposRequeridos.map((req) => (
            <div
              key={req.tipo}
              className="d-flex align-items-center border rounded p-2 gap-3 bg-light text-secondary justify-content-between"
            >
              <span>
                <strong>{req.label}:</strong> No cargada
              </span>
              <Button
                variant="success"
                size="sm"
                onClick={() => onCargar && onCargar(req.tipo)}
              >
                Cargar
              </Button>
            </div>
          ))}

      {/* Agregar documentación adicional */}
      {mostrarActivos && (
        <div className="d-flex align-items-center border rounded p-2 gap-3 bg-light text-secondary justify-content-between">
          <span>
            <strong>Agregar documentación adicional</strong>
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onCargar && onCargar("")}
          >
            Agregar
          </Button>
        </div>
      )}
    </div>
  );
}
