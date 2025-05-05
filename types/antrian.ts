import React from "react";

export type StatsCardProps = {
    title: string;
    icon: React.ReactNode;
    value: number;
}

export type Antrian = {
    id: string;
    fotoProfil: string;
    nomorAntrian: string;
    nama_pasien: string;
    nama_dokter: string;
    status: string;
    checkInAt: string;
};

