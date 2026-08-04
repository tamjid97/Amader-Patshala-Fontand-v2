import { getMe } from "@/app/(publicGroup)/_acttion/profile";
import UserProfile from "@/components/ui/userProfile";


export default async function ProfilePage() {
  let initialData = null;

  try {
    const res = await getMe();
    initialData = res;
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
  }

  return (
    <main>
      <UserProfile initialData={initialData} />
    </main>
  );
}