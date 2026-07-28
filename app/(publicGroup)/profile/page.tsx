import { UserProfile } from "@/components/ui/userProfile"


export const metadata = {
  title: 'User Profile',
  description: 'Manage your profile information',
}

export default function ProfilePage() {
  return (
    <main>
  
      <UserProfile />
    </main>
  )
}
