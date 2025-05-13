import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";
import {Eye, User} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {AddUserMale} from "@/app/icons";
import {useRouter} from "next/navigation";

export type TableDokterData = {
    id: string;
    fotoProfil?: string;
    nama: string;
    gender: string;
    status: "NONAKTIF " | "AKTIF";
}

export type TableDokterProps = {
    data: TableDokterData[]
}

export default function TableDokter({data}: TableDokterProps) {

    const router = useRouter()

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex flex-row items-center justify-between">
                        <p className="text-2xl">Dokter</p>
                        <Button className="flex flex-row items-center gap-2" onClick={() => router.push('/dokter/tambah')}>
                            <AddUserMale/>
                            <p>Tambah Dokter</p>
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Dokter</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((dokter) => (
                            <TableRow key={dokter.id}>
                                <TableCell>
                                    <div className="flex flex-row items-center gap-2">
                                        {dokter.fotoProfil ? (
                                            <div className="bg-gray-300 w-10 h-10 rounded-full items-center justify-center flex">
                                                <Image src={dokter.fotoProfil} alt="Foto Profil" width={20} height={20}/>
                                            </div>

                                        ) : (
                                            <div className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center flex">
                                                <User size={24} color="black"/>
                                            </div>
                                        )}

                                        <p className="text-black">{dokter.nama}</p>
                                    </div>
                                </TableCell>
                                <TableCell>{dokter.gender}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{dokter.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/dokter/${dokter.id}`}>
                                        <Eye size={16} color="black"/>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}