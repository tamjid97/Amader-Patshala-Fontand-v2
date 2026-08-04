"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type RegisterResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Record<string, unknown>;
};

export const registerUser = async (prevState: RegisterResponse, formData: FormData) => {
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

  const backendBaseUrl = process.env.BACKEND_API_URL || "https://amader-patshal-backend.vercel.app";

  try {
    const res = await fetch(`${backendBaseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (res.ok && (result.success || res.status === 201)) {
      revalidateTag("register","max");
      
      // রেজিস্ট্রেশন সফল হলে সরাসরি লগইন পেজে রিডাইরেক্ট করবে
      redirect("/login");
    }

    return {
      success: false,
      statusCode: result.statusCode || res.status,
      message: result.message || "Registration failed",
      data: {},
    };

  } catch (error: unknown) {
    // Next.js এর redirect এক্সসেপশন হ্যান্ডেল করার জন্য সঠিক টাইপ চেক
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    console.error("Register Server Action Error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Network or Server error.",
      data: {},
    };
  }
};