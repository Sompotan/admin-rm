"use client";

import ProfilePatientCard from "@/components/pasien/DetailPasien/ProfilePatientCard";
import {useEffect, useState} from "react";
import {fetchRiwayatRekamMedisByPatient, fetchVerifiedPatientById} from "@/lib/api/admin";
import {useParams} from "next/navigation";
import TableRiwayatRekamMedis, {
    TableRiwayatRekamMedisProps
} from "@/components/pasien/DetailPasien/TableRiwayatRekamMedis";




export default function DetailPasienPage() {
    const params = useParams();
    const id = params.id;

    const [data, setData] = useState<any>(null);
    const [riwayat,setRiwayat] = useState<TableRiwayatRekamMedisProps["items"]>([])
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        if (!id) return;
        fetchPatient()
        fetchRiwayat()
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!data) return <p>Pasien tidak ditemukan.</p>;

    const nik = data.identifiers?.find(
        (id: any) => id.jenisIdentifier.namaJenisIdentifier.toLowerCase() === "nik"
    )?.nilaiIdentifier || "-"

    const bpjs = data.identifiers?.find(
        (id: any) => id.jenisIdentifier.namaJenisIdentifier.toLowerCase().includes("bpjs")
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
                fotoProfil={data.fotoProfil}
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