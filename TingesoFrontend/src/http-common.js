import axios from "axios";

const BackendServer = import.meta.env.VITE_PAYROLL_BACKEND_SERVER;
const BackendPort = import.meta.env.VITE_PAYROLL_BACKEND_PORT;

export default axios.create({
    baseURL: `http://${BackendServer}:${BackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});