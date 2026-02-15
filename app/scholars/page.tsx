import { PrismaClient } from "@prisma/client";
import ScholarsClientPage from "./ScholarsClientPage";

const prisma = new PrismaClient();

export default async function ScholarsPage() {
  // Fetch real scholars from the database
  const scholars = await prisma.scholar.findMany({
    orderBy: { createdAt: "asc" },
  });

  return <ScholarsClientPage scholars={scholars} />;
}
