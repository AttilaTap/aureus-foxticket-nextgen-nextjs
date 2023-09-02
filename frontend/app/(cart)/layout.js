import BasketNavbar from "../components/basket-navbar";

export default function BasketLayout({ children }) {
  return (
    <>
      <main className=" bg-stone-100 h-screen">
        <BasketNavbar />
        {children}
      </main>
    </>
  );
}
