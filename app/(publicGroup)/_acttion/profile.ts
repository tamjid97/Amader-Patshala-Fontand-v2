import { cookies } from "next/headers";

// বর্তমান ইউজারের ডেটা আনার জন্য
export const getMe = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    
    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
            data: null
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
            headers: {
                Cookie: `accessToken=${accessToken}`
            },
            cache: 'no-store'
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Get Me Error:", error);
        return { success: false, message: "Failed to connect to the backend server!", data: null };
    }
};

// প্রোফাইল আপডেট করার জন্য সার্ভার অ্যাকশন
export const updateProfile = async (updatedData: {
    name?: string;
    email?: string;
    phoneNumber?: string;
    class?: string;
    institute?: string;
    profilePicture?: string | null;
}) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        return { success: false, message: "Unauthorized!" };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/update-profile`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}`
            },
            body: JSON.stringify(updatedData),
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Update Profile Error:", error);
        return { success: false, message: "Failed to update profile!" };
    }
};