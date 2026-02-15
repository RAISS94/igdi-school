import { PrismaClient } from "@prisma/client";
import ScholarsClient from "./ScholarsClient";

const prisma = new PrismaClient();

export default async function AdminScholarsPage() {
  const scholars = await prisma.scholar.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <ScholarsClient scholars={scholars} />;
}
