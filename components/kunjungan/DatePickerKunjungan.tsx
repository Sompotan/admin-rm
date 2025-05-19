import {DatePickerKunjunganProps} from "@/types/kunjungan";
import {useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {format} from "date-fns";
import { Calendar } from "../ui/calendar";
import {fetchDokterById} from "@/lib/api/admin";


const dayMap: Record<string, number> = {
    "Minggu": 0,
    "Senin": 1,
    "Selasa": 2,
    "Rabu": 3,
    "Kamis": 4,
    "Jumat": 5,
    "Sabtu": 6,
}


export default function DatePickerKunjungan({selectedDate, onChange, dokterId}: DatePickerKunjunganProps) {
    const [allowedDays, setAllowedDays] = useState<number[]>([0,1,2,3,4,5,6])

    useEffect(() => {
        const fetchJadwalDokter = async () => {
            if (!dokterId) return;

            try {
                const res = await fetchDokterById(dokterId)
                const hariIndo: string[] = res?.jadwalPraktek || [];
                const dayNumbers = hariIndo
                    .map(hari => dayMap[hari])
                    .filter((v): v is number => typeof v === "number")

                setAllowedDays(dayNumbers)
            } catch (error) {
                console.error("Gagal fetch jadwal dokter: ", error);
                setAllowedDays([0,1,2,3,4,5,6]);
            }

        }

        fetchJadwalDokter()
    }, [dokterId]);

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" >Tanggal Kunjungan <span className="text-red-500">*</span></label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                        {selectedDate ? format(selectedDate, "PPP") : "Pilih Tanggal Kunjungan"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start" >
                    <Calendar
                        mode={"single"}
                        selected={selectedDate}
                        onSelect={onChange}
                        disabled={(date) => {
                            const today = new Date()
                            const day = date.getDay()
                            return date < today || !allowedDays.includes(day)
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}