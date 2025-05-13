import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";

type SearchFieldProps = {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchField({value, onChange} : SearchFieldProps) {
    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
                type="search"
                placeholder="Cari Pasien"
                className="pl-10 h-12"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}