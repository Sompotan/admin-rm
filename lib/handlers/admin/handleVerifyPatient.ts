import {verifyPatientById} from "@/lib/api/admin";
import {isAxiosError} from "axios";

const handleVerifyPatient = async (
    id: string,
    onSuccess: () => void,
    onError:(message: string) => void
) => {
    try {
        await verifyPatientById(id);
        onSuccess();
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const msg = error.response?.data?.error || "Verifikasi Gagal";
            onError(msg);
        } else {
            onError("Terjadi kesalahan pada server")
        }
    }
}

export default handleVerifyPatient;