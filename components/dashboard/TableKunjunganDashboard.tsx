import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import BadgeStatus, {BadgeStatusProps} from "@/components/kunjungan/BadgeStatus";
import {KunjunganData} from "@/types/kunjungan";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

type TableKunjunganDashboardProps = {
    data: KunjunganData[]
}

export default function TableKunjunganDashboard({data}: TableKunjunganDashboardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl mb-5">Kunjungan Terakhir</CardTitle>
                <CardDescription>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Pasien</TableHead>
                                <TableHead>Tanggal Kunjungan</TableHead>
                                <TableHead>Dokter</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="text-black">{item.nama_pasien}</TableCell>
                                    <TableCell className="text-black">{new Date(item.tanggal_kunjungan).toLocaleDateString("id-ID", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}</TableCell>
                                    <TableCell className="text-black">{item.nama_dokter}</TableCell>
                                    <TableCell><BadgeStatus status={item.status as BadgeStatusProps["status"]}/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardDescription>
            </CardHeader>
        </Card>

    )
}