import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type RencanaLainnyaProps = {
    deskripsi: string;
};

export default function RencanaLainnya({ deskripsi }: RencanaLainnyaProps) {
    if (!deskripsi || deskripsi.trim() === "") return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Rencana Lainnya</CardTitle>
                <CardDescription>{deskripsi}</CardDescription>
            </CardHeader>
        </Card>
    );
}
