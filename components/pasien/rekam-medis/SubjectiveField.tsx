
type SubjectiveFieldProps = {
    title: string;
    value: string;
}

export default function SubjectiveField({title, value} : SubjectiveFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-[16px] font-semibold">{title}</p>
            <div className="border-b border-b-gray-300 w-full bg-gray-100 rounded-tr-md">
                <p className="text-gray-700 p-2">{value}</p>
            </div>
        </div>
    )
}