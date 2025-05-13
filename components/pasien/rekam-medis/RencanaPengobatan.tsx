import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";


export type RencanaPengobatanProps = {
    deskripsi: string;
    itemObat: {
        namaObat: string;
        frekuensi: string;
        keterangan: string;
        catatan: string;
    }[];
};


export default function RencanaPengobatan({deskripsi, itemObat}: RencanaPengobatanProps) {
    if (!deskripsi && (!itemObat || itemObat.length === 0)) return null;

    return(
        <Card>
            <CardHeader>
                <CardTitle>Rencana Pengobatan</CardTitle>
                <CardDescription>{deskripsi}</CardDescription>
            </CardHeader>
            <CardHeader>
                <CardTitle>Resep Obat</CardTitle>
                <CardDescription className="flex flex-col gap-2 px-2 pt-2">
                    {itemObat.map((item, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <div className="flex flex-row items-center justify-between">
                                <p className="font-semibold text-black">{item.namaObat}</p>
                                <p>{item.frekuensi}</p>
                            </div>
                            <p>{item.keterangan}</p>
                            {item.catatan && (
                                <div>
                                    <p className="text-black font-semibold">Catatan</p>
                                    <p>{item.catatan}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </CardDescription>
            </CardHeader>

        </Card>
    )
}