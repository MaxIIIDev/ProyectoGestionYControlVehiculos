import { useState } from "react";
import ComboBoxBrowser from "./ComboBoxBrowser";

interface FormBrowserProps {
  searchApiUrl: string; // endpoint base para buscar entidades
  searchApiMethod?: string;
  relatedApiUrl: (entity: any) => string; // función que recibe la entidad y devuelve el endpoint de datos relacionados
  relatedApiMethod?: string;
  entityLabel?: string;
  renderEntity?: (entity: any) => React.ReactNode;
  renderRelated?: (related: any[]) => React.ReactNode;
  defaultOption?: string;
}

export default function FormBrowser({
  searchApiUrl,
  searchApiMethod,
  relatedApiUrl,
  relatedApiMethod,
  entityLabel,
  renderEntity,
  renderRelated,
  defaultOption = `Buscar ${entityLabel || "..."}`,
}: FormBrowserProps) {
  const [entity, setEntity] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleEntitySelect = (ent: any) => {
    setEntity(ent);
    setRelated([]);
    if (ent) {
      setLoading(true);
      fetch(relatedApiUrl(ent), { method: relatedApiMethod })
        .then((res) => res.json())
        .then((data) => {
          console.log("Respuesta documentos por vehículo:", data);
          setRelated(Array.isArray(data) ? data : []);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <form>
      <ComboBoxBrowser
        apiUrl={searchApiUrl}
        apiMethod={searchApiMethod}
        defaultOption={defaultOption}
        onEntitySelect={handleEntitySelect}
      />
      {entity && (
        <div style={{ marginTop: 16 }}>
          {renderEntity ? (
            renderEntity(entity)
          ) : (
            <pre>{JSON.stringify(entity, null, 2)}</pre>
          )}
        </div>
      )}
      {loading && <div>Cargando datos relacionados...</div>}
      {entity && !loading && (
        <div style={{ marginTop: 16 }}>
          {renderRelated ? (
            renderRelated(related)
          ) : (
            <pre>{JSON.stringify(related, null, 2)}</pre>
          )}
        </div>
      )}
    </form>
  );
}
