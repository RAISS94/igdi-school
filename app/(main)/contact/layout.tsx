import { Metadata } from "next";

export const metadata: Metadata = {
    title: "تواصل معنا | مدرسة ايكضي العتيقة",
    description: "تواصل مع إدارة مدرسة ايكضي العتيقة للاستفسار عن التسجيل، الدروس، أو أي معلومات أخرى. نحن هنا لخدمتكم.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
