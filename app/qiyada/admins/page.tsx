import { PrismaClient } from "@prisma/client";
import AdminsClient from "./AdminsClient";

const prisma = new PrismaClient();

export default async function AdminsPage() {
  // This query will FAIL if you didn't run 'npx prisma db push'
  const admins = await prisma.admin.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AdminsClient admins={admins} />;
}
