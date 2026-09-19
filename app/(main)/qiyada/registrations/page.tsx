import { PrismaClient } from "@prisma/client";
import RegistrationsClient from "./RegistrationsClient"; // Import the UI component

const prisma = new PrismaClient();

export default async function RegistrationsPage() {
  // 1. Fetch data on the Server
  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Pass data to the Client Component to handle translations
  return <RegistrationsClient data={registrations} />;
}
