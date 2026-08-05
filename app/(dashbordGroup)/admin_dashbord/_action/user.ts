"use server";

import { cookies } from "next/headers";

const BACKEND_URL = "https://amader-patshal-backend.vercel.app";

// সমস্ত ইউজার ফেচ করার জন্য
export async function fetchAllUsersAction() {
  try {
    const cookieStore = await cookies();
    const accessToken = 
      cookieStore.get("accessToken")?.value || 
      cookieStore.get("token")?.value || 
      cookieStore.get("authToken")?.value;

    const res = await fetch(`${BACKEND_URL}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      cache: "no-store",
    });

    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return [];
  }
}

// ইউজারের স্ট্যাটাস (Active, Banned, Pending ইত্যাদি) আপডেট করার জন্য
export async function updateUserStatusAction(id: string, status: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = 
      cookieStore.get("accessToken")?.value || 
      cookieStore.get("token")?.value || 
      cookieStore.get("authToken")?.value;

    const res = await fetch(`${BACKEND_URL}/api/users/ban/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    if (res.ok && (data.success || res.status === 200)) {
      return { success: true, message: data.message || "User status updated successfully" };
    }
    return { success: false, message: data.message || "Failed to update user status" };
  } catch (error) {
    console.error("❌ Error updating user status:", error);
    return { success: false, message: "Something went wrong" };
  }
}