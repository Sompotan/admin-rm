export type CreatePatientPayload = {
    nama_lengkap: string;
    tanggal_lahir: string; // ISO string
    nomor_handphone: string;
    pekerjaan: string;
    gender: string;
    id_agama: string;
    id_pendidikan: string;
    id_status_perkawinan: string;
    id_status_pembiayaan: string;
    alamat: {
        jalan: string;
        rt_rw: string;
        lingkungan: string;
        kelurahan_desa: string;
        kecamatan: string;
        kabupaten_kota: string;
    };
    identifiers: {
        id_jenis_identifier: string;
        nilai_identifier: string;
        use: string;
    }[];
};
