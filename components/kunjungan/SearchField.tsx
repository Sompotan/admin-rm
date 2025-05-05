import {Search} from "@/app/icons";
import {Input} from "@/components/ui/input";
import {SearchFieldProps} from "@/types/kunjungan";

export default function SearchField({searchTerm, onSearchChange}: SearchFieldProps) {
    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
                type="text"
                placeholder="Cari pasien..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    )
}