import { Sidebar } from "./_components/sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // h-screen এবং overflow-hidden দেওয়ার কারণে পুরো স্ক্রিন পিক্সেল পারফেক্ট থাকবে
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-black">
      {/* বাম পাশে ফিক্সড সাইডবার */}
      <Sidebar />
      
      {/* ডান পাশে স্ক্রোলযোগ্য মেইন কন্টেন্ট (এখানে আর কোনো গ্যাপ থাকবে না) */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}