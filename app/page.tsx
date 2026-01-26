// app/page.tsx
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section: 
          Uses the high-quality school background with the Quranic verse.
      */}
      <Hero />

      {/* Future sections will be added here:
          - <NewsBlog />
          - <LibrarySection />
          - <VideoCourses />
          - <TeachersSection />
          - <DonationPortal />
      */}

      {/* Temporary spacing to test scrolling and footer placement later */}
      <section className="py-20 bg-school-sand/10 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 dark:text-gray-400 italic">
            "Knowledge is a light that Allah casts into the heart."
          </p>
        </div>
      </section>
    </main>
  );
}
