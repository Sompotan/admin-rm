import {Badge} from "@/components/ui/badge";
import {kunjunganStatusOption} from "@/data/StatusMapping";

export type KunjunganStatusValue = typeof kunjunganStatusOption[number]["value"] | "none";

export type BadgeStatusProps = {
    status: string;  // Accept any string but handle it safely
}

function getStatusLabel(value: string): string {
    return (
        kunjunganStatusOption.find((item) => item.value === value)?.label ?? value
    )
}

export default function BadgeStatus({status}: BadgeStatusProps) {
    const isValidStatus = kunjunganStatusOption.some(option => option.value === status);
    
    return (
        <Badge variant={isValidStatus ? "secondary" : "outline"}>
            {getStatusLabel(status)}
        </Badge>
    )
}
