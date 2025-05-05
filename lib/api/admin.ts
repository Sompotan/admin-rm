import api from "@/lib/axios";
import {VerificationPatient} from "@/types/verifikasi/types";
import {mapPasienToVerificationPatient} from "@/lib/handlers/admin/mapPasienToVerificationPatient";

export const fetchUnverifiedPatients = async () : Promise<VerificationPatient[]> => {
    const res = await api.get("/admin/pasien-belum-terverifikasi")
    return res.data.map(mapPasienToVerificationPatient);
}

export const fetchVerificationStats = async (): Promise<{
    pending: number;
    verifiedToday: number;
}> => {
    const res = await api.get("/admin/verification-statistics");
    return res.data;
}

export const fetchUnverifiedPatientById = async (id: string) => {
    const res = await api.get(`/admin/pasien-belum-terverifikasi/${id}`)
    return res.data;
}

export const verifyPatientById = async (id: string) => {
    const res = await api.patch(`/admin/pasien-belum-terverifikasi/${id}`)
    return res.data;
}

export const getAllKunjungan = async (search?: string, status?: string) => {
    const params: Record<string, string> = {}
    if (search) params.search = search;
    if (status) params.status = status;

    const res = await api.get("/admin/kunjungan", {params});
    return res.data;
}

export const getKunjunganById = async (id: string) => {
    const res = await api.get(`/admin/kunjungan/${id}`)
    return res.data;
}

export const checkInKunjungan = async (id: string) => {
    const res = await api.patch(`/admin/kunjungan/${id}/check-in`)
    return res.data;
}

export const fetchVerifiedPatient = async () => {
    const res = await api.get('/admin/pasien')
    return res.data;
}

export const fetchDokter = async() => {
    const res = await api.get("/admin/dokter")
    return res.data;
}

export const tambahKunjungan = async(data: {
    pasienId:  string;
    tenagaMedisId: string;
    tanggal_kunjungan: string;
    alasanKunjungan: string;
}) => {
    const res = await api.post("/admin/kunjungan", data)
    return res.data;
}


export const fetchDokterById = async (id: string) => {
    const res = await api.get(`/admin/dokter/${id}`)
    return res.data;
}

export const fetchSummaryAntrian = async () => {
    const res = await api.get('/admin/antrian-stats')
    return res.data;
}