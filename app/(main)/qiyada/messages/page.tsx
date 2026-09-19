import { PrismaClient } from "@prisma/client";
import MessagesClient from "./MessagesClient";

// It's safer to initialize it like this if you don't have a global lib
const prisma = new PrismaClient();

export default async function MessagesPage() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return <MessagesClient messages={messages} />;
  } catch (error) {
    console.error("Database error:", error);
    return (
      <div className="p-10 text-red-500">
        Error loading messages. Check if the table exists.
      </div>
    );
  }
}
