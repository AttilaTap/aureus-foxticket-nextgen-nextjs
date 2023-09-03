import "../../styles/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata = {
  title: "NexTicket",
  description: "A page to easily sell or buy tickets",
};

export default function MainLayout({ children }) {
  return (
    <>
      <div className="flex flex-col  h-80 bg-[url('../public/background-img/bg-image-one.jpg')] bg-cover bg-center ">
        <Header isMain="1"></Header>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-stone-100">{children}</main>
      <Footer />
    </>
  );
}
