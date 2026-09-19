import { notFound } from "next/navigation";
import ScholarBioContent from "../../../components/ScholarBioContent";
import { getScholarById } from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scholar = await getScholarById(id);

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

  const scholar = await getScholarById(id);

  if (!scholar) return notFound();

  const formattedScholar = {
    id: scholar.id,
    image: scholar.image || "/igdi-hero.jpeg",
    name_ar: scholar.name_ar,
    name_en: scholar.name_en,
    role_ar: scholar.title_ar,
    role_en: scholar.title_en,
    specialty_ar: scholar.specialty_ar || "العلوم الشرعية",
    specialty_en: scholar.specialty_en || "Islamic Sciences",
    bio_ar: scholar.bio_ar,
    bio_en: scholar.bio_en,
    full_bio_ar: `<p>${scholar.bio_ar.replace(/\n/g, "<br/>")}</p>`,
    full_bio_en: `<p>${scholar.bio_en.replace(/\n/g, "<br/>")}</p>`,
  };

  return <ScholarBioContent scholar={formattedScholar as any} />;
}
