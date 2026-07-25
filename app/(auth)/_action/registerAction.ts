"use server";

export interface RegisterResponseData {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
  [key: string]: unknown;
}

export type RegisterActionState = {
  success: boolean;
  message?: string;
  data?: RegisterResponseData;
} | null;

export async function RegisterAction(
  prevState: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  try {
    const name = formData.get("name") as string;
    // 🔑 ফ্রন্টএন্ড ফর্ম ফিল্ড 'phone' থেকে ভ্যালু নেওয়া হচ্ছে
    const phone = formData.get("phone") as string;
    const institute = formData.get("institute") as string;
    const classValue = formData.get("class") as string;
    const password = formData.get("password") as string;
    const role = (formData.get("role") as string) || "USER";

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phoneNumber: phone, // 👈 🎯 'phone' এর বদলে 'phoneNumber' কি (key) ব্যবহার করা হয়েছে
        institute,
        class: classValue,
        password,
        role,
      }),
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Backend returned HTML/Non-JSON Response:", text);
      return {
        success: false,
        message: "Server response was not JSON. Check backend logs.",
      };
    }

    const data: RegisterResponseData = await res.json();

    if (!res.ok) {
      return { 
        success: false, 
        message: (data as { message?: string })?.message || "Registration failed" 
      };
    }

    return { success: true, data };
  } catch (error: unknown) {
    console.error("Action Error:", error);

    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return { success: false, message: errorMessage };
  }
}