import Form from "../../src/Components/Form/Form";
import FormCard from "../../src/Components/Form/FormCard";
import FormInput from "../../src/Components/Form/FormInput";
import endpointsAPI from "../../src/Components/Routes/Enrouters";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../src/Utils/Errors.utils";
import React, { useEffect, useState } from "react";
import {
  ControlKilometrajeSchema,
  type ControlKilometrajeSchemaType,
} from "../../types/ControlKilometraje.schema";
import { formatZodErrors } from "../../src/Utils/Validation.utils";
import FormButtons from "../../src/Components/Form/FormButtons";
import ComboBoxBrowser from "../../src/Components/FormBuscador/ComboBoxBrowser";
import ResultInfo from "../../src/Components/FormBuscador/ResultInfo";

export const AgregarRegistroKilometraje = () => {
  const navigate = useNavigate();
  const initialState: ControlKilometrajeSchemaType = {
    IdVehiculo: 0,
    Kilometraje: 0,
  };
  const [formData, setFormData] =
    useState<ControlKilometrajeSchemaType>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [Vehiculo, setVehiculo] = useState<{
    [key: string]: string | number;
  }>();
  const [latestKm, setLatestKm] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const valorFinal =
      name === "Kilometraje" || name === "IdVehiculo"
        ? parseInt(value) || 0
        : value;
    setFormData({ ...formData, [name]: valorFinal });
  };
  const desbloquearSegundoFormulario: boolean =
    Vehiculo != null && parseInt(Vehiculo.idVehiculo.toString()) > 0
      ? true
      : false;

  const ValidateForm = (): boolean => {
    const validateFromZod = ControlKilometrajeSchema.safeParse(formData);
    if (!validateFromZod.success) {
      const newErrors = formatZodErrors(validateFromZod.error);
      setErrors(newErrors);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

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
      setVehiculo((previousDataFromVehiculo) => ({
        ...previousDataFromVehiculo,
        Kilometraje: formData.Kilometraje,
      }));
      setLatestKm(formData.Kilometraje);
      console.log(Vehiculo);
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
        Kilometraje: latestKm,
        IdVehiculo:
          Vehiculo && Vehiculo.idVehiculo
            ? parseInt(Vehiculo.idVehiculo.toString())
            : 0,
      });
    });
  };

  useEffect(() => {
    if (!formData.IdVehiculo || formData.IdVehiculo <= 0) return;

    const fetchData = async () => {
      try {
        const responseFromApi = await fetch(
          endpointsAPI.controlKilometraje.buscarUltimoRegistroPorVehiculoId.action(
            formData.IdVehiculo!
          ),
          {
            method:
              endpointsAPI.controlKilometraje.buscarUltimoRegistroPorVehiculoId
                .method,
          }
        );
        if (responseFromApi.status === 404) {
          setFormData((previousData) => ({
            ...previousData,
            Kilometraje: 0,
          }));
          setLatestKm(0);
          return;
        }
        if (!responseFromApi.ok) {
          throw new Error(await responseFromApi.text());
        }
        const data = await responseFromApi.json();

        setFormData({
          IdVehiculo: data.idVehiculo ?? 0,
          Kilometraje: data.kilometraje ?? 0,
        });
        setLatestKm(data.kilometraje ?? 0);
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
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
              setLatestKm(0);
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
                  { label: "Kilometraje Actual", value: `${latestKm}km` },
                ]}></ResultInfo>
            </div>
          )}
        </FormCard>
        {desbloquearSegundoFormulario && (
          <FormCard
            title="Registrar Kilometraje"
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
              <Form
                name="vehiculoForm"
                method={endpointsAPI.controlKilometraje.nuevo.method}
                action={endpointsAPI.controlKilometraje.nuevo.action}
                validateForm={ValidateForm}
                onSuccess={handleSuccess}
                onError={handleError}>
                <FormInput
                  label="Kilometraje Actual"
                  type="text"
                  name="Kilometraje"
                  placeholder="Kilometraje Actual"
                  value={formData.Kilometraje}
                  onChange={handleChange}
                  required={true}
                  error={errors.Kilometraje}
                  disabled={!desbloquearSegundoFormulario}></FormInput>
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
                  disabledSubmitButton={
                    !desbloquearSegundoFormulario
                  }></FormButtons>
              </Form>
            }
          </FormCard>
        )}
      </FormCard>
    </div>
  );
};
