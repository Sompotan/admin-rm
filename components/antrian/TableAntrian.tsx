import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import UserProfile from "@/components/verifikasi/UserProfile";
import BadgeStatus, {AntrianStatusValue} from "@/components/antrian/BadgeStatus";

type TableAntrianProps = {
    data: {
        id: string;
        fotoProfil: string;
        nomorAntrian: string;
        nama_pasien: string;
        nama_dokter: string;
        status: string;
        checkInAt: string;
    }[]
}

export default function TableAntrian({data} : TableAntrianProps) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/12">Queue #</TableHead>
                    <TableHead className="w-1/3">Pasien</TableHead>
                    <TableHead className="w-1/3">Dokter</TableHead>
                    <TableHead className="w-1/3">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.nomorAntrian}</TableCell>
                        <TableCell>
                            <UserProfile name={item.nama_pasien} image={item.fotoProfil}/>
                        </TableCell>
                        <TableCell>
                            {item.nama_dokter}
                        </TableCell>
                        <TableCell>
                            <BadgeStatus status={item.status as AntrianStatusValue}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}