"use client";

import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import {headerItems} from "@/data/HeaderItems";
import {ArrowLeft} from "lucide-react";


export default function Headers() {
    const pathname = usePathname()
    const router = useRouter()

    const currentHeader = headerItems.find((item) => {
        return item.path != null && pathname.startsWith(item.path);
    })

    const isDetailPage = /^\/[a-z]+\/[^/]+$/.test(pathname);
    const backPath = `/${pathname.split("/")[1]}`;


    return(
        <div className="w-full h-auto flex flex-row justify-between p-8">
            <div className="flex flex-row items-center gap-3">
                {isDetailPage && (
                    <button
                        onClick={() => router.push(backPath)}
                        className="p-1 rounded hover:bg-gray-100 transition"
                        aria-label="Kembali"
                    >
                        <ArrowLeft size={20} />
                    </button>
                )}

                <div className="flex flex-col">
                    <p className="text-[24px] font-semibold">{currentHeader?.title || "Judul tidak ditemukan"}</p>
                    <p className="text-[12px] font-medium text-[#878787]">{currentHeader?.description || "Deskripsi tidak ditemukan"}</p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-5">
                <Image src="/notification.svg" width={20} height={20} alt="Notification Icon"/>
                <div className="flex flex-row items-center gap-2">
                    <Image src="/user-profile.svg" width={35} height={35} alt="User Profile Icon" />
                    <p>Admin</p>
                </div>
            </div>
        </div>
    )
}