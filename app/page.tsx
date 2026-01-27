import Hero from "../components/Hero";
import NewsSection from "../components/NewsSection";
import LibrarySection from "../components/LibrarySection";
import TeachersSection from "../components/TeachersSection";
import DonateSection from "../components/DonateSection";
import ContactSection from "../components/ContactSection"; // Added back

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <Hero />
      <NewsSection />
      <LibrarySection />
      <TeachersSection />
      <DonateSection />
      <ContactSection />
    </div>
  );
}
