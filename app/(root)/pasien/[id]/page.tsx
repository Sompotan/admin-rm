"use client";

import ProfilePatientCard from "@/components/pasien/DetailPasien/ProfilePatientCard";
import {useEffect, useState} from "react";
import {fetchRiwayatRekamMedisByPatient, fetchVerifiedPatientById} from "@/lib/api/admin";
import {useParams} from "next/navigation";
import TableRiwayatRekamMedis, {
    TableRiwayatRekamMedisProps
} from "@/components/pasien/DetailPasien/TableRiwayatRekamMedis";


type Identifier = {
    id: string;
    pasienId: string;
    jenisIdentifierId: string;
    nilaiIdentifier: string;
    use: string;
    jenisIdentifier: {
        id: string;
        namaJenisIdentifier: string;
    };
};

type Alamat = {
    id: string;
    pasienId: string;
    jalan: string;
    rtRw: string;
    lingkungan: string;
    kelurahanDesa: string;
    kecamatan: string;
    kabupatenKota: string;
};

type PatientData = {
    id: string;
    userId: string;
    gender: string;
    medicalRecordNumber: string;
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
        isVerified: string;
    };
    agama: {
        id: string;
        namaAgama: string;
    };
    pendidikan: {
        id: string;
        namaPendidikan: string;
    };
    statusPerkawinan: {
        id: string;
        namaStatusPerkawinan: string;
    };
    statusPembiayaan: {
        id: string;
        namaStatusPembiayaan: string;
    };
    alamat: Alamat;
    identifiers: Identifier[];
};


export default function DetailPasienPage() {
    const params = useParams();
    const id = params.id;

    const [data, setData] = useState<PatientData | undefined>(undefined);
    const [riwayat,setRiwayat] = useState<TableRiwayatRekamMedisProps["items"]>([])
    const [loading, setLoading] = useState(true);

    

    

    useEffect(() => {
        if (!id) return;

            const fetchPatient = async () => {
            try {
                const res = await fetchVerifiedPatientById(id as string)
                setData(res)
            } catch (error) {
                console.error("Gagal memuat data pasien:", error)
            } finally {
                setLoading(false);
            }
        }

            const fetchRiwayat = async () => {
            try {
                const res = await fetchRiwayatRekamMedisByPatient(id as string)
                setRiwayat(res)
            } catch (error) {
                console.error("Gagal memuat data pasien:", error)
            } finally {
                setLoading(false);
            }
        }

        fetchPatient()
        fetchRiwayat()
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!data) return <p>Pasien tidak ditemukan.</p>;

    const nik = data.identifiers?.find(
        (id) => id.jenisIdentifier.namaJenisIdentifier.toLowerCase() === "nik"
    )?.nilaiIdentifier || "-"

    const bpjs = data.identifiers?.find(
        (id) => id.jenisIdentifier.namaJenisIdentifier.toLowerCase().includes("bpjs")
    )?.nilaiIdentifier || "-"

    return(
        <div className="mb-8">
            <ProfilePatientCard
                nik={nik}
                nomorBpjs={bpjs}
                namaLengkap={data.namaLengkap}
                tanggalLahir={new Date(data.tanggalLahir).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}
                agama={data.agama.namaAgama}
                pendidikan={data.pendidikan.namaPendidikan}
                statusPembiayaan={data.statusPembiayaan.namaStatusPembiayaan}
                statusPerkawinan={data.statusPerkawinan.namaStatusPerkawinan}
                gender={data.gender}
                fotoProfil={data.fotoProfil ?? undefined}
                nomorHandphone={data.nomorHandphone}
                medicalRecordNumber={data.medicalRecordNumber}
                jalan={data.alamat?.jalan}
                kecamatan={data.alamat?.kecamatan}
                rtRw={data.alamat?.rtRw}
                kelurahanDesa={data.alamat?.kelurahanDesa}
                kabupatenKota={data.alamat?.kabupatenKota}
                lingkunganJaga={data.alamat?.lingkungan}
                pekerjaan={data.pekerjaan}
            />

            <TableRiwayatRekamMedis
                items={riwayat}
            />
        </div>
    )
}