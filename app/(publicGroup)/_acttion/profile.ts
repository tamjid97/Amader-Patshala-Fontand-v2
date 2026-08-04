"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BASE_API_URL ||
  "http://localhost:5000";

// বর্তমান ইউজারের ডেটা আনার জন্য
export const getMe = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: null,
      };
    }

    const res = await fetch(`${BASE_URL}/api/users/me`, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch user profile",
        data: null,
      };
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Get Me Error:", error);
    return {
      success: false,
      message: "Failed to connect to the backend server!",
      data: null,
    };
  }
};

// প্রোফাইল আপডেট করার জন্য সার্ভার অ্যাকশন
export const updateProfile = async (updatedData: {
  name?: string;
  email?: string | null;
  phoneNumber?: string;
  class?: string;
  institute?: string;
  profilePicture?: string | null;
}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return { success: false, message: "Unauthorized!" };
    }

    const res = await fetch(`${BASE_URL}/api/users/update-profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedData),
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const htmlText = await res.text();
      console.error("Backend Error Response:", htmlText);
      return { success: false, message: "Backend returned an invalid format!" };
    }

    const result = await res.json();

    if (result?.success) {
      revalidatePath("/profile");
    }

    return result;
  } catch (error) {
    console.error("Update Profile Error:", error);
    return { success: false, message: "Failed to update profile!" };
  }
};