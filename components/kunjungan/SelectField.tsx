import {SelectFieldProps} from "@/types/kunjungan";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function SelectField({label, placeholder, options, selectedValue, onChange}: SelectFieldProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">{label} <span className="text-red-500">*</span></label>
            <Select value={selectedValue} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options?.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}