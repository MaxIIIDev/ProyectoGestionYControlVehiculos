import { Col, Row } from "react-bootstrap";
import FormInput from "../src/Components/FormInput";
import FormCard from "../src/Components/FormCard";
import React, { useState } from "react";
import FormButtons from "../src/Components/FormButtons";
import Form from "../src/Components/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { endpoints } from "../src/Components/Routes/Enrouters";

export default function VehiculoAgregar() {
  const initialState = {
    Marca: "",
    Modelo: "",
    Anio: "",
    Patente: "",
    Color: "",
    NumeroChasis: "",
    NumeroMotor: "",
    CantidadNeumaticos: "",
    CantidadAuxilios: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const ValidateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (formData.Marca.trim().length < 3 || formData.Marca.trim().length > 50) {
      newErrors.Marca = "La marca debe tener entre 3 y 50 caracteres";
    }

    if (
      !formData.Modelo.trim() ||
      formData.Modelo.trim().length < 3 ||
      formData.Modelo.trim().length > 50
    ) {
      newErrors.Modelo =
        "El modelo es requerido y debe tener entre 3 y 50 caracteres";
    }
    const currentYear = new Date().getFullYear();
    if (
      !formData.Anio ||
      isNaN(Number(formData.Anio)) ||
      Number(formData.Anio) < 1900 ||
      Number(formData.Anio) > currentYear
    ) {
      newErrors.Anio = `El año es requerido y debe estar entre 1900 y ${currentYear}`;
    }
    if (
      !formData.Patente.trim() ||
      formData.Patente.trim().length < 3 ||
      formData.Patente.trim().length > 20
    ) {
      newErrors.Patente =
        "La patente es requerida y debe tener entre 3 y 20 caracteres";
    }
    if (
      !formData.Color.trim() ||
      formData.Color.trim().length < 3 ||
      formData.Color.trim().length > 50
    ) {
      newErrors.Color =
        "El color es requerido y debe tener entre 3 y 50 caracteres";
    }
    if (
      !formData.CantidadNeumaticos ||
      isNaN(Number(formData.CantidadNeumaticos)) ||
      Number(formData.CantidadNeumaticos) < 0 ||
      Number(formData.CantidadNeumaticos) > 20
    ) {
      newErrors.CantidadNeumaticos =
        "La cantidad de neumáticos es requerida y debe estar entre 0 y 20";
    }
    if (
      !formData.CantidadAuxilios ||
      isNaN(Number(formData.CantidadAuxilios)) ||
      Number(formData.CantidadAuxilios) < 0 ||
      Number(formData.CantidadAuxilios) > 20
    ) {
      newErrors.CantidadAuxilios =
        "La cantidad de auxilios es requerida y debe estar entre 0 y 20";
    }
    if (
      !formData.NumeroChasis.trim() ||
      formData.NumeroChasis.trim().length < 3 ||
      formData.NumeroChasis.trim().length > 50
    ) {
      newErrors.NumeroChasis =
        "El número de chasis es requerido y debe tener entre 3 y 50 caracteres";
    }
    if (
      !formData.NumeroMotor.trim() ||
      formData.NumeroMotor.trim().length < 3 ||
      formData.NumeroMotor.trim().length > 50
    ) {
      newErrors.NumeroMotor =
        "El número de motor es requerido y debe tener entre 3 y 50 caracteres";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
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
          method={endpoints.vehiculos.nuevo.method}
          action={endpoints.vehiculos.nuevo.action}
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
