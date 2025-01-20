import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Separator from "@/components/Separator";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "track-things",
  description: "Open Source project for handling the tracking of things",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} h-[100%] bg-[#1A1A1A]`}
      suppressHydrationWarning
      suppressContentEditableWarning
    >
      <body className="h-[100%]">
        <Separator />
        <div className="mx-auto h-[100%] max-w-7xl px-6 xl:px-0">
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
