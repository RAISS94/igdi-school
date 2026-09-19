"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const subject = "General Inquiry"; // You can add a subject field to the form later if needed

  if (!name || !email || !message) {
    return { error: "All fields are required" };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        subject,
        status: "unread",
      },
    });

    // Refresh the admin messages page so the new message appears immediately
    revalidatePath("/qiyada/messages");
    return { success: true };
  } catch (error) {
    console.error("Form submission error:", error);
    return { error: "Failed to send message" };
  }
}
