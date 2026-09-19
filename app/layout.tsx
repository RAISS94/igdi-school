import "./globals.css";
import { Amiri, Noto_Sans_Arabic, Harmattan } from "next/font/google";

const harmattan = Harmattan({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-secondary",
  display: "swap",
});

const noto = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata = {
  title: "Ecole Traditionnelle IGDI | مدرسة ايكضي العتيقة",
  description: "الموقع الرسمي لمدرسة ايكضي العتيقة - Madrasat Igdi L3ati9a",
  icons: {
    icon: "/logo-igdi.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${harmattan.variable} ${noto.variable}`}
    >
      <body className="antialiased font-noto bg-white text-school-dark">
        {/* Local Business / School Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "مدرسة ايكضي العتيقة - Ecole Traditionnelle IGDI",
              url: "https://igdi-school.ma",
              logo: "https://igdi-school.ma/logo-igdi.jpg",
              description:
                "الموقع الرسمي لمدرسة ايكضي العتيقة - مدرسة دينية تقليدية تجمع بين التراث والحداثة.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Anzi",
                addressRegion: "Tiznit",
                addressCountry: "MA",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+212-528-000000",
                contactType: "customer service",
              },
            }),
          }}
        />
        {/* ClientLayout is removed from here to keep the Sanity Studio layout clean */}
        {children}
      </body>
    </html>
  );
}
