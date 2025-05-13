
export type KesadaranGCSProps = {
    eyeGcs: number;
    verbalGcs: number;
    motorGcs: number;
}

export default function KesadaranGCS({eyeGcs, verbalGcs, motorGcs} : KesadaranGCSProps) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-[16px] font-semibold">Kesadaran (GCS)</p>
            <div className="flex flex-row gap-8">
                <p className="text-md flex flex-row items-center gap-2 text-gray-700">E : <span className="font-medium text-black">{eyeGcs}</span></p>
                <p className="text-md flex flex-row items-center gap-2 text-gray-700">V : <span className="font-medium text-black">{verbalGcs}</span></p>
                <p className="text-md flex flex-row items-center gap-2 text-gray-700">M : <span className="font-medium text-black">{motorGcs}</span></p>
                <p className="text-md flex flex-row items-center gap-2 text-gray-700">Total : <span className="font-medium text-black">{eyeGcs + verbalGcs + motorGcs || 0}</span></p>
            </div>
        </div>

    )
}