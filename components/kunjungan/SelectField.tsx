"use client"

import {SelectFieldProps} from "@/types/kunjungan";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { useState, useEffect } from "react";

export default function SelectField({label, placeholder, options, selectedValue, onChange}: SelectFieldProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium">{label} <span className="text-red-500">*</span></label>
                <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">{label} <span className="text-red-500">*</span></label>
            <Select value={selectedValue} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options?.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
