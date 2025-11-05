import { Col, Form, Row } from "react-bootstrap";
import FormInput from "../src/Components/FormInput";
import FormCard from "../src/Components/FormCard";
import { CardButton } from "../src/Components";

export default function VehiculoAgregar() {
  return (
    <div className=" ">
      <FormCard 
        title="Registrar Vehiculo Nuevo" 
        classNameCard="mb-5 bg-dark text-white  rounded-5 " 
        classNameHeader="fs-1 bg-dark text-white text-center border-0 rounded-5" 
        styleHeader={{ marginTop: '10px',  borderBottom:" 1px solid white"}}
        classNameBody="fs-5 p-1"  
        styleCard={{  
          margin: '0 auto', 
          border:" 0.1px solid grey",
          marginTop: '50px', 
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Form>

          <Row className="mb-3" style={{border:"1px solid white ", margin:"20px", padding:"20px", borderRadius:"10px"}}>
            <h3 style={{borderBottom:"1px dashed white", marginBottom:"10px", padding:"10px"}}>Información del Vehículo</h3>
            <Col md="5">
                <FormInput
                  label="Marca"
                  type="text"
                  name="Marca"
                  placeholder="Marca"
                  value=""
                  
                  onChange={() => {}}
                  required={true}
                />
            </Col>
            <Col md="5">
              <FormInput
                label="Modelo"
                type="text"
                name="Modelo"
                placeholder="Modelo"
                value=""
                onChange={() => {}}
                required={true}
              />
            </Col>
            <Col md="2">
              <FormInput
                label="Año"
                type="number"
                name="Anio"
                placeholder="Año"
                value=""
                onChange={() => {}}
                required={true}
              />
            </Col>
            <Col md="5">
              <FormInput
                label="Patente"
                type="text"
                name="Patente"
                placeholder="Patente"
                value=""
                onChange={() => {}}
                required={true}
              />
            </Col>
            <Col md="5">
              <FormInput
                label="Color"
                type="text"
                name="Color"
                placeholder="Color"
                value=""
                onChange={() => {}}
                required={true}
              />
            </Col>
          </Row>
          <Row className="mb-3" style={{ margin:"20px", border:"1px solid white ", padding:"20px", borderRadius:"10px"}}>
            <h3 style={{borderBottom:"1px dashed white", marginBottom:"10px", padding:"10px"}}>Informacion Tecnica</h3>
            <Col>
              <FormInput
                label="Numero de Chasis"
                type="text"
                name="NumeroChasis"
                placeholder="Numero de Chasis"
                value=""
                onChange={() => {}}
                required={true}
              />
            </Col>
            <Col>
              <FormInput
                label="Numero de Motor"
                type="text"
                name="NumeroMotor"
                placeholder="Numero de Motor"
                value=""
                onChange={() => {}}
                required={true}
              />
            </Col>
          </Row>
          <Row className="mb-3" style={{ margin:"20px", border:"1px solid white ", padding:"20px", borderRadius:"10px"}}>
            <h3 style={{borderBottom:"1px dashed white", marginBottom:"10px", padding:"10px"}}>Información de Neumáticos</h3>
            <Col>
              <FormInput
                label="Cantidad Neumáticos"
                type="number"
                name="CantidadNeumaticos"
                placeholder="Cantidad Neumáticos"
                value=""
                onChange={() => {}}
                required={true}
              />
            </Col>
            <Col>
              <FormInput
                label="CantidadAuxilios"
                type="number"
                name="CantidadAuxilios"
                placeholder="Cantidad Auxilios"
                value=""
                onChange={() => {}}
                required={true}
              />
            </Col>
          </Row>
            

          <CardButton iconClass="bi bi-send"
            onClick={() => {}}
            text="Enviar"
            style={{ background: "#7CB865", height: "60px", width: "120px", fontSize: "16px" }}
            className="float-end mb-3 me-3"
            />
        </Form>
      </FormCard>
    </div>
  );
}
