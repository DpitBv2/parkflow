import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.101.9:8080",
});

export default api;
