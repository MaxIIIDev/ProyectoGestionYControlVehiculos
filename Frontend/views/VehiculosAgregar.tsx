import { Col, Form, Row } from "react-bootstrap";
import FormInput from "../src/Components/FormInput";
import FormCard from "../src/Components/FormCard";
import React, { useState } from "react";
import FormButtons from "../src/Components/FormButtons";

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

  const [formData, setFormData] = useState({
    Marca: "",
    Modelo: "",
    Anio: "",
    Patente: "",
    Color: "",
    NumeroChasis: "",
    NumeroMotor: "",
    CantidadNeumaticos: "",
    CantidadAuxilios: "",
  });

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
        <Form>
          <Row
            className="mb-1"
            style={{
              border: "1px solid white ",
              margin: "20px",
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
              />
            </Col>
          </Row>

          <FormButtons setFormData={setFormData} initialState={initialState} />
        </Form>
      </FormCard>
    </>
  );
}
