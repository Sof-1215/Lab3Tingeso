import axios from "axios";

const BackendServer = import.meta.env.VITE_PAYROLL_BACKEND_SERVER;  // localhost
const BackendPort = import.meta.env.VITE_PAYROLL_BACKEND_PORT; // 8080

export default axios.create({
    baseURL: `http://localhost:8090`,
    headers: {
        'Content-Type': 'application/json'
    }
});