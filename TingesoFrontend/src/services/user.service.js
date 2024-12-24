import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/users/');
}

const create = data => {
    return httpClient.post("/api/v1/users/", data);
}

const findByRut = rut => {
    return httpClient.get(`/api/v1/users/${rut}`);
}

const login = rut => {
    return httpClient.post(`/api/v1/users/login/${rut}`);
}

export default { getAll, create, findByRut, login };