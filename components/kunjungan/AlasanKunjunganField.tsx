import {Textarea} from "@/components/ui/textarea";
import {AlasanKunjunganFieldProps} from "@/types/kunjungan";

export default function AlasanKunjunganField({value, onChange}: AlasanKunjunganFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="alasan" className="text-sm font-medium">
                Alasan Kunjungan <span className="text-red-500">*</span>
            </label>
            <Textarea
                id="alasan"
                placeholder="Masukkan alasan kunjungan"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="min-h-[120px]"
            />
        </div>
    )
}