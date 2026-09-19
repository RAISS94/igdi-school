"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// --- MODIFIED: Accepts direct strings now, not FormData ---
export async function updateRegistrationStatus(id: string, status: string) {
  try {
    await prisma.registration.update({
      where: { id },
      data: { status },
    });

    // Refresh the dashboard immediately
    revalidatePath("/qiyada/registrations");
    revalidatePath("/qiyada"); // Update the main dashboard counts too
    return { success: true };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, error: "Failed to update" };
  }
}

// --- KEPT AS IS: Accepts FormData (for the delete button form) ---
export async function deleteRegistration(formData: FormData) {
  const id = formData.get("id") as string;
  try {
    await prisma.registration.delete({ where: { id } });
    revalidatePath("/qiyada/registrations");
    return { success: true };
  } catch (error) {
    console.error("Error deleting:", error);
    return { success: false, error: "Failed to delete" };
  }
}
