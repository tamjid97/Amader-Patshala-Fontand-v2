import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { getMe } from "../service/getMe"; // আপনার সার্ভিস ফাইলের পাথটি ঠিক রেখে নেবেন

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ইউজারের ডেটা শুধু পাবলিক পেজের নেভবারের জন্য ফেচ হবে
  const user = await getMe();

  return (
    <div className="flex min-h-screen flex-col w-full z-10">
      <Navbar user={user} />
      
      <main className="flex-1 w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
}