import httpClient from "../http-common";

const store = (formData) => {
    return httpClient.post(`/api/v1/loansolicitude/store`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

export default { store };