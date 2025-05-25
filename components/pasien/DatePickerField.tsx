"use client"

import * as React from "react"
import { format } from "date-fns"
import { id as localeID } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useState, useEffect } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerFieldProps = {
    selectedDate: Date | null,
    onChange: (date: Date) => void,
    label: string;
}

export default function DatePickerField({selectedDate, onChange, label} : DatePickerFieldProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-full flex flex-col gap-2">
                <p className="text-sm font-medium">{label} <span className="text-red-500">*</span></p>
                <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"></div>
            </div>
        );
    }


    return (
        <div className="w-full flex flex-col gap-2">
            <p className="text-sm font-medium">{label} <span className="text-red-500">*</span></p>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPPP", { locale: localeID}) : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={selectedDate ?? new Date()}
                        onSelect={(date) => {
                            if (date) onChange(date);
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>

    )
}
