import Image from "next/image";
import logo from "../../public/logo_white_transp_version_1.svg";
import Link from "next/link";
import { Gochi_Hand } from "next/font/google";

const gochi = Gochi_Hand({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function Header() {
  return (
    <div className="flex flex-col  h-80 bg-[url('../public/background-img/bg-image-one.jpg')] bg-cover bg-center">
      <div className="flex justify-between ">
        <Image priority src={logo} height={120} width={300} alt="Nexticket logo" className="mt-6 ml-6  h-16" />

        <div className="flex justify-center mr-6 mt-6">
          <button type="submit" className="bg-stone-600 w-20 h-8 p-1 rounded-full font-semibold text-stone-100 mr-5">
            Login
          </button>
          <Link href="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 mt-1 stroke-stone-100">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className={`${gochi.className} text-white text-6xl font-bold mt-20`}>your nexTicket is here</h1>
      </div>
    </div>
  );
}
