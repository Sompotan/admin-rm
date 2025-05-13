export function getHeadersMeta(pathname: string) {
    // Ambil segmen path
    const segments = pathname.split('/').filter(Boolean);

    if (!segments.length) {
        return {
            title: "Beranda",
            description: "Selamat datang di sistem informasi klinik"
        };
    }

    const lastSegment = segments[segments.length - 1];
    const base = segments[0];

    // Mapping untuk deskripsi default (bisa kamu kembangkan)
    const defaultDescriptions: Record<string, string> = {
        dashboard: "Statistik dan ringkasan sistem",
        pasien: "Lihat dan kelola data pasien",
        kunjungan: "Pendaftaran dan riwayat kunjungan",
        antrian: "Pantau dan kelola antrean pasien",
        dokter: "Informasi dan data tenaga medis",
        obat: "Daftar obat dan resep",
        verifikasi: "Verifikasi data pengguna dan pasien",
        subjective: "Keluhan dan riwayat pasien",
        objective: "Hasil pemeriksaan fisik & penunjang",
        assessment: "Diagnosis dan penilaian klinis",
        planning: "Rencana tindakan dan perawatan"
    };

    const title = toTitle(lastSegment);
    const description = defaultDescriptions[lastSegment] || defaultDescriptions[base] || "Deskripsi tidak tersedia";

    return {
        title,
        description
    };
}

// Convert kebab-case or slug to Title Case
function toTitle(slug: string) {
    return slug
        .split('-')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ') + (['subjective', 'objective', 'assessment', 'planning'].includes(slug) ? " Note" : "");
}
