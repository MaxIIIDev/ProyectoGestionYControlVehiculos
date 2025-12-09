import { useState } from "react";
import FormCard from "../../src/Components/Form/FormCard";
import FormButtons from "../../src/Components/Form/FormButtons";
import ComboBoxBrowser from "../../src/Components/FormBuscador/ComboBoxBrowser";

import { endpointsAPI } from "../../src/Components/Routes/Enrouters";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import FormInput from "../../src/Components/Form/FormInput";

export default function NuevoExcepcional() {
  const navigate = useNavigate();
  const initialState = {
    IdVehiculo: 0,
    aceite: false,
    filtroDeAceite: false,
    filtroDeAire: false,
    filtroDeCombustible: false,
    bombaCombustible: false,
    correaPolyV: false,
    correaDentada: false,
    alineoBalanceo: false,
    bombaAgua: false,
    bombaAceite: false,
    bujias: false,
    kmService: 0,
    excepcional: true,
    servicioExcepcional: "",
    proveedor: "",
    detalle: "",
    realizado: false,
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
      title: "Service registrado con éxito",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Aceptar y continuar",
      cancelButtonText: "Aceptar y volver al inicio",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } else {
        navigate("/");
      }
    });
  };
  const handleError = (errorMessage: unknown) => {
    Swal.fire({
      title: "Error al registrar el service",
      text:
        errorMessage instanceof Error
          ? errorMessage.message
          : String(errorMessage),
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (formData.IdVehiculo === 0) {
      newErrors.IdVehiculo = "Selecciona un vehículo";
    }

    return newErrors;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.IdVehiculo) {
        handleError(validationErrors.IdVehiculo);
      }
      return;
    }
    const dataParaBackend = {
      IdVehiculo: formData.IdVehiculo,
      Aceite: false,
      FiltroDeAceite: false,
      FiltroDeAire: false,
      FiltroDeCombustible: false,
      BombaCombustible: false,
      CorreaPolyV: false,
      CorreaDentada: false,
      AlineoBalanceo: false,
      BombaAgua: false,
      BombaAceite: false,
      Bujias: false,
      KmService: formData.kmService,
      Excepcional: true,
      ServicioExcepcional: formData.servicioExcepcional,
      Proveedor: formData.proveedor,
      Detalle: "",
      Realizado: false,
      Estado: true,
      Fecha: new Date().toISOString().split("T")[0],
    };
    console.log("Datos para backend:", formData);
    try {
      const response = await fetch(endpointsAPI.mantenimiento.nuevo.action, {
        method: endpointsAPI.mantenimiento.nuevo.method,
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
      <FormCard
        title="CHECKLIST DE VEHICULO"
        classNameCard="bg-dark text-white rounded-4 shadow-lg p-4 w-100"
      >
        <form name="checklistForm" onSubmit={handleSubmit}>
          <div className="mb-5 w-50 text-center mx-auto">
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
            {errors.IdVehiculo && (
              <div className="text-danger">{errors.IdVehiculo}</div>
            )}
            {/**DIV EN ORDEN OJ */}
          </div>
          <div className="row w-100 mx-auto">
            <div className="col-6">
              <FormInput
                type="text"
                label="Kilometraje del Servicio"
                name="KmService"
                placeholder="Kilometraje del Servicio"
                value={formData.kmService}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    kmService: Number(e.target.value),
                  })
                }
                required={true}
              />
            </div>
            <div className="col-6">
              <FormInput
                type="text"
                label="Proveedor"
                name="Proveedor"
                placeholder="Proveedor"
                value={formData.proveedor}
                onChange={(e) =>
                  setFormData({ ...formData, proveedor: e.target.value })
                }
                required={false}
              />
            </div>
          </div>
          <FormInput
            type="text"
            label="Descripcion del Servicio Excepcional"
            name="ServicioExcepcional"
            placeholder="Servicio Excepcional"
            value={formData.servicioExcepcional}
            onChange={(e) =>
              setFormData({
                ...formData,
                servicioExcepcional: e.target.value,
              })
            }
            as="textarea"
            rows={15}
            required={false}
          />
          <div className="d-flex justify-content-between w-100 mx-auto gap-3"></div>
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
