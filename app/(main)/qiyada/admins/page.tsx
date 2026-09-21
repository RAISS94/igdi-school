import { PrismaClient } from "@prisma/client";
import AdminsClient from "./AdminsClient";

const prisma = new PrismaClient();

export default async function AdminsPage() {
  const admins = await prisma.admin.findMany({
    where: {
      role: {
        not: "SUPER_ADMIN",
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return <AdminsClient admins={admins} />;
}
