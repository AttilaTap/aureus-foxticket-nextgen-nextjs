import "../../styles/globals.css";
import Footer from "../components/footer";
import Header from "../components/header";

export const metadata = {
  title: "NexTicket",
  description: "A page to easily sell or buy tickets",
};

export default function EventLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center pt-24 pb-24 bg-stone-100">
        <div className="w-full">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
