import api from "@/lib/axios";
import {VerificationPatient} from "@/types/verifikasi/types";
import {mapPasienToVerificationPatient} from "@/lib/handlers/admin/mapPasienToVerificationPatient";
import {CreatePatientPayload} from "@/types/pasien";
import {CreateDoctorPayload, GetResepObatDetailResponse} from "@/types/admin";
import {ResepObatData} from "@/components/obat/TableOrderObat";

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

export const fetchAgamaOptions = async () => {
    const res = await api.get("/agama");
    return res.data;
};

export const fetchPendidikanOptions = async () => {
    const res = await api.get("/pendidikan");
    return res.data;
};

export const fetchStatusPerkawinanOptions = async () => {
    const res = await api.get("/status-perkawinan");
    return res.data;
};

export const fetchStatusPembiayaanOptions = async () => {
    const res = await api.get("/status-pembiayaan");
    return res.data;
};

export const fetchJenisIdentifiers = async () => {
    const res = await api.get("/jenis-identifiers");
    return res.data;
};

export const createPatient = async (data: CreatePatientPayload) => {
    const res = await api.post("/admin/pasien", data)
    return res.data;
}

export const fetchVerifiedPatientById = async (id: string) => {
    const res = await api.get(`/admin/pasien/${id}`)
    return res.data;
}

export const fetchRiwayatRekamMedisByPatient = async (id: string) => {
    const res = await api.get(`/admin/pasien/${id}/rekam-medis`)
    return res.data;
}

export const fetchRekamMedisPasien = async (id: string) => {
    const res = await api.get(`/admin/rekam-medis/${id}`)
    return res.data;
}

export const fetchDoctors = async () => {
    const res = await api.get("/admin/dokter")
    return res.data;
}

export const fetchStatistikDoctor = async () => {
    const res = await api.get('/admin/dokter/statistik')
    return res.data;
}

export const createDoctor = async (data: CreateDoctorPayload) => {
    const res = await api.post("/admin/dokter", data)
    return res.data;
}

export const fetchJenisKualifikasi = async () => {
    const res = await api.get('/jenis-kualifikasi')
    return res.data;
}

export const updateStatusResepObat = async (id: string, status: "DISIAPKAN" | "FINAL") => {
    const res = await api.patch(`/admin/resep-obat/${id}/status`, {status})
    return res.data;
}

export const fetchListResepObat = async (): Promise<ResepObatData[]> => {
    const res = await api.get("/admin/resep-obat")
    return res.data;
}

export const fetchDetailResepObat = async (id: string) : Promise<GetResepObatDetailResponse> => {
    const res = await api.get(`/admin/resep-obat/${id}`)
    return res.data;
}

export const fetchDashboardOverview = async () => {
    const res = await api.get('/admin/dashboard')
    return res.data;
}