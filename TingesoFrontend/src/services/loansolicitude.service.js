import httpClient from "../http-common";

const store = (formData) => {
    return httpClient.post(`/api/v1/loansolicitude/store`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const getLoanSolicitudes = async (rutUser) => {
    try {
      const response = await httpClient.get(`/api/v1/loansolicitude/solicitude/${rutUser}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching loan solicitudes:", error);
      throw error;
    }
  };

  const getLoanSolicitudeById = async (id) => {
    try {
      const response = await httpClient.get(`/api/v1/loansolicitude/getsolicitude/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching loan solicitude:", error);
      throw error;
    }
  };

  const getAll = async () => {
    try {
      const response = await httpClient.get(`/api/v1/loansolicitude/getall`);
      return response.data; // Asegúrate de devolver los datos procesados
    } catch (error) {
      console.error("Error fetching loan solicitude:", error);
      throw error; // Propaga el error para manejarlo en el componente
    }
  };
  
  
  const updateLoanSolicitude = async (id, solicitudeData) => {
    try {
      await httpClient.put(`/api/v1/loansolicitude/update/${id}`, solicitudeData);
    } catch (error) {
      console.error("Error updating loan solicitude:", error);
      throw error;
    }
  };
  
export default { store, getLoanSolicitudes, getLoanSolicitudeById, getAll, updateLoanSolicitude };