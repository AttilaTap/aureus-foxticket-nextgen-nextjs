"use client";
import Login from "./login";
import Registration from "./registration";
import useTicketStore from "@/store/store";
import Navbar from "./navbar";

export default function Header(isMain = "0") {
  const [showLogin, setShowLogin, showRegistration, setShowRegistration] = useTicketStore((state) => [state.showLog, state.setShowLog, state.showReg, state.setShowReg]);
  return (
    <>
      {isMain === "1" ? (
        <>
          <div className="flex flex-col  h-80 bg-[url('../public/background-img/bg-image-one.jpg')] bg-cover bg-center ">
            <Navbar isMain="1"></Navbar>
          </div>
        </>
      ) : (
        <>
          <Navbar />
        </>
      )}
      <Login isVisible={showLogin} onCloseLog={setShowLogin} openReg={setShowRegistration} />
      <Registration isVisible={showRegistration} onCloseReg={setShowRegistration} openLog={setShowLogin} />
    </>
  );
}
