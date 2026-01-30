import { PrismaClient } from "@prisma/client";
import LibraryClient from "./LibraryClient";

const prisma = new PrismaClient();

export default async function LibraryPage() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
  });
  return <LibraryClient books={books} />;
}
