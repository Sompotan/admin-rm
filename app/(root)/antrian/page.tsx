"use client";

import dynamic from 'next/dynamic';
import { Users, Loader2 } from "lucide-react"; // Replace People SVG with Lucide's Users icon
import {useEffect, useState} from "react";
import {fetchSummaryAntrian, getAllKunjungan} from "@/lib/api/admin";
import {Antrian} from "@/types/antrian";

// Dynamic imports for components
const StatsCard = dynamic(() => import("@/components/antrian/StatsCard"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-24 bg-white rounded-lg shadow animate-pulse">
            <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4 mt-4"></div>
            </div>
        </div>
    )
});

const TableAntrian = dynamic(() => import("@/components/antrian/TableAntrian"), {
    ssr: false,
    loading: () => (
        <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
            </div>
        </div>
    )
});

type SummaryStatsProps = {
    totalMenunggu: number;
    selesaiHariIni: number;
    dokterAktif: number;
}

export default function AntrianPage() {
    const [summary, setSummary] = useState<SummaryStatsProps>()
    const [antrianData, setAntrianData] = useState<Antrian[]>([]);
    const [isLoading, setIsLoading] = useState(true);


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
            setIsLoading(true);
            try {
                const data = await getAllKunjungan();
                const filteredData = data
                    .filter((k: Antrian) => k.checkInAt !== null && k.status !== "Selesai" && k.status !== "DalamPemeriksaan")
                    .sort((a: Antrian, b: Antrian) => new Date(a.checkInAt!).getTime() - new Date(b.checkInAt!).getTime())
                    .map((k: Antrian, index: number) => ({
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
            } finally {
                setIsLoading(false);
            }
        }

        fetchAntrian()
    }, []);


    if (isLoading) {
        return (
            <div className="w-full h-[70vh] flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">Memuat data...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-row items-center justify-between gap-6">
                <StatsCard
                    title="Total Menunggu"
                    icon={<Users className="h-6 w-6" />}
                    value={summary?.totalMenunggu ?? 0}
                />
                <StatsCard
                    title="Selesai Hari Ini"
                    icon={<Users className="h-6 w-6" />}
                    value={summary?.selesaiHariIni ?? 0}
                />
                <StatsCard
                    title="Dokter Aktif"
                    icon={<Users className="h-6 w-6" />}
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