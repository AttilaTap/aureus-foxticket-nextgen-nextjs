import Header from "../components/header";

export default function AboutUsLayout({ children }) {
  return (
    <>
      <main className="flex flex-col bg-stone-100 min-h-screen">
        <Header isBasket="1" />
        {children}
      </main>
    </>
  );
}
