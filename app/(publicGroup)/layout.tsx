import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { getMe } from "../service/getMe";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  return (
    <div className="flex min-h-screen flex-col w-full z-10">
      <Navbar user={user} />
      
      {/* এখানে pb-0 এবং overflow-hidden দিয়ে ফুটারের আগের যেকোনো গ্যাপ বা বর্ডার লাইন রিমুভ করা হলো */}
      <main className="flex-1 w-full pb-0 overflow-hidden">
        {children}
      </main>

      <Footer />
    </div>
  );
}