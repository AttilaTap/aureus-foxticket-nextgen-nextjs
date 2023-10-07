import Header from "../components/header";

export default function BasketLayout({ children }) {
  return (
    <>
      <main className="flex flex-col bg-stone-100 h-screen grow">
        <Header isBasket="1" />
        {children}
      </main>
    </>
  );
}
