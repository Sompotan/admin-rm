"use client";

import SearchField from "@/components/kunjungan/SearchField";
import DropdownStatus from "@/components/kunjungan/DropdownStatus";
import TambahKunjunganButton from "@/components/kunjungan/TambahKunjunganButton";
import TableKunjungan from "@/components/kunjungan/TableKunjungan";
import {useEffect, useState} from "react";
import {KunjunganStatusValue} from "@/components/kunjungan/BadgeStatus";
import {KunjunganData} from "@/types/kunjungan";
import {checkInKunjungan, getAllKunjungan} from "@/lib/api/admin";



export default function KunjunganPage() {

    const [data, setData] = useState<KunjunganData[]>([])
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<KunjunganStatusValue>("none");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (searchTerm) params.append("search", searchTerm);
                if (selectedStatus !== "none") params.append("status", selectedStatus)

                const json = await getAllKunjungan(searchTerm, selectedStatus !== "none" ? selectedStatus : undefined);
                setData(json);
            } catch (error) {
                console.error("[FETCH KUNJUNGAN ERROR]", error)
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, [searchTerm, selectedStatus]);

    const handleCheckIn = async (id: string) => {
        try {
            await checkInKunjungan(id);
            const updated = await getAllKunjungan(searchTerm, selectedStatus !== "none" ? selectedStatus: undefined)
            setData(updated)
        } catch (error) {
            console.error("[CHECK-IN Error", error)
            alert("Gagal melakukan Check-in")
        }
    }

    if (loading) return <div>Loading...</div>


    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row items-center justify-between">
                <div className="w-full max-w-xl flex flex-row items-center gap-8">
                    <SearchField searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                    <DropdownStatus status={selectedStatus} onStatusChange={(val: KunjunganStatusValue ) => setSelectedStatus(val)} />
                </div>
                <TambahKunjunganButton />
            </div>
            <div className="flex flex-col gap-4 bg-white border border-gray-300 rounded-lg p-5">
                <p className="font-semibold text-[20px] px-2">List Kunjungan</p>
                <TableKunjungan data={data} onCheckIn={handleCheckIn} />
            </div>

        </div>
    )
}

