import SubjectiveField from "@/components/pasien/rekam-medis/SubjectiveField";

export type SubjectiveNoteProps = {
    keluhanUtama: string;
    keluhanTambahan: string;
    riwayatPenyakitSekarang: string;
    riwayatPenyakitDahulu: string;
    riwayatPenyakitKeluarga: string;
    riwayatAlergiObat: string;
    riwayatAlergiMakanan: string;
    obatYangSedangDikonsumsi: string;
}

export default function SubjectiveNote({
                                           keluhanUtama,
                                           keluhanTambahan,
                                           riwayatPenyakitSekarang,
                                           riwayatPenyakitDahulu,
                                           riwayatPenyakitKeluarga,
                                           riwayatAlergiObat,
                                           riwayatAlergiMakanan,
                                           obatYangSedangDikonsumsi
                                       } : SubjectiveNoteProps) {
    return (
        <div className="p-4 flex flex-col gap-4 mb-8">
            <SubjectiveField
                title="Keluhan Utama"
                value={keluhanUtama}
            />
            <SubjectiveField
                title="Keluhan Tambahan"
                value={keluhanTambahan}
            />
            <SubjectiveField
                title="Riwayat Penyakit Sekarang"
                value={riwayatPenyakitSekarang}
            />
            <SubjectiveField
                title="Riwayat Penyakit Dahulu"
                value={riwayatPenyakitDahulu}
            />
            <SubjectiveField
                title="Riwayat Penyakit Keluarga"
                value={riwayatPenyakitKeluarga}
            />
            <SubjectiveField
                title="Riwayat Alergi Obat"
                value={riwayatAlergiObat}
            />
            <SubjectiveField
                title="Riwayat Alergi Makanan"
                value={riwayatAlergiMakanan}
            />
            <SubjectiveField
                title="Obat yang sedang dikonsumsi"
                value={obatYangSedangDikonsumsi}
            />
        </div>
    )
}