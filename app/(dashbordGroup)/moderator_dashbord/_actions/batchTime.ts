"use server"
import { revalidateTag } from "next/cache";

import { cookies } from "next/headers";

export const isAccessTokenExist = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    return token;
};


type BatchState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: Record<string, unknown>;
};

export const createBatch = async (prevState: BatchState, formData: FormData) => {
    console.log({
        batchName: formData.get("batchName"),
        date: formData.get("date"),
        classTime: formData.get("classTime")
    });

    const payload = {
        batchName: formData.get("batchName"),
        date: formData.get("date"),
        classTime: formData.get("classTime")
    };

    const accessToken = await isAccessTokenExist();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/batch-times`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("batches", {
            expire: 0
        });
    }

    return result;
};