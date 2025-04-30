import Image from "next/image";


export default function Headers() {
    return(
        <div className="w-full h-auto flex flex-row justify-between p-8">
            <div className="flex flex-col">
                <p className="text-[24px] font-semibold">Dashboard Overview</p>
                <p className="text-[12px] font-medium text-[#878787]">Selamat Datang Kembali, Admin</p>
            </div>
            <div className="flex flex-row items-center gap-5">
                <Image src="/notification.svg" width={20} height={20} alt="Notification Icon"/>
                <div className="flex flex-row items-center gap-2">
                    <Image src="/user-profile.svg" width={35} height={35} alt="User Profile Icon" />
                    <p>Admin</p>
                </div>
            </div>
        </div>
    )
}