import DiagnosaCard from "@/components/pasien/rekam-medis/DiagnosaCard";


export type AssessmentNoteProps = {
    utama: { diagnosa: string; description: string } | null;
    banding?: { diagnosa: string; description: string } | null;
    lainnya?: { diagnosa: string; description: string }[];
};


export default function AssessmentNote({utama, banding, lainnya} : AssessmentNoteProps) {
    return (
        <div className="p-4 mb-8 flex flex-col gap-8">
            {utama && (
                <DiagnosaCard title="Diagnosa Utama" diagnosa={utama.diagnosa} description={utama.description} />
            )}

            {banding && (
                <DiagnosaCard title="Diagnosa Banding" diagnosa={banding.diagnosa} description={banding.description} />
            )}

            {lainnya && lainnya.length > 0 && (
                <>
                    <p className="text-2xl font-semibold">Diagnosa Lain</p>
                    {lainnya.map((item, index) => (
                        <DiagnosaCard
                            key={index}
                            diagnosa={item.diagnosa}
                            description={item.description}
                            showTitle={false} // ⛔ jangan tampilkan title per-card
                        />
                    ))}
                </>
            )}
        </div>
    )
}