import BasketNavbar from "../components/basket-navbar";

export default function BasketLayout({ children }) {
  return (
    <>
      <main className="flex flex-col bg-stone-100 h-screen grow">
        <BasketNavbar />
        {children}
      </main>
    </>
  );
}
