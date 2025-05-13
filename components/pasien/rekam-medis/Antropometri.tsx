import AntropometriItem from "@/components/pasien/rekam-medis/AntropometriItem";


export type AntropometriProps = {
    beratBadan: number;
    tinggiBadan: number;
    imt: number;
}

export default function Antropometri({beratBadan, tinggiBadan, imt}: AntropometriProps) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-[16px] font-semibold">Antropometri</p>
            <div className="flex flex-row items-center justify-between p-6 rounded-xl shadow shadow-gray-400">
                <AntropometriItem
                    title="Berat Badan"
                    value={beratBadan}
                    unit="mmHg"
                />
                <AntropometriItem
                    title="Tinggi Badan"
                    value={tinggiBadan}
                    unit="x/menit"
                />
                <AntropometriItem
                    title="IMT (BB/TB)²"
                    value={imt}
                />
            </div>
        </div>
    )
}