type DetailItemsProps = {
    title: string;
    value: string;
}

export default function DetailItems({title, value} : DetailItemsProps) {
    return (
        <div className="flex flex-col">
            <p className="text-[12px] font-medium text-[#878787]">{title}</p>
            <p className="text-[16px] font-semibold">{value}</p>
        </div>
    )
}