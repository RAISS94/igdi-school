"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function addCourse(formData: FormData) {
  const title_ar = formData.get("title_ar") as string;
  const title_en = formData.get("title_en") as string;
  const sheikh_ar = formData.get("sheikh_ar") as string;
  const sheikh_en = formData.get("sheikh_en") as string;
  const category = formData.get("category") as string;
  const videoUrl = formData.get("videoUrl") as string;
  const duration = formData.get("duration") as string;

  await prisma.course.create({
    data: {
      title_ar,
      title_en,
      sheikh_ar,
      sheikh_en,
      category,
      videoUrl,
      duration,
      date: new Date().toLocaleDateString("en-GB"), // Auto-set today's date
    },
  });

  revalidatePath("/qiyada/courses");
}

export async function deleteCourse(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.course.delete({ where: { id } });
  revalidatePath("/qiyada/courses");
}
