import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {kunjunganStatusOption} from "@/data/KunjunganStatus";
import {DropdownStatusProps} from "@/types/kunjungan";



export default function DropdownStatus({status, onStatusChange}: DropdownStatusProps) {
    return (
        <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-2/3">
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                {kunjunganStatusOption.map((option) => (
                    <SelectItem value={option.value} key={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}