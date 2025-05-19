"use client";

import ProfileDoctorCard from "@/components/dokter/DetailDokter/ProfileDoctorCard";
import {useEffect, useState} from "react";
import {fetchDokterById} from "@/lib/api/admin";
import {useParams} from "next/navigation";

export default function DokterDetailPage() {
    const { id } = useParams()


    const [data, setData] = useState<any>(undefined)
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const res = await fetchDokterById( id as string)


            setData(res)
        } catch (error) {
            console.error("Gagal mengambil data dokter: ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id]);

    return (
        <div className="p-4">
            {!loading && data && (
                <ProfileDoctorCard
                    namaLengkap={data.namaLengkap}
                    nomorHandphone={data.nomorHandphone}
                    nik={data.nik}
                    gender={data.jenisKelamin}
                    tanggalLahir={new Date(data.tanggalLahir).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                    jenisKualifikasi={data.kualifikasi?.jenis || "-"}
                    institusi_penerbit={data.kualifikasi?.institusiPenerbit || "-"}
                    nomorKualifikasi={data.kualifikasi?.nomor || "-"}
                    tanggal_mulai={new Date(data.kualifikasi?.tanggalMulai).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                    tanggal_berakhir={new Date(data.kualifikasi?.tanggalBerakhir).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                    jalan={data.alamat.jalan}
                    kecamatan={data.alamat.kecamatan}
                    rtRw={data.alamat.rtRw}
                    kabupatenKota={data.alamat.kabupatenKota}
                    lingkunganJaga={data.alamat.lingkungan}
                    kelurahanDesa={data.alamat.kelurahanDesa}
                />
            )}
        </div>
    )
}