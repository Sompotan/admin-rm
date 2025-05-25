"use client"

import dynamic from 'next/dynamic';
import {useEffect, useState} from "react";
import {fetchListResepObat, updateStatusResepObat} from "@/lib/api/admin";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dynamic import for TableOrderObat
const TableOrderObat = dynamic(() => import("@/components/obat/TableOrderObat"), {
    ssr: false,
    loading: () => (
        <div className="p-4">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    )
});

// Export types separately to avoid circular dependencies
export type ResepObatData = {
    id: string;
    tanggal: string;
    status: "DIPESAN" | "DISIAPKAN" | "FINAL";
    pasien: {
        id: string;
        nama: string;
        fotoProfil: string;
    },
    dokter: {
        nama: string;
    }
}

export default function OrderedObatPage(){
    const [data, setData] = useState<ResepObatData[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchListResepObat();
            // Check if response is valid array
            if (Array.isArray(res)) {
                setData(res);
            } else {
                throw new Error("Data yang diterima tidak valid");
            }
        } catch (error) {
            console.error("Gagal memuat data resep obat", error);
            setError("Gagal memuat data. Silakan coba lagi nanti.");
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

    // Render loading state
    if (loading) {
        return (
            <div className="p-4 w-full h-[70vh] flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">Memuat data...</p>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="p-4 w-full h-[70vh] flex flex-col items-center justify-center">
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                    <span className="font-medium">Error:</span> {error}
                </div>
                <Button onClick={() => fetchData()} className="mt-4">
                    Coba Lagi
                </Button>
            </div>
        );
    }

    // Only render table when data is available and not empty
    return (
        <div className="p-4">
            {data.length === 0 ? (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Tidak ada data order obat</p>
                </div>
            ) : (
                <TableOrderObat data={data} onUpdateStatus={handleUpdateResepObat}/>
            )}
        </div>
    )
}