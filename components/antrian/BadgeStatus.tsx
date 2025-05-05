import {AntrianStatusOption} from "@/data/StatusMapping";

import {Badge} from "@/components/ui/badge";

export type AntrianStatusValue = "Diproses" | "DalamPemeriksaan" | "Selesai";

export type BadgeStatusProps = {
    status: AntrianStatusValue;
}

function getStatusLabel(value: AntrianStatusValue): string {
    return (
        AntrianStatusOption.find((item) => item.value === value)?.label ?? value
    )
}

export default function BadgeStatus({status}: BadgeStatusProps) {
    return (
        <Badge variant="secondary">{getStatusLabel(status)}</Badge>
    )
}