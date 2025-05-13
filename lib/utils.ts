import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const layananMap: Record<string, string> = {
  KONTROL_ULANG: "Kontrol Ulang",
  PENGOBATAN_JALAN: "Pengobatan Jalan",
  TINDAKAN_RINGAN: "Tindakan Ringan",
  OBSERVASI: "Observasi",
  EDUKASI_PASIEN: "Edukasi"
  // Tambahkan lainnya jika perlu
};

export const statusTenagaMedis: Record<string, string> = {
    AKTIF: "Aktif",
    NONAKTIF: "Non Aktif",
}