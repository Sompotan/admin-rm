import {pageMeta} from "@/lib/pageMeta";

export function getPageMeta (pathname: string) {
    const meta = pageMeta.find((item) => item.match.test(pathname))
    return meta || {
        title: "Judul tidak ditemukan",
        description: "Deskripsi tidak ditemukan"
    }
}