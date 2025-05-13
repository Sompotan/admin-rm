import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Eye} from "lucide-react";
import Link from "next/link";


export type TableRiwayatRekamMedisProps = {
    items: {
        id: string;
        pasienId: string;
        tanggal: string;
        dokter: string;
        diagnosa: string;
        layanan: string;
    }[]
}


export default function TableRiwayatRekamMedis({items} : TableRiwayatRekamMedisProps) {
    return (
        <div className="p-4 rounded-xl shadow-md mt-8">
            <p className="py-6 font-semibold text-xl px-2">Riwayat Rekam Medis</p>
            <div className="px-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Dokter</TableHead>
                            <TableHead>Diagnosa</TableHead>
                            <TableHead>Layanan</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{new Date(item.tanggal).toLocaleDateString("id-ID", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}</TableCell>
                                <TableCell>{item.dokter}</TableCell>
                                <TableCell>{item.diagnosa}</TableCell>
                                <TableCell>{item.layanan}</TableCell>
                                <TableCell>
                                    <Link href={`/rekam-medis/${item.id}`}>
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