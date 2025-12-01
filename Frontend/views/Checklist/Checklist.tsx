import { useState, useEffect } from "react";
import FormCard from "../../src/Components/Form/FormCard";
import FormButtons from "../../src/Components/Form/FormButtons";
import ComboBoxBrowser from "../../src/Components/FormBuscador/ComboBoxBrowser";
import Checklistinput from "../../src/Components/Form/ChecklistInput";
import { endpointsAPI } from "../../src/Components/Routes/Enrouters";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Checklist() {
  const navigate = useNavigate();
  const initialState = {
    IdVehiculo: 0,
    fecha: new Date().toISOString(),
    faroDelanteroIzquierdo: true,
    faroDelanteroDerecho: true,
    faroTraseroIzquierdo: true,
    faroTraseroDerecho: true,
    liquidoFrenos: true,
    nivelAceite: true,
    presionNeumaticos: true,
    nivelFrenos: true,
    matafuegoVigente: true,
    nivelRefrigerante: true,
    nivelAguaParabrisas: true,
    observaciones: "",
    estado: true,
  };
  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formCleanTextErrors = () => {
    setErrors({});
    setFormData(initialState);
  };

  const handleSuccess = () => {
    Swal.fire({
      title: "Vehículo registrado con éxito",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Aceptar y continuar",
      cancelButtonText: "Aceptar y volver al inicio",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(initialState);
      } else {
        navigate("/");
      }
    });
  };
  const handleError = (errorMessage: unknown) => {
    Swal.fire({
      title: "Error al registrar el vehículo",
      text:
        errorMessage instanceof Error
          ? errorMessage.message
          : String(errorMessage),
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.IdVehiculo === 0) {
      setErrors({ IdVehiculo: "Selecciona un vehículo" });
      return;
    }
    const dataParaBackend = {
      IdVehiculo: formData.IdVehiculo,
      Fecha: formData.fecha,
      FaroDelanteroIzquierdo: formData.faroDelanteroIzquierdo,
      FaroDelanteroDerecho: formData.faroDelanteroDerecho,
      FaroTraseroIzquierdo: formData.faroTraseroIzquierdo,
      FaroTraseroDerecho: formData.faroTraseroDerecho,
      LiquidoFrenos: formData.liquidoFrenos,
      NivelAceite: formData.nivelAceite,
      PresionNeumaticos: formData.presionNeumaticos,
      NivelFrenos: formData.nivelFrenos,
      MatafuegoVigente: formData.matafuegoVigente,
      NivelRefrigerante: formData.nivelRefrigerante,
      NivelAguaParabrisas: formData.nivelAguaParabrisas,
      Observaciones: formData.observaciones,
      Estado: formData.estado,
    };
    console.log("Datos para backend:", formData);
    try {
      const response = await fetch(endpointsAPI.checklist.nuevo.action, {
        method: endpointsAPI.checklist.nuevo.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataParaBackend),
      });
      if (response.ok) handleSuccess();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <FormCard title="Checklist de Vehículo">
        <form name="checklistForm" onSubmit={handleSubmit}>
          <ComboBoxBrowser
            apiUrl={endpointsAPI.vehiculos.buscarPorPatenteLike.action("")}
            apiMethod={endpointsAPI.vehiculos.buscarPorPatenteLike.method}
            onEntitySelect={(vehiculo) => {
              console.log("Vehículo seleccionado:", vehiculo);
              setFormData({
                ...formData,
                IdVehiculo: vehiculo ? Number(vehiculo.idVehiculo) : 0,
              });
            }}
            placeholder="Busqueda por Patente"
            name="IdVehiculo"
          />
          <Checklistinput
            label="Faro Delantero Izquierdo"
            name="faroDelanteroIzquierdo"
            value={formData.faroDelanteroIzquierdo}
            onChange={(value) =>
              setFormData({ ...formData, faroDelanteroIzquierdo: value })
            }
          />
          <Checklistinput
            label="Faro Delantero Derecho"
            name="faroDelanteroDerecho"
            value={formData.faroDelanteroDerecho}
            onChange={(value) =>
              setFormData({ ...formData, faroDelanteroDerecho: value })
            }
          />
          <Checklistinput
            label="Faro Trasero Izquierdo"
            name="faroTraseroIzquierdo"
            value={formData.faroTraseroIzquierdo}
            onChange={(value) =>
              setFormData({ ...formData, faroTraseroIzquierdo: value })
            }
          />
          <Checklistinput
            label="Faro Trasero Derecho"
            name="faroTraseroDerecho"
            value={formData.faroTraseroDerecho}
            onChange={(value) =>
              setFormData({ ...formData, faroTraseroDerecho: value })
            }
          />
          <Checklistinput
            label="Líquido de Frenos"
            name="liquidoFrenos"
            value={formData.liquidoFrenos}
            onChange={(value) =>
              setFormData({ ...formData, liquidoFrenos: value })
            }
          />
          <Checklistinput
            label="Nivel de Aceite"
            name="nivelAceite"
            value={formData.nivelAceite}
            onChange={(value) =>
              setFormData({ ...formData, nivelAceite: value })
            }
          />
          <Checklistinput
            label="Presión de Neumáticos"
            name="presionNeumaticos"
            value={formData.presionNeumaticos}
            onChange={(value) =>
              setFormData({ ...formData, presionNeumaticos: value })
            }
          />
          <Checklistinput
            label="Nivel de Frenos"
            name="nivelFrenos"
            value={formData.nivelFrenos}
            onChange={(value) =>
              setFormData({ ...formData, nivelFrenos: value })
            }
          />
          <Checklistinput
            label="Matafuego Vigente"
            name="matafuegoVigente"
            value={formData.matafuegoVigente}
            onChange={(value) =>
              setFormData({ ...formData, matafuegoVigente: value })
            }
          />
          <Checklistinput
            label="Nivel de Refrigerante"
            name="nivelRefrigerante"
            value={formData.nivelRefrigerante}
            onChange={(value) =>
              setFormData({ ...formData, nivelRefrigerante: value })
            }
          />
          <Checklistinput
            label="Nivel Agua Parabrisas"
            name="nivelAguaParabrisas"
            value={formData.nivelAguaParabrisas}
            onChange={(value) =>
              setFormData({ ...formData, nivelAguaParabrisas: value })
            }
          />
          <div className="mb-3">
            <label>Observaciones</label>
            <textarea
              className="form-control"
              value={formData.observaciones}
              onChange={(e) =>
                setFormData({ ...formData, observaciones: e.target.value })
              }
              rows={2}
              maxLength={255}
            />
          </div>

          <FormButtons
            setFormData={setFormData}
            initialState={initialState}
            formClear={formCleanTextErrors}
            disabledSubmitButton={false}
          />
        </form>
      </FormCard>
    </>
  );
}
