import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {InputHTMLAttributes} from "react";

type InputFieldProps = {
    label: string,
    id: string,
    type: string,
    placeholder?: string,
    required: boolean,

} & InputHTMLAttributes<HTMLInputElement>

export default function InputField({ label, id, type, placeholder, required, ...props }: InputFieldProps) {
    return (
            <div className="grid gap-2">
               <Label htmlFor={id}>{label}</Label>
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    {...props}
                />
            </div>
    )
}