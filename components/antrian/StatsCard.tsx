import {StatsCardProps} from "@/types/antrian";

export default function StatsCard({title, icon, value}: StatsCardProps) {
    return (
        <div className="w-full border border-gray-300 p-4 rounded-lg">
            <div className="flex flex-row items-center justify-between">
                <p>{title}</p>
                {icon}
            </div>
            <p className="text-[32px] font-semibold">{value}</p>
        </div>
    )
}