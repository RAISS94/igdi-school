import { notFound } from "next/navigation";
import BlogPostContent from "../../../components/BlogPostContent";
import { getBlogPostById } from "@/sanity/lib/queries";

export const revalidate = 60;

// --- 1. SEO METADATA (Server Side) ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);

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

  // Find post from Sanity (or fallback DB)
  const article = await getBlogPostById(id);

  if (!article) return notFound();

  const formattedPost = {
    id: article.id,
    image: article.image || "/igdi-hero.jpeg",
    date: article.createdAt ? new Date(article.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
    category_ar: article.category_ar || "أخبار",
    category_en: article.category_en || "News",
    title_ar: article.title_ar,
    title_en: article.title_en,
    excerpt_ar: article.content_ar ? article.content_ar.substring(0, 100) + "..." : "",
    excerpt_en: article.content_en ? article.content_en.substring(0, 100) + "..." : "",
    content_ar: `<p>${(article.content_ar || "").replace(/\n/g, "<br/>")}</p>`,
    content_en: `<p>${(article.content_en || "").replace(/\n/g, "<br/>")}</p>`,
  };

  return <BlogPostContent post={formattedPost as any} />;
}
