import {Badge} from "@/components/ui/badge";
import {kunjunganStatusOption} from "@/data/KunjunganStatus";

export type KunjunganStatusValue = typeof kunjunganStatusOption[number]["value"]

export type BadgeStatusProps = {
    status: KunjunganStatusValue;
}

function getStatusLabel(value: KunjunganStatusValue): string {
    return (
        kunjunganStatusOption.find((item) => item.value === value)?.label ?? value
    )
}

export default function BadgeStatus({status}: BadgeStatusProps) {
    return (
        <Badge variant="secondary">{getStatusLabel(status)}</Badge>
    )
}