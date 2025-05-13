import Image from "next/image";
import {User} from "lucide-react";

export type ProfileDoctorProps = {
    fotoProfil?: string;
    namaLengkap: string;
    nomorHandphone: string;
    nik: string
    jenisKelamin: string;
    tanggalLahir: string;
}

export default function ProfileDoctor({fotoProfil, namaLengkap, nomorHandphone, nik, jenisKelamin, tanggalLahir} : ProfileDoctorProps) {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-row items-center gap-8">
                <div className="flex justify-center items-center rounded-xl p-10 shadow-md w-auto">
                    {fotoProfil ? (
                        <Image src={fotoProfil} alt={"Foto Profil"} width={64} height={64} />

                    ) : (
                        <div className="bg-gray-200 rounded-full w-32 h-32 justify-center items-center flex">
                            <User size={64} color="black"/>
                        </div>
                    )}
                </div>
                <div className="w-auto py-6 pl-6 pr-10 shadow-md rounded-xl flex flex-col gap-2">
                    <div className="flex flex-row gap-10">
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="font-medium text-gray-500 text-[14px]">Nama Lengkap</p>
                                <p className="font-semibold">{namaLengkap}</p>
                            </div>
                            <div>
                                <p className='font-medium text-gray-500 text-[14px]'>Nomor Handphone</p>
                                <p className="font-semibold">{nomorHandphone}</p>
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
                                <p className="font-medium text-gray-500 text-[14px]">Tanggal Lahir</p>
                                <p className="font-semibold">{new Date(tanggalLahir).toLocaleDateString("id-ID", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}