"use client";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import UserProfile from "@/components/verifikasi/UserProfile";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {HoverCard, HoverCardTrigger} from "@/components/ui/hover-card";
import {VerificationPatient} from "@/types/verifikasi/types";
import {useEffect, useState} from "react";
import {fetchUnverifiedPatients} from "@/lib/api/admin";
import Link from "next/link";
import handleVerifyPatient from "@/lib/handlers/admin/handleVerifyPatient";
import {useRouter} from "next/navigation";


export default function TableVerification() {
    const router = useRouter();

    const [data, setData] = useState<VerificationPatient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const approvePasien = async (id: string) => {
        await handleVerifyPatient(
            id,
            () => {
                alert("Verifikasi Berhasil");
                router.refresh()
            },
            (msg) => {
                alert(`Gagal: ${msg}`)
            }
        )
    }


    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetchUnverifiedPatients();
                setData(res);
            } catch (error: unknown) {
                console.error(error)
                setError("Gagal Memuat Data Verifikasi")
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>

    return(
        <Card className="w-full mt-8">
            <CardHeader>
                <CardTitle className="text-[28px] font-semibold">List Verifikasi Pending</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pasien</TableHead>
                            <TableHead>Tanggal Registrasi</TableHead>
                            <TableHead>Dokumen</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>
                                    <UserProfile image={`${patient.image}`} name={patient.name} />
                                </TableCell>
                                <TableCell>
                                    <p>{patient.tanggalRegistrasi}</p>
                                </TableCell>
                                <TableCell>
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Button variant="link">
                                                <Link href={`/verifikasi/${patient.id}`}>Lihat</Link>
                                            </Button>
                                        </HoverCardTrigger>
                                    </HoverCard>
                                </TableCell>
                                <TableCell>
                                    <Badge className="bg-gray-100 text-black ">{patient.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        className="hover:opacity-50"
                                        onClick={() => approvePasien(patient.id)}
                                    >
                                        Approve
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