"use client";

import SearchField from "@/components/pasien/SearchField";
import PasienTable, {PasienData} from "@/components/pasien/PasienTable";
import {useEffect, useState} from "react";
import {fetchVerifiedPatient} from "@/lib/api/admin";


export default function PasienPage() {
    const [data, setData] = useState<PasienData[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await fetchVerifiedPatient()
            const mappedData: PasienData[] = res.map((p: PasienData) => ({
                id: p.id,
                namaLengkap: p.namaLengkap,
                medicalRecordNumber: p.medicalRecordNumber,
                gender: p.gender === "Pria" ? "Laki - Laki" : "Perempuan",
                status: p.medicalRecordNumber ? "Aktif" : "Tidak Aktif"
            }))


            setData(mappedData);
        } catch (error) {
            console.error("Gagal mengambil data pasien", error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const filteredData = data.filter((pasien) =>
        pasien.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
            <div className="bg-white p-4">
                <div className="animate-pulse">
                    <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-4">
            <SearchField value={searchTerm} onChange={setSearchTerm}/>
            <div className="mt-8">
                <PasienTable data={filteredData} />
            </div>

        </div>
    )
}