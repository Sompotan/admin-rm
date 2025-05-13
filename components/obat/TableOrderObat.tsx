import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";

import {Badge} from "@/components/ui/badge";

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import { User } from "lucide-react";


export type ResepObatData = {
    id: string;
    tanggal: string;
    status: "DIPESAN" | "DISIAPKAN" | "FINAL";
    pasien: {
        id: string;
        nama: string;
        fotoProfil: string;
    },
    dokter: {
        nama: string;
    }
}

type TableOrderObatProps = {
    data: ResepObatData[]
    onUpdateStatus: (id: string, status: "DISIAPKAN" | "FINAL") => void
}

export default function TableOrderObat({data, onUpdateStatus}: TableOrderObatProps) {
    const router = useRouter()

    const handleDetailClick = (id: string) => {
        router.push(`/obat/${id}`)
    }



    return (
        <Card>
            <CardHeader>
                <CardTitle>List Order Obat</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pasien</TableHead>
                            <TableHead>Dokter</TableHead>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>

                    </TableHeader>
                    <TableBody>
                        {data.map((resep) => (
                            <TableRow key={resep.id}>
                                <TableCell>
                                    <div className="flex flex-row items-center gap-2">
                                        {resep.pasien.fotoProfil ? (
                                            <div className="bg-gray-300 w-10 h-10 rounded-full items-center justify-center flex">
                                                <Image src={resep.pasien.fotoProfil} alt="Foto Profil" width={20} height={20}/>
                                            </div>

                                        ) : (
                                            <div className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center flex">
                                                <User size={24} color="black"/>
                                            </div>
                                        )}

                                        <p className="text-black">{resep.pasien.nama}</p>
                                    </div>
                                </TableCell>
                                <TableCell>{resep.dokter.nama}</TableCell>
                                <TableCell>{new Date(resep.tanggal).toLocaleDateString("id-ID", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit",
                                })}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{resep.status}</Badge>
                                </TableCell>
                                <TableCell className="flex flex-row gap-4">
                                    {resep.status === "DIPESAN" ? (
                                        <Button variant="default" onClick={() => onUpdateStatus(resep.id, "DISIAPKAN")}>
                                            Siapkan Obat
                                        </Button>
                                    ) : (
                                        <Button variant="default" onClick={() => onUpdateStatus(resep.id, "FINAL")}>
                                            Selesai
                                        </Button>
                                    ) }
                                    <Button variant="outline" onClick={() => handleDetailClick(resep.id)}>
                                        Lihat Detail
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}