"use client";

import InputField from "@/components/pasien/InputField";
import SelectField from "@/components/kunjungan/SelectField";
import {Button} from "@/components/ui/button";
import DatePickerField from "@/components/pasien/DatePickerField";
import CheckboxGroupField from "@/components/common/CheckboxGroupField";
import {useEffect, useState} from "react";
import {CreateDoctorPayload} from "@/types/admin";
import {createDoctor, fetchJenisKualifikasi} from "@/lib/api/admin";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {DoctorFormErrors, validateForm} from "@/lib/validateTambahDokter";



export default function Page() {
    const router = useRouter()

    const [errors, setErrors] = useState<DoctorFormErrors>({});


    const [jenisKualifikasiOptions, setJenisKualifikasiOptions] = useState<{ label: string; value: string }[]>([]);
    const [form, setForm] = useState<CreateDoctorPayload>({
        email: "",
        password: "",
        nik: "",
        gender: "",
        tanggal_lahir: null,
        nomor_handphone: "",
        jadwalPraktekHari: [],
        status: "",
        nama: {
            prefix: "",
            nama_depan: "",
            nama_tengah: "",
            nama_belakang: "",
            suffix: ""
        },

        alamat: {
            jalan: "",
            rt_rw: "",
            lingkungan: "",
            kelurahan_desa: "",
            kecamatan: "",
            kabupaten_kota: ""
        },

        kualifikasi: {
            id_jenis_kualifikasi: "",
            nomor_kualifikasi: "",
            tanggal_mulai: null,
            tanggal_berakhir: null,
            institusi_penerbit: ""
        }
    });

    useEffect(() => {
        const loadOptions = async () => {
            const data = await fetchJenisKualifikasi();
            const mapped = data.map((jk: { namaJenisKualifikasi: string; id: string; }) => ({
                label: jk.namaJenisKualifikasi,
                value: jk.id
            }));
            setJenisKualifikasiOptions(mapped);
        };
        loadOptions();
    }, []);

    const handleSubmit = async () => {
        const validationErrors: DoctorFormErrors = validateForm(form);
        setErrors(validationErrors);

        const hasErrors = Object.keys(validationErrors).length > 0 ||
            (validationErrors.nama && Object.keys(validationErrors.nama).length > 0) ||
            (validationErrors.alamat && Object.keys(validationErrors.alamat).length > 0) ||
            (validationErrors.kualifikasi && Object.keys(validationErrors.kualifikasi).length > 0);

        if (hasErrors) {
            toast.error("Mohon lengkapi semua data wajib.");
            return;
        }

        const payload: CreateDoctorPayload = {
            ...form,
            nama: { ...form.nama },
            alamat: { ...form.alamat },
            kualifikasi: { ...form.kualifikasi }
        };

        try {
            await createDoctor(payload);
            toast.success("Dokter berhasil ditambahkan ✅");
            router.back();
        } catch (error) {
            console.error("[ERROR createDoctor]", error);
            toast.error("Gagal menambahkan dokter ❌");
        }
    };



    return (
        <div className="w-full pb-8">
            <div className="flex flex-col gap-4 mb-8">
                <p className='text-2xl font-semibold'>Akun</p>
                <div className="flex flex-row gap-4">
                    <InputField error={errors.email} id="email" type="email" label="Email" placeholder="user@example.com"
                                value={form.email} onChange={(v) => setForm(f => ({...f, email: v}))}/>
                    <InputField error={errors.password} id="password" type="password" label="Password" placeholder="********"
                                value={form.password} onChange={(v) => setForm(f => ({ ...f, password: v }))}/>
                </div>
            </div>
            <div className="flex flex-col gap-4 mb-8">
                <p className='text-2xl font-semibold'>Identitas Diri</p>
                <div className="flex flex-col gap-4">
                    <InputField error={errors.nik} id="nik" type="text" label="Nomor Induk Kependudukan (NIK)" placeholder="Masukkan nomor induk kependudukan anda"
                                value={form.nik} onChange={(v) => setForm(f => ({ ...f, nik: v }))} />
                    <div className="flex flex-row items-center justify-between gap-5">
                        <InputField error={errors.nama?.prefix} id="prefix" type="text" label="Prefix" placeholder="dr."
                                    value={form.nama.prefix} onChange={(v) =>
                            setForm((f) => ({
                                ...f,
                                nama: {
                                    ...f.nama,
                                    prefix: v
                                }
                            }))
                        } />
                        <InputField error={errors.nama?.nama_depan} id="nama_depan" type="text" label="Nama Depan" placeholder="Nama Depan"
                                    value={form.nama.nama_depan} onChange={(v) =>
                            setForm((f) => ({
                                ...f,
                                nama: {
                                    ...f.nama,
                                    nama_depan: v
                                }
                            }))
                        } />
                        <InputField error={errors.nama?.nama_tengah} id="nama_tengah" type="text" label="Nama Tengah" placeholder="Nama Tengah"
                                    value={form.nama.nama_tengah} onChange={(v) =>
                            setForm((f) => ({
                                ...f,
                                nama: {
                                    ...f.nama,
                                    nama_tengah: v
                                }
                            }))
                        } />
                        <InputField error={errors.nama?.nama_belakang} id="nama_belakang" type="text" label="Nama Belakang" placeholder="Nama Belakang"
                                    value={form.nama.nama_belakang} onChange={(v) =>
                            setForm((f) => ({
                                ...f,
                                nama: {
                                    ...f.nama,
                                    nama_belakang: v
                                }
                            }))
                        } />
                        <InputField error={errors.nama?.suffix} id="suffix" type="text" label="Suffix" placeholder="Gelar"
                                    value={form.nama.suffix} onChange={(v) =>
                            setForm((f) => ({
                                ...f,
                                nama: {
                                    ...f.nama,
                                    suffix: v
                                }
                            }))
                        } />
                    </div>
                    <DatePickerField selectedDate={form.tanggal_lahir} onChange={(v) => setForm(f => ({...f, tanggal_lahir: v}))} label="Tanggal Lahir"/>
                    <InputField error={errors.nomor_handphone} id="nomor_handphone" type="text" label="Nomor Handphone" placeholder="08xxxxxxxxx" value={form.nomor_handphone} onChange={(v) => setForm(f => ({...f, nomor_handphone: v}))} />
                    <div className="flex flex-row items-center justify-between gap-5">
                        <SelectField label="Jenis Kelamin" placeholder="Pilih Jenis Kelamin" selectedValue={form.gender} options={[{ label: "Laki - Laki", value: "Pria"}, {label:"Perempuan", value: "Wanita"}]} onChange={(v) => setForm(f => ({...f, gender: v}))} />
                        <SelectField label="Status" placeholder="Pilih Status" selectedValue={form.status} onChange={(v) => setForm(f => ({...f, status: v}))} options={[{ label: "Aktif", value: "AKTIF" }, { label: "Nonaktif", value: "NONAKTIF" }]} />
                    </div>
                    <CheckboxGroupField label="Jadwal Praktek" onChange={(v) => setForm(f => ({...f, jadwalPraktekHari: v}))} options={["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]} value={form.jadwalPraktekHari} />
                </div>
            </div>
            <div className="flex flex-col gap-4 mb-8">
                <p className='text-2xl font-semibold'>Alamat</p>
                <div className="flex flex-col gap-4">
                    <InputField id="jalan" type="text" label="Jalan" placeholder="Masukkan nama jalan alamat anda"
                                value={form.alamat.jalan} onChange={(v) =>
                        setForm((f) => ({
                            ...f,
                            alamat: {
                                ...f.alamat,
                                jalan: v
                            }
                        }))
                    }/>
                    <div className="flex flex-row items-center justify-between gap-10">
                        <InputField id="rtRw" type="text" label="RT / RW" placeholder="000/000"
                                    value={form.alamat.rt_rw} onChange={(v) =>
                            setForm((f) => ({
                                ...f,
                                alamat: {
                                    ...f.alamat,
                                    rt_rw: v
                                }
                            }))
                        } />
                        <InputField id="lingkungan" type="text" label="Lingkungan / Jaga" placeholder="Lingkungan / Jaga"
                                    value={form.alamat.lingkungan} onChange={(v) =>
                            setForm((f) => ({
                                ...f,
                                alamat: {
                                    ...f.alamat,
                                    lingkungan: v
                                }
                            }))
                        } />
                    </div>
                    <InputField id="kecamatan" type="text" label="Kecamatan" placeholder="Kecamatan"
                                value={form.alamat.kecamatan} onChange={(v) =>
                        setForm((f) => ({
                            ...f,
                            alamat: {
                                ...f.alamat,
                                kecamatan: v
                            }
                        }))
                    } />
                    <InputField id="kelurahan" type="text" label="Kelurahan / Desa" placeholder="Kelurahan / Desa"
                                value={form.alamat.kelurahan_desa} onChange={(v) =>
                        setForm((f) => ({
                            ...f,
                            alamat: {
                                ...f.alamat,
                                kelurahan_desa: v
                            }
                        }))
                    } />
                    <InputField id="kabupaten" type="text" label="Kabupaten / Kota" placeholder="Kabupaten / Kota"
                                value={form.alamat.kabupaten_kota} onChange={(v) =>
                        setForm((f) => ({
                            ...f,
                            alamat: {
                                ...f.alamat,
                                kabupaten_kota: v
                            }
                        }))
                    } />

                </div>
            </div>
            <div className="flex flex-col gap-4 mb-8">
                <p className='text-2xl font-semibold'>Kualifikasi</p>
                <SelectField label="Jenis Kualifikasi" placeholder="Pilih Jenis Kualifikasi" selectedValue={form.kualifikasi.id_jenis_kualifikasi} options={jenisKualifikasiOptions}
                             onChange={(v) =>
                                 setForm((f) => ({
                                     ...f,
                                     kualifikasi: {
                                         ...f.kualifikasi,
                                         id_jenis_kualifikasi: v
                                     }
                                 }))
                             } />
                <InputField error={errors.kualifikasi?.nomor_kualifikasi} id="nomor_kualifikasi" type="text" label="Nomor Kualifikasi" placeholder="Masukkan nomor kualifikasi"
                            value={form.kualifikasi.nomor_kualifikasi} onChange={(v) =>
                    setForm((f) => ({
                        ...f,
                        kualifikasi: {
                            ...f.kualifikasi,
                            nomor_kualifikasi: v
                        }
                    }))
                }/>
                <div className="flex flex-row items-center justify-between gap-10">
                    <DatePickerField selectedDate={form.kualifikasi.tanggal_mulai}
                                     onChange={(v) =>
                                         setForm((f) => ({
                                             ...f,
                                             kualifikasi: {
                                                 ...f.kualifikasi,
                                                 tanggal_mulai: v
                                             }
                                         }))
                                     }
                                     label="Tanggal Mulai"
                    />
                    <DatePickerField selectedDate={form.kualifikasi.tanggal_berakhir}
                                     onChange={(v) =>
                                         setForm((f) => ({
                                             ...f,
                                             kualifikasi: {
                                                 ...f.kualifikasi,
                                                 tanggal_berakhir: v
                                             }
                                         }))
                                     }
                                     label="Tanggal Berakhir"
                    />
                </div>
                <InputField id="institusi" type="text" label="Institusi Penerbit" placeholder="Masukkan institusi penerbit"
                            value={form.kualifikasi.institusi_penerbit} onChange={(v) =>
                    setForm((f) => ({
                        ...f,
                        kualifikasi: {
                            ...f.kualifikasi,
                            institusi_penerbit: v
                        }
                    }))
                } />
            </div>
            <div className="w-full flex flex-row items-center justify-end">
                <Button className="w-[120px]" onClick={handleSubmit}>
                    Simpan
                </Button>
            </div>
        </div>
    )
}