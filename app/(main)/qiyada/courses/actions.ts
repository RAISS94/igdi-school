"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// --- EXISTING COURSE ACTIONS ---

export async function addCourse(formData: FormData) {
  const title_ar = formData.get("title_ar") as string;
  const title_en = formData.get("title_en") as string;
  const sheikh_ar = formData.get("sheikh_ar") as string;
  const sheikh_en = formData.get("sheikh_en") as string;
  const description_ar = formData.get("description_ar") as string;
  const description_en = formData.get("description_en") as string;
  const rawCategory = formData.get("category");
  const category = (rawCategory as string) || "General";
  const videoUrl = formData.get("videoUrl") as string;
  const hours = formData.get("duration_h") || "0";
  const mins = formData.get("duration_m") || "0";
  const duration = `${hours}h ${mins}m`;
  const date = new Date().toISOString();

  await prisma.course.create({
    data: {
      title_ar,
      title_en,
      sheikh_ar,
      sheikh_en,
      description_ar,
      description_en,
      category,
      videoUrl,
      duration,
      date,
    },
  });

  revalidatePath("/qiyada/courses");
  revalidatePath("/courses");
  revalidatePath("/");
}

// --- NEW EDIT COURSE ACTION ---
export async function updateCourse(formData: FormData) {
  const id = formData.get("id") as string;
  const title_ar = formData.get("title_ar") as string;
  const title_en = formData.get("title_en") as string;
  const sheikh_ar = formData.get("sheikh_ar") as string;
  const sheikh_en = formData.get("sheikh_en") as string;
  const description_ar = formData.get("description_ar") as string;
  const description_en = formData.get("description_en") as string;
  const rawCategory = formData.get("category");
  const category = (rawCategory as string) || "General";
  const videoUrl = formData.get("videoUrl") as string;
  const hours = formData.get("duration_h") || "0";
  const mins = formData.get("duration_m") || "0";
  const duration = `${hours}h ${mins}m`;

  await prisma.course.update({
    where: { id },
    data: {
      title_ar,
      title_en,
      sheikh_ar,
      sheikh_en,
      description_ar,
      description_en,
      category,
      videoUrl,
      duration,
    },
  });

  revalidatePath("/qiyada/courses");
  revalidatePath("/courses");
  revalidatePath("/");
}

export async function deleteCourse(formData: FormData) {
  const id = formData.get("id") as string;
  try {
    await prisma.course.delete({ where: { id } });
    revalidatePath("/qiyada/courses");
    revalidatePath("/courses");
    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting course:", error);
  }
}

// --- NEW CATEGORY ACTIONS ---

export async function addCategory(name: string) {
  if (!name) return;
  try {
    const existing = await prisma.courseCategory.findUnique({
      where: { name },
    });
    if (!existing) {
      await prisma.courseCategory.create({ data: { name } });
      revalidatePath("/qiyada/courses");
      revalidatePath("/courses"); // Update public filters immediately
      return { success: true };
    }
    return { success: false, error: "Category already exists" };
  } catch (e) {
    return { success: false, error: "Database error" };
  }
}

// 1. DELETE CATEGORY
export async function deleteCategory(id: string) {
  try {
    await prisma.courseCategory.delete({ where: { id } });
    revalidatePath("/qiyada/courses");
    revalidatePath("/courses");
    return { success: true };
  } catch (e) {
    return { success: false, error: "Failed to delete" };
  }
}

// 2. RENAME CATEGORY
export async function updateCategory(id: string, newName: string) {
  try {
    await prisma.courseCategory.update({
      where: { id },
      data: { name: newName },
    });
    revalidatePath("/qiyada/courses");
    revalidatePath("/courses");
    return { success: true };
  } catch (e) {
    return { success: false, error: "Failed to update" };
  }
}
