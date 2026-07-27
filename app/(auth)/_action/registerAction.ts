"use server"

import { isAccessTokenExist } from "@/app/(dashbordGroup)/moderator_dashbord/_actions/batchTime";
import { revalidateTag } from "next/cache";

type PostState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Record<string, unknown>;
}

export const registerUser = async (prevState: PostState, formData: FormData) => {
  const accessToken = await isAccessTokenExist();

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        cookie: `accessToken=${accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Backend Error:", errorText);
      return {
        success: false,
        statusCode: res.status,
        message: "Backend server returned an error.",
        data: {}
      };
    }

    const result = await res.json();

    if (result.success) {
      // revalidate.d.ts এর টাইপ অনুযায়ী দ্বিতীয় আর্গুমেন্ট পাস করা হলো
      revalidateTag("register", undefined as unknown as never); 
    }

    return result;

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong in the server.";
    console.error("Server Action Fetch Error:", error);
    return {
      success: false,
      statusCode: 500,
      message: errorMessage,
      data: {}
    };
  }
};