import "./globals.css";
import Navbar from "../components/Navbar";
// Removed ContactSection from here
import Footer from "../components/Footer";
import { LanguageProvider } from "../context/LanguageContext";
import { Amiri, Noto_Sans_Arabic } from "next/font/google";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
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
      className={`${amiri.variable} ${noto.variable}`}
    >
      <body className="antialiased font-noto bg-white text-school-dark">
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <div className="z-10 relative">
              {/* ContactSection removed from here */}
              <Footer />
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
