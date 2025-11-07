import url from "../../../../Backend/Properties/launchSettings.json";

const API_ROUTE = url.profiles.http.applicationUrl;

export const endpoints = {
  vehiculos: {
    nuevo: { action: `${API_ROUTE}/Vehiculos`, method: "POST" },
    listar: { action: `${API_ROUTE}/Vehiculos`, method: "GET" },
    editar: {
      action: (id: number) => `${API_ROUTE}/Vehiculos/${id}`,
      method: "PUT",
    },
    bajaLogica: {
      action: (id: number) => `${API_ROUTE}/Vehiculos/BajaLogica/${id}`,
      method: "PUT",
    },
    altaLogica: {
      action: (id: number) => `${API_ROUTE}/Vehiculos/AltaLogica/${id}`,
      method: "PUT",
    },
    eliminar: {
      action: (id: number) => `${API_ROUTE}/Vehiculos/${id}`,
      method: "DELETE",
    },
    buscarPorId: {
      action: (id: number) => `${API_ROUTE}/Vehiculos/${id}`,
      method: "GET",
    },
  },
};

export default endpoints;
