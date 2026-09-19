"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";

// --- ADMIN MANAGEMENT ---

export async function addAdmin(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  const permissions = formData.getAll("permissions") as string[];
  const hashedPassword = await hash(password, 12);

  try {
    await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        permissions: JSON.stringify(permissions),
      },
    });
    revalidatePath("/qiyada/admins");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, error: "Email likely exists" };
  }
}

export async function deleteAdmin(formData: FormData) {
  const id = formData.get("id") as string;
  try {
    await prisma.admin.delete({ where: { id } });
    revalidatePath("/qiyada/admins");
  } catch (error) {
    console.error("Error deleting admin:", error);
  }
}
