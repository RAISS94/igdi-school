// app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "../components/ThemeProvider";
import { LanguageProvider } from "../context/LanguageContext"; // Import the new provider
import { Amiri, Noto_Sans_Arabic } from "next/font/google";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const noto = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto",
});

export const metadata = {
  title: "Ecole Traditionnelle IGDI | مدرسة ايكضي العتيقة",
  description:
    "الموقع الرسمي لمدرسة ايكضي العتيقة - Traditional School of IGDI",
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
      <body className="antialiased font-noto bg-white text-school-dark dark:bg-school-dark dark:text-white transition-colors duration-300">
        <LanguageProvider>
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
