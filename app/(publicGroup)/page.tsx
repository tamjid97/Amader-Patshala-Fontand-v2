import BannerCard from "@/components/publicAll/BannerCard";
import { BatchFeatures } from "@/components/publicAll/Batch-feaures";
import CategorySection from "@/components/publicAll/CategorySection";
import ClassroomVideo from "@/components/publicAll/ClassRoom";
import ContactSection from "@/components/publicAll/ContactSection";
import DemoClasses from "@/components/publicAll/DemoClasses";
import Extrasection from "@/components/publicAll/Extrasection";
import PicSlider from "@/components/publicAll/PicSlider";
import ReviewsSection from "@/components/publicAll/ReviewsSection";
import SpecialGifts from "@/components/publicAll/SpecialGifts";
import StudyMethod from "@/components/publicAll/StudyMethod";
import TeacherProfile from "@/components/publicAll/TeacherProfile";



export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ব্যানার কম্পোনেন্ট এখানে কল করা হলো */}
      <BannerCard />
      <CategorySection/>
      <BatchFeatures/>
      <DemoClasses/>
      <TeacherProfile />
      <StudyMethod/>
      <ClassroomVideo/>
      <ReviewsSection />
      <Extrasection/>
      <SpecialGifts />
      <PicSlider/>
      <ContactSection/>
      
      {/* আপনার হোম পেজের অন্যান্য লেখা বা কম্পোনেন্ট এখানে থাকবে */}
    </main>
  );
}