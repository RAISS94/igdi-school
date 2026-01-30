"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { LanguageProvider } from "../context/LanguageContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Check if we are in the admin area
  const isAdmin = pathname?.startsWith("/qiyada");

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        {/* Hide Navbar if in Admin */}
        {!isAdmin && <Navbar />}

        <main className="flex-grow">{children}</main>

        {/* Hide Footer if in Admin */}
        {!isAdmin && (
          <div className="z-10 relative">
            <Footer />
          </div>
        )}
      </div>
    </LanguageProvider>
  );
}
