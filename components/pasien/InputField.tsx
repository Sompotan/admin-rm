import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

type InputFieldProps = {
    id: string;
    type: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
    error?: string;
}

export default function InputField({type, label, id, placeholder, onChange, value, error} : InputFieldProps) {
    return (
        <div className="w-full flex flex-col gap-2">
            <Label htmlFor={id} className="text-sm">{label} <span className="text-red-500">*</span></Label>
            <Input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

    )
}