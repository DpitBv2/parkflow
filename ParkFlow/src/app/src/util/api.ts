import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.53.9:8080",
});

export default api;
