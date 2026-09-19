import { Metadata } from "next";

export const metadata: Metadata = {
    title: "المكتبة الرقمية | مدرسة ايكضي العتيقة",
    description: "المكتبة الرقمية لمدرسة ايكضي العتيقة. تصفح وتحميل المتون العلمية والكتب المنهجية في العلوم الشرعية واللغة العربية.",
};

export default function LibraryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
