"use client";

import dynamic from 'next/dynamic';
import {useEffect, useState} from "react";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import {
    createPatient,
    fetchAgamaOptions, fetchJenisIdentifiers,
    fetchPendidikanOptions,
    fetchStatusPembiayaanOptions,
    fetchStatusPerkawinanOptions
} from "@/lib/api/admin";
import {useRouter} from "next/navigation";
import { Options } from "@/types/types";

// Dynamic imports for form components
const InputField = dynamic(() => import("@/components/pasien/InputField"), {
    ssr: false,
    loading: () => (
        <div className="w-full flex flex-col gap-2">
            <div className="text-sm font-medium">Loading...</div>
            <div className="h-9 w-full rounded-md border border-input bg-transparent"></div>
        </div>
    )
});

const DatePickerField = dynamic(() => import("@/components/pasien/DatePickerField"), {
    ssr: false,
    loading: () => (
        <div className="w-full flex flex-col gap-2">
            <div className="text-sm font-medium">Loading...</div>
            <div className="h-9 w-full rounded-md border border-input bg-transparent"></div>
        </div>
    )
});

const SelectField = dynamic(() => import("@/components/kunjungan/SelectField"), {
    ssr: false,
    loading: () => (
        <div className="w-full flex flex-col gap-2">
            <div className="text-sm font-medium">Loading...</div>
            <div className="h-9 w-full rounded-md border border-input bg-transparent"></div>
        </div>
    )
});

type JenisIdentifier = {
    id: string;
    namaJenisIdentifier: string;
};


