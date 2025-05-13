import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";

export type DashboardStatsCardProps = {
    title: string;
    logo: React.ReactNode;
    value: number | string;
    total?: number;
    deskripsi: string;
    forceShowTotal?: boolean;
}

export default function DashboardStatsCard({title, logo, value, total, deskripsi, forceShowTotal} : DashboardStatsCardProps) {
    const displayTotal = total ?? 0;

    return (
        <Card className="w-full shadow shadow-gray-300">
            <CardHeader>
                <CardTitle>
                    <div className="flex flex-row items-center justify-between">
                        <p className="text-gray-700">{title}</p>
                        {logo}
                    </div>
                </CardTitle>
                <CardDescription className="text-[24px] text-black font-semibold">{value.toLocaleString("id-ID")}</CardDescription>
                <CardDescription>
                    {typeof total === "number" || forceShowTotal
                        ? `${(total ?? 0) > 0 ? `+${total ?? 0}` : (total ?? 0) < 0 ? `${total ?? 0}` : `+0`} ${deskripsi}`
                        : deskripsi}
                </CardDescription>
            </CardHeader>
        </Card>
    )
}