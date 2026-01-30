"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function submitRegistration(formData: FormData) {
  // 1. Extract data using the 'name' attributes from your inputs
  const rawData = {
    program: formData.get("program") as string,
    studentName: formData.get("studentName") as string,
    age: parseInt(formData.get("age") as string),
    phone: formData.get("phone") as string,
    city: formData.get("city") as string,
    email: (formData.get("email") as string) || "",
  };

  // 2. Validate
  if (!rawData.studentName || !rawData.phone || !rawData.city) {
    return { success: false, message: "Required fields are missing" };
  }

  try {
    // 3. Save to Database
    await prisma.registration.create({
      data: {
        ...rawData,
        status: "pending", // Default status
      },
    });

    // 4. Refresh Admin Dashboard
    revalidatePath("/qiyada/registrations");

    return { success: true };
  } catch (error) {
    console.error("Registration Error:", error);
    return { success: false, message: "Database Error" };
  }
}
