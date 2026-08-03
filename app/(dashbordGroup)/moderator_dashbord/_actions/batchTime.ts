"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const isAccessTokenExist = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    return token;
};

type BatchState = {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: unknown;
};


const handleApiResponse = async (res: Response) => {
    const contentType = res.headers.get("content-type");
    
    // যদি রেসপন্স JSON না হয়ে HTML বা অন্য কিছু হয়
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

    return await res.json();
};

export const createBatch = async (prevState: BatchState, formData: FormData) => {
    const payload = {
        batchName: formData.get("batchName"),
        date: formData.get("date"),
        classTime: formData.get("classTime")
    };

    const accessToken = await isAccessTokenExist();

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/batch-times`, {
            method: "POST",
            headers: {
                Cookie: `accessToken=${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await handleApiResponse(res);

        if (result.success) {
            revalidateTag("batches", {
                expire: 0
            });
        }

        return result;
    } catch (error) {
        console.error("Create Batch Error:", error);
        return { success: false, message: "Failed to connect to the backend server!" };
    }
};

export const getBatchTime = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    
    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
            data: []
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/batch-times`, {
            headers: {
                Cookie: `accessToken=${accessToken}`
            },
            next: {
                tags: ["batches"]
            }
        });

        const result = await handleApiResponse(res);
        return result;
    } catch (error) {
        console.error("Get Batch Error:", error);
        return { success: false, message: "Failed to connect to the backend server!", data: [] };
    }
};

export const updateBatch = async (
    id: string, 
    prevState: BatchState, 
    formData: FormData
) => {
    const payload = {
        batchName: formData.get("batchName"),
        date: formData.get("date"),
        classTime: formData.get("classTime")
    };

    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
        return {
            success: false,
            statusCode: 401,
            message: "User not logged in!",
            data: {}
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/batch-times/${id}`, {
            method: "PUT", 
            headers: {
                Cookie: `accessToken=${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await handleApiResponse(res);

        if (result.success) {
            revalidateTag("batches", {
                expire: 0
            });
        }

        return result;
    } catch (error) {
        console.error("Update Batch Error:", error);
        return { success: false, message: "Failed to connect to the backend server!" };
    }
};

export const deleteBatch = async (id: string) => {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!"
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/batch-times/${id}`, {
            method: "DELETE",
            headers: {
                Cookie: `accessToken=${accessToken}`
            }
        });

        const result = await handleApiResponse(res);

        if (result.success) {
            revalidateTag("batches", {
                expire: 0
            }); 
        }

        return result;
    } catch (error) {
        console.error("Delete Batch Error:", error);
        return { success: false, message: "Failed to connect to the backend server!" };
    }
};