import { UserProfile } from "@/app/action";
import { UpdateUserComponent } from "@/components/user/update-user";

export default async function UpdateUser() {
    const data = await UserProfile()
    return (
        <div className="h-full">
            <UpdateUserComponent data={data} />
        </div>
    )
}