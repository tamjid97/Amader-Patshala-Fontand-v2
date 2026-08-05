"use server";

import { cookies } from "next/headers";

type ResponseState = {
    success: boolean;
    message: string;
    data?: unknown;
};

export async function requestModeratorAccessAction(): Promise<ResponseState> {
    console.log("=== 🚀 Moderator Request Action Triggered ===");
    
    try {
        const cookieStore = await cookies();
        const accessToken = 
            cookieStore.get("accessToken")?.value || 
            cookieStore.get("token")?.value || 
            cookieStore.get("authToken")?.value;

        console.log("🔑 Access Token Found:", accessToken ? "Yes (Token exists)" : "No (Token missing)");

        if (!accessToken) {
            console.log("❌ Error: Unauthorized - Token missing in cookies");
            return {
                success: false,
                message: "Unauthorized! Please login first.",
            };
        }

        const backendBaseUrl = process.env.BACKEND_API_URL || "https://amader-patshal-backend.vercel.app";
        const endpoint = `${backendBaseUrl}/api/users/request-moderator`;
        
        console.log("🌐 Sending POST request to endpoint:", endpoint);

        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({}),
        });

        console.log("📥 Backend Response Status:", res.status, res.statusText);

        const textResponse = await res.text();
        console.log("📦 Raw Backend Response Text:", textResponse);

        let result: Record<string, unknown>;

        try {
            result = JSON.parse(textResponse) as Record<string, unknown>;
        } catch (e: unknown) {
            console.log("⚠️ Response is not valid JSON, returning plain text.");
            return {
                success: res.ok,
                message: textResponse || "Moderator request submitted successfully.",
            };
        }

        const isSuccess = Boolean(result?.success ?? res.ok);
        const message = typeof result?.message === "string" ? result.message : "মডারেটর হওয়ার আবেদন সফলভাবে জমা হয়েছে!";

        console.log("✅ Parsed Result Success:", isSuccess, "| Message:", message);

        return {
            success: isSuccess,
            message: message,
            data: result?.data,
        };

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong while submitting request.";
        console.error("🔥 Request moderator catch error:", error);
        return {
            success: false,
            message: errorMessage,
        };
    }
}