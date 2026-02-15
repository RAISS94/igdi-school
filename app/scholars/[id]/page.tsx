import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import ScholarBioContent from "../../../components/ScholarBioContent";

const prisma = new PrismaClient();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scholar = await prisma.scholar.findUnique({ where: { id } });

  return {
    title: scholar ? `${scholar.name_en} | IGDI Scholars` : "Scholar Bio",
    description: scholar
      ? scholar.bio_en
      : "Biography of our esteemed scholar.",
  };
}

export default async function ScholarBioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const scholar = await prisma.scholar.findUnique({
    where: { id },
  });

  if (!scholar) return notFound();

  const formattedScholar = {
    id: scholar.id,
    image: scholar.image || "/igdi-hero.jpeg",
    name_ar: scholar.name_ar,
    name_en: scholar.name_en,
    role_ar: scholar.title_ar,
    role_en: scholar.title_en,
    specialty_ar: "العلوم الشرعية",
    specialty_en: "Islamic Sciences",
    bio_ar: scholar.bio_ar,
    bio_en: scholar.bio_en,
    full_bio_ar: `<p>${scholar.bio_ar}</p>`,
    full_bio_en: `<p>${scholar.bio_en}</p>`,
  };

  return <ScholarBioContent scholar={formattedScholar as any} />;
}
