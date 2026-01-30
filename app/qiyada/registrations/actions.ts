"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function deleteRegistration(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.registration.delete({ where: { id } });
  revalidatePath("/qiyada/registrations");
}

export async function updateStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  await prisma.registration.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/qiyada/registrations");
}
