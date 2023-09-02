"use client";
import Image from "next/image";
import Link from "next/link";
import Login from "./login";
import Registration from "./registration";
import logo from "../../public/logo_black_transp.svg";
import useTicketStore from "@/store/store";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { parseJwt } from "./utils/auth-token-handling";

export default function Navbar() {
  const { status, data: session } = useSession();
  const [userName, setUserName] = useState(null); // Use useState to manage userName
  const [jwtToken, setJwtToken] = useState(null); // Use useState to manage jwtToken

  useEffect(() => {
    if (typeof document !== "undefined") {
      const token = document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${process.env.NEXT_PUBLIC_COOKIE_NAME}\\s*=\\s*([^;]*).*$)|^.*$`), "$1");

      setJwtToken(token);

      if (token) {
        const decodedToken = parseJwt(token);
        console.log(decodedToken);
        setUserName(decodedToken.email);
      }
    }
  }, []); // Run this effect only once, on component mount

  const [showLogin, setShowLogin, showRegistration, setShowRegistration] = useTicketStore((state) => [state.showLog, state.setShowLog, state.showReg, state.setShowReg]);
  return (
    <>
      <div className="flex justify-between bg-stone-100">
        <Image priority src={logo} height={120} width={300} alt="Nexticket logo" className="mt-6 mb-6 ml-6  h-16" />
        <div className="flex justify-center mr-6 mt-6">
          {userName ? (
            <div className="flex items-center pr-3 mb-14 mr-2">
              <div className="text-emerald-400 font-bold mr-5">
                <span className="text-stone-600">Welcome back </span>
                {userName}
              </div>
              <button onClick={() => signOut()} className="bg-stone-600 w-20 h-8 p-1 rounded-full font-semibold text-stone-100" type="submit">
                Log out
              </button>
            </div>
          ) : (
            <button type="submit" className="bg-stone-600 w-20 h-8 p-1 rounded-full font-semibold text-stone-100 mr-5" onClick={setShowLogin}>
              Log in
            </button>
          )}
          <Link href="/cart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 mt-1 stroke-stone-600">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </Link>
        </div>
      </div>
      <Login isVisible={showLogin} onCloseLog={setShowLogin} openReg={setShowRegistration} />
      <Registration isVisible={showRegistration} onCloseReg={setShowRegistration} openLog={setShowLogin} />
    </>
  );
}
