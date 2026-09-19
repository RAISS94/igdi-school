import BlogClientPage from "./BlogClientPage";
import { getBlogPosts } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata = {
  title: "أخبار ومقالات | مدرسة ايكضي العتيقة",
  description: "تابع أحدث أخبار ومستجدات مدرسة ايكضي العتيقة، ونخبة من المقالات العلمية والتربوية.",
};

export default async function BlogPage() {
  // Fetch real articles from Sanity (with Prisma fallback)
  const articles = await getBlogPosts();

  return <BlogClientPage articles={articles} />;
}
