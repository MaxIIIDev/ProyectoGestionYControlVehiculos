const API_ROUTE = "http://localhost:5097/api";

export const endpointsAPI = {
  vehiculos: {
    nuevo: { action: `${API_ROUTE}/Vehiculos`, method: "POST" },
    listar: { action: `${API_ROUTE}/Vehiculos`, method: "GET" },
    editar: {
      action: (id: number) => `${API_ROUTE}/Vehiculos/${id}`,
      method: "PUT",
    },
    bajaLogica: {
      action: (id: number) => `${API_ROUTE}/Vehiculos/baja/${id}`,
      method: "PATCH",
    },
    altaLogica: {
      action: (id: number) => `${API_ROUTE}/Vehiculos/alta/${id}`,
      method: "PATCH",
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
export const endpointFront = {
  home: {
    action: "/",
  },
  vehiculos: {
    listar: { action: "/Vehiculos/Listar" },
    nuevo: { action: "/Vehiculos/Nuevo" },
    actualizar: { action: "/Vehiculos/Actualizar/:id" },
    gestion: { action: "/VehiculosGestion" },
  },
  mantenimiento: {
    listar: { action: "/Mantenimiento/Listar" },
    nuevo: { action: "/Mantenimiento/Nuevo" },
    gestion: { action: "/Mantenimiento" },
  },
  controlKilometraje: {
    listar: { action: "/KilometrosListar" },
    gestion: { action: "/ControlKilometraje" },
  },
  matafuegos: {
    gestion: { action: "/Matafuegos" },
  },
  neumaticos: {
    gestion: { action: "/Neumaticos" },
  },
};
export default endpointsAPI;
