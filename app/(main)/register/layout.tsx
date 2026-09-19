import { Metadata } from "next";

export const metadata: Metadata = {
    title: "التسجيل والالتحاق | مدرسة ايكضي العتيقة",
    description: "بوابة التسجيل والالتحاق بمدرسة ايكضي العتيقة. انضم إلى ركب طلبة العلم في مؤسساتنا التعليمية.",
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
