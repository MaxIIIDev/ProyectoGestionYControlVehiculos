import Form from "../../src/Components/Form/Form";
import FormCard from "../../src/Components/Form/FormCard";
import FormInput from "../../src/Components/Form/FormInput";
import endpointsAPI from "../../src/Components/Routes/Enrouters";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../src/Utils/Errors.utils";
import React, { useEffect, useState } from "react";

import FormButtons from "../../src/Components/Form/FormButtons";
import ComboBoxBrowser from "../../src/Components/FormBuscador/ComboBoxBrowser";
import ResultInfo from "../../src/Components/FormBuscador/ResultInfo";

export const AsignarMatafuegoAVehiculo = () => {
  const navigate = useNavigate();
  const initialState = {
    IdVehiculo: 0,
    IdMatafuego: 0,
  };
  const [formData, setFormData] = useState<{
    IdVehiculo: number;
    IdMatafuego: number;
  }>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [Vehiculo, setVehiculo] = useState<{
    [key: string]: string | number;
  }>();
  const [Matafuego, setMatafuego] = useState<{
    [key: string]: string | number;
  }>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const valorFinal =
      name === "IdVehiculo" || name === "IdMatafuego"
        ? parseInt(value) || 0
        : 0;
    setFormData({ ...formData, [name]: valorFinal });
  };
  const desbloquearSegundoFormulario: boolean =
    Vehiculo != null && parseInt(Vehiculo.idVehiculo.toString()) > 0
      ? true
      : false;
  const validateForm: boolean = formData
    ? formData.IdVehiculo > 0 && formData.IdMatafuego > 0
    : false;
  const formCleanTextErrors = () => {
    setErrors({});
  };

  const handleSuccess = () => {
    Swal.fire({
      title: "Kilometraje registrado con éxito",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Aceptar y continuar",
      cancelButtonText: "Aceptar y volver al inicio",
    }).then((result) => {
      if (result.isConfirmed) {
        return;
      } else {
        navigate("/");
      }
    });
  };

  const handleError = (errorMessage: unknown) => {
    Swal.fire({
      title: "Error al registrar el kilometraje",
      text: getErrorMessage(errorMessage, "kilometraje "),
      icon: "error",
      confirmButtonText: "Aceptar",
    }).then(() => {
      setFormData({
        IdVehiculo:
          Vehiculo && Vehiculo.idVehiculo
            ? parseInt(Vehiculo.idVehiculo.toString())
            : 0,
        IdMatafuego:
          Matafuego && Matafuego.idMatafuego
            ? parseInt(Matafuego.idMatafuego.toString())
            : 0,
      });
    });
  };
  useEffect(() => {
    if (formData.IdMatafuego && formData.IdVehiculo == 0) {
      formData.IdMatafuego = 0;
    }
    console.log("formData: " + JSON.stringify(formData));
  }, [formData.IdVehiculo]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
        width: "100%",
        height: "100%",
      }}>
      <FormCard
        title="Registros Km"
        classNameCard="mb-1 bg-dark text-white  rounded-5 "
        classNameHeader="fs-1 text-white text-center border-0 rounded-5"
        styleBody={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}>
        <FormCard
          title="Buscar Vehiculo"
          classNameCard="mb-1 bg-dark text-white  rounded-5 "
          classNameHeader="fs-2 text-white text-center border-0 rounded-5"
          styleCard={{
            maxWidth: "80%",
            padding: "20px",
            minWidth: "600px",
            minHeight: "200px",
          }}
          styleHeader={{ fontFamily: "serif" }}
          classNameBody="fs-5 p-1">
          <ComboBoxBrowser
            apiUrl={endpointsAPI.vehiculos.buscarPorPatenteLike.action("")}
            apiMethod={endpointsAPI.vehiculos.buscarPorPatenteLike.method}
            onEntitySelect={(value: { [key: string]: string }) => {
              setVehiculo(value);
              setFormData({
                ...formData,
                IdVehiculo:
                  value != null && value.idVehiculo != null
                    ? parseInt(value.idVehiculo)
                    : 0,
              });
            }}
            defaultOption="Buscador por Patente"
            name="patente"
            placeholder="Buscador por Patente"></ComboBoxBrowser>
          {Vehiculo && desbloquearSegundoFormulario && (
            <div style={{ marginTop: 16 }}>
              <ResultInfo
                title="Vehiculo Seleccionado"
                info={[
                  { label: "Marca", value: `${Vehiculo.marca}` },
                  { label: "Modelo", value: `${Vehiculo.modelo}` },
                  { label: "Patente", value: `${Vehiculo.patente}` },
                ]}></ResultInfo>
            </div>
          )}
        </FormCard>
        {desbloquearSegundoFormulario && (
          <FormCard
            title="Seleccionar Matafuego"
            classNameCard="mb-1 bg-dark text-white  rounded-5 "
            classNameHeader="fs-2 text-white text-center border-0 rounded-5"
            styleCard={{
              maxWidth: "80%",
              padding: "20px",
              marginTop: "20px",
            }}
            styleHeader={{ fontFamily: "serif" }}
            classNameBody="fs-5 p-1">
            {
              <div>
                <ComboBoxBrowser
                  apiUrl={endpointsAPI.matafuegos.buscarPorNroSerie.action("")}
                  apiMethod={endpointsAPI.matafuegos.buscarPorNroSerie.method}
                  onEntitySelect={(value: { [key: string]: string }) => {
                    setMatafuego(value);
                    setFormData({
                      ...formData,
                      IdMatafuego:
                        value != null && value.idMatafuego != null
                          ? parseInt(value.idMatafuego)
                          : 0,
                    });
                  }}
                  defaultOption="Buscador por NroSerie"
                  name="NroSerie"
                  placeholder="Buscador por NroSerie"></ComboBoxBrowser>
                <Form
                  name="vehiculoForm"
                  method={endpointsAPI.vehiculos.asignarAVehiculo.method}
                  action={endpointsAPI.vehiculos.asignarAVehiculo.action(
                    formData.IdVehiculo,
                    formData.IdMatafuego
                  )}
                  validateForm={() => {
                    if (formData.IdVehiculo <= 0) {
                      errors.IdVehiculo =
                        "Debe seleccionar un vehículo válido.";
                      return false;
                    }
                    if (formData.IdMatafuego <= 0) {
                      errors.IdMatafuego =
                        "Debe seleccionar un matafuego válido.";
                      return false;
                    }
                    return true;
                  }}
                  onSuccess={handleSuccess}
                  onError={handleError}>
                  <FormInput
                    type="hidden"
                    name="IdMatafuego"
                    value={formData.IdMatafuego ? formData.IdMatafuego : 0}
                    onChange={handleChange}
                    required={false}
                    error={errors.IdMatafuego}></FormInput>
                  <FormInput
                    type="hidden"
                    name="IdVehiculo"
                    value={formData.IdVehiculo ? formData.IdVehiculo : 0}
                    onChange={handleChange}
                    required={false}
                  />

                  {!desbloquearSegundoFormulario && (
                    <div
                      className="mt-1"
                      style={{
                        color: "#ffc506ff",
                        fontSize: "0.9em",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        paddingLeft: "10px",
                      }}>
                      <i className="bi bi-info-circle"></i>
                      <span>
                        Seleccione un vehículo arriba para habilitar este campo.
                      </span>
                    </div>
                  )}
                  <FormButtons
                    initialState={initialState}
                    setFormData={setFormData}
                    formClear={formCleanTextErrors}
                    disabledSubmitButton={!validateForm}></FormButtons>
                </Form>
              </div>
            }
          </FormCard>
        )}
      </FormCard>
    </div>
  );
};
