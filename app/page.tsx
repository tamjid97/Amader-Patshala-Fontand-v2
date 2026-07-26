import BannerCard from "@/components/publicAll/BannerCard";
import { BatchFeatures } from "@/components/publicAll/Batch-feaures";
import CategorySection from "@/components/publicAll/CategorySection";
import DemoClasses from "@/components/publicAll/DemoClasses";



export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ব্যানার কম্পোনেন্ট এখানে কল করা হলো */}
      <BannerCard />
      <CategorySection/>
      <BatchFeatures/>
      <DemoClasses/>
      
      {/* আপনার হোম পেজের অন্যান্য লেখা বা কম্পোনেন্ট এখানে থাকবে */}
    </main>
  );
}