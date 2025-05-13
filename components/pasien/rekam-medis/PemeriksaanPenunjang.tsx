

export type PemeriksaanPenunjangProps = {
    value: string;
}

export default function PemeriksaanPenunjang({value}: PemeriksaanPenunjangProps) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-[16px] font-semibold">Pemeriksaan Penunjang</p>
            <div className="flex flex-row items-end gap-2 p-6 rounded-xl shadow shadow-gray-400">
                <p className="border-b border-b-gray-300 w-full text-md">{value}</p>
            </div>
        </div>
    )
}
