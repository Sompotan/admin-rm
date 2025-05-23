import SignInForm from "@/components/auth/SignInForm";

export default function SignIn() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6">
            <div className="w-full max-w-sm">
                <SignInForm/>
            </div>
        </div>
    )
}