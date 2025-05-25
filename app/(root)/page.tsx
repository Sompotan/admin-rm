"use client";

import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import DashboardStatsCard from "@/components/dashboard/DashboardStatsCard";
import {CalendarDays, CirclePlus, UserPlus, Users} from "lucide-react";
import TableKunjunganDashboard from "@/components/dashboard/TableKunjunganDashboard";
import {fetchDashboardOverview} from "@/lib/api/admin"

const Home = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [overview, setOverview] = useState<{
        totalPasien: number;
        perubahanTotalPasien: number;
        jumlahKunjunganHariIni: number;
        jumlahPasienBaruMingguIni: number;
        kunjunganTerakhir: {
            namaPasien: string;
            tanggal: string;
            namaDokter: string;
            status: string;
        }[];
    } | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchDashboardOverview();
                setOverview(data);
            } catch (err) {
                console.error("Gagal mengambil data dashboard", err);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    if (loading) {
        return (
            <div className="p-4 flex flex-col gap-8">
                <div className="flex flex-row items-center justify-between gap-8">
                    <DashboardStatsCard title="Total Pasien" logo={<Users/>} value={0} deskripsi="Loading..." />
                    <DashboardStatsCard title="Kunjungan" logo={<CalendarDays/>} value={0} deskripsi="Loading..." />
                    <DashboardStatsCard title="Pasien Baru" logo={<UserPlus/>} value={0} deskripsi="Loading..." />
                </div>
                {/* Loading state for table */}
                <div className="animate-pulse h-64 bg-gray-100 rounded-md"></div>
            </div>
        );
    }



    return (
        <div className="p-4 flex flex-col gap-8">
            <div className="flex flex-row items-center justify-between gap-8">
                <DashboardStatsCard title="Total Pasien" logo={<Users/>} value={overview?.totalPasien ?? 0} deskripsi="Selama ini"/>
                <DashboardStatsCard title="Kunjungan" logo={<CalendarDays/>} value={overview?.jumlahKunjunganHariIni ?? 0} deskripsi="Jadwal Hari Ini"/>
                <DashboardStatsCard title="Pasien Baru" logo={<UserPlus/>} value={overview?.jumlahPasienBaruMingguIni ?? 0} deskripsi="Minggu Ini"/>
            </div>
            <div>
                <TableKunjunganDashboard
                    data={
                        (overview?.kunjunganTerakhir ?? []).map((item, index) => ({
                            id: `${index}`, // atau id asli jika ada
                            nama_pasien: item.namaPasien,
                            nama_dokter: item.namaDokter,
                            tanggal_kunjungan: item.tanggal,
                            status: item.status,
                        }))
                    }
                />
            </div>
            <div className="flex flex-row items-center gap-20">
                <Button className="flex-1" variant="secondary" onClick={() => router.push("/pasien/tambah-pasien")}>
                    <UserPlus /> Tambah Pasien Baru
                </Button>
                <Button className="flex-1" value="secondary" onClick={() => router.push("/kunjungan/tambah-kunjungan")}>
                    <CirclePlus /> Tambah Kunjungan Baru
                </Button>
            </div>
        </div>
    )
}

export default Home