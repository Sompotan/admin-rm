
export type TandaVitalItemProps = {
    title: string;
    value: string | number;
    unit: string;
}


export default function TandaVitalItem({title, value, unit} : TandaVitalItemProps) {
    return (
        <div className="flex flex-col gap-1">
            <p className="text-[14px] font-semibold">{title}</p>
            <div className="flex flex-row items-end gap-2">
                <p className="border-b border-b-gray-300 w-[80px] text-center text-lg">{value}</p>
                <p className="text-gray-600">{unit}</p>
            </div>
        </div>
    )
}