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
  statusCode?: number;
}

interface PdfPayload {
  title?: string;
  subject?: string;
  className?: string;
  pdfUrl?: string;
  link?: string;
  image?: string | null;
}

// 1. Create PDF Action
export async function createPdf(formData: FormData): Promise<ActionResponse> {
  console.log("[Action] createPdf called 🚀");
  try {
    const title = formData.get("title");
    const subject = formData.get("subject");
    const className = formData.get("className");
    const link = formData.get("link");
    const image = formData.get("image");

    const payload = {
      title: title ? String(title).trim() : "",
      subject: subject ? String(subject).trim() : "",
      className: className ? String(className).trim() : "",
      pdfUrl: link ? String(link).trim() : "", 
      image: image ? String(image).trim() : null,
    };

    const accessToken = await isAccessTokenExist();
    if (!accessToken) {
      return { success: false, message: "User not logged in!" };
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/api/pdf`;

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
      revalidateTag("pdfs", "max");
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
    const backendUrl = `${process.env.BACKEND_API_URL}/api/pdf`;

    const res = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
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
export const updatePdf = async (
  id: string, 
  inputData: FormData | PdfPayload
): Promise<ActionResponse> => {
  console.log(`[Action] updatePdf called for ID: ${id} 📝`);

  let payload;

  if (inputData instanceof FormData) {
    payload = {
      title: String(inputData.get("title") || "").trim(),
      subject: String(inputData.get("subject") || "").trim(),
      className: String(inputData.get("className") || "").trim(),
      pdfUrl: String(inputData.get("pdfUrl") || inputData.get("link") || "").trim(), 
      image: String(inputData.get("image") || "").trim() || null,
    };
  } else {
    payload = {
      title: String(inputData.title || "").trim(),
      subject: String(inputData.subject || "").trim(),
      className: String(inputData.className || "").trim(),
      pdfUrl: String(inputData.pdfUrl || inputData.link || "").trim(),
      image: String(inputData.image || "").trim() || null,
    };
  }

  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    console.error("[Action] updatePdf Error: User not logged in!");
    return { success: false, message: "User not logged in!" };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/pdf/${id}`;

    const res = await fetch(backendUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload)
    });

    const result = (await handleApiResponse(res)) as ActionResponse;
    
    if (result.success) {
      revalidateTag("pdfs", "max");
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
    const backendUrl = `${process.env.BACKEND_API_URL}/api/pdf/${id}`;

    const res = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`
      }
    });

    const result = (await handleApiResponse(res)) as ActionResponse;

    if (result.success) {
      revalidateTag("pdfs", "max");
    }
    return result;
  } catch (error) {
    return { success: false, message: "Failed to connect to the backend server!" };
  }
};