import {loginApi} from "@/lib/auth";
import type {LoginResponse} from "@/types/auth";
import {isAxiosError} from "axios";

export const handleLogin = async (
    email: string,
    password: string,
    onError: (msg: string) => void
): Promise<LoginResponse | null> => {
    try {
        return await loginApi(email, password);
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            onError?.(error.response?.data?.error || "Login Gagal");
        } else {
            onError?.("Terjadi Kesalahan pada server")
        }
        return null;
    }
}