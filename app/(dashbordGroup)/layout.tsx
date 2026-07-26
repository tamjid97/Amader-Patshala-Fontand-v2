import { Sidebar } from "./_components/sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 💡 flex-col (মোবাইলে উপরে-নিচে) এবং md:flex-row (ডেস্কটপে পাশাপাশি)
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-slate-50 dark:bg-[#030a08]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}