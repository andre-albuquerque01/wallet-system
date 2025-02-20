import { UserProfile } from "@/app/action";
import { UserProfileComponent } from "@/components/user/profile";

export default async function HomeUser() {
    const data = await UserProfile()

    return (
        <div className="bg-forum-gradient-2 h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden p-2">
            <UserProfileComponent
                name={data.name}
                email={data.email}
                balance={data.balance}  
            />
        </div>
    );
}
