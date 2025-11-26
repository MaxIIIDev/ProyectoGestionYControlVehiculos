export const onSubmit = (
  onSuccess: () => void,
  onError: (error: unknown) => void,
  validateForm: () => boolean,
  action: string,
  method: string
) => {
  return (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      if (onError) onError(new Error("Formulario inválido"));
      return;
    }
    fetch(action, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorBody) => {
            console.log("Error:", errorBody);
            let errorMessage = "Error en la respuesta del servidor";
            if (errorBody.errors) {
              const errorKeys = Object.keys(errorBody.errors);
              if (errorKeys.length > 0) {
                const firstErrorMessage = errorBody.errors[errorKeys[0]];
                if (firstErrorMessage.length > 0) {
                  errorMessage = firstErrorMessage[0];
                }
              }
            } else if (errorBody.title) {
              errorMessage = errorBody.title;
            } else if (errorBody.message) {
              errorMessage = errorBody.message;
            }
            throw new Error(errorMessage);
          });
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return null;
        }
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

export default onSubmit;
