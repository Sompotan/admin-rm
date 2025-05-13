import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Eye} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {AddUserMale} from "@/app/icons";

export type PasienData = {
    id: string;
    namaLengkap: string;
    medicalRecordNumber: string;
    gender: string;
    status: string;
}

type PasienTableProps = {
    data: PasienData[]
}

export default function PasienTable({data} : PasienTableProps) {
    return (
        <div className="pt-8 pb-4 px-4 rounded-xl shadow-lg">
            <div className="flex flex-row items-center justify-between px-4">
                <p className="text-2xl font-semibold">List Pasien</p>
                <Button asChild>
                    <Link href="/pasien/tambah-pasien" className="flex flex-row items-center">
                        <AddUserMale />
                        Tambah Pasien
                    </Link>
                </Button>
            </div>
            <div className='p-4'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pasien</TableHead>
                            <TableHead>Nomor Rekam Medis</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((pasien) => (
                            <TableRow key={pasien.id}>
                                <TableCell>{pasien.namaLengkap}</TableCell>
                                <TableCell>{pasien.medicalRecordNumber}</TableCell>
                                <TableCell>{pasien.gender}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{pasien.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/pasien/${pasien.id}`}>
                                        <Eye size={16} color="black"/>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}