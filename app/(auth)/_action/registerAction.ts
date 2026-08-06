"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type RegisterResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Record<string, unknown>;
};

export const registerUser = async (
  prevState: RegisterResponse,
  formData: FormData,
) => {
  console.log("🚀 [Register Action] Starting registration process...");

  // FormData থেকে ফিল্ডগুলো সংগ্রহ করা
  const name = formData.get("name")?.toString().trim();
  const phoneNumber = formData.get("phoneNumber")?.toString().trim();
  const password = formData.get("password")?.toString();
  const userClass = formData.get("class")?.toString().trim();
  const institute = formData.get("institute")?.toString().trim();
  const profilePicture = formData.get("profilePicture")?.toString().trim();

  // ব্যাকএন্ডের চাহিদামতো পেলোড তৈরি
  const payload: Record<string, string> = {
    name: name || "",
    phoneNumber: phoneNumber || "",
    password: password || "",
    class: userClass || "",
    institute: institute || "",
  };

  if (profilePicture) {
    payload.profilePicture = profilePicture;
  }

  // সিকিউরিটির জন্য পাসওয়ার্ড হাইড করে কনসোলে পেলোড দেখা
  console.log("📦 [Register Action] Payload prepared:", { 
    ...payload, 
    password: "***" 
  });

  const backendBaseUrl =
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_BASE_API_URL ||
    "https://amader-patshal-backend.vercel.app";

  try {
    console.log(`🔗 [Register Action] Sending POST request to: ${backendBaseUrl}/api/auth/register`);
    console.time("⏱️ [Register Action] Backend Response Time"); 

    const res = await fetch(`${backendBaseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.timeEnd("⏱️ [Register Action] Backend Response Time"); 
    console.log(`✅ [Register Action] Backend responded with status: ${res.status}`);

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const htmlText = await res.text();
      console.error("❌ [Register Action] Non-JSON Server Response:", htmlText);
      return {
        success: false,
        statusCode: res.status,
        message: "Server returned HTML instead of JSON. Check backend URL.",
        data: {},
      };
    }

    const result = await res.json();
    console.log("📄 [Register Action] Backend Result:", result);

    if (res.ok && (result.success || res.status === 201)) {
      console.log("🎉 [Register Action] Registration successful! Revalidating and redirecting...");
      
      // ✅ ফিক্স: revalidateTag-এর অতিরিক্ত দ্বিতীয় আর্গুমেন্টটি ("default") রিমুভ করা হয়েছে
      revalidateTag("register","max"); 

      // রেজিস্ট্রেশন সফল হলে সরাসরি লগইন পেজে রিডাইরেক্ট করবে
      redirect("/login");
    }

    console.log("⚠️ [Register Action] Registration failed on backend.");
    return {
      success: false,
      statusCode: result.statusCode || res.status,
      message: result.message || "Registration failed",
      data: {},
    };
    
  } catch (error: unknown) { 
    // Next.js এর redirect এক্সসেপশন হ্যান্ডেল করার জন্য সঠিক Typescript চেক
    const isRedirectError = 
      error instanceof Error && 
      (error.message === "NEXT_REDIRECT" || 
      (error as Error & { digest?: string }).digest?.startsWith("NEXT_REDIRECT"));

    if (isRedirectError) {
      throw error; // Redirect error কে throw করতে হয়, catch করা যায় না
    }

    console.error("❌ [Register Action] Server Action Error:", error);
    return {
      success: false,
      statusCode: 500,
      message: error instanceof Error ? error.message : "Network or Server error.",
      data: {},
    };
  }
};