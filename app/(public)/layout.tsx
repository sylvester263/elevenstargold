import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { WhatsAppButton } from "@/components/marketing/WhatsAppButton";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
