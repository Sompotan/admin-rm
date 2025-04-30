import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {CardItemProps} from "@/types/types";

export default function CardItem({title, value, icon}: CardItemProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-row items-start justify-between">
                    <CardTitle className="text-gray-400">{title}</CardTitle>
                    <div>{icon}</div>
                </div>
                <p className="text-[32px] font-semibold">{value}</p>
            </CardHeader>
        </Card>
    )
}