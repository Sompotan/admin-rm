"use client";

import { People } from "@/app/icons";
import StatsCard from "@/components/antrian/StatsCard";
import TableAntrian from "@/components/antrian/TableAntrian";
import {useEffect, useState} from "react";
import {fetchSummaryAntrian, getAllKunjungan} from "@/lib/api/admin";
import {Antrian} from "@/types/antrian";

type SummaryStatsProps = {
    totalMenunggu: number;
    selesaiHariIni: number;
    dokterAktif: number;
}

export default function AntrianPage() {
    const [summary, setSummary] = useState<SummaryStatsProps>()
    const [antrianData, setAntrianData] = useState<Antrian[]>([]);


    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await fetchSummaryAntrian()
                setSummary(data);
            } catch (error) {
                console.error("Gagal memuat summary: ", error)
            }
        }

        fetchSummary()
    }, []);

    useEffect(() => {
        const fetchAntrian = async () => {
            try {
                const data = await getAllKunjungan();
                const filteredData = data
                    .filter((k: Antrian) => k.checkInAt !== null && k.status !== "Selesai" && k.status !== "DalamPemeriksaan")
                    .sort((a: Antrian, b: Antrian) => new Date(a.checkInAt!).getTime() - new Date(b.checkInAt!).getTime())
                    .map ((k:Antrian, index: number) => ({
                        id: k.id,
                        fotoProfil: k.fotoProfil,
                        nomorAntrian: String(index + 1).padStart(2, "0"),
                        nama_pasien: k.nama_pasien,
                        nama_dokter: k.nama_dokter,
                        status: k.status,
                        checkInAt: k.checkInAt
                    }))

                setAntrianData(filteredData);
            } catch (error) {
                console.error("[Gagal fetchAntrian]", error)
            }
        }

        fetchAntrian()
    }, []);


    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-row items-center justify-between gap-6">
                <StatsCard
                    title="Total Menunggu"
                    icon={<People />}
                    value={summary?.totalMenunggu ?? 0}
                />
                <StatsCard
                    title="Selesai Hari Ini"
                    icon={<People />}
                    value={summary?.selesaiHariIni ?? 0}
                />
                <StatsCard
                    title="Dokter Aktif"
                    icon={<People />}
                    value={summary?.dokterAktif ?? 0}
                />


            </div>
            <div className="flex flex-col gap-4">
                <p className="text-[20px] font-semibold px-2">List Antrian</p>
                <TableAntrian data={antrianData}/>
            </div>

        </div>

    )
}