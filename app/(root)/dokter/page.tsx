"use client";

import CardStats from "@/components/dokter/CardStats";
import {Doctor, People} from "@/app/icons";
import {CalendarDays} from "lucide-react";
import TableDokter, {TableDokterData} from "@/components/dokter/TableDokter";
import {useEffect, useState} from "react";
import {fetchDoctors, fetchStatistikDoctor} from "@/lib/api/admin";

export default function DokterPage() {

    const [data, setData] = useState<TableDokterData[]>([])
    const [summary, setSummary] = useState<{
        totalDokter: number
        dokterAktifHariIni: number
        jumlahKunjunganHariIni: number
    } | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchDataDokter = async () => {
        try {
            const response = await fetchDoctors()
            const mappedData : TableDokterData[] = response.map((dokter: TableDokterData) => ({
                id: dokter.id,
                nama: dokter.nama,
                fotoProfil: dokter.fotoProfil,
                gender: dokter.gender,
                status: dokter.status,
            }))

            setData(mappedData)
        } catch (error) {
            console.error("Gagal mengambil data dokter: ", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchSummaryDoctor = async () => {
        try {
            const res = await fetchStatistikDoctor()
            setSummary(res)
        } catch (error) {
            console.error("Gagal mengambil statistik dokter: ", error)
        }
    }

    useEffect(() => {
        fetchSummaryDoctor()
        fetchDataDokter()
    }, []);

    if (loading) {
        return (
            <div className="flex-1 justify-center items-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        )
    }


    return (
        <div className="p-4 flex flex-col gap-8">
            <div className="flex flex-row items-center justify-between gap-10">
                <CardStats
                    title="Total Dokter"
                    value={summary?.totalDokter}
                    logo={<People/>}
                />
                <CardStats
                    title="Aktif Hari Ini"
                    value={summary?.dokterAktifHariIni}
                    logo={<Doctor/>}
                />
                <CardStats
                    title="Kunjungan Hari Ini"
                    value={summary?.jumlahKunjunganHariIni}
                    logo={<CalendarDays/>}
                />
            </div>
            <TableDokter
                data={data}
            />
        </div>
    )
}