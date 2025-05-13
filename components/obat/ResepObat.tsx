import {Card, CardDescription, CardHeader} from "@/components/ui/card";


export type ResepObatData = {
    nama: string;
    aturanPakai: string;
    frekuensi: string;
    catatan: string;
}


type ResepObatProps = {
    data: ResepObatData[]
}

export default function ResepObat({data}: ResepObatProps) {
    return (
        <>
            {data.map((item, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardDescription className="flex flex-col gap-2 px-2 pt-2">
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row items-center justify-between">
                                    <p className="font-semibold text-black">{item.nama}</p>
                                    <p>{item.frekuensi}</p>
                                </div>
                                <p>{item.frekuensi}</p>
                                {item.catatan && (
                                    <div>
                                        <p className="text-black font-semibold">Catatan</p>
                                        <p>{item.catatan}</p>
                                    </div>
                                )}
                            </div>

                        </CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </>

    )
}