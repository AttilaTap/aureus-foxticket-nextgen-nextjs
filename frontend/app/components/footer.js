"use client";

import Link from "next/link";
import Image from "next/image";
import useTicketStore from "@/store/store";
import getBackendUrl from "./utils/environment";

export default function Footer() {
  const backendState = useTicketStore((state) => state.backendState);
  const setBackendState = useTicketStore((state) => state.setBackendState);
  async function getBackendState() {
    const response = await fetch(`${getBackendUrl()}isAvailable`);
    response.ok ? setBackendState(true) : setBackendState(false);
  }

  return (
    <div className="justify-between h-20 bg-stone-100 border-t">
      <div className="float-left flex flex-col">
        <Link href="/aboutus" className="ml-3 mt-3 font-medium">
          About us
        </Link>
        <Link href="https://github.com/green-fox-academy/aureus-foxticket-nextgen-nextjs#nextticket-ticket" className="ml-3 mt-1 mb-3 font-medium">
          How it works
        </Link>
      </div>
      <div className="flex flex-row float-right min-h-full justify-center items-center">
        <Image onLoad={getBackendState} src={`/img/${backendState ? "green" : "red"}.avif`} width={50} height={50} alt="align-middle backend connection indicator" />
      </div>
    </div>
  );
}
