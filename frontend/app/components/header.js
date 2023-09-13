"use client";
import Image from "next/image";
import Link from "next/link";
import Login from "./login";
import Registration from "./registration";
import useTicketStore from "@/store/store";
import logoDark from "@/public/logo_black_transp.svg";
import logoLight from "@/public/logo_white_transp.svg";
import cartLight from "@/public/cart-light.svg";
import cartDark from "@/public/cart-dark.svg";
import home from "@/public/home.svg";
import React, { useEffect } from "react";

import { Gochi_Hand } from "next/font/google";
import { parseJwt } from "./utils/auth-token-handling";

const gochi = Gochi_Hand({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function Header(props) {
  const [userEmailFromLocalStorage, setUserEmailFromLocalStorage] = useTicketStore((state) => [state.userEmailFromLocalStorage, state.setUserEmailFromLocalStorage]);
  // console.log(`Header props: ${JSON.stringify(props)}`);
  async function logout() {
    if (userEmailFromLocalStorage) {
      localStorage.clear();
      setUserEmailFromLocalStorage(null);
    }
  }

  useEffect(() => {
    let token = localStorage.getItem(process.env.NEXT_PUBLIC_COOKIE_NAME) || null;
    let parsedToken = parseJwt(token);
    setUserEmailFromLocalStorage(parsedToken ? parsedToken.email : null);
  }, [setUserEmailFromLocalStorage]);

  const [showLogin, setShowLogin, showRegistration, setShowRegistration] = useTicketStore((state) => [state.showLog, state.setShowLog, state.showReg, state.setShowReg]);
  return (
    <>
      <div className={props.isMain ? "flex justify-between" : "flex justify-between  bg-stone-100"}>
        <div className="mt-2 ml-6">
          <Link href="/">
            <Image priority src={props.isMain ? logoLight : logoDark} height={120} width={300} alt="Nexticket logo" className="h-16" />
          </Link>
        </div>
        <div className="flex justify-center mr-6 mt-6">
          <div className="flex items-center pr-3 mb-8 mr-2">
            {userEmailFromLocalStorage ? (
              <div className="flex items-center">
                <div className="text-emerald-400 font-bold mr-5">
                  <span className={props.isMain ? "text-stone-100" : "text-stone-600"}>Welcome back </span>
                  {userEmailFromLocalStorage}
                </div>
                <button onClick={logout} className="bg-stone-600 w-20 h-8 p-1 rounded-full font-semibold text-stone-100" type="submit">
                  Log out
                </button>
              </div>
            ) : (
              <button onClick={setShowLogin} type="submit" className="bg-stone-600 w-20 h-8 p-1 rounded-full font-semibold text-stone-100 mr-5">
                Log in
              </button>
            )}
            <Link className={"flex items-center justify-end ml-6"} href={props.isBasket ? "/" : "/cart"}>
              <Image priority src={props.isBasket ? home : props.isMain ? cartLight : cartDark} alt="Basket or home icon" />
            </Link>
          </div>
        </div>
      </div>
      {props.isMain ? (
        <div className="flex justify-center">
          <h1 className={`${gochi.className} text-white text-6xl font-bold mt-20  drop-shadow-2xl`}>your nexTicket is here</h1>
        </div>
      ) : (
        <div />
      )}
      <Login isVisible={showLogin} onCloseLog={setShowLogin} openReg={setShowRegistration} />
      <Registration isVisible={showRegistration} onCloseReg={setShowRegistration} openLog={setShowLogin} />
    </>
  );
}
