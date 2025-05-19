// src/validations/validateTambahDokter.ts

import { CreateDoctorPayload } from "@/types/admin";

export type DoctorFormErrors = {
    email?: string;
    password?: string;
    nik?: string;
    gender?: string;
    tanggal_lahir?: string;
    nomor_handphone?: string;
    jadwalPraktekHari?: string;
    status?: string;

    nama?: {
        prefix?: string;
        nama_depan?: string;
        nama_tengah?: string;
        nama_belakang?: string;
        suffix?: string;
    };

    alamat?: {
        jalan?: string;
        rt_rw?: string;
        lingkungan?: string;
        kelurahan_desa?: string;
        kecamatan?: string;
        kabupaten_kota?: string;
    };

    kualifikasi?: {
        id_jenis_kualifikasi?: string;
        nomor_kualifikasi?: string;
        institusi_penerbit?: string;
        tanggal_mulai?: string;
        tanggal_berakhir?: string;
    };
};

export const validateForm = (form: CreateDoctorPayload): DoctorFormErrors => {
    const errors: DoctorFormErrors = {};

    if (!form.email) errors.email = "Email wajib diisi";
    if (!form.password) errors.password = "Password wajib diisi";

    if (!form.nik) errors.nik = "NIK wajib diisi";
    else if (!/^\d{16}$/.test(form.nik)) errors.nik = "NIK harus 16 digit angka";

    // Nama
    if (!form.nama.nama_depan) {
        errors.nama = { ...errors.nama, nama_depan: "Nama depan wajib diisi" };
    }

    // Alamat
    if (!form.alamat.jalan) {
        errors.alamat = { ...errors.alamat, jalan: "Jalan wajib diisi" };
    }

    // Kualifikasi
    if (!form.kualifikasi.id_jenis_kualifikasi) {
        errors.kualifikasi = { ...errors.kualifikasi, id_jenis_kualifikasi: "Jenis kualifikasi wajib dipilih" };
    }
    if (!form.kualifikasi.nomor_kualifikasi) {
        errors.kualifikasi = { ...errors.kualifikasi, nomor_kualifikasi: "Nomor kualifikasi wajib diisi" };
    }
    if (!form.kualifikasi.institusi_penerbit) {
        errors.kualifikasi = { ...errors.kualifikasi, institusi_penerbit: "Institusi penerbit wajib diisi" };
    }

    // Data Umum
    if (!form.gender) errors.gender = "Jenis kelamin wajib dipilih";
    if (!form.tanggal_lahir) errors.tanggal_lahir = "Tanggal lahir wajib diisi";
    if (!form.nomor_handphone) errors.nomor_handphone = "Nomor HP wajib diisi";
    if (!form.status) errors.status = "Status wajib dipilih";
    if (!form.jadwalPraktekHari.length) errors.jadwalPraktekHari = "Minimal 1 hari harus dipilih untuk jadwal praktik";

    return errors;
};
