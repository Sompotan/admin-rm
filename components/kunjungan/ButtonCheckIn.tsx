import {Button} from "@/components/ui/button";
import {ButtonCheckInProps} from "@/types/kunjungan";

export default function ButtonCheckIn({status, onClick}: ButtonCheckInProps) {

    const isDisabled = status !== "Menunggu";

    return (
        <Button
            onClick={onClick}
            disabled={isDisabled}
            className={isDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}
        >
            {isDisabled ? "Checked - in" : "Check - in"}
        </Button>
    )
}