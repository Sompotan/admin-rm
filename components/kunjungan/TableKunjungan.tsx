import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import BadgeStatus, {BadgeStatusProps} from "@/components/kunjungan/BadgeStatus";
import ButtonCheckIn from "@/components/kunjungan/ButtonCheckIn";
import {TableKunjunganProps} from "@/types/kunjungan";

export default function TableKunjungan({data, onCheckIn}: TableKunjunganProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Pasien</TableHead>
                    <TableHead>Tanggal Kunjungan</TableHead>
                    <TableHead>Dokter</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.nama_pasien}</TableCell>
                        <TableCell>{new Date(item.tanggal_kunjungan).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}</TableCell>
                        <TableCell>{item.nama_dokter}</TableCell>
                        <TableCell><BadgeStatus status={item.status as BadgeStatusProps["status"]}/></TableCell>
                        <TableCell>
                            <ButtonCheckIn status={item.status} onClick={() => {
                                onCheckIn(item.id)
                            }}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}