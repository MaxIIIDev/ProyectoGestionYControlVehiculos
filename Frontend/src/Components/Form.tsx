import type { ReactNode } from "react";
interface FormProps {
  children?: ReactNode;
  name: string;
  method: string;
  action: string;
  target?: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  validateForm: () => boolean;
  //onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

// const handleSubmit =
//   (onSuccess?: () => void, onError?: (error: unknown) => void) =>
//   (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     fetch(e.currentTarget.action, {
//       method: e.currentTarget.method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           return response.json().then(errorBody=> {
//             let errorMessage = "Error en la respuesta del servidor";
//             if(errorBody.errors){
//               const errorKeys = Object.keys(errorBody.errors);
//               if(errorKeys.length > 0){
//                 const firstErrorMessage = errorBody.errors[errorKeys[0]];
//                 if(firstErrorMessage.length > 0){
//                   errorMessage = firstErrorMessage[0];
//                 }
//               }
//             }else if(errorBody.title){
//               errorMessage = errorBody.title;
//             } else if(errorBody.message){
//               errorMessage = errorBody.message;
//             }
//             throw new Error(errorMessage);
//           });
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Success:", data);
//         if (onSuccess) onSuccess();
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         if (onError) onError(error);
//       });
//   };
const onSubmit = (onSuccess:() => void , onError: (error: unknown) => void, validateForm: () => boolean) => {
  return (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      if (onError) onError(new Error("Formulario inválido"));
      return;
    }
    fetch(e.currentTarget.action, {
      method: e.currentTarget.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(errorBody=> {
            let errorMessage = "Error en la respuesta del servidor";
            if(errorBody.errors){
              const errorKeys = Object.keys(errorBody.errors);
              if(errorKeys.length > 0){
                const firstErrorMessage = errorBody.errors[errorKeys[0]];
                if(firstErrorMessage.length > 0){
                  errorMessage = firstErrorMessage[0];
                }
              }
            }else if(errorBody.title){
              errorMessage = errorBody.title;
            } else if(errorBody.message){
              errorMessage = errorBody.message;
            }
            throw new Error(errorMessage);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        if (onSuccess) onSuccess();
      })
      .catch((error) => {
        console.error("Error:", error);
        if (onError) onError(error);
      });
  };
};
export default function Form({
  children,
  name,
  method,
  action,
  target,
  onSuccess,
  onError,
  validateForm
}: FormProps) {
  return (
    <form 
      name={name}
      method={method}
      action={action}
      target={target}
      onSubmit={onSubmit(onSuccess!, onError!, validateForm)}
      >
      {children}
    </form>
  );
}
