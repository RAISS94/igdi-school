import { PrismaClient } from "@prisma/client";
import NewsClient from "./NewsClient";
const prisma = new PrismaClient();
export default async function NewsPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });
  return <NewsClient articles={articles} />;
}
