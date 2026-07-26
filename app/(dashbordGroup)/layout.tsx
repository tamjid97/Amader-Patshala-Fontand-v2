import { getMe } from "../service/getMe";
import { Sidebar } from "./_components/sidebar";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = await getMe(); 

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-slate-50 dark:bg-[#030a08]">
      {/* 💡 ২. এখন এখানে user পাওয়া যাবে এবং সাইডবারে পাস হবে */}
      <Sidebar user={user} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}