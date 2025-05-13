import KeadaanUmum from "@/components/pasien/rekam-medis/KeadaanUmum";
import KesadaranGCS from "@/components/pasien/rekam-medis/KesadaranGCS";
import TandaVital from "@/components/pasien/rekam-medis/TandaVital";
import Antropometri from "@/components/pasien/rekam-medis/Antropometri";
import StatusGeneralis from "@/components/pasien/rekam-medis/StatusGeneralis";
import PemeriksaanPenunjang from "@/components/pasien/rekam-medis/PemeriksaanPenunjang";

export type ObjectiveNoteProps = {
    keadaanUmum: "Baik" | "Sedang" | "Lemah";
    eyeGcs: number;
    verbalGcs: number;
    motorGcs: number;
    tekananDarah: string;
    frekNafas: number;
    nadi: number;
    suhu: number;
    beratBadan: number;
    tinggiBadan: number;
    imt: number;
    kepalaLeher: string;
    thorax: string;
    abdomen: string;
    ekstremitas: string;
    lainnya: string;
    pemeriksaanPenunjang: string;
}


export default function ObjectiveNote({keadaanUmum, eyeGcs, verbalGcs, motorGcs, tekananDarah, frekNafas, nadi, suhu, beratBadan, tinggiBadan, imt, kepalaLeher, thorax, abdomen, ekstremitas, lainnya, pemeriksaanPenunjang} : ObjectiveNoteProps) {
    return (
        <div className="p-4 flex flex-col gap-4 mb-8">
            <KeadaanUmum value={keadaanUmum}/>
            <KesadaranGCS eyeGcs={eyeGcs} motorGcs={motorGcs} verbalGcs={verbalGcs}/>
            <TandaVital tekananDarah={tekananDarah} frekNafas={frekNafas} nadi={nadi} suhu={suhu}/>
            <Antropometri beratBadan={beratBadan} tinggiBadan={tinggiBadan} imt={imt} />
            <StatusGeneralis
                kepalaLeher={kepalaLeher}
                thorax={thorax}
                abdomen={abdomen}
                ekstremitas={ekstremitas}
                lainnya={lainnya}
            />
            <PemeriksaanPenunjang value={pemeriksaanPenunjang} />
        </div>
    )
}