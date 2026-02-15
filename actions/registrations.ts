"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// 1. Update Status (Approve/Reject)
export async function updateRegistrationStatus(id: string, status: string) {
  try {
    await prisma.registration.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/qiyada/registrations");
    return { success: true };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

// 2. Delete Registration (The missing piece)
export async function deleteRegistration(formData: FormData) {
  const id = formData.get("id") as string;
  try {
    await prisma.registration.delete({
      where: { id },
    });
    revalidatePath("/qiyada/registrations");
    return { success: true };
  } catch (error) {
    console.error("Error deleting registration:", error);
    return { success: false, error: "Failed to delete" };
  }
}
