import axios from "axios";

const api = axios.create({
    baseURL: "http://172.24.1.178:8080",
});

export default api;
