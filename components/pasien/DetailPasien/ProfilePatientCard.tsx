import {User} from "lucide-react";
import Image from "next/image";

type ProfilePatientCardProps = {
    fotoProfil?: string,
    namaLengkap: string,
    agama: string,
    gender: string,
    pendidikan: string;
    tanggalLahir: string,
    statusPerkawinan: string,
    nomorHandphone: string,
    statusPembiayaan: string,
    nik: string,
    medicalRecordNumber: string,
    nomorBpjs?: string,
    jalan: string,
    kecamatan: string,
    rtRw: string,
    kabupatenKota: string,
    lingkunganJaga: string,
    kelurahanDesa: string,
    pekerjaan: string
}

export default function ProfilePatientCard({
                                                fotoProfil,
                                               namaLengkap,
                                               agama,
                                               gender,
                                               pendidikan,
                                               tanggalLahir,
                                               statusPerkawinan,
                                               nomorHandphone,
                                               statusPembiayaan,
                                               nik,
                                               medicalRecordNumber,
                                               nomorBpjs,
                                               jalan,
                                               kabupatenKota,
                                               lingkunganJaga,
                                               rtRw,
                                               kelurahanDesa,
                                               kecamatan,
                                               pekerjaan
                                           } : ProfilePatientCardProps) {
    return(
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
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-2">
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
                        <div className="flex flex-col gap-2">
                            <div>
                                <p className="font-medium text-gray-500 text-[14px]">Jenis Kelamin</p>
                                <p className="font-semibold">{gender}</p>
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
                        <div className="flex flex-col gap-2">
                            <div>
                                <p className="font-medium text-gray-500 text-[14px]">Tanggal Lahir</p>
                                <p className="font-semibold">{tanggalLahir}</p>
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
                        <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-4 py-8 pl-8 pr-12 rounded-xl shadow-md">
                <p className="text-2xl font-semibold">Alamat</p>
                <div className="flex flex-row items-start justify-between">
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="font-medium text-gray-500 text-[14px]">Jalan</p>
                            <p className="font-semibold">{jalan}</p>
                        </div>
                        <div>
                            <p className='font-medium text-gray-500 text-[14px]'>Kecamatan</p>
                            <p className="font-semibold">{kecamatan}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="font-medium text-gray-500 text-[14px]">RT / RW</p>
                            <p className="font-semibold">{rtRw}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-500 text-[14px]">Kabupaten / Kota</p>
                            <p className="font-semibold">{kabupatenKota}</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-medium text-gray-500 text-[14px]">Lingkungan / Jaga</p>
                        <p className="font-semibold">{lingkunganJaga}</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray-500 text-[14px]">Kelurahan / Desa</p>
                        <p className="font-semibold">{kelurahanDesa}</p>
                    </div>
                </div>
            </div>

        </div>


    )
}