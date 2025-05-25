"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import SubjectiveNote, {SubjectiveNoteProps} from "@/components/pasien/rekam-medis/SubjectiveNote";
import ObjectiveNote, {ObjectiveNoteProps} from "@/components/pasien/rekam-medis/ObjectiveNote";
import AssessmentNote from "@/components/pasien/rekam-medis/AssessmentNote";
import PlanningNote from "@/components/pasien/rekam-medis/PlanningNote";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {fetchRekamMedisPasien} from "@/lib/api/admin";
import {layananMap} from "@/lib/utils";
import { RekamMedisResponse } from "@/types/admin";

export default function RekamMedisPage() {
    const { id } = useParams()
    const [data, setData] = useState<RekamMedisResponse | null>(null);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        if (!id) return;
            const fetchData = async () => {
            try {
                const response = await fetchRekamMedisPasien(id as string)
                setData(response)
            } catch (error) {
                console.error("Error fetching medical record:", error)
            } finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!data) return <p>Data tidak ditemukan</p>;

    const subjective : SubjectiveNoteProps = {
        keluhanUtama: data.subjectiveNote?.keluhanPasien?.find((k: { jenisKeluhan: string; }) => k.jenisKeluhan === "Utama")?.deskripsi || "-",
        keluhanTambahan: data.subjectiveNote?.keluhanPasien?.filter((k: { jenisKeluhan: string; }) => k.jenisKeluhan === "Tambahan").map((k: { deskripsi: string; }) => k.deskripsi).join(", ") || "-",
        riwayatPenyakitSekarang: data.subjectiveNote?.riwayatPenyakit?.find((r: { jenisRiwayat: string; }) => r.jenisRiwayat === "Sekarang")?.deskripsi || "-",
        riwayatPenyakitDahulu: data.subjectiveNote?.riwayatPenyakit?.find((r: { jenisRiwayat: string; }) => r.jenisRiwayat === "Dahulu")?.deskripsi || "-",
        riwayatPenyakitKeluarga: data.subjectiveNote?.riwayatPenyakit?.find((r: { jenisRiwayat: string; }) => r.jenisRiwayat === "Keluarga")?.deskripsi || "-",
        riwayatAlergiObat: data.subjectiveNote?.alergiPasien?.find((a: { jenisAlergi: string; }) => a.jenisAlergi === "Obat")?.deskripsi || "-",
        riwayatAlergiMakanan: data.subjectiveNote?.alergiPasien?.find((a: { jenisAlergi: string; }) => a.jenisAlergi === "Makanan")?.deskripsi || "-",
        obatYangSedangDikonsumsi:
            data.subjectiveNote?.obatDikonsumsi
                ?.map((o: { keterangan: string; }) => o.keterangan?.trim())
                .filter((k: string) => k && k.length > 0)
                .join(", ") || "-"
    }
    const objective : ObjectiveNoteProps = {
        keadaanUmum: data.objectiveNote?.pemeriksaanUmum?.keadaanUmum || "Baik",
        eyeGcs: data.objectiveNote?.pemeriksaanUmum?.gcsEye || 0,
        verbalGcs: data.objectiveNote?.pemeriksaanUmum?.gcsVerbal || 0,
        motorGcs: data.objectiveNote?.pemeriksaanUmum?.gcsMotor || 0,
        tekananDarah: data.objectiveNote?.tandaVital?.tekananDarah || "-",
        frekNafas: data.objectiveNote?.tandaVital?.frekuensiNafas || 0,
        nadi: data.objectiveNote?.tandaVital?.nadi || 0,
        suhu: data.objectiveNote?.tandaVital?.suhu || 0,
        beratBadan: data.objectiveNote?.antropometri?.beratBadan || 0,
        tinggiBadan: data.objectiveNote?.antropometri?.tinggiBadan || 0,
        imt: data.objectiveNote?.antropometri?.imt || 0,
        kepalaLeher: data.objectiveNote?.statusGeneralis?.kepalaLeher || "-",
        thorax: data.objectiveNote?.statusGeneralis?.thorax || "-",
        abdomen: data.objectiveNote?.statusGeneralis?.abdomen || "-",
        ekstremitas: data.objectiveNote?.statusGeneralis?.ekstremitas || "-",
        lainnya: data.objectiveNote?.statusGeneralis?.lainnya || "-",
        pemeriksaanPenunjang: data.objectiveNote?.pemeriksaanPenunjang || "-",
    };

    const utama = data.assessmentNote?.diagnosisPasien?.find(
        (d) => d.jenisDiagnosis === "Utama"
    );
    const banding = data.assessmentNote?.diagnosisPasien?.find(
        (d) => d.jenisDiagnosis === "Banding"
    );
    const lainnya = data.assessmentNote?.diagnosisPasien?.filter(
        (d) => d.jenisDiagnosis === "Lain"
    );

    const assessment = {
        utama: utama
            ? {
                diagnosa: utama.kodeKlinis?.Display || "-",
                description: utama.deskripsi || "-",
            }
            : null,
        banding: banding
            ? {
                diagnosa: banding.kodeKlinis?.Display || "-",
                description: banding.deskripsi || "-",
            }
            : null,
        lainnya:
            lainnya && lainnya.length > 0
                ? lainnya.map((item) => ({
                    diagnosa: item.kodeKlinis?.Display || "-",
                    description: item.deskripsi || "-",
                }))
                : [],
    };

    const rencanaKlinis = data.planningNote?.rencanaKlinis || [];

    const rawLayanan = data.planningNote?.rencanaKlinis?.[0]?.jenisLayanan;
    const layanan = rawLayanan ? layananMap[rawLayanan] || rawLayanan : "-";


    const pengobatan = rencanaKlinis.find((r) => r.jenisRencana === "Tindakan");
    const edukasi = rencanaKlinis.find((r) => r.jenisRencana === "Edukasi");
    const monitoring = rencanaKlinis.find((r) => r.jenisRencana === "Monitoring");
    const lainnyaRencana = rencanaKlinis.find((r) => r.jenisRencana === "Lainnya");

    const itemObat = data.resepObat?.itemObat?.map((item) => ({
        namaObat: item.obat?.namaObat || "-",
        frekuensi: item.frekuensi || "-",
        keterangan: item.aturan_pakai || "-",
        catatan: item.catatan || "",
    })) || [];

    const planning = {
        layanan,
        pengobatan: pengobatan
            ? { deskripsi: pengobatan.deskripsi, itemObat }
            : undefined,
        edukasi: edukasi
            ? { deskripsi: edukasi.deskripsi }
            : undefined,
        monitoring: monitoring
            ? {
                deskripsi: monitoring.deskripsi,
                tanggalRencana: monitoring.tanggalRencana ?? "-",
            }
            : undefined,
        lainnya: lainnyaRencana
            ? { deskripsi: lainnyaRencana.deskripsi }
            : undefined,
    };





    return (
        <div>
            <Tabs defaultValue="subjective">
                <TabsList>
                    <TabsTrigger value="subjective">Subjective</TabsTrigger>
                    <TabsTrigger value="objective">Objective</TabsTrigger>
                    <TabsTrigger value="assessment">Assessment</TabsTrigger>
                    <TabsTrigger value="planning">Planning</TabsTrigger>
                </TabsList>
                <TabsContent value="subjective">
                    <SubjectiveNote {...subjective} />
                </TabsContent>
                <TabsContent value="objective">
                    <ObjectiveNote {...objective} />
                </TabsContent>
                <TabsContent value="assessment">
                    <AssessmentNote {...assessment} />
                </TabsContent>
                <TabsContent value="planning">
                    <PlanningNote {...planning} />
                </TabsContent>
            </Tabs>
        </div>
    )
}