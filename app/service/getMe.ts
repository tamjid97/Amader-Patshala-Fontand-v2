"use server";

import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "user not logged!",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
      headers: {
        cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store", // সিকিউরিটি ও রিয়েল-টাইম ডেটার জন্য ক্যাশ বন্ধ রাখা হলো
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return { success: false, message: "Failed to fetch profile" };
  }
};