import "../styles/globals.css";
import Provider from "./components/providers";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "NexTicket",
  description: "A page to easily sell or buy tickets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} flex flex-col h-full`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
