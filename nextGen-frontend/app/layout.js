import "../styles/globals.css";
import { Nunito } from "next/font/google";
import Header from "./components/header";
import Footer from "./components/footer";

const nunito = Nunito({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "NexTicket",
  description: "A page to easily sell or buy tickets",
  icons: {
    icon: { url: "/favicon/logo_2_favicon_transparent.svg", type: "image/svg" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`{nunito.className} flex flex-col h-full`}>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-stone-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
