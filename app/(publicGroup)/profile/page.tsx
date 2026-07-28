
import { UserProfile } from "@/components/ui/userProfile";
import { getMe } from "../_acttion/profile";

export default async function ProfilePage() {
  const profileData = await getMe();
  
  // কনসোল করে টার্মিনালে চেক করুন কী ডেটা আসছে
  console.log("SERVER PROFILE DATA:", profileData);

  return (
    <main>
      <UserProfile initialData={profileData} />
    </main>
  );
}