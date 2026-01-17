import {
  NeumaticoSchema,
  type NeumaticoType,
} from "../../types/Neumatico.schema";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../src/Utils/Errors.utils";
import FormCard from "../../src/Components/Form/FormCard";
import {
  endpointFront,
  endpointsAPI,
} from "../../src/Components/Routes/Enrouters";
import { formatZodErrors } from "../../src/Utils/Validation.utils";
import FormInput from "../../src/Components/Form/FormInput";
import ChecklistInput from "../../src/Components/Form/ChecklistInput";
import FormButtons from "../../src/Components/Form/FormButtons";
import { useEffect, useState } from "react";
export const AgregarNeumatico = () => {
  const navigate = useNavigate();

  const intialState: NeumaticoType = {
    NroSerie: 0,
    Marca: "",
    Medida: "",
    Estandar: false,
    KmRodados: 0,
    DesgasteIrregular: false,
    Estado: true,
    FechaColocacion: null,
  };
  const [getNeumatico, setNeumatico] = useState<NeumaticoType>(intialState);
  const [getErrors, setErrors] = useState<{ [key: string]: string }>({});
  const cleanErrors = () => {
    setErrors({});
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const finalValue =
      type === "checkbox"
        ? checked
        : name == "NroSerie" || name == "KmRodados"
        ? parseInt(value) || 0
        : value;

    setNeumatico({
      ...getNeumatico,
      [name]: finalValue,
    });
  };
  useEffect(() => {
    console.log(getNeumatico);
  }, [getNeumatico]);

  // useEffect(() => {
  //   const getPosicionesNeumaticos = async () => {
  //     try {
  //       const response = await fetch(
  //         endpointsAPI.posicionNeumatico.Listar.action,
  //         {
  //           method: endpointsAPI.posicionNeumatico.Listar.method,
  //         }
  //       );
  //       if (!response.ok) return;
  //       const data = await response.json();
  //       if (!data.items) return;
  //       const posicionesNeumaticosParser = z
  //         .array(PosicionesNeumaticosApiParser)
  //         .parse(data.items);

  //       const opciones: Option[] = posicionesNeumaticosParser.map((v) => {
  //         const Option: Option = {
  //           label: v.Nombre!,
  //           value: v.IdPosicionNeumatico!.toString(),
  //           original: {
  //             ...v,
  //             IdPosicionNeumatico: v.IdPosicionNeumatico!.toString(),
  //           },
  //         };
  //         return Option;
  //       });

  //       setPosicionesNeumaticos(opciones);
  //     } catch (error) {
  //       onError(error);
  //     }
  //   };
  //   getPosicionesNeumaticos();
  //   console.log("Posiciones neumaticos:", getPosicionesNeumaticos);
  // }, []);
  const validateForm = (): boolean => {
    const validateFromZod = NeumaticoSchema.safeParse(getNeumatico);
    if (!validateFromZod.success) {
      const newErrors = formatZodErrors(validateFromZod.error);
      setErrors(newErrors);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };
  const onSuccess = () => {
    Swal.fire({
      title: "Kilometraje registrado con éxito",
      icon: "success",
      confirmButtonText: "Aceptar y continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(endpointFront.neumaticos.gestion.action);
        return;
      } else {
        return;
      }
    });
  };
  const onError = (errorMessage: unknown) => {
    Swal.fire({
      title: "Error al registrar el neumático",
      text: getErrorMessage(errorMessage, "neumatico"),
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validateFormResult = validateForm();
    if (!validateFormResult) {
      return;
    }
    const dataParaBackend = {
      IdNeumatico: getNeumatico.IdNeumatico,
      NroSerie: getNeumatico.NroSerie,
      Marca: getNeumatico.Marca,
      Medida: getNeumatico.Medida,
      Estandar: getNeumatico.Estandar,
      KmRodados: getNeumatico.KmRodados,
      DesgasteIrregular: getNeumatico.DesgasteIrregular,
      Estado: getNeumatico.Estado,
    };
    console.log("Datos para backend:", getNeumatico);
    try {
      const response = await fetch(endpointsAPI.neumaticos.nuevo.action, {
        method: endpointsAPI.neumaticos.nuevo.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataParaBackend),
      });
      if (response.ok) onSuccess();
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
        title="Registrar Neumatico"
        classNameCard="bg-dark rounded-5 text-white "
        styleCard={{ maxWidth: "600px" }}
        classNameHeader="text-center fs-2"
        classNameBody="fs-4">
        <form
          name="AgregarNeumaticoForm"
          onSubmit={handleSubmit}
          onError={onError}>
          <FormInput
            name="NroSerie"
            label="NroSerie"
            type="text"
            placeholder="Ingrese el número de serie"
            required={false}
            value={getNeumatico.NroSerie}
            onChange={onChange}
            error={getErrors.NroSerie}></FormInput>
          <FormInput
            name="Marca"
            label="Marca"
            type="text"
            placeholder="Ingrese la marca"
            required={false}
            value={getNeumatico.Marca}
            onChange={onChange}
            error={getErrors.Marca}></FormInput>
          <FormInput
            name="Medida"
            label="Medida"
            type="text"
            placeholder="Ingrese la medida"
            required={false}
            value={getNeumatico.Medida}
            onChange={onChange}
            error={getErrors.Medida}></FormInput>
          <ChecklistInput
            name="Estandar" //todo: El backend tira que Estandar es requerido
            label="Estandar"
            value={getNeumatico.Estandar!}
            onChange={(value) =>
              setNeumatico({ ...getNeumatico, Estandar: value })
            }
            error={getErrors.Estandar}></ChecklistInput>

          <FormInput
            name="KmRodados"
            label="Km Rodados"
            type="text"
            placeholder="Ingrese el Km Rodados"
            required={false}
            value={getNeumatico.KmRodados}
            onChange={onChange}
            error={getErrors.KmRodados}></FormInput>
          <ChecklistInput
            name="DesgasteIrregular"
            label="Desgaste Irregular"
            value={getNeumatico.DesgasteIrregular!}
            onChange={(value) =>
              setNeumatico({ ...getNeumatico, DesgasteIrregular: value })
            }
            error={getErrors.DesgasteIrregular}></ChecklistInput>

          <FormButtons
            setFormData={setNeumatico}
            initialState={intialState}
            formClear={cleanErrors}></FormButtons>
        </form>
      </FormCard>
    </div>
  );
};
