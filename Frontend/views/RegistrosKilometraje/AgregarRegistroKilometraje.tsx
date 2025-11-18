import Form from "../../src/Components/Form/Form";
import FormCard from "../../src/Components/Form/FormCard";
import FormInput from "../../src/Components/Form/FormInput";
import endpointsAPI from "../../src/Components/Routes/Enrouters";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../src/Utils/Errors.utils";
import React, { useState } from "react";
import {
  ControlKilometrajeSchema,
  type ControlKilometrajeSchemaType,
} from "../../types/ControlKilometraje.schema";
import { formatZodErrors } from "../../src/Utils/Validation.utils";
import FormButtons from "../../src/Components/Form/FormButtons";

export const AgregarRegistroKilometraje = () => {
  const navigate = useNavigate();
  const initialState: ControlKilometrajeSchemaType = {
    KilometrajeActual: 0,
  };
  const [formData, setFormData] =
    useState<ControlKilometrajeSchemaType>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
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
      text: getErrorMessage(errorMessage, "kilometraje"),
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };

  return (
    <>
      {
        <FormCard
          title="Registrar Kilometraje"
          classNameCard="mb-1 bg-dark text-white  rounded-5 "
          classNameHeader="fs-1 text-white text-center border-0 rounded-5"
          styleHeader={{
            marginTop: "8px",
            borderBottom: " 1px solid white",
            background: "transparent",
          }}
          classNameBody="fs-5 p-1">
          <div></div>
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
                type="number"
                name="KilometrajeActual"
                placeholder="Kilometraje Actual"
                value={formData.KilometrajeActual}
                onChange={handleChange}
                required={true}
                error={errors.KilometrajeActual}></FormInput>
              <FormButtons
                initialState={initialState}
                setFormData={setFormData}
                formClear={formCleanTextErrors}></FormButtons>
            </Form>
          }
        </FormCard>
      }
    </>
  );
};
