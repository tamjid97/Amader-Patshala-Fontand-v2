import { getBanners } from "@/app/(publicGroup)/_acttion/banner";

type Banner = {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
};

export default async function BannerCard() {
  const banners: Banner[] = await getBanners();

  return (
    <div className="w-full">
      <section className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-emerald-900 dark:text-emerald-100">
          হোম পেজের ব্যানারসমূহ
        </h1>

        {banners.length === 0 ? (
          <p className="text-gray-500">কোনো ব্যানার পাওয়া যায়নি।</p>
        ) : (
          <div className="grid gap-6">
            {banners.map((banner, index) => (
              <div 
                key={banner.id || index} 
                className="border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 shadow-sm bg-white dark:bg-[#030a08]"
              >
                {banner.imageUrl && (
                  <img 
                    src={banner.imageUrl} 
                    alt={banner.title || "Banner"} 
                    className="w-full h-48 object-cover rounded-lg mb-3" 
                  />
                )}
                <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">
                  {banner.title}
                </h2>
                {banner.description && (
                  <p className="text-sm text-emerald-800/80 dark:text-emerald-400 mt-1">
                    {banner.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}