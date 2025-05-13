import {ProfilePatientProps} from "@/components/obat/ProfilePatient";
import {ProfileDoctorProps} from "@/components/obat/ProfileDoctor";
import {ResepObatData} from "@/components/obat/ResepObat";

export type CreateDoctorPayload = {
    email: string;
    password: string;
    nik: string;
    gender: string;
    tanggal_lahir: Date | null;
    nomor_handphone: string;
    jadwalPraktekHari: string[];
    status: string;
    nama: {
        prefix: string;
        nama_depan: string;
        nama_tengah: string;
        nama_belakang: string;
        suffix: string;
    };

    alamat: {
        jalan: string;
        rt_rw: string;
        lingkungan: string;
        kelurahan_desa: string;
        kecamatan: string;
        kabupaten_kota: string;
    };

    kualifikasi: {
        id_jenis_kualifikasi: string;
        nomor_kualifikasi: string;
        tanggal_mulai: Date | null;
        tanggal_berakhir: Date | null;
        institusi_penerbit: string;
    };
}

export type GetResepObatDetailResponse = {
    pasien: ProfilePatientProps
    dokter: ProfileDoctorProps
    obat: ResepObatData[]
}