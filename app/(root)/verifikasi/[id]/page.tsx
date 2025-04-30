"use client";

import {Card, CardContent} from "@/components/ui/card";
import DetailItems from "@/components/verifikasi/DetailItems";
import {fetchUnverifiedPatientById} from "@/lib/api/admin";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function DetailVerifilkasiPage() {
    const params = useParams();

    const [pasien,setPasien] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetch = async () => {
            const res = await fetchUnverifiedPatientById(params.id as string)
            setPasien(res)
        }

        setLoading(false);
        fetch()
    }, [params]);

    const nik = pasien?.identifiers?.find(
        (id) => id.jenisIdentifier?.namaJenisIdentifier === "NIK"
    )?.nilaiIdentifier

    const bpjs = pasien?.identifiers?.find(
        (id) => id.jenisIdentifier?.namaJenisIdentifier === "Nomor BPJS"
    )?.nilaiIdentifier

    if (loading) return <p>Loading...</p>



    return (
        <div className="w-full flex flex-col px-8">
            <div className="flex flex-col my-4">
                <p className="font-semibold text-[24px] mb-4">Identitas Diri</p>
                <Card className="w-full">
                    <CardContent>
                        <div className="flex flex-row items-start justify-between mr-10 ">
                            <div className="flex flex-col items-start gap-4">
                                <DetailItems
                                    title={"Nama Lengkap"}
                                    value={pasien?.namaLengkap}
                                />
                                <DetailItems
                                    title={"NIK"}
                                    value={nik}
                                />
                            </div>
                            <div className="flex flex-col items-start gap-4">
                                <DetailItems
                                    title={"Jenis Kelamin"}
                                    value={pasien?.gender === "Pria" ? "Laki - Laki" : "Perempuan"}
                                />
                            </div>
                            <div className="flex flex-col items-start gap-4">
                                <DetailItems
                                    title={"Tanggal Lahir"}
                                    value={new Date(pasien?.tanggalLahir).toLocaleDateString("id-ID", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit"
                                    })}
                                />
                                <DetailItems
                                    title={"Status Perkawinan"}
                                    value={pasien?.statusPerkawinan?.namaStatusPerkawinan}
                                />
                            </div>
                            <div className="flex flex-col items-start gap-4">
                                <DetailItems
                                    title={"Nomor Handphone"}
                                    value={pasien?.nomorHandphone}
                                />
                                <DetailItems
                                    title={"Pendidkan Terkahir"}
                                    value={pasien?.pendidikan?.namaPendidikan}
                                />
                            </div>
                            <div className="flex flex-col items-start gap-4 mr-10">
                                <DetailItems
                                    title={"Agama"}
                                    value={pasien?.agama?.namaAgama}
                                />
                                <DetailItems
                                    title={"Pekerjaan"}
                                    value={pasien?.pekerjaan}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col my-4">
                <p className="font-semibold text-[24px] mb-4">Alamat</p>
                <Card className="w-full">
                    <CardContent>
                        <div className="flex flex-row start justify-between mr-10">
                            <div className="flex flex-col items-start gap-4">
                                <DetailItems
                                    title={"Jalan"}
                                    value={pasien?.alamat?.jalan}
                                />
                                <DetailItems
                                    title={"Kecamatan"}
                                    value={pasien?.alamat?.kecamatan}
                                />
                            </div>
                            <div className="flex flex-col items-start gap-4">
                                <DetailItems
                                    title={"RT / RW"}
                                    value={pasien?.alamat?.rtRw}
                                />
                                <DetailItems
                                    title={"Kabupaten / Kota"}
                                    value={pasien?.alamat?.kabupatenKota}
                                />
                            </div>
                            <div className="flex flex-col items-start">
                                <DetailItems
                                    title={"Lingkungan"}
                                    value={pasien?.alamat?.lingkungan}
                                />
                            </div>
                            <div className="flex flex-col items-start mr-10">
                                <DetailItems
                                    title={"Kelurahan / Desa"}
                                    value={pasien?.alamat?.kelurahanDesa}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col">
                <p className="font-semibold text-[24px] mb-4">Status Pembiayaan</p>
                <Card className="w-full">
                    <CardContent>
                        <div className="flex flex-row items-start gap-20">
                            <DetailItems
                                title={"Status Pembiayaan"}
                                value={pasien?.statusPembiayaan?.namaStatusPembiayaan}
                            />
                            <DetailItems
                                title={"Nomor BPJS"}
                                value={bpjs}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}