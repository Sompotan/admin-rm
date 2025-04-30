"use client";

import React, {useState} from 'react'
import {handleLogout} from "@/lib/handlers/handleLogout";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onLogout = async () => {
        setLoading(true);

        const res = await handleLogout((msg) => {
            alert(`"Log Out Gagal : ${msg}`)
        })

        if (res) {
            router.push("/");
        }

        setLoading(false);

    }

    return (
        <div>
            <h1 className='text-2xl'>Home</h1>
            <Button onClick={onLogout} disabled={loading} className={"w-[50px] h-auto"}>
                Logout
            </Button>
        </div>
    )
}

export default Home