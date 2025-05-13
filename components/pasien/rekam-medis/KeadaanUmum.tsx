import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";

export type KeadaanUmumProps = {
    value : "Baik" | "Sedang" | "Lemah"
}

export default function KeadaanUmum({value} : KeadaanUmumProps) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-[16px] font-semibold">Keadaan Umum</p>
            <RadioGroup defaultValue={value} className="flex flex-row items-center gap-8">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Baik" id="r1" />
                    <Label htmlFor="r1">Baik</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Sedang" id="r2" />
                    <Label htmlFor="r2">Sedang</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Lemah" id="r3" />
                    <Label htmlFor="r3">Lemah</Label>
                </div>
            </RadioGroup>
        </div>

    )
}