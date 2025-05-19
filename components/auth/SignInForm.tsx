"use client";

import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import InputField from "@/components/universal/InputField";
import {Button} from "@/components/ui/button";
import TitleHeader from "@/components/common/TitleHeader";
import {useRouter} from "next/navigation";
import {handleLogin} from "@/lib/handlers/handleLogin";

export default function SignInForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        setLoading(true);

        const res = await handleLogin(email, password, (msg) => {
            alert(`Login gagal: ${msg}`)
        })

        if(res) {
            router.push("/")
        }

        setLoading(false);
    }

    return(
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <TitleHeader />
            <Card>
                <CardHeader>
                    <CardTitle>Selamat Datang</CardTitle>
                    <CardDescription>Masuk ke akun anda</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <InputField
                                label="Email"
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputField
                                label="Password"
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                onClick={onLogin}
                                disabled={loading}
                                type="submit"
                                className="w-full"
                            >
                                {loading ? "Memproses..." : "Masuk"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}