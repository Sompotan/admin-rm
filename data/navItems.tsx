import {Chart, Pill, Today, People, Tick, Doctor, Clock} from "@/app/icons";

import {NavItem} from "@/types/types";

export const navItems: NavItem[] = [
    {
        label: "Dashboard",
        icon: <Chart />,
        path: "/",
    },
    {
        label: "Pasien",
        icon: <People/>,
        path: "/pasien",
    },
    {
        label: "Kunjungan",
        icon: <Today/>,
        path: "/kunjungan",
    },
    {
        label: "Antrian",
        icon: <Clock/>,
        path: "/antrian",
    },
    {
        label: "Dokter",
        icon: <Doctor/>,
        path: "/dokter",
    },
    {
        label: "Obat",
        icon: <Pill/>,
        path: "/obat",
    },
    {
        label: "Verifikasi",
        icon: <Tick/>,
        path: "/verifikasi",
    }
]