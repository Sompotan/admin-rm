import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Calendar} from "lucide-react";

export type RencanaMonitoringProps = {
    tanggalRencana: string; // ISO string
    deskripsi: string;
};


export default function RencanaMonitoring({tanggalRencana, deskripsi}: RencanaMonitoringProps) {
    if (!tanggalRencana || !deskripsi || deskripsi.trim() === "") return null;

    const tanggalFormatted = new Date(tanggalRencana).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Rencana Monitoring</CardTitle>
                <CardDescription className="flex flex-row items-center gap-2">
                    <Calendar size={16} color="black"/>
                    <p className="text-black">Kontrol Ulang :</p>
                    <p className="text-black">{tanggalFormatted}</p>
                </CardDescription>
                <CardDescription>{deskripsi}</CardDescription>
            </CardHeader>
        </Card>
    )
}