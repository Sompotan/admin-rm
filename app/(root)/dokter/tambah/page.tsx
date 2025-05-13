"use client";

import InputField from "@/components/pasien/InputField";
import SelectField from "@/components/kunjungan/SelectField";
import {Button} from "@/components/ui/button";
import {DatePickerField} from "@/components/pasien/DatePickerField";
import CheckboxGroupField from "@/components/common/CheckboxGroupField";
import {useEffect, useState} from "react";
import {CreateDoctorPayload} from "@/types/admin";
import {createDoctor, fetchJenisKualifikasi} from "@/lib/api/admin";
import {useRouter} from "next/navigation";



export default function TambahDokterPage() {
    const router = useRouter()
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
        // (Opsional) Validasi sederhana
        if (!form.email || !form.password || !form.nik || !form.kualifikasi.id_jenis_kualifikasi) {
            alert("Mohon lengkapi semua data wajib");
            return;
        }

        const payload: CreateDoctorPayload = {
            email: form.email,
            password: form.password,
            nik: form.nik,
            gender: form.gender,
            tanggal_lahir: form.tanggal_lahir,
            nomor_handphone: form.nomor_handphone,
            jadwalPraktekHari: form.jadwalPraktekHari,
            status: form.status,
            nama: {
                prefix: form.nama.prefix,
                nama_depan: form.nama.nama_depan,
                nama_tengah: form.nama.nama_tengah,
                nama_belakang: form.nama.nama_belakang,
                suffix: form.nama.suffix,
            },

            alamat: {
                jalan: form.alamat.jalan,
                rt_rw: form.alamat.rt_rw,
                lingkungan: form.alamat.lingkungan,
                kelurahan_desa: form.alamat.kelurahan_desa,
                kecamatan: form.alamat.kecamatan,
                kabupaten_kota: form.alamat.kabupaten_kota,
            },

            kualifikasi: {
                id_jenis_kualifikasi: form.kualifikasi.id_jenis_kualifikasi,
                nomor_kualifikasi: form.kualifikasi.nomor_kualifikasi,
                tanggal_mulai: form.kualifikasi.tanggal_mulai,
                tanggal_berakhir: form.kualifikasi.tanggal_berakhir,
                institusi_penerbit: form.kualifikasi.institusi_penerbit,
            },
        };

        try {
            const result = await createDoctor(payload);
            router.back()
            alert("Dokter berhasil ditambahkan ✅");
            console.log("Hasil:", result);

            // (Opsional) Reset form:
            // setForm({ ...kosongkan state });

        } catch (error) {
            console.error("[ERROR createDoctor]", error);
            alert("Gagal menambahkan dokter ❌");
        }
    };



    return (
        <div className="w-full pb-8">
            <div className="flex flex-col gap-4 mb-8">
                <p className='text-2xl font-semibold'>Akun</p>
                <div className="flex flex-row gap-4">
                    <InputField id="email" type="email" label="Email" placeholder="user@example.com"
                                value={form.email} onChange={(v) => setForm(f => ({...f, email: v}))}/>
                    <InputField id="password" type="password" label="Password" placeholder="********"
                                value={form.password} onChange={(v) => setForm(f => ({ ...f, password: v }))}/>
                </div>
            </div>
            <div className="flex flex-col gap-4 mb-8">
                <p className='text-2xl font-semibold'>Identitas Diri</p>
                <div className="flex flex-col gap-4">
                    <InputField id="nik" type="text" label="Nomor Induk Kependudukan (NIK)" placeholder="Masukkan nomor induk kependudukan anda"
                                value={form.nik} onChange={(v) => setForm(f => ({ ...f, nik: v }))} />
                    <div className="flex flex-row items-center justify-between gap-5">
                        <InputField id="prefix" type="text" label="Prefix" placeholder="dr."
                                    value={form.nama.prefix} onChange={(v) =>
                            setForm((f) => ({
                                ...f,
                                nama: {
                                    ...f.nama,
                                    prefix: v
                                }
                            }))
                        } />
                        <InputField id="nama_depan" type="text" label="Nama Depan" placeholder="Nama Depan"
                                    value={form.nama.nama_depan} onChange={(v) =>
                            setForm((f) => ({
                                ...f,
                                nama: {
                                    ...f.nama,
                                    nama_depan: v
                                }
                            }))
                        } />
                        <InputField id="nama_tengah" type="text" label="Nama Tengah" placeholder="Nama Tengah"
                                    value={form.nama.nama_tengah} onChange={(v) =>
                            setForm((f) => ({
                                ...f,
                                nama: {
                                    ...f.nama,
                                    nama_tengah: v
                                }
                            }))
                        } />
                        <InputField id="nama_belakang" type="text" label="Nama Belakang" placeholder="Nama Belakang"
                                    value={form.nama.nama_belakang} onChange={(v) =>
                            setForm((f) => ({
                                ...f,
                                nama: {
                                    ...f.nama,
                                    nama_belakang: v
                                }
                            }))
                        } />
                        <InputField id="suffix" type="text" label="Suffix" placeholder="Gelar"
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
                    <DatePickerField selectedDate={form.tanggal_lahir} onChange={(v) => setForm(f => ({...f, tanggal_lahir: v}))} />
                    <InputField id="nomor_handphone" type="text" label="Nomor Handphone" placeholder="08xxxxxxxxx" value={form.nomor_handphone} onChange={(v) => setForm(f => ({...f, nomor_handphone: v}))} />
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
                <InputField id="nomor_kualifikasi" type="text" label="Nomor Kualifikasi" placeholder="Masukkan nomor kualifikasi"
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
                                     }  />
                    <DatePickerField selectedDate={form.kualifikasi.tanggal_berakhir}
                                     onChange={(v) =>
                                         setForm((f) => ({
                                             ...f,
                                             kualifikasi: {
                                                 ...f.kualifikasi,
                                                 tanggal_berakhir: v
                                             }
                                         }))
                                     } />
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