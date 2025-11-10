export function ModalTableEditHandler(endpoint: string, method: string) {
  fetch(endpoint, { method })
    .then((res) => res.json())
    .then((data) => {
      // MAX, ACA TENEMOS Q MANEJAR LA RESPUESTA CON EL TEMA DE LOS ERRORES Y ESE MAMBO
      console.log(data);
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}
export default ModalTableEditHandler;
