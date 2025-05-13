import StatusGeneralisItem from "@/components/pasien/rekam-medis/StatusGeneralisItem";

export type StatusGeneralisProps = {
    kepalaLeher: string;
    thorax: string;
    abdomen: string;
    ekstremitas: string;
    lainnya: string;
}

export default function StatusGeneralis({kepalaLeher, thorax, abdomen, ekstremitas, lainnya}: StatusGeneralisProps) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-[16px] font-semibold">Status Generalis</p>
            <div className="flex flex-col gap-4 p-6 rounded-xl shadow shadow-gray-400">
                <StatusGeneralisItem title="Kepala / Leher" value={kepalaLeher} />
                <StatusGeneralisItem title="Throax" value={thorax} />
                <StatusGeneralisItem title="Abdomen" value={abdomen} />
                <StatusGeneralisItem title="Ekstremitas" value={ekstremitas} />
                <StatusGeneralisItem title="Lainnya" value={lainnya} />
            </div>
        </div>
    )
}