import "../../styles/globals.css";
import { Nunito } from "next/font/google";
import Header from "../(main)/components/header";
import Footer from "../(main)/components/footer";

const nunito = Nunito({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "NexTicket",
  description: "A page to easily sell or buy tickets",
};

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-stone-100">
        {children}
      </main>
      <Footer />
    </>
  );
}
