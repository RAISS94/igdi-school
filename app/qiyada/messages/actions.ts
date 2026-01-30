"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function deleteMessage(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  await prisma.contactMessage.delete({
    where: { id },
  });

  revalidatePath("/qiyada/messages");
}

export async function markAsRead(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { status: "read" },
  });
  revalidatePath("/qiyada/messages");
}
