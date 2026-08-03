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

// 1. Create PDF Action
export async function createPdf(formData: FormData): Promise<ActionResponse> {
  console.log("[Action] createPdf called 🚀");
  try {
    const title = formData.get("title");
    const subject = formData.get("subject");
    const link = formData.get("link");
    const image = formData.get("image");

    // Payload mapping (link is mapped to pdfUrl based on your JSON response)
    const payload = {
      title: title ? String(title).trim() : "",
      subject: subject ? String(subject).trim() : "",
      pdfUrl: link ? String(link).trim() : "", 
      image: image ? String(image).trim() : null,
    };

    const accessToken = await isAccessTokenExist();
    if (!accessToken) {
      return { success: false, message: "User not logged in!" };
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/api/pdf`; // API এন্ডপয়েন্ট আপনার ব্যাকএন্ড অনুযায়ী পরিবর্তন করবেন

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // অথবা Cookie: `accessToken=${accessToken}` (আপনার ব্যাকএন্ডের প্রয়োজন অনুযায়ী)
      },
      body: JSON.stringify(payload),
    });

    const result = (await handleApiResponse(response)) as ActionResponse;
    if (result.success) {
      revalidateTag("pdfs","max"); 
    }
    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return { success: false, message: errorMessage };
  }
}

// 2. Get PDFs Action
export const getPdfs = async () => {
  const accessToken = await isAccessTokenExist();
  
  if (!accessToken) {
    console.error("[Action] getPdfs Error: User not logged in!");
    return { success: false, message: "User not logged in!", data: [] };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/pdfs`;

    const res = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json"
      },
      next: {
        tags: ["pdfs"]
      }
    });

    const result = await handleApiResponse(res);
    return result;
  } catch (error) {
    console.error("[Action] getPdfs Exception Error:", error);
    return { success: false, message: "Failed to connect to the backend server!", data: [] };
  }
};

// 3. Update PDF Action
export const updatePdf = async (id: string, formData: FormData): Promise<ActionResponse> => {
  console.log(`[Action] updatePdf called for ID: ${id} 📝`);
  
  const payload = {
    title: String(formData.get("title") || "").trim(),
    subject: String(formData.get("subject") || "").trim(),
    pdfUrl: String(formData.get("link") || "").trim(), 
    image: String(formData.get("image") || "").trim() || null,
  };

  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    console.error("[Action] updatePdf Error: User not logged in!");
    return { success: false, message: "User not logged in!" };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/pdfs/${id}`;

    const res = await fetch(backendUrl, {
      method: "PUT", // অথবা PATCH
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await handleApiResponse(res) as ActionResponse;
    
    if (result.success) {
      revalidateTag("pdfs","max"); 
    }
    return result;
  } catch (error) {
    console.error("[Action] updatePdf Exception Error:", error);
    return { success: false, message: "Failed to connect to the backend server!" };
  }
};

// 4. Delete PDF Action
export const deletePdf = async (id: string): Promise<ActionResponse> => {
  console.log(`[Action] deletePdf called for ID: ${id} 🗑️`);
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/pdfs/${id}`;

    const res = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`
      }
    });

    const result = await handleApiResponse(res) as ActionResponse;

    if (result.success) {
      revalidateTag("pdfs","max"); 
    }
    return result;
  } catch (error) {
    return { success: false, message: "Failed to connect to the backend server!" };
  }
};