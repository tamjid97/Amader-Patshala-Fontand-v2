"use server";

export async function getBanners() {
  try {
    const res = await fetch("http://localhost:5000/api/banners", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    
    // ডেটা যদি সরাসরি অ্যারে হয় তবে সেটাই রিটার্ন করবে, 
    // আর যদি অবজেক্টের ভেতরে থাকে (যেমন: data.banners বা data.data) তবে সেটি রিটার্ন করতে হবে।
    // আপনার ব্যাকএন্ড যদি সরাসরি অ্যারে দেয় তবে নিচে শুধু `data` রিটার্ন করলেই হবে।
    return Array.isArray(data) ? data : (data.banners || data.data || []);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}