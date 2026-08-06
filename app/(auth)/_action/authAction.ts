"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { type JwtPayload } from "jsonwebtoken";

type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

const BACKEND_URL = process.env.BACKEND_API_URL || "https://amader-patshal-backend.vercel.app";

// 🌟 ১. লগইন অ্যাকশন
export const loginAction = async (prevState: LoginState, formData: FormData) => {
  const phoneNumber = formData.get("phone");
  const password = formData.get("password");

  const payload = {
    phoneNumber,
    password,
  };

  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // সার্ভার থেকে HTML বা ভুল রেসপন্স আসলে ব্যবহারকারীকে সহজ ভাষায় মেসেজ দেখাবে
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const htmlText = await res.text();
      console.error("Non-JSON Server Response:", htmlText);
      return {
        success: false,
        statusCode: res.status,
        message: "আপনার অ্যাকাউন্ট নেই অথবা ফোন নম্বর বা পাসওয়ার্ড ভুল। দয়া করে আগে রেজিস্টার করুন।",
        data: { accessToken: "", refreshToken: "" },
      };
    }

    const result = await res.json();

    // যদি ব্যাকএন্ড থেকে success: false বা কোনো এরর আসে
    if (!result.success) {
      return {
        success: false,
        statusCode: result.statusCode || res.status,
        message: "আপনার অ্যাকাউন্ট নেই অথবা ফোন নম্বর বা পাসওয়ার্ড ভুল। দয়া করে আগে রেজিস্টার করুন।",
        data: { accessToken: "", refreshToken: "" },
      };
    }

    if (result.success) {
      const cookieStore = await cookies();

      cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      cookieStore.set("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

      if (decodedToken?.role === "USER" || decodedToken?.role === "STUDENT") {
        redirect("/user_dashboard");
      } else if (decodedToken?.role === "ADMIN") {
        redirect("/admin_dashbord");
      } else if (decodedToken?.role === "MODERATOR") {
        redirect("/moderator_dashbord");
      }
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    console.error("Login Action Error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "আপনার অ্যাকাউন্ট নেই অথবা ফোন নম্বর বা পাসওয়ার্ড ভুল। দয়া করে আগে রেজিস্টার করুন।",
      data: { accessToken: "", refreshToken: "" },
    };
  }
};

// 🌟 ২. বর্তমান লগইনকৃত ইউজারের ডাটা ও রোল পাওয়ার অ্যাকশন
export const getCurrentUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "No access token found" };
    }

    const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Cookie: `accessToken=${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, message: "Failed to fetch user info" };
    }

    return await res.json();
  } catch (error) {
    console.error("getCurrentUser Error:", error);
    return { success: false, message: "Error fetching user info" };
  }
};