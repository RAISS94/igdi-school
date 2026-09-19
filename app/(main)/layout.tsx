import ClientLayout from "@/components/ClientLayout";
// Note: If "@/components" doesn't work in your setup, use "../../components/ClientLayout" instead.

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
