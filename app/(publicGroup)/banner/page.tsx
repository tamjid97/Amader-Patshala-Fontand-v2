import { getBanners } from "../_acttion/banner";

type Banner = {
  id?: string;
  title?: string;
  imageUrl?: string;
};

export default async function BannerPage() {
  const banners = await getBanners();
  const bannerList: Banner[] = Array.isArray(banners) ? banners : [];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {bannerList.length === 0 ? (
        <p className="text-center text-gray-500">কোনো ব্যানার পাওয়া যায়নি।</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bannerList.map((banner, index) => (
            <div 
              key={banner.id || index} 
              className="overflow-hidden rounded-2xl shadow-md bg-white dark:bg-[#030a08] border border-emerald-100 dark:border-emerald-900/50 transition-transform duration-300 hover:scale-[1.02]"
            >
              {banner.imageUrl && (
                <img 
                  src={banner.imageUrl} 
                  alt={banner.title || "Banner"} 
                  className="w-full h-auto object-cover aspect-[4/5]" 
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}