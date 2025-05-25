import {redirect} from "next/navigation";

export const dynamic = "force-dynamic";

export default function RekamMedis() {
    return redirect("/pasien")
}