import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export type RencanaEdukasiProps = {
    deskripsi: string;
}

export default function RencanaEdukasi({deskripsi}: RencanaEdukasiProps) {
    if (!deskripsi || deskripsi.trim() === "") return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Rencana Edukasi</CardTitle>
                <CardDescription>{deskripsi}</CardDescription>
            </CardHeader>
        </Card>
    )
}