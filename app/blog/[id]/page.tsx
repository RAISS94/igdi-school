import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import BlogPostContent from "../../../components/BlogPostContent";

const prisma = new PrismaClient();

// --- 1. SEO METADATA (Server Side) ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.article.findUnique({ where: { id } });

  return {
    title: post ? `${post.title_en} | IGDI Journal` : "Article Not Found",
    description: post
      ? post.content_en.substring(0, 150)
      : "School news and updates.",
  };
}

// --- 2. MAIN PAGE COMPONENT ---
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Find the real post in the database
  const article = await prisma.article.findUnique({ where: { id } });

  // Return 404 page if someone types a bad URL
  if (!article) return notFound();

  // Safety check for the image string here too
  const isValidImage =
    article.image &&
    (article.image.startsWith("/") || article.image.startsWith("http"));

  // Map the Prisma data so it matches the format your component expects
  const formattedPost = {
    id: article.id,
    image: isValidImage ? article.image : "/igdi-hero.jpeg", // Uses a fallback if image is missing
    date: article.createdAt.toLocaleDateString(),
    category_ar: "أخبار",
    category_en: "News",
    title_ar: article.title_ar,
    title_en: article.title_en,
    excerpt_ar: article.content_ar.substring(0, 100) + "...", // Create a short excerpt from the content
    excerpt_en: article.content_en.substring(0, 100) + "...",
    // Wrap content in paragraph tags and replace line breaks so it looks nice in HTML
    content_ar: `<p>${article.content_ar.replace(/\n/g, "<br/>")}</p>`,
    content_en: `<p>${article.content_en.replace(/\n/g, "<br/>")}</p>`,
  };

  return <BlogPostContent post={formattedPost as any} />;
}
