import {logoutApi} from "@/lib/auth";
import {isAxiosError} from "axios";

export const handleLogout = async (onError: (msg: string) => void) => {
    try {
        return await logoutApi()
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            onError?.(error.response?.data?.error || "Logout Gagal");
        } else {
            onError?.("Terjadi Kesalahan pada server")
        }
        return null;
    }
}