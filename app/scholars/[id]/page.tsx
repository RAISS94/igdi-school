import { scholarsItems } from "../../../data/scholarsData";
import ScholarBioContent from "../../../components/ScholarBioContent";

// --- 1. SEO METADATA (Server Side) ---
// This runs on the server to ensure Google sees the correct Title and Description
export async function generateMetadata({ params }: { params: { id: string } }) {
  const scholar = scholarsItems.find((s) => s.id.toString() === params.id);
  return {
    title: scholar ? `${scholar.name_en} | IGDI Scholars` : "Scholar Bio",
    description: scholar
      ? scholar.bio_en
      : "Biography of our esteemed scholar.",
  };
}

// --- 2. MAIN PAGE COMPONENT ---
export default function ScholarBioPage({ params }: { params: { id: string } }) {
  // A. Try to find the real scholar from your data file
  let scholar = scholarsItems.find((s) => s.id.toString() === params.id);

  // B. FALLBACK: Create "Fake Data" if not found (For Preview/Testing purposes only)
  // This ensures you never see a broken page while designing
  if (!scholar) {
    scholar = {
      id: 999,
      image: "/igdi-hero.jpeg", // Uses your standard placeholder
      name_ar: "الشيخ الفقيه سيدي محمد السوسي",
      name_en: "Sheikh Al-Faqih Sidi Mohamed Al-Soussi",
      role_ar: "مدير المدرسة وشيخ الفقه",
      role_en: "Director of the School & Master of Fiqh",
      specialty_ar: "الفقه المالكي والأصول",
      specialty_en: "Maliki Fiqh & Foundations",
      bio_ar:
        "نشأ الشيخ في بيت علم وورع، وحفظ القرآن الكريم في سن مبكرة. رحل في طلب العلم إلى عدة مدارس عتيقة بسوس.",
      bio_en:
        "The Sheikh grew up in a house of knowledge. He memorized the Quran early and traveled to seek knowledge in Souss.",
      full_bio_ar: `
        <p>يعتبر الشيخ سيدي محمد من أبرز علماء المنطقة، حيث قضى أكثر من 40 سنة في تدريس الفقه المالكي.</p>
        <p>بدأ مسيرته التعليمية في سن مبكرة، حيث حفظ القرآن الكريم على يد والده، ثم انتقل إلى مدرسة "تنانت" العتيقة.</p>
        <h3>إجازاته العلمية</h3>
        <ul>
          <li>إجازة في القراءات السبع من الشيخ المقرئ عبد الكبير.</li>
          <li>إجازة في صحيح البخاري وموطأ الإمام مالك.</li>
        </ul>
      `,
      full_bio_en: `
        <p>Sheikh Sidi Mohamed is considered one of the prominent scholars of the region, having spent over 40 years teaching Maliki jurisprudence.</p>
        <p>He began his educational journey at an early age, memorizing the Quran under his father, then moving to "Tanant" traditional school.</p>
        <h3>Certifications (Ijazah)</h3>
        <ul>
          <li>Ijazah in the Seven Qira'at.</li>
          <li>Ijazah in Sahih Al-Bukhari and Al-Muwatta.</li>
        </ul>
      `,
    };
  }

  // C. Render the Client Component
  // We pass the data here, and the Client Component handles the Language Switching & Animation
  return <ScholarBioContent scholar={scholar} />;
}
