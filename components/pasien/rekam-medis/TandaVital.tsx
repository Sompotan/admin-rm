import TandaVitalItem from "@/components/pasien/rekam-medis/TandaVitalItem";


export type TandaVitalProps = {
    tekananDarah: string;
    nadi: number;
    suhu: number;
    frekNafas: number
}

export default function TandaVital({tekananDarah, nadi, suhu, frekNafas}: TandaVitalProps) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-[16px] font-semibold">Tanda Vital</p>
            <div className="flex flex-row items-center justify-between p-6 rounded-xl shadow shadow-gray-400">
                <TandaVitalItem
                    title="Tekanan Darah"
                    value={tekananDarah}
                    unit="mmHg"
                />
                <TandaVitalItem
                    title="Nadi"
                    value={nadi}
                    unit="x/menit"
                />
                <TandaVitalItem
                    title="Suhu"
                    value={suhu}
                    unit="°C"
                />
                <TandaVitalItem
                    title="Frek. Nafas"
                    value={frekNafas}
                    unit="x/menit"
                />
            </div>
        </div>
    )
}