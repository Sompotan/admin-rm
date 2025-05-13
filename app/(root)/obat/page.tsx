"use client"

import TableOrderObat, {ResepObatData} from "@/components/obat/TableOrderObat";
import {useEffect, useState} from "react";
import {fetchListResepObat, updateStatusResepObat} from "@/lib/api/admin";

export default function OrderedObatPage(){
    const [data, setData] = useState<ResepObatData[]>([])
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await fetchListResepObat()
            setData(res);
        } catch (error) {
            console.error("Gagal memuat data resep obat", error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const handleUpdateResepObat = async (id: string, status: "DISIAPKAN" | "FINAL")=> {
        try {
            await updateStatusResepObat(id, status)
            if (status === "FINAL") {
                // Hapus dari list jika statusnya FINAL
                setData((prev) => prev.filter((r) => r.id !== id));
            } else {
                // Update status di state
                setData((prev) =>
                    prev.map((r) => (r.id === id ? { ...r, status } : r))
                );
            }
        } catch (error) {
            console.error("Gagal memperbarui status resep obat: ", error)
            alert("Terjadi kesalahan saat memperbarui status resep obat")
        }
    }

    return (
        <div className="p-4">
            {loading ? (
                <p>Memuat data...</p>
            ) : (
                <TableOrderObat data={data} onUpdateStatus={handleUpdateResepObat}/>
            )}
        </div>
    )
}