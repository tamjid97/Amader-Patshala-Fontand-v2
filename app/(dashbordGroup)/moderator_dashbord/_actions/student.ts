"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type ResponseState = {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: unknown;
};

interface IBackendUserItem {
    id: string;
    name?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    isApproved?: string;
    createdAt?: string;
    profilePicture?: string | null;
    image?: string | null;
    [key: string]: unknown;
}

export async function getStudentRequestsAction(): Promise<ResponseState> {
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
                data: [],
            };
        }

        const res = await fetch("https://amader-patshal-backend.vercel.app/api/moderator/pending-requests", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        });

        const textResponse = await res.text();
        let result: { success?: boolean; data?: unknown; message?: string };
        try {
            result = JSON.parse(textResponse);
        } catch (e) {
            return {
                success: res.ok,
                message: "Failed to parse data from server.",
                data: [],
            };
        }

        if (result?.success && result?.data) {
            const rawData = Array.isArray(result.data) 
                ? (result.data as IBackendUserItem[]) 
                : [result.data as IBackendUserItem];

            result.data = rawData.map((item: IBackendUserItem) => {
                const approvalStatus = (item.isApproved || "PENDING").trim().toUpperCase();
                
                let formattedStatus: "PENDING" | "APPROVED" | "REJECTED" = "PENDING";
                if (approvalStatus === "APPROVED") formattedStatus = "APPROVED";
                else if (approvalStatus === "REJECTED") formattedStatus = "REJECTED";

                return {
                    id: item.id,
                    name: item.name || "Unknown User",
                    email: item.email || item.phoneNumber || "N/A",
                    status: formattedStatus,
                    requestDate: item.createdAt ? item.createdAt.split("T")[0] : new Date().toISOString().split("T")[0],
                    image: item.profilePicture || item.image || "",
                };
            });
        } else {
            result.data = [];
        }

        return result as ResponseState;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong while fetching student requests.",
            data: [],
        };
    }
}

export async function updateStudentRequestStatusAction(
    requestId: string,
    status: "APPROVED" | "REJECTED"
): Promise<ResponseState> {
    try {
        const cookieStore = await cookies();
        const accessToken = 
            cookieStore.get("accessToken")?.value || 
            cookieStore.get("token")?.value || 
            cookieStore.get("authToken")?.value;

        if (!accessToken) {
            return { success: false, message: "Unauthorized! Please login first." };
        }

        const res = await fetch(`https://amader-patshal-backend.vercel.app/api/moderator/approve/${requestId}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ status }),
        });

        const textResponse = await res.text();
        let result;

        try {
            result = JSON.parse(textResponse);
        } catch (e) {
            // 🌟 যদি ব্যাকএন্ড 500 HTML পেজ দেয়, তবে এখানে তা ধরা পড়বে
            console.error("Backend returned HTML instead of JSON:", textResponse.substring(0, 100));
            return {
                success: false,
                message: `Server Error (500): ব্যাকএন্ড লাইভ সার্ভারে সমস্যা হচ্ছে। দয়া করে Vercel-এর লগ চেক করুন।`,
            };
        }

        if (result?.success || res.ok) {
            revalidatePath("/moderator_dashbord/syudent");
            return { success: true, message: result.message || `Successfully ${status}` };
        } else {
            return { success: false, message: result.message || "Failed to update." };
        }

    } catch (error) {
        console.error("Update error:", error);
        return { success: false, message: "Something went wrong in Server Action." };
    }
}