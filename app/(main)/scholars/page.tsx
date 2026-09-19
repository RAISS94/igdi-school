import ScholarsClientPage from "./ScholarsClientPage";
import { getScholars } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata = {
  title: "شيوخنا وعلمائنا | مدرسة ايكضي العتيقة",
  description: "تعرف على نخبة من العلماء والفقهاء المدرسين بمدرسة ايكضي العتيقة وحراس العلم والتراث.",
};

export default async function ScholarsPage() {
  // Fetch scholars directly from Sanity (with Prisma fallback)
  const scholars = await getScholars();

  return <ScholarsClientPage scholars={scholars} />;
}
