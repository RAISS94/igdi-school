import "./globals.css";
// 1. Remove Navbar/Footer/LanguageProvider imports from here
// 2. Import the new wrapper instead
import ClientLayout from "../components/ClientLayout";
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
        {/* Use the new ClientLayout wrapper here */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
