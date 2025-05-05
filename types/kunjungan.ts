import {KunjunganStatusValue} from "@/components/kunjungan/BadgeStatus";

export type SearchFieldProps = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
};

export type DropdownStatusProps = {
    status: string;
    onStatusChange: (value: KunjunganStatusValue) => void;
}

export type ButtonCheckInProps = {
    status: string;
    onClick?: () => void;
}

export type KunjunganData = {
    id: string;
    nama_pasien: string;
    nama_dokter: string;
    tanggal_kunjungan: string;
    status: string;
    checkInAt: string | null;
}

export type TableKunjunganProps = {
    data: KunjunganData[];
    onCheckIn: (id: string) => void;
}