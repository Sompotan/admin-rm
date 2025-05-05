export type UserProfileProps = {
    name: string;
    image?: string;
}

export type VerificationPatient = {
    id: string;
    tanggalRegistrasi: string;
    status: "Pending" | "Verified";
} & UserProfileProps

export type identifier = {
    id: string;
    pasienId: string;
    jenisIdentifierId: string;
    nilaiIdentifier: string;
    use: string;
    jenisIdentifier: {
        id: string;
        namaJenisIdentifier: string;
    }
}

export type alamat = {
    id: string;
    pasienId: string;
    jalan: string;
    rtRw: string;
    lingkungan: string;
    kelurahanDesa: string;
    kecamatan: string;
    kabupatenKota: string;
}

export type PasienDetail = {
    id: string;
    userId: string;
    gender: string;
    ihsNumber: string | null;
    medicalRecordNumber: string | null;
    tanggalLahir: string;
    statusPerkawinanId: string;
    statusPembiayaanId: string;
    pendidikanId: string;
    agamaId: string;
    updatedAt: string;
    createdAt: string;
    namaLengkap: string;
    nomorHandphone: string;
    pekerjaan: string;
    fotoProfil: string | null;

    user: {
        email: string;
        isVerified: "menunggu" | "verified";
    }

    agama?:{
        id: string;
        namaAgama: string;
    }

    pendidikan?: {
        id: string;
        namaPendidikan: string;
    }

    statusPerkawinan?: {
        id: string;
        namaStatusPerkawinan: string;
    }

    statusPembiayaan?: {
        id: string;
        namaStatusPembiayaan: string;
    }

    alamat?: alamat
    identifiers: identifier[]

}