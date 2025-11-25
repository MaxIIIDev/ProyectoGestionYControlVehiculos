import { useEffect, useState } from "react";
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
  onEntitySelect?: (entity: any) => void;
  refresh?: number;
}
export interface FormBrowserRef {
  refresh: () => void;
}
export default function FormBrowser({
  searchApiUrl,
  searchApiMethod,
  relatedApiUrl,
  relatedApiMethod,
  entityLabel,
  renderEntity,
  renderRelated,
  onEntitySelect,
  defaultOption = `Buscar ${entityLabel || "..."}`,
  refresh = 0,
}: FormBrowserProps) {
  const [entity, setEntity] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (entity) {
      setLoading(true);
      fetch(relatedApiUrl(entity), { method: relatedApiMethod })
        .then((res) => res.json())
        .then((data) => {
          setRelated(Array.isArray(data) ? data : []);
        })
        .finally(() => setLoading(false));
    } else {
      setRelated([]);
    }
  }, [entity, refresh]);

  const handleEntitySelect = (ent: any) => {
    setEntity(ent);
    if (onEntitySelect) onEntitySelect(ent);
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
