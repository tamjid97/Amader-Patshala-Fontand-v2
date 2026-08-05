"use server";

import { cookies } from "next/headers";

type ResponseState = {
    success: boolean;
    message: string;
    data?: unknown;
};

export async function requestStudentAccessAction(): Promise<ResponseState> {
    try {
        const cookieStore = await cookies();
        const accessToken = 
            cookieStore.get("accessToken")?.value || 
            cookieStore.get("token")?.value || 
            cookieStore.get("authToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Unauthorized! Please login first.",
            };
        }

        const res = await fetch("https://amader-patshal-backend.vercel.app/api/users/request-student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({}),
        });

        const textResponse = await res.text();
        let result: Record<string, unknown>;

        try {
            result = JSON.parse(textResponse) as Record<string, unknown>;
        } catch (e: unknown) {
            return {
                success: res.ok,
                message: textResponse || "Request submitted successfully.",
            };
        }

        const isSuccess = Boolean(result?.success ?? res.ok);
        const message = typeof result?.message === "string" ? result.message : "স্টুডেন্ট হওয়ার আবেদন সফলভাবে জমা হয়েছে!";

        return {
            success: isSuccess,
            message: message,
            data: result?.data,
        };

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong while submitting request.";
        console.error("Request student error:", error);
        return {
            success: false,
            message: errorMessage,
        };
    }
}