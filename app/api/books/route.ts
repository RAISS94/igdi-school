import { NextResponse } from "next/server";
import { getBooks } from "@/sanity/lib/queries";

export const revalidate = 60;

export async function GET() {
  const books = await getBooks();
  return NextResponse.json(books);
}
