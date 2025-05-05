import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {UserProfileProps} from "@/types/verifikasi/types";
import {User} from "lucide-react";


export default function UserProfile({name, image}: UserProfileProps) {
    return(
        <div className="flex flex-row items-center gap-2">

            {image ? (
                <Avatar>
                    <AvatarImage src={`${image}`} alt={"gabs"}  style={{
                        objectFit: "cover"
                    }}/>
                </Avatar>
            ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center">
                    <User size={16} color="#aaa" />
                </div>
            )}

            <p className="text-[14px] font-medium">{name}</p>
        </div>

    )
}