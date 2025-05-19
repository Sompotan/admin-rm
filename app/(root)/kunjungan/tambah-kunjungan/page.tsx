"use client";


import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {fetchDokter, fetchVerifiedPatient, tambahKunjungan} from "@/lib/api/admin";
import SelectField from "@/components/kunjungan/SelectField";
import DatePickerKunjungan from "@/components/kunjungan/DatePickerKunjungan";
import AlasanKunjunganField from "@/components/kunjungan/AlasanKunjunganField";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

export default function TambahKunjunganPage(){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [pasienOptions, setPasienOptions] = useState([])
    const [dokterOptions, setDokterOptions] = useState([])
    const [selectedPasien, setSelectedPasien] = useState("")
    const [selectedDokter, setSelectedDokter] = useState("")
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()
    const [alasan, setAlasan] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pasien = await fetchVerifiedPatient()
                const dokter = await fetchDokter()
                setPasienOptions(
                    pasien.map((p: any) => ({
                        label: p.namaLengkap,
                        value: p.id
                    }))
                )
                setDokterOptions(
                    dokter.map((d: any) => ({
                        label: d.nama,
                        value: d.id
                    }))
                )

            } catch (error) {
                console.error("Gagal Mengambil data dokter/pasien", error)
            }
        }

        fetchData()
    }, []);

    const handleSubmit = async() => {
        if (!selectedPasien || !selectedDokter || !selectedDate || !alasan) {
            toast.error("Semua field wajib diisi")
            return;
        }


        setLoading(true)
        try {
            await tambahKunjungan({
                pasienId: selectedPasien,
                tenagaMedisId: selectedDokter,
                tanggal_kunjungan: selectedDate?.toISOString() ?? "-",
                alasanKunjungan: alasan
            });
            router.push("/kunjungan")
        } catch (error) {
            console.error("Gagal menambah kunjungan:", error);
            alert("Gagal menambahkan kunjungan");
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="w-full flex flex-col gap-6">
            <SelectField
                label="Pasien"
                placeholder="Pilih Pasien"
                selectedValue={selectedPasien}
                options={pasienOptions}
                onChange={setSelectedPasien}
            />

            <SelectField
                label="Dokter"
                placeholder="Pilih Dokter"
                selectedValue={selectedDokter}
                options={dokterOptions}
                onChange={setSelectedDokter}
            />
            
            <DatePickerKunjungan
                selectedDate={selectedDate}
                onChange={setSelectedDate}
                dokterId={selectedDokter}
            />

            <AlasanKunjunganField
                value={alasan}
                onChange={setAlasan}
            />
            <div className="flex flex-row justify-end mt-4">
                <Button className="w-[120px]" onClick={handleSubmit}>
                    Simpan
                </Button>
            </div>


        </div>
    )
}