"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";

const prisma = new PrismaClient();

async function saveFile(file: File, subfolder: string): Promise<string> {
  if (!file || file.size === 0) return "";
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", subfolder);
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (e) {}
  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, buffer);
  return `/uploads/${subfolder}/${fileName}`;
}

export async function addBook(formData: FormData) {
  const title_ar = (formData.get("title_ar") as string) || "";
  const title_en = (formData.get("title_en") as string) || "";
  const author_ar = (formData.get("author_ar") as string) || "";
  const author_en = (formData.get("author_en") as string) || "";
  const category = (formData.get("category") as string) || "General";

  const pdfPath = await saveFile(formData.get("pdfFile") as File, "books");
  const imagePath = await saveFile(formData.get("coverFile") as File, "covers");

  await prisma.book.create({
    data: {
      title_ar,
      title_en,
      author_ar,
      author_en,
      category,
      pdfUrl: pdfPath, // Now this exists in the DB!
      coverUrl: imagePath, // Now this exists in the DB!
      desc_ar: "",
      desc_en: "",
    },
  });
  revalidatePath("/qiyada/library");
}

export async function deleteBook(formData: FormData) {
  const id = formData.get("id") as string;
  if (id) {
    await prisma.book.delete({ where: { id } });
    revalidatePath("/qiyada/library");
  }
}
