"use client";

import CardStats from "@/components/dokter/CardStats";
import {Doctor, People} from "@/app/icons";
import {CalendarDays} from "lucide-react";
import TableDokter, {TableDokterData} from "@/components/dokter/TableDokter";
import {useEffect, useState} from "react";
import {fetchDoctors, fetchStatistikDoctor} from "@/lib/api/admin";

// Prevent prerendering for this page
export const dynamic = 'force-dynamic';

export default function DokterPage() {

    const [data, setData] = useState<TableDokterData[]>([])
    const [summary, setSummary] = useState<{
        totalDokter: number
        dokterAktifHariIni: number
        jumlahKunjunganHariIni: number
    }>({
        totalDokter: 0,
        dokterAktifHariIni: 0,
        jumlahKunjunganHariIni: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [statistik, dokter] = await Promise.all([
                    fetchStatistikDoctor(),
                    fetchDoctors()
                ]);

                setSummary(statistik);
                
                const mappedData: TableDokterData[] = dokter.map((d: TableDokterData) => ({
                    id: d.id,
                    nama: d.nama,
                    fotoProfil: d.fotoProfil,
                    gender: d.gender,
                    status: d.status,
                }));
                
                setData(mappedData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="p-4 flex flex-col gap-8">
                <div className="flex flex-row items-center justify-between gap-10">
                    <CardStats
                        title="Total Dokter"
                        value={0}
                        logo={<People/>}
                    />
                    <CardStats
                        title="Aktif Hari Ini"
                        value={0}
                        logo={<Doctor/>}
                    />
                    <CardStats
                        title="Kunjungan Hari Ini"
                        value={0}
                        logo={<CalendarDays/>}
                    />
                </div>
                <div className="flex-1 justify-center items-center">
                    <p className="text-gray-500">Loading data...</p>
                </div>
            </div>
        )
    }


    return (
        <div className="p-4 flex flex-col gap-8">
            <div className="flex flex-row items-center justify-between gap-10">
                <CardStats
                    title="Total Dokter"
                    value={summary.totalDokter}
                    logo={<People/>}
                />
                <CardStats
                    title="Aktif Hari Ini"
                    value={summary.dokterAktifHariIni}
                    logo={<Doctor/>}
                />
                <CardStats
                    title="Kunjungan Hari Ini"
                    value={summary.jumlahKunjunganHariIni}
                    logo={<CalendarDays/>}
                />
            </div>
            <TableDokter
                data={data}
            />
        </div>
    )
}