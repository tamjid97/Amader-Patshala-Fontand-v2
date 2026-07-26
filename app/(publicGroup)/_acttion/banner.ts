"use server";

export async function getBanners() {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/banners`, {
      cache: "no-store", // সবসময় ফ্রেশ ডাটা পাওয়ার জন্য
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : (data.banners || data.data || []);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}