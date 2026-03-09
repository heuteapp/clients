import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5120",
    headers: {
        "Content-Type": "application/json",
    }
});