import Image from "next/image";
import {User} from "lucide-react";

export type ProfilePatientProps = {
    fotoProfil?: string,
    namaLengkap: string,
    agama: string;
    nik: string;
    jenisKelamin: string;
    pendidikan: string;
    medicalRecordNumber: string;
    tanggalLahir: string;
    statusPerkawinan: string;
    nomorBpjs?: string;
    nomorHandphone: string;
    statusPembiayaan: string;
    pekerjaan: string;
}

export default function ProfilePatient({fotoProfil, namaLengkap, nomorHandphone, nik, jenisKelamin, tanggalLahir, nomorBpjs, agama, medicalRecordNumber, pekerjaan, statusPembiayaan, statusPerkawinan, pendidikan} : ProfilePatientProps) {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-row items-center justify-between gap-8">
                <div className="flex justify-center items-center rounded-xl p-10 shadow-md w-auto">
                    {fotoProfil ? (
                        <Image src={fotoProfil} alt={"Foto Profil"} width={64} height={64} />

                    ) : (
                        <div className="bg-gray-200 rounded-full w-32 h-32 justify-center items-center flex">
                            <User size={64} color="black"/>
                        </div>
                    )}
                </div>
                <div className="w-full py-6 pl-6 pr-10 shadow-md rounded-xl flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="font-medium text-gray-500 text-[14px]">Nama Lengkap</p>
                                <p className="font-semibold">{namaLengkap}</p>
                            </div>
                            <div>
                                <p className='font-medium text-gray-500 text-[14px]'>Agama</p>
                                <p className="font-semibold">{agama}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-500 text-[14px]">Nomor Induk Kependudukan</p>
                                <p className="font-semibold">{nik}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="font-medium text-gray-500 text-[14px]">Jenis Kelamin</p>
                                <p className="font-semibold">{jenisKelamin}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-500 text-[14px]">Pendidikan Terkahir</p>
                                <p className="font-semibold">{pendidikan}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-500 text-[14px]">Medical Record Number</p>
                                <p className="font-semibold">{medicalRecordNumber}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="font-medium text-gray-500 text-[14px]">Tanggal Lahir</p>
                                <p className="font-semibold">{new Date(tanggalLahir).toLocaleDateString("id-ID", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-500 text-[14px]">Status Perkawinan</p>
                                <p className="font-semibold">{statusPerkawinan}</p>
                            </div>
                            {nomorBpjs && (
                                <div>
                                    <p className="font-medium text-gray-500 text-[14px]">Nomor BPJS</p>
                                    <p className="font-semibold">{nomorBpjs}</p>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="font-medium text-gray-500 text-[14px]">Nomor Handphone</p>
                                <p className="font-semibold">{nomorHandphone}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-500 text-[14px]">Status Pembiayaan</p>
                                <p className="font-semibold">{statusPembiayaan}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-500 text-[14px]">Pekerjaan</p>
                                <p className="font-semibold">{pekerjaan}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}