import { PrismaClient } from "@prisma/client";
import BlogClientPage from "./BlogClientPage";

const prisma = new PrismaClient();

export default async function BlogPage() {
  // Fetch real articles from SQLite, ordered by newest first
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <BlogClientPage articles={articles} />;
}
