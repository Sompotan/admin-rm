"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { headerItems } from "@/data/HeaderItems";
import { ArrowLeft } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleLogout } from "@/lib/handlers/handleLogout";
import { useState } from "react";

export default function Headers() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // ✅ Tangani root path dengan fallback
    const basePath = pathname === "/" ? "/" : `/${segments[0]}`;
    const currentHeader = headerItems.find((item) => item.path === basePath);

    const isDetailPage = segments.length === 2;
    const isSubDetailPage = segments.length === 3 && segments[2] === "rekam-medis";

    const backPath = `/${segments[0]}`;

    const onLogout = async () => {
        setLoading(true);
        const res = await handleLogout((msg) => {
            alert(`Log Out Gagal : ${msg}`);
        });

        if (res) {
            router.push("/");
        }

        setLoading(false);
    };

    return (
        <div className="w-full h-auto flex flex-row justify-between p-8">
            <div className="flex flex-row items-center gap-3">
                {(isDetailPage || isSubDetailPage) && (
                    <button
                        onClick={() => router.push(backPath)}
                        className="p-1 rounded hover:bg-gray-100 transition"
                        aria-label="Kembali"
                    >
                        <ArrowLeft size={20} />
                    </button>
                )}

                <div className="flex flex-col">
                    <p className="text-[24px] font-semibold">
                        {currentHeader?.title || "Judul tidak ditemukan"}
                    </p>
                    <p className="text-[12px] font-medium text-[#878787]">
                        {currentHeader?.description || "Deskripsi tidak ditemukan"}
                    </p>
                </div>
            </div>

            <div className="flex flex-row items-center gap-5">
                <DropdownMenu>
                    <DropdownMenuTrigger className="pr-4 flex flex-row items-center gap-2">
                        <Image src="/user-profile.svg" width={35} height={35} alt="User Profile Icon" />
                        <p className="font-medium">Admin</p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Profile</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={onLogout}>Log Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
