import {HeaderItem} from "@/types/types";

export const headerItems: HeaderItem[] = [
    {
        title: "Dashboard Overview",
        description: "Pantau data klinik dan aktivitas pasien secara real-time.",
        path: "/dashboard",
    },
    {
        title: "Pasien",
        description: "Kelola seluruh data pasien yang terdaftar dalam sistem klinik.",
        path: "/pasien",
    },
    {
        title: "Kunjungan",
        description: "Kelola riwayat dan jadwal kunjungan pasien ke klinik.",
        path: "/kunjungan",
    },
    {
        title: "Antrian",
        description: "Kelola status kehadiran dan alur pemeriksaan pasien klinik secara real-time.",
        path: "/antrian",
    },
    {
        title: "Dokter",
        description: "Kelola data dokter, spesialisasi, dan keaktifan praktik.",
        path: "/dokter",
    },
    {
        title: "Obat",
        description: "Siapkan dan kelola resep obat pasien dengan mudah.",
        path: "/obat",
    },
    {
        title: "Verifikasi Pending",
        description: "Proses verifikasi data pasien yang menunggu persetujuan admin.",
        path: "/verifikasi",
    },
]