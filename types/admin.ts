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

type KeluhanPasien = {
    id: string;
    subjectiveNoteId: string;
    jenisKeluhan: string;
    deskripsi: string;
};

type RiwayatPenyakit = {
    id: string;
    subjectiveNoteId: string;
    jenisRiwayat: string;
    deskripsi: string;
};

type AlergiPasien = {
    id: string;
    subjectiveNoteId: string;
    jenisAlergi: string;
    deskripsi: string;
};

type ObatDikonsumsi = {
    id: string;
    subjectiveNoteId: string;
    keterangan: string;
};

type SubjectiveNoteType = {
    id: string;
    rekamMedisId: string;
    createdAt: string;
    keluhanPasien: KeluhanPasien[];
    riwayatPenyakit: RiwayatPenyakit[];
    alergiPasien: AlergiPasien[];
    obatDikonsumsi: ObatDikonsumsi[];
};

type PemeriksaanUmum = {
    id: string;
    objectiveNoteId: string;
    keadaanUmum: "Baik" | "Sedang" | "Lemah";
    gcsEye: number;
    gcsVerbal: number;
    gcsMotor: number;
    gcsTotal: number;
};

type TandaVital = {
    id: string;
    objectiveNoteId: string;
    tekananDarah: string;
    nadi: number;
    suhu: number;
    frekuensiNafas: number;
};

type Antropometri = {
    id: string;
    objectiveNoteId: string;
    beratBadan: number;
    tinggiBadan: number;
    imt: number;
};

type StatusGeneralis = {
    kepalaLeher?: string;
    thorax?: string;
    abdomen?: string;
    ekstremitas?: string;
    lainnya?: string;
} | null;

type ObjectiveNoteType = {
    id: string;
    rekamMedisId: string;
    pemeriksaanPenunjang: string;
    pemeriksaanUmum: PemeriksaanUmum;
    tandaVital: TandaVital;
    antropometri: Antropometri;
    statusGeneralis: StatusGeneralis;
};

type KodeKlinis = {
    id: string;
    system: string;
    kode: string;
    Display: string;
};

type DiagnosisPasien = {
    id: string;
    kodeKlinisId: string;
    jenisDiagnosis: string;
    deskripsi: string;
    assessmentNoteId: string;
    kodeKlinis: KodeKlinis;
};

type AssessmentNoteType = {
    id: string;
    rekamMedisId: string;
    diagnosisPasien: DiagnosisPasien[];
};

type RencanaKlinis = {
    id: string;
    planningNoteId: string;
    kodeKlinisId: string | null;
    tanggalRencana: string | null;
    deskripsi: string;
    jenisRencana: string;
    jenisLayanan: string;
};

type PlanningNoteType = {
    id: string;
    rekamMedisId: string;
    rencanaKlinis: RencanaKlinis[];
};

type Obat = {
    id: string;
    namaObat: string;
    kekuatan: string;
    bentukSediaan: string;
};

type ItemObat = {
    id: string;
    resepObatId: string;
    obatId: string;
    frekuensi: string;
    durasi: string;
    aturan_pakai: string;
    catatan: string;
    obat: Obat;
};

type ResepObatType = {
    id: string;
    rekamMedisId: string;
    createdAt: string;
    status: string;
    itemObat: ItemObat[];
};

export type RekamMedisResponse = {
    id: string;
    kunjunganId: string;
    tenagaMedisId: string;
    tanggal: string;
    catatan: string | null;
    status: string;
    versi: string;
    createdAt: string;
    subjectiveNote: SubjectiveNoteType;
    objectiveNote: ObjectiveNoteType;
    assessmentNote: AssessmentNoteType;
    planningNote: PlanningNoteType;
    resepObat: ResepObatType;
};