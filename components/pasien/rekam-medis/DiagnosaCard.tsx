import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";


export type DiagnosaCardProps = {
    title?: string;
    diagnosa: string;
    description: string;
    showTitle?: boolean;
}

export default function DiagnosaCard({
                                         title,
                                         diagnosa,
                                         description,
                                         showTitle = true,
                                     }: DiagnosaCardProps) {
    return (
        <div className="flex flex-col gap-4">
            {showTitle && title && (
                <p className="text-2xl font-semibold">{title}</p>
            )}
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{diagnosa}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
