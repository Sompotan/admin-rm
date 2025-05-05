"use client";

import {Button} from "@/components/ui/button";
import {Add} from "@/app/icons";
import {useRouter} from "next/navigation";

export default function TambahKunjunganButton() {
    const router = useRouter()

    const handleClick = () => {
        router.push("/kunjungan/tambah-kunjungan")
    }

    return (
        <Button
            onClick={handleClick}
        >
            <Add/> Tambah Kunjungan
        </Button>
    )
}