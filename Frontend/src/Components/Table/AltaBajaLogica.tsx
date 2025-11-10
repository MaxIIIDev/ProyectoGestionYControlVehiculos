interface AltaBajaLogicaProps {
  estado: boolean;
  methodBaja: string;
  methodAlta: string;
  endpointBaja: string;
  endpointAlta: string;
  onChange?: (nuevoEstado: boolean) => void;
}

export default function AltaBajaLogica({
  estado,
  methodBaja,
  methodAlta,
  endpointBaja,
  endpointAlta,
  onChange,
}: AltaBajaLogicaProps) {
  const handleAltaBaja = () => {
    const fetchConfig = estado
      ? { url: endpointBaja, method: methodBaja }
      : { url: endpointAlta, method: methodAlta };

    fetch(fetchConfig.url, { method: fetchConfig.method })
      .then(async (res) => {
        // Aca si la respuesta tiene contenido, parsea como JSON, si no, retorna null
        const text = await res.text();
        return text ? JSON.parse(text) : null;
      })
      .then((data) => {
        console.log(data);
        if (onChange) {
          onChange(!estado);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <button onClick={handleAltaBaja}>
      <i className={estado ? "bi bi-x-lg" : "bi bi-check-circle"}></i>
      {estado ? " Dar de Baja" : " Dar de Alta"}
    </button>
  );
}
