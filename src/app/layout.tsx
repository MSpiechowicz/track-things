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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} min-h-[100dvh] bg-[#1A1A1A]`}
      suppressHydrationWarning
      suppressContentEditableWarning
    >
      <body className="flex min-h-[100dvh] flex-col">
        <Separator />
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 xl:px-0">
          <Navigation />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
