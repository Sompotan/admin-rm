"use client";

import ProfilePatient from "@/components/obat/ProfilePatient";
import ProfileDoctor from "@/components/obat/ProfileDoctor";
import ResepObat from "@/components/obat/ResepObat";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {GetResepObatDetailResponse} from "@/types/admin";
import {fetchDetailResepObat} from "@/lib/api/admin";

export default function DetailResepObat() {
    const { id } = useParams();
    const [data, setData] = useState<GetResepObatDetailResponse | null>(null)
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
            const fetchDetali = async () => {
            try {
                const result = await fetchDetailResepObat(id as string)
                setData(result)
            } catch (error) {
                console.error("Gagal mengambil data resep obat: ", error)
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchDetali()
    }, [id]);

    if (loading) return <div className="p-4">Memuat...</div>;
    if (!data) return <div className="p-4 text-red-500">Data tidak ditemukan</div>;

    return (
        <div className="p-4 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <p className="text-2xl font-semibold">Pasien</p>
                <ProfilePatient {...data.pasien} />
            </div>
            <div className="flex flex-col gap-4">
                <p className="text-2xl font-semibold">Dokter</p>
                <ProfileDoctor {...data.dokter} />
            </div>
            <div className="flex flex-col gap-4">
                <p className="text-2xl font-semibold">Resep Obat</p>
                <ResepObat data={data.obat} />
            </div>

        </div>
    )
}