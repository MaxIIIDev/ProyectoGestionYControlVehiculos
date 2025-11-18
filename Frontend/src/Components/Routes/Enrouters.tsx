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
    buscarPorPatente: {
      action: (patente: string) =>
        `${API_ROUTE}/Vehiculos/buscarPorPatente/${patente}`,
      method: "GET",
    },
  },
  controlKilometraje: {
    nuevo: { action: `${API_ROUTE}/registro-kilometraje`, method: "POST" },
    listar: { action: `${API_ROUTE}/registro-kilometraje`, method: "GET" },
    editar: {
      action: (id: number) => `${API_ROUTE}/registro-kilometraje/${id}`,
      method: "PUT",
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
    actualizar: {
      action: (id: number) => {
        return "/Vehiculos/Actualizar/" + id;
      },
      endpoint: "/Vehiculos/Actualizar/:id",
    },
    gestion: { action: "/VehiculosGestion" },
    documentos: { action: "/Vehiculos/Documentacion" },
  },
  mantenimiento: {
    listar: { action: "/Mantenimiento/Listar" },
    nuevo: { action: "/Mantenimiento/Nuevo" },
    gestion: { action: "/Mantenimiento" },
  },
  controlKilometraje: {
    listar: { action: "/KilometrosListar" },
    gestion: { action: "/ControlKilometraje" },
    nuevo: { action: "/RegistroKilometraje/Nuevo" },
  },
  matafuegos: {
    gestion: { action: "/Matafuegos" },
  },
  neumaticos: {
    gestion: { action: "/Neumaticos" },
  },
};
export default endpointsAPI;
