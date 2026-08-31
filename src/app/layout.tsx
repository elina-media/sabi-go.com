import type { Metadata } from "next";
import { neueMontreal, ppEditorialItalic } from "./fonts";
import { LanguageProvider } from "@/components/LanguageProvider";
import { MobileMenuProvider } from "@/components/MobileMenuProvider";
import { BookingModalProvider } from "@/components/BookingModalProvider";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sabi Go Travel",
  description:
    "Explore Kazakhstan's most breathtaking landscapes with carefully planned tours and local guides.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${neueMontreal.variable} ${ppEditorialItalic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <MobileMenuProvider>
            <BookingModalProvider>
              <Header />
              <MobileMenu />
              <BookingModal />
              {children}
              <Footer />
            </BookingModalProvider>
          </MobileMenuProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
