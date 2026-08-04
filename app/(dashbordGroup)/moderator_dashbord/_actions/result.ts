"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const isAccessTokenExist = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return token;
};

const handleApiResponse = async (res: Response) => {
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Non-JSON response from backend:", text);
    return {
      success: false,
      statusCode: res.status,
      message: `Server error! Backend returned non-JSON response (Status: ${res.status})`,
      data: []
    };
  }
  const jsonRes = await res.json();
  return jsonRes;
};

interface ActionResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

// 1. Create Result Action
export async function createResult(formData: FormData): Promise<ActionResponse> {
  console.log("[Action] createResult called 🚀");
  try {
    const examName = formData.get("examName");
    const batch = formData.get("batch");
    const examDate = formData.get("examDate");
    const resultLink = formData.get("resultLink");

    const payload = {
      examName: examName ? String(examName).trim() : "",
      batch: batch ? String(batch).trim() : "",
      examDate: examDate ? String(examDate).trim() : "",
      resultLink: resultLink ? String(resultLink).trim() : "",
    };

    const accessToken = await isAccessTokenExist();
    if (!accessToken) {
      return { success: false, message: "User not logged in!" };
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/api/results`; // আপনার ব্যাকএন্ড রাউট অনুযায়ী পরিবর্তন করতে পারেন

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = (await handleApiResponse(response)) as ActionResponse;
    if (result.success) {
      revalidateTag("results", "max");
    }
    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return { success: false, message: errorMessage };
  }
}

// 2. Get Results Action
export const getResults = async () => {
  const accessToken = await isAccessTokenExist();
  
  if (!accessToken) {
    console.error("[Action] getResults Error: User not logged in!");
    return { success: false, message: "User not logged in!", data: [] };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/results`;

    const res = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      next: {
        tags: ["results"]
      }
    });

    const result = await handleApiResponse(res);
    return result;
  } catch (error) {
    console.error("[Action] getResults Exception Error:", error);
    return { success: false, message: "Failed to connect to the backend server!", data: [] };
  }
};

// 3. Update Result Action
export const updateResult = async (id: string, formData: FormData): Promise<ActionResponse> => {
  console.log(`[Action] updateResult called for ID: ${id} 📝`);
  
  const payload = {
    examName: String(formData.get("examName") || "").trim(),
    batch: String(formData.get("batch") || "").trim(),
    examDate: String(formData.get("examDate") || "").trim(),
    resultLink: String(formData.get("resultLink") || "").trim(),
  };

  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    console.error("[Action] updateResult Error: User not logged in!");
    return { success: false, message: "User not logged in!" };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/results/${id}`;

    const res = await fetch(backendUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload)
    });

    const result = await handleApiResponse(res) as ActionResponse;
    
    if (result.success) {
      revalidateTag("results", "max");
    }
    return result;
  } catch (error) {
    console.error("[Action] updateResult Exception Error:", error);
    return { success: false, message: "Failed to connect to the backend server!" };
  }
};

// 4. Delete Result Action
export const deleteResult = async (id: string): Promise<ActionResponse> => {
  console.log(`[Action] deleteResult called for ID: ${id} 🗑️`);
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/results/${id}`;

    const res = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`
      }
    });

    const result = await handleApiResponse(res) as ActionResponse;

    if (result.success) {
      revalidateTag("results", "max");
    }
    return result;
  } catch (error) {
    return { success: false, message: "Failed to connect to the backend server!" };
  }
};