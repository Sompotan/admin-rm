import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {UserProfileProps} from "@/types/verifikasi/types";


export default function UserProfile({name, image}: UserProfileProps) {
    return(
        <div className="flex flex-row items-center gap-2">
            <Avatar>
                <AvatarImage src={`${image}`} alt={"gabs"}  style={{
                    objectFit: "cover"
                }}/>
            </Avatar>
            <p className="text-[14px] font-medium">{name}</p>
        </div>

    )
}