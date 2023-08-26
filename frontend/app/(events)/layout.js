import "../../styles/globals.css";
import { Nunito } from "next/font/google";
import Navbar from "@/app/(main)/components/navbar";
import Footer from "../(main)/components/footer";

const nunito = Nunito({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "NexTicket",
  description: "A page to easily sell or buy tickets",
};

export default function EventLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-stone-100">
        {children}
      </main>
      <Footer />
    </>
  );
}
