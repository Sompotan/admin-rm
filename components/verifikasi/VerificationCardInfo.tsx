"use client";

import CardItem from "@/components/verifikasi/CardItem";
import {Clock2, Verify} from "@/app/icons";
import {useEffect, useState} from "react";
import {fetchVerificationStats} from "@/lib/api/admin";

export default function VerificationCardInfo() {
    const [pending, setPending] = useState(0);
    const [verifiedToday, setVerifiedToday] = useState(0);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await fetchVerificationStats();
                setPending(data.pending);
                setVerifiedToday(data.verifiedToday);
            } catch (error) {
                console.error("Gagal mengambil data statistik verifikasi: ", error);
            } finally {
                setLoading(false);
            }
        }

        loadStats();
    }, []);

    if (loading) return <p>Loading...</p>;


    return (
        <div className="flex flex-row items-center justify-between gap-4">
            <CardItem
                title="Pending"
                value={pending}
                icon={<Clock2/>}
            />
            <CardItem
                title="Terverifikasi Hari Ini"
                value={verifiedToday}
                icon={<Verify />}
            />
        </div>
    )
}