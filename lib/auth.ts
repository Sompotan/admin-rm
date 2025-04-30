import api from './axios';
import {LoginResponse} from "@/types/auth";


export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
    const res = await api.post("/auth/login", {
        email,
        password
    })
    return res.data;
}

export const logoutApi = async () => {
    return await api.post("/auth/logout");
}