export type UserProfileProps = {
    name: string;
    image: string;
}

export type VerificationPatient = {
    id: string;
    tanggalRegistrasi: string;
    status: "Pending" | "Verified";
} & UserProfileProps