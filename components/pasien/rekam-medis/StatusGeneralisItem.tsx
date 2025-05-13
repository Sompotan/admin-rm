

export type StatusGeneralisItemProps = {
    title: string;
    value: string;
}

export default function StatusGeneralisItem({title, value} : StatusGeneralisItemProps) {
    return (
        <div className="flex flex-col gap-1">
            <p className="text-[14px] font-semibold">{title}</p>
            <div className="flex flex-row items-end gap-2">
                <p className="border-b border-b-gray-300 w-full text-md">{value}</p>
            </div>
        </div>
    )
}