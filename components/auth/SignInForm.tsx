import React from "react";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import InputField from "@/components/universal/InputField";
import {Button} from "@/components/ui/button";
import TitleHeader from "@/components/common/TitleHeader";

export default function SignInForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
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
                            />
                            <InputField
                                label="Password"
                                id="password"
                                type="password"
                                required
                            />
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}