export default function TambahPasienPage() {
    const router = useRouter();
    const [nik, setNik] = useState("");
    const [nama, setNama] = useState("");
    const [date, setDate] = useState<Date | null>(null);
    const [noHp, setNoHp] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState("");
    const optionsGender = [
        { label: "Laki - Laki", value: "Pria" },
        { label: "Perempuan", value: "Wanita" },
    ]
    const [agama, setAgama] = useState("");
    const [optionsAgama, setOptionsAgama] = useState<Options[]>([]);
    const [pendidikan, setPendidikan] = useState("");
    const [optionsPendidikan, setOptionsPendidikan] = useState<Options[]>([]);
    const [statusPerkawinan, setStatusPerkawinan] = useState("");
    const [optionsStatusPerkawinan, setOptionsStatusPerkawinan] = useState<Options[]>([]);
    const [statusPembiayaan, setStatusPembiayaan] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [loadingError, setLoadingError] = useState<string | null>(null);
    const [idBpjs, setIdBpjs] = useState<string>("");
    const [idUmum, setIdUmum] = useState<string>("");
    const [bpjs, setBpjs] = useState("");
    const [jenisIdentifiers, setJenisIdentifiers] = useState<JenisIdentifier[]>([]);
    const [jalan, setJalan] = useState("");
    const [rtRw, setRtRw] = useState("");
    const [lingkungan, setLingkungan] = useState("");
    const [kelurahan, setKelurahan] = useState("");
    const [kecamatan, setKecamatan] = useState("");
    const [kabupaten, setKabupaten] = useState("");
    const [pekerjaan, setPekerjaan] = useState("");
    const [nikError, setNikError] = useState<string>("");

    const validateNik = (value: string) => {
        if (!value) {
            setNikError("NIK wajib diisi");
        } else if (!/^\d{16}$/.test(value)) {
            setNikError("NIK harus 16 digit angka");
        } else {
            setNikError("");
        }
    };



    useEffect(() => {
        const fetchOptions = async () => {
            setIsLoading(true);
            setLoadingError(null);
            try {
                const [agamaRes, pendidikanRes, statusPerkawinanRes, statusPembiayaanRes, jenisIdentifierRes] = await Promise.all([
                    fetchAgamaOptions(),
                    fetchPendidikanOptions(),
                    fetchStatusPerkawinanOptions(),
                    fetchStatusPembiayaanOptions(),
                    fetchJenisIdentifiers()
                ]);

                // Check if responses are valid
                if (!Array.isArray(agamaRes) || !Array.isArray(pendidikanRes) || 
                    !Array.isArray(statusPerkawinanRes) || !Array.isArray(statusPembiayaanRes) || 
                    !Array.isArray(jenisIdentifierRes)) {
                    throw new Error("Invalid response format from API");
                }

                setOptionsAgama(agamaRes.map((a: { namaAgama: string; id: string; }) => ({ label: a.namaAgama, value: a.id })));
                setOptionsPendidikan(pendidikanRes.map((p: { namaPendidikan: string; id: string; }) => ({ label: p.namaPendidikan, value: p.id })));
                setOptionsStatusPerkawinan(statusPerkawinanRes.map((s: { namaStatusPerkawinan: string; id: string; }) => ({ label: s.namaStatusPerkawinan, value: s.id })));


                const bpjs = statusPembiayaanRes.find((s: { namaStatusPembiayaan: string; }) => s.namaStatusPembiayaan.toUpperCase() === "BPJS");
                const umum = statusPembiayaanRes.find((s: { namaStatusPembiayaan: string; }) => s.namaStatusPembiayaan.toUpperCase() === "UMUM");

                if (bpjs) setIdBpjs(bpjs.id);
                if (umum) setIdUmum(umum.id);

                setJenisIdentifiers(jenisIdentifierRes);
                setIsLoading(false);
            } catch (error) {
                console.error("Gagal mengambil data opsi", error);
                setLoadingError("Gagal memuat data. Silakan muat ulang halaman atau hubungi administrator.");
                setIsLoading(false);
            }
        };

        fetchOptions();
    }, []);

    const handleSubmit = async () => {
        try {
            const nikId = jenisIdentifiers.find(j => j.namaJenisIdentifier === "NIK")?.id;
            if (!nikId) {
                alert("Jenis Identifier 'NIK' tidak ditemukan");
                return;
            }

            const bpjsId = jenisIdentifiers.find(j => j.namaJenisIdentifier === "Nomor BPJS")?.id;
            if (statusPembiayaan === idBpjs && !bpjsId) {
                alert("Jenis Identifier 'Nomor BPJS' tidak ditemukan");
                return;
            }

            const identifiers = [
                {
                    id_jenis_identifier: nikId,
                    nilai_identifier: nik,
                    use: "official"
                }
            ]
            if (statusPembiayaan === idBpjs) {
                if (!bpjsId) {
                    alert("Jenis Identifier untuk 'Nomor BPJS' tidak ditemukan.");
                    return;
                }
                identifiers.push({
                    id_jenis_identifier: bpjsId,
                    nilai_identifier: bpjs,
                    use: "official"
                });
            }



            const payload = {
                nama_lengkap: nama,
                tanggal_lahir: date ? date.toISOString() : "",
                nomor_handphone: noHp,
                pekerjaan,
                gender: jenisKelamin,
                id_agama: agama,
                id_pendidikan: pendidikan,
                id_status_perkawinan: statusPerkawinan,
                id_status_pembiayaan: statusPembiayaan,
                alamat: {
                    jalan,
                    rt_rw: rtRw,
                    lingkungan,
                    kelurahan_desa: kelurahan,
                    kecamatan,
                    kabupaten_kota: kabupaten
                },
                identifiers
            };

            await createPatient(payload)
            alert("Pasien berhasil ditambahkan")
            router.replace("/pasien")
        } catch (error) {
            console.error("Gagal menyimpan data pasien", error);
            alert("Gagal menyimpan data pasien");
        }
    }

    if (isLoading) {
        return (
            <div className="w-full h-[70vh] flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">Memuat data...</p>
            </div>
        );
    }

    if (loadingError) {
        return (
            <div className="w-full h-[70vh] flex flex-col items-center justify-center">
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                    <span className="font-medium">Error:</span> {loadingError}
                </div>
                <Button onClick={() => window.location.reload()} className="mt-4">
                    Muat Ulang
                </Button>
            </div>
        );
    }
    
    // Only render the form when all data is loaded
    return (
        <div className="w-full pb-8">
            <div className="flex flex-col gap-4 mb-8">
                <p className='text-2xl font-semibold'>Identitas Diri</p>
                <div className="flex flex-col gap-4">
                    <InputField
                        id="nik"
                        type="text"
                        label="Nomor Induk Kependudukan (NIK)"
                        placeholder="Masukkan NIK anda"
                        value={nik}
                        onChange={(val) => {
                            setNik(val);
                            validateNik(val);
                        }}
                        error={nikError}
                    />
                    <InputField
                        id="nama"
                        type="text"
                        label="Nama Lengkap"
                        placeholder="Masukkan nama lengkap anda"
                        value={nama}
                        onChange={setNama}
                    />
                    <DatePickerField selectedDate={date} onChange={setDate} label="Tanggal Lahir"/>
                    <InputField
                        id="nomor"
                        type="text"
                        label="Nomor Handphone"
                        placeholder="Masukkan nomor handphone anda"
                        value={noHp}
                        onChange={setNoHp}
                    />
                    <InputField
                        id="pekerjaan"
                        type="text"
                        label="Pekerjaan"
                        placeholder="Masukkan pekerjaan anda"
                        value={pekerjaan}
                        onChange={setPekerjaan}
                    />
                    <div className="flex flex-row items-center justify-between gap-5">
                        {optionsGender && (
                            <SelectField
                                label="Jenis Kelamin"
                                placeholder="Pilih jenis kelamin"
                                options={optionsGender}
                                selectedValue={jenisKelamin}
                                onChange={setJenisKelamin}
                            />
                        )}
                        {optionsAgama && optionsAgama.length > 0 && (
                            <SelectField
                                label="Agama"
                                placeholder="Pilih Agama"
                                options={optionsAgama}
                                selectedValue={agama}
                                onChange={setAgama}
                            />
                        )}
                        {optionsPendidikan && optionsPendidikan.length > 0 && (
                            <SelectField
                                label="Pendidikan Terakhir"
                                placeholder="Pilih pendidikan terakhir anda"
                                options={optionsPendidikan}
                                selectedValue={pendidikan}
                                onChange={setPendidikan}
                            />
                        )}
                        {optionsStatusPerkawinan && optionsStatusPerkawinan.length > 0 && (
                            <SelectField
                                label="Status Perkawinan"
                                placeholder="Pilih status perkawinan anda"
                                options={optionsStatusPerkawinan}
                                selectedValue={statusPerkawinan}
                                onChange={setStatusPerkawinan}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 mb-8">
                <p className='text-2xl font-semibold'>Alamat</p>
                <div className="flex flex-col gap-4">
                    <InputField
                        id="jalan"
                        type="text"
                        label="Jalan *"
                        placeholder="Masukkan nama jalan alamat anda"
                        value={jalan}
                        onChange={setJalan}
                    />
                    <div className="flex flex-row items-center justify-between gap-10">
                        <InputField
                            id="rtRw"
                            type="text"
                            label="RT / RW"
                            placeholder="000/000"
                            value={rtRw}
                            onChange={setRtRw}
                        />
                        <InputField
                            id="lingkungan"
                            type="text"
                            label="Lingkungan / Jaga"
                            placeholder="Lingkungan 0"
                            value={lingkungan}
                            onChange={setLingkungan}
                        />
                    </div>
                    <InputField
                        id="kelurahan"
                        type="text"
                        label="Kelurahan / Desa"
                        placeholder="Masukkan nama kelurahan / desa anda"
                        value={kelurahan}
                        onChange={setKelurahan}
                    />
                    <InputField
                        id="kecamatan"
                        type="text"
                        label="Kecamatan"
                        placeholder="Masukkan nama kecamatan anda"
                        value={kecamatan}
                        onChange={setKecamatan}
                    />
                    <InputField
                        id="kabupaten"
                        type="text"
                        label="Kabupaten / Kota"
                        placeholder="Masukkan nama kabupaten / kota anda"
                        value={kabupaten}
                        onChange={setKabupaten}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 mb-8">
                <p className='text-2xl font-semibold'>Status Pembiayaan</p>
                <div className="flex flex-col gap-4">
                    {idUmum && idBpjs && (
                        <RadioGroup
                            className="flex flex-row items-center gap-10"
                            value={statusPembiayaan}
                            onValueChange={setStatusPembiayaan}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={idUmum} id="umum" />
                                <Label htmlFor="umum">Umum</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={idBpjs} id="bpjs" />
                                <Label htmlFor="bpjs">BPJS</Label>
                            </div>
                        </RadioGroup>
                    )}
                    
                    {statusPembiayaan === idBpjs && (
                        <InputField
                            id="bpjs"
                            type="text"
                            label="Nomor Peserta"
                            placeholder="Masukkan nomor peserta BPJS anda"
                            value={bpjs}
                            onChange={setBpjs}
                        />
                    )}
                </div>
            </div>
            <div className="w-full flex flex-row items-center justify-end">
                <Button className="w-[120px]" onClick={handleSubmit}>
                    Simpan
                </Button>
            </div>
        </div>
    )
}