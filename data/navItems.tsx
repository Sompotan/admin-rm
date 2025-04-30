import {Chart, Pill, Today, People, Tick, Doctor, Clock} from "@/app/icons";

import {NavItem} from "@/types/types";

export const navItems: NavItem[] = [
    {
        label: "Dashboard",
        icon: <Chart />,
        path: "/dashboard",
        isActive: true
    },
    {
        label: "Pasien",
        icon: <People/>,
        path: "/pasien",
        isActive: false
    },
    {
        label: "Kunjungan",
        icon: <Today/>,
        path: "/kunjungan",
        isActive: false
    },
    {
        label: "Antrian",
        icon: <Clock/>,
        path: "/antrian",
        isActive: false
    },
    {
        label: "Dokter",
        icon: <Doctor/>,
        path: "/antrian",
        isActive: false
    },
    {
        label: "Obat",
        icon: <Pill/>,
        path: "/obat",
        isActive: false
    },
    {
        label: "Verifikasi",
        icon: <Tick/>,
        path: "/verifikasi",
        isActive: false
    }
    
]