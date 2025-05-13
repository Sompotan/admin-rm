import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";

export type CardStatsProps = {
    title: string;
    value: number | undefined;
    logo: React.ReactNode;
}

export default function CardStats({title, value, logo} : CardStatsProps) {
    return (
        <Card className="w-full shadow shadow-gray-300">
            <CardHeader>
                <CardTitle>
                    <div className="flex flex-row items-center justify-between">
                        <p className="text-gray-700">{title}</p>
                        {logo}
                    </div>
                </CardTitle>
                <CardDescription className="text-[24px] text-black font-semibold">{value}</CardDescription>
            </CardHeader>
        </Card>
    )
}