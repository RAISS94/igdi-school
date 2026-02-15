"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const prisma = new PrismaClient();

// --- 1. ADMIN MANAGEMENT ---

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

// --- 2. ARTICLE (NEWS) MANAGEMENT (IMAGE UPLOADS ENABLED) ---

export async function addArticle(formData: FormData) {
  console.log("1. Starting Article Upload Process...");

  const title_ar = formData.get("title_ar") as string;
  const title_en = formData.get("title_en") as string;
  const content_ar = formData.get("content_ar") as string;
  const content_en = formData.get("content_en") as string;
  const author = formData.get("author") as string;

  // Grab the file from the form
  const imageFile = formData.get("image") as File;
  let imageUrl = "";

  try {
    // If a file was uploaded, process and save it
    if (imageFile && imageFile.size > 0) {
      console.log(`2. Article Image received: ${imageFile.name}`);

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Clean the file name
      const safeName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const uniqueName = `${Date.now()}-news-${safeName}`;

      const uploadDir = join(process.cwd(), "public/uploads");
      const filePath = join(uploadDir, uniqueName);

      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {}
      await writeFile(filePath, buffer);

      imageUrl = `/uploads/${uniqueName}`;
      console.log(`3. File saved at ${imageUrl}`);
    }

    // Save to database
    console.log("4. Saving Article to Database...");
    await prisma.article.create({
      data: {
        title_ar,
        title_en,
        content_ar,
        content_en,
        author,
        image: imageUrl,
      },
    });

    console.log("5. Article added successfully!");
    revalidatePath("/qiyada/news");
    revalidatePath("/blog"); // Using /blog since that's your public route
    revalidatePath("/");
  } catch (error) {
    console.error("❌ ERROR SAVING ARTICLE:", error);
  }
}

export async function deleteArticle(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.article.delete({ where: { id } });
  revalidatePath("/qiyada/news");
  revalidatePath("/blog");
  revalidatePath("/");
}

// --- 3. SCHOLAR MANAGEMENT (IMAGE UPLOADS ENABLED) ---

export async function addScholar(formData: FormData) {
  console.log("1. Starting Scholar Upload Process...");

  const name_ar = formData.get("name_ar") as string;
  const name_en = formData.get("name_en") as string;
  const title_ar = formData.get("title_ar") as string;
  const title_en = formData.get("title_en") as string;
  const bio_ar = formData.get("bio_ar") as string;
  const bio_en = formData.get("bio_en") as string;

  const imageFile = formData.get("image") as File;
  let imageUrl = "";

  try {
    if (imageFile && imageFile.size > 0) {
      console.log(`2. File received: ${imageFile.name}`);
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const safeName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const uniqueName = `${Date.now()}-${safeName}`;
      const uploadDir = join(process.cwd(), "public/uploads");
      const filePath = join(uploadDir, uniqueName);

      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {}
      await writeFile(filePath, buffer);

      imageUrl = `/uploads/${uniqueName}`;
    }

    await prisma.scholar.create({
      data: {
        name_ar,
        name_en,
        title_ar,
        title_en,
        bio_ar,
        bio_en,
        image: imageUrl,
      },
    });

    revalidatePath("/qiyada/scholars");
    revalidatePath("/scholars");
    revalidatePath("/");
  } catch (error) {
    console.error("❌ ERROR DURING UPLOAD:", error);
  }
}

export async function deleteScholar(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.scholar.delete({ where: { id } });
  revalidatePath("/qiyada/scholars");
  revalidatePath("/scholars");
  revalidatePath("/");
}
