import { useState } from "react";
import {
  RegisterDtoSchema,
  type RegisterDtoType,
} from "../../types/RegisterUsuario.schema";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../src/Utils/Errors.utils";
import { formatZodErrors } from "../../src/Utils/Validation.utils";
import FormCard from "../../src/Components/Form/FormCard";
import {
  endpointFront,
  endpointsAPI,
} from "../../src/Components/Routes/Enrouters";
import FormInput from "../../src/Components/Form/FormInput";
import FormButtons from "../../src/Components/Form/FormButtons";

export const AgregarUsuario = () => {
  const navigate = useNavigate();

  const initialState: RegisterDtoType = {
    Nombre: "",
    Apellido: "",
    Dni: 0,
    FechaNac: new Date(),
    Gmail: "",
    Contrasena: "",
  };

  const [formData, setFormData] = useState<RegisterDtoType>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const cleanErrors = () => {
    setErrors({});
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    let finalValue: string | number | Date = value;

    if (type === "date") {
      finalValue = new Date(value);
    } else if (name === "Dni") {
      finalValue = parseInt(value) || 0;
    }

    setFormData({
      ...formData,
      [name]: finalValue,
    });
  };

  const validateForm = (): boolean => {
    const validationResult = RegisterDtoSchema.safeParse(formData);
    if (!validationResult.success) {
      const newErrors = formatZodErrors(validationResult.error);
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const onSuccess = () => {
    Swal.fire({
      title: "Usuario registrado con éxito",
      icon: "success",
      confirmButtonText: "Aceptar y continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(endpointFront.usuarios.gestion.action); // Ajusta según tu enrutador
      }
    });
  };

  const onError = (errorMessage: unknown) => {
    Swal.fire({
      title: "Error al registrar el usuario",
      text: getErrorMessage(errorMessage, "usuario"),
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Transformamos los datos al formato que espera el backend (camelCase)
    const dataParaBackend = {
      nombre: formData.Nombre,
      apellido: formData.Apellido,
      dni: formData.Dni,
      fechaNac: formData.FechaNac.toISOString().split("T")[0], // "yyyy-MM-dd"
      gmail: formData.Gmail,
      contrasena: formData.Contrasena,
    };

    console.log("Datos para backend:", dataParaBackend);

    try {
      const response = await fetch(endpointsAPI.usuarios.nuevo.action, {
        method: endpointsAPI.usuarios.nuevo.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataParaBackend),
      });
      if (response.ok) {
        onSuccess();
        return;
      }
      let errorMessage: string | undefined;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();

        errorMessage =
          errorData.message ||
          errorData.title ||
          errorData.error ||
          `Error ${response.status}`;
      } else {
        errorMessage = await response.text();
      }

      onError(errorMessage);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <FormCard
        title="Registrar Usuario"
        classNameCard="bg-dark rounded-5 text-white"
        styleCard={{ maxWidth: "700px" }}
        classNameHeader="text-center fs-2"
        classNameBody="fs-4">
        <form name="AgregarUsuarioForm" onSubmit={handleSubmit}>
          <FormInput
            name="Nombre"
            label="Nombre"
            type="text"
            placeholder="Ingrese el nombre"
            required={false}
            value={formData.Nombre}
            onChange={onChange}
            error={errors.Nombre}
          />
          <FormInput
            name="Apellido"
            label="Apellido"
            type="text"
            placeholder="Ingrese el apellido"
            required={false}
            value={formData.Apellido}
            onChange={onChange}
            error={errors.Apellido}
          />
          <FormInput
            name="Dni"
            label="DNI"
            type="text"
            placeholder="Ingrese el DNI (8 dígitos)"
            required={false}
            value={formData.Dni}
            onChange={onChange}
            error={errors.Dni}
          />
          <FormInput
            name="FechaNac"
            label="Fecha de Nacimiento"
            type="date"
            placeholder="Seleccione la fecha"
            required={false}
            value={formData.FechaNac.toISOString().split("T")[0]}
            onChange={onChange}
            error={errors.FechaNac}
          />
          <FormInput
            name="Gmail"
            label="Correo Electrónico"
            type="email"
            placeholder="ejemplo@dominio.com"
            required={false}
            value={formData.Gmail}
            onChange={onChange}
            error={errors.Gmail}
          />
          <FormInput
            name="Contrasena"
            label="Contraseña"
            type="text"
            placeholder="Debe incluir mayúscula, minúscula, número y carácter especial"
            required={false}
            value={formData.Contrasena}
            onChange={onChange}
            error={errors.Contrasena}
          />
          <FormButtons
            setFormData={setFormData}
            initialState={initialState}
            formClear={cleanErrors}
          />
        </form>
      </FormCard>
    </div>
  );
};
