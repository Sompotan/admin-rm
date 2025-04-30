import {VerificationPatient} from "@/types/verifikasi/types";


function formatStatus(status: "menunggu" | "verified"): "Pending" | "Verified" {
    return status === "menunggu" ? "Pending" : "Verified";
}

export function mapPasienToVerificationPatient (pasien: any): VerificationPatient {
    return {
        id: pasien.id,
        name: pasien.namaLengkap,
        image: pasien.fotoProfil ?? "/user-profile.svg",
        tanggalRegistrasi: new Date(pasien.createdAt).toLocaleDateString("id-ID", {
            day: "numeric", month: "long", year: "numeric"
        }),
        status: formatStatus(pasien.user?.isVerified)
    }
}