import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub — create and organize your notes easily",
  description:
    "NoteHub is a modern note management app that helps you create, organize, and search your notes quickly and efficiently.",
  openGraph: {
    title: "NoteHub — create and organize your notes easily",
    description:
      "Keep your ideas organized and accessible anywhere with NoteHub — your personal space for smart note-taking.",
    url: "https://08-zustand-navy-three.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />

            <main>{children}</main>

            {modal}

            <Footer />
            <Toaster position="top-right" reverseOrder={false} />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}


