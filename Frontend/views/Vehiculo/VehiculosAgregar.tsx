import { Col, Row } from "react-bootstrap";
import FormInput from "../../src/Components/Form/FormInput";
import FormCard from "../../src/Components/Form/FormCard";
import React, { useState } from "react";
import FormButtons from "../../src/Components/Form/FormButtons";
import Form from "../../src/Components/Form/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { endpointsAPI } from "../../src/Components/Routes/Enrouters";
import {
  VehiculoSchema,
  type VehiculoSchemaType,
} from "../../types/Vehiculo.schema";
import { formatZodErrors } from "../../src/Utils/Validation.utils";

export default function VehiculoAgregar() {
  const navigate = useNavigate();
  const initialState: VehiculoSchemaType = {
    Marca: "",
    Modelo: "",
    Anio: 0,
    Patente: "",
    Color: "",
    NumeroChasis: "",
    NumeroMotor: "",
    CantidadNeumaticos: 0,
    CantidadAuxilios: 0,
  };

  const [formData, setFormData] = useState<VehiculoSchemaType>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formCleanTextErrors = () => {
    setErrors({});
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
  const ValidateForm = (): boolean => {
    const validationResult = VehiculoSchema.safeParse(formData);
    if (!validationResult.success) {
      const newErrors = formatZodErrors(validationResult.error);
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <FormCard
        title="Registrar Vehiculo Nuevo"
        classNameCard="mb-1 bg-dark text-white  rounded-5 "
        classNameHeader="fs-1 text-white text-center border-0 rounded-5"
        styleHeader={{
          marginTop: "8px",
          borderBottom: " 1px solid white",
          background: "transparent",
        }}
        classNameBody="fs-5 p-1"
        styleCard={{
          margin: "0 auto",
          border: " 0.1px solid grey",
          marginTop: "1px",
          borderRadius: "10px",
          boxShadow:
            "inset 0 0 16px 4px rgba(255, 255, 255, 0.86), inset 0 0 32px 0 rgba(0,0,0,0.15)",
        }}
      >
        <Form
          name="vehiculoForm"
          method={endpointsAPI.vehiculos.nuevo.method}
          action={endpointsAPI.vehiculos.nuevo.action}
          validateForm={ValidateForm}
          onSuccess={handleSuccess}
          onError={handleError}
        >
          <Row
            className="mb-1"
            style={{
              border: "1px solid white ",
              marginLeft: "20px",
              marginRight: "20px",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <h3
              style={{
                borderBottom: "1px dashed white",
                marginBottom: "3px",
                padding: "10px",
              }}
            >
              Información del Vehículo
            </h3>
            <Col md="3">
              <FormInput
                label="Marca"
                type="text"
                name="Marca"
                placeholder="Marca"
                value={formData.Marca}
                onChange={handleChange}
                required={true}
                error={errors.Marca}
              />
            </Col>
            <Col md="3">
              <FormInput
                label="Modelo"
                type="text"
                name="Modelo"
                placeholder="Modelo"
                value={formData.Modelo}
                onChange={handleChange}
                required={true}
                error={errors.Modelo}
              />
            </Col>
            <Col md="1">
              <FormInput
                label="Año"
                type="number"
                name="Anio"
                placeholder="Año"
                value={formData.Anio}
                onChange={handleChange}
                required={true}
                error={errors.Anio}
              />
            </Col>
            <Col md="3">
              <FormInput
                label="Patente"
                type="text"
                name="Patente"
                placeholder="Patente"
                value={formData.Patente}
                onChange={handleChange}
                required={true}
                error={errors.Patente}
              />
            </Col>
            <Col md="2">
              <FormInput
                label="Color"
                type="text"
                name="Color"
                placeholder="Color"
                value={formData.Color}
                onChange={handleChange}
                required={true}
                error={errors.Color}
              />
            </Col>
          </Row>
          <Row
            className="mb-3"
            style={{
              margin: "20px",
              border: "1px solid white ",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <h3
              style={{
                borderBottom: "1px dashed white",
                marginBottom: "3px",
                padding: "10px",
              }}
            >
              Informacion Tecnica
            </h3>
            <Col>
              <FormInput
                label="Numero de Chasis"
                type="text"
                name="NumeroChasis"
                placeholder="Numero de Chasis"
                value={formData.NumeroChasis}
                onChange={handleChange}
                required={true}
                error={errors.NumeroChasis}
              />
            </Col>
            <Col>
              <FormInput
                label="Numero de Motor"
                type="text"
                name="NumeroMotor"
                placeholder="Numero de Motor"
                value={formData.NumeroMotor}
                onChange={handleChange}
                required={true}
                error={errors.NumeroMotor}
              />
            </Col>
          </Row>
          <Row
            className="mb-3"
            style={{
              margin: "20px",
              border: "1px solid white ",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <h3
              style={{
                borderBottom: "1px dashed white",
                marginBottom: "3px",
                padding: "10px",
              }}
            >
              Información de Neumáticos
            </h3>
            <Col md="6">
              <FormInput
                label="Cantidad Neumáticos"
                type="number"
                name="CantidadNeumaticos"
                placeholder="Cantidad Neumáticos"
                value={formData.CantidadNeumaticos}
                onChange={handleChange}
                required={true}
                error={errors.CantidadNeumaticos}
              />
            </Col>
            <Col md="6">
              <FormInput
                label="CantidadAuxilios"
                type="number"
                name="CantidadAuxilios"
                placeholder="Cantidad Auxilios"
                value={formData.CantidadAuxilios}
                onChange={handleChange}
                required={true}
                error={errors.CantidadAuxilios}
              />
            </Col>
          </Row>

          <FormButtons
            setFormData={setFormData}
            initialState={initialState}
            formClear={formCleanTextErrors}
          />
        </Form>
      </FormCard>
    </>
  );
}
