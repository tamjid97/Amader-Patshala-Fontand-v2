"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { type JwtPayload } from "jsonwebtoken"

type LoginState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
    }
}

export const loginAction = async (prevState: LoginState, formData: FormData) => {
    const phoneNumber = formData.get("phone");
    const password = formData.get("password");

    const payload = {
        phoneNumber,
        password
    };

    // এনভায়রনমেন্ট ভেরিয়েবল কাজ না করলে সরাসরি ব্যাকএন্ড লিংক কাজ করবে (ক্র্যাশ করবে না)
    const BACKEND_URL = process.env.BACKEND_API_URL || "https://amader-patshal-backend.vercel.app";

    try {
        const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        // সার্ভার থেকে HTML বা ভুল রেসপন্স আসলে যেন কোড ক্র্যাশ না করে
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const htmlText = await res.text();
            console.error("Non-JSON Server Response:", htmlText);
            return {
                success: false,
                statusCode: res.status,
                message: "Server returned HTML instead of JSON. Check API endpoint.",
                data: { accessToken: "", refreshToken: "" }
            };
        }

        const result = await res.json();

        if (result.success) {
            const cookieStore = await cookies();

            cookieStore.set("accessToken", result.data.accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
            });

            cookieStore.set("refreshToken", result.data.refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
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
        // Next.js এর নিজস্ব redirect এক্সেপশন হ্যান্ডেল করার জন্য
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
            throw error;
        }

        console.error("Login Action Error:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Network or Server error during login.",
            data: { accessToken: "", refreshToken: "" }
        };
    }
}