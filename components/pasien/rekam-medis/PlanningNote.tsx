import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import RencanaPengobatan, {RencanaPengobatanProps} from "@/components/pasien/rekam-medis/RencanaPengobatan";
import RencanaEdukasi, {RencanaEdukasiProps} from "@/components/pasien/rekam-medis/RencanaEdukasi";
import RencanaMonitoring, {RencanaMonitoringProps} from "@/components/pasien/rekam-medis/RencanaMonitoring";
import RencanaLainnya, {RencanaLainnyaProps} from "@/components/pasien/rekam-medis/RencanaLainnya";


type PlanningNoteProps = {
    layanan: string;
    pengobatan?: RencanaPengobatanProps
    edukasi?: RencanaEdukasiProps
    monitoring?: RencanaMonitoringProps
    lainnya?: RencanaLainnyaProps
}

export default function PlanningNote({layanan, pengobatan, edukasi, monitoring, lainnya}: PlanningNoteProps) {
    return (
        <div className="p-4 mb-8">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Layanan</CardTitle>
                    <CardDescription>{layanan}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-8">
                    {pengobatan && <RencanaPengobatan {...pengobatan} />}
                    {edukasi && <RencanaEdukasi {...edukasi} />}
                    {monitoring && <RencanaMonitoring {...monitoring} />}
                    {lainnya && <RencanaLainnya {...lainnya} />}
                </CardContent>
            </Card>
        </div>
    )
